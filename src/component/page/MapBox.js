import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl'
import districtData from '../geodata/districts.json'
import useLayers from '../geodata/layerStyles'

const districtIndexOnSelect = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export default function MapBox(props) {

  const [layerStyles, layerOptions, handleLayerOptions] = useLayers();
  const [viewport, setViewport] = useState({
    latitude: 47.484,
    longitude: window.innerWidth < 767 ? 19.135 : 19.053,
    width: 'inherit',
    height: '400px',
    zoom: window.innerWidth < 767 ? 9 : 9.38,
    minZoom: 8.5
  });

  function getCursor({ isHovering, isDragging }) {
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
  }

  const districtFilter = useCallback((selectedDistricts, source) => {

    let newGeoJson = JSON.parse(JSON.stringify(source))
    newGeoJson.features = []

    for (let i = 0; i < selectedDistricts.length; i++) {
      newGeoJson.features.push(source.features[selectedDistricts[i]])
    }

    return newGeoJson;
  }, [])

  // districts to filter, 0-indexed
  const filteredSourceData = useMemo(() => districtFilter(districtIndexOnSelect, districtData), [])

  useEffect(() => {
    handleLayerOptions(props.location)

  }, [props.location])

  function convertIndexToId(selected) {
    return selected.map(elem => {
      elem = elem + 2;
      let elemString = `${elem}`
      return elemString
    })
  }

  // console.log(viewport.longitude)
  // console.log(viewport.latitude)
  // console.log(viewport.zoom)

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => { setViewport(viewport) }}
        getCursor={getCursor}
        interactiveLayerIds={convertIndexToId(districtIndexOnSelect)}
        onClick={e => {
          if (e.features[0] && e.features[0].layer.id) {
            props.onChange(e.features[0].layer.id)
          }
        }}
      >

        {filteredSourceData && filteredSourceData.features.map((district, index) => (
          <Source key={district.properties.ksh} type="geojson" data={filteredSourceData.features[index]}>
            <Layer {...layerStyles[index]} />
          </Source>

        ))}

      </ReactMapGL>
    </div>
  )
}