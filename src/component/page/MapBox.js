import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactMapGL, { Marker, Layer, Source } from 'react-map-gl'
import districtData from '../geodata/districts.json'
import useLayers from '../geodata/layerStyles'

const districtIndexOnSelect = [1, 3, 4]

export default function MapBox(props) {

  const [layerStyles, layerOptions, handleLayerOptions] = useLayers();
  const [viewport, setViewport] = useState({
    latitude: 47.485,
    longitude: 19.089,
    width: 'inherit',
    height: '400px',
    zoom: 9.34
  });

  function getCursor({ isHovering }) {
    return isHovering ? 'pointer' : 'default';
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

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        // onViewportChange={(viewport) => { setViewport(viewport) }}
        getCursor={getCursor}
        interactiveLayerIds={convertIndexToId(districtIndexOnSelect)}
        onClick={e => {
          if (e.features[0] && e.features[0].layer.id) {
            props.onChange(e.features[0].layer.id)
          }
        }}
      >

        {filteredSourceData && filteredSourceData.features.map((district, index) => (
          <Source key={district.properties.osm_id} type="geojson" data={filteredSourceData.features[index]}>
            <Layer {...layerStyles[index]} />
          </Source>

        ))}

      </ReactMapGL>
    </div>
  )
}