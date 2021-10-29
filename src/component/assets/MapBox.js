import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { Layer, Source, NavigationControl } from 'react-map-gl'
import districtData from '../geodata/districts.json'
import useLayers from '../geodata/layerStyles'
import 'mapbox-gl/dist/mapbox-gl.css'

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
  const [hoverInfo, setHoverInfo] = useState(null);

  const navControlStyle = {
    right: 10,
    top: 10
  };

  const onHover = useCallback(e => {
    if (e.features[0] && e.features[0].properties.name) {

      const { srcEvent: { offsetX, offsetY } } = e

      setHoverInfo({
        name: e.features[0].properties.name,
        x: offsetX,
        y: offsetY
      })
    } else {
      setHoverInfo('')
    }
  }, []);

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
        onClick={props.onClick}
        onHover={onHover}
      >
        <NavigationControl style={navControlStyle} />

        {districtData && districtData.features.map((district, index) => (
          <Source key={district.properties.ksh} type="geojson" data={districtData.features[index]}>
            <Layer {...layerStyles[index]} />
          </Source>
        ))}
        {hoverInfo && (
          <div className="tooltip" style={{ left: hoverInfo.x, top: hoverInfo.y }}>
            <div>{hoverInfo.name}</div>
          </div>
        )}

      </ReactMapGL>
    </div>
  )
}
