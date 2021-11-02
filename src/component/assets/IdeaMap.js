import React, { useState, useEffect, useCallback } from 'react'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import Pin from './pin'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function IdeaMap({ geometry, onChange }) {
  const defaultLatitude = 47.484
  const defaultLongitude = window.innerWidth < 767 ? 19.135 : 19.053

  const [marker, setMarker] = useState({
    latitude: defaultLatitude,
    longitude: defaultLongitude
  })

  const [viewport, setViewport] = useState({
    latitude: defaultLatitude,
    longitude: defaultLongitude,
    width: 'inherit',
    height: '400px',
    zoom: window.innerWidth < 767 ? 9 : 9.38,
    minZoom: 8.5
  })

  const navControlStyle = {
    right: 10,
    top: 10
  }

  const onMarkerDragEnd = useCallback(event => {
    setMarker({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
      eventType: 'drag',
    })
  }, [])

  function getCursor({ isHovering, isDragging }) {
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default'
  }


  useEffect(() => {
    onChange(marker)
  }, [marker])

  useEffect(() => {
    if (geometry) {
      setMarker({
        latitude: geometry.get('y') - 0,
        longitude: geometry.get('x') - 0,
        eventType: 'search',
      })
    }
  }, [geometry])

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(viewport) => { setViewport(viewport) }}
        getCursor={getCursor}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        <NavigationControl style={navControlStyle} />

        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          draggable
          offsetTop={-20}
          offsetLeft={-10}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={40} />
        </Marker>
      </ReactMapGL>
    </div>
  )
}
