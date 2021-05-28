import React, { useRef, useEffect, useState } from 'react';
import "./Map.css";

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import districtData from '../data/districts.json'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(19.04);
  const [lat, setLat] = useState(47.49);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  function doit() {
    map.current.addSource('districts', {
      'type': 'geojson',
      'data': districtData
    });
    map.current.addLayer({
      'id': 'district-layer',
      'type': 'fill',
      'source': 'districts',
      'paint': {
        'fill-color': 'rgba(200, 100, 240, 0.4)',
        'fill-outline-color': 'rgba(200, 100, 240, 1)'
      }
    });
  }

  return (

    <div>
      <button onClick={doit}>
        Do it
      </button>
      <div ref={mapContainer} className="map-container" onClick={(e) => {
        console.log(e)
      }} />
    </div>
  )
}