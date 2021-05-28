import { useState, useMemo } from 'react';

const colors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#770CAB', '#D2D5D0', '#F1195E', '#D6B51A', '#769AA7']

const opacity = 0.4;

function useLayers() {

  const [layerOptions, setLayerOptions] = useState();

  const handleLayerOptions = layer => {
    setLayerOptions(() => layer)
  }

  const layerStyles = useMemo(() => [
    // {
    //   id: '2',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[0],
    //     'fill-outline-color': colors[0],
    //     'fill-opacity': layerOptions == 2 ? 1 : opacity
    //   }
    // },
    {
      id: '3',
      type: 'fill',
      paint: {
        'fill-color': colors[1],
        'fill-outline-color': colors[1],
        'fill-opacity': layerOptions == 3 ? 1 : opacity
      }
    },
    // {
    //   id: '4',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[2],
    //     'fill-outline-color': colors[2],
    //     'fill-opacity': layerOptions == 4 ? 1 : opacity
    //   }
    // },
    {
      id: '5',
      type: 'fill',
      paint: {
        'fill-color': colors[3],
        'fill-outline-color': colors[3],
        'fill-opacity': layerOptions == 5 ? 1 : opacity
      }
    },
    {
      id: '6',
      type: 'fill',
      paint: {
        'fill-color': colors[4],
        'fill-outline-color': colors[4],
        'fill-opacity': layerOptions == 6 ? 1 : opacity
      }
    },
  ], [layerOptions])

  return [layerStyles, layerOptions, handleLayerOptions];
}

export default useLayers;