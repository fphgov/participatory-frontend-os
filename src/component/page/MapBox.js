import React, { useState, useEffect } from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl'
import districtData from '../geodata/districts.json'
import useLayers from '../geodata/layerStyles'

export default function MapBox(props) {

  const [layerStyles, handleLayerOptions] = useLayers();
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

  useEffect(() => {
    handleLayerOptions(props.location)

  }, [props.location])

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => { setViewport(viewport) }}
        getCursor={getCursor}
        interactiveLayerIds={['1', '4', '7', '8', '9', '10', '11', '12', '14', '15', '22', '24']}
        onClick={e => {
          if (e.features[0] && e.features[0].layer.id) {
            props.onChange(e.features[0].layer.id)
          } else {
            props.onChange('')
          }
        }}
      >

        {districtData && districtData.features.map((district, index) => (
          <Source key={district.properties.ksh} type="geojson" data={districtData.features[index]}>
            <Layer {...layerStyles[index]} />
          </Source>

        ))}

      </ReactMapGL>
    </div>
  )
}