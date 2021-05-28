import { useState, useMemo } from 'react';

const colors = ['#e6194B', '#3cb44b', '#469990', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#ffe119', '#dcbeff', '#f81511', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#770CAB', '#D2D5D0', '#81f119', '#D6B51A', '#769AA7']

const opacity = 0.4;

function useLayers() {

  const [layerOptions, setLayerOptions] = useState();

  const handleLayerOptions = layer => {
    setLayerOptions(() => layer)
  }

  const layerStyles = useMemo(() => [
    {
      id: '1',
      type: 'fill',
      paint: {
        'fill-color': '#19506E',
        'fill-outline-color': '#19506E',
        'fill-opacity': layerOptions == 1 ? 1 : opacity
      }
    },
    // {
    //   id: '2',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[0],
    //     'fill-outline-color': colors[0],
    //     'fill-opacity': layerOptions == 2 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '3',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[1],
    //     'fill-outline-color': colors[1],
    //     'fill-opacity': layerOptions == 3 ? 1 : opacity
    //   }
    // },
    {
      id: '4',
      type: 'fill',
      paint: {
        'fill-color': colors[2],
        'fill-outline-color': colors[2],
        'fill-opacity': layerOptions == 4 ? 1 : opacity
      }
    },
    // {
    //   id: '5',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[3],
    //     'fill-outline-color': colors[3],
    //     'fill-opacity': layerOptions == 5 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '6',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[4],
    //     'fill-outline-color': colors[4],
    //     'fill-opacity': layerOptions == 6 ? 1 : opacity
    //   }
    // },
    {
      id: '7',
      type: 'fill',
      paint: {
        'fill-color': colors[5],
        'fill-outline-color': colors[5],
        'fill-opacity': layerOptions == 7 ? 1 : opacity
      }
    },
    {
      id: '8',
      type: 'fill',
      paint: {
        'fill-color': colors[6],
        'fill-outline-color': colors[6],
        'fill-opacity': layerOptions == 8 ? 1 : opacity
      }
    },
    {
      id: '9',
      type: 'fill',
      paint: {
        'fill-color': colors[7],
        'fill-outline-color': colors[7],
        'fill-opacity': layerOptions == 9 ? 1 : opacity
      }
    },
    {
      id: '10',
      type: 'fill',
      paint: {
        'fill-color': colors[8],
        'fill-outline-color': colors[8],
        'fill-opacity': layerOptions == 10 ? 1 : opacity
      }
    },
    {
      id: '11',
      type: 'fill',
      paint: {
        'fill-color': colors[9],
        'fill-outline-color': colors[9],
        'fill-opacity': layerOptions == 11 ? 1 : opacity
      }
    },
    {
      id: '12',
      type: 'fill',
      paint: {
        'fill-color': colors[10],
        'fill-outline-color': colors[10],
        'fill-opacity': layerOptions == 12 ? 1 : opacity
      }
    },
    // {
    //   id: '13',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[11],
    //     'fill-outline-color': colors[11],
    //     'fill-opacity': layerOptions == 13 ? 1 : opacity
    //   }
    // },
    {
      id: '14',
      type: 'fill',
      paint: {
        'fill-color': colors[12],
        'fill-outline-color': colors[12],
        'fill-opacity': layerOptions == 14 ? 1 : opacity
      }
    },
    {
      id: '15',
      type: 'fill',
      paint: {
        'fill-color': colors[13],
        'fill-outline-color': colors[13],
        'fill-opacity': layerOptions == 15 ? 1 : opacity
      }
    },
    // {
    //   id: '16',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[14],
    //     'fill-outline-color': colors[14],
    //     'fill-opacity': layerOptions == 16 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '17',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[15],
    //     'fill-outline-color': colors[15],
    //     'fill-opacity': layerOptions == 17 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '18',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[16],
    //     'fill-outline-color': colors[16],
    //     'fill-opacity': layerOptions == 18 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '19',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[17],
    //     'fill-outline-color': colors[17],
    //     'fill-opacity': layerOptions == 19 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '20',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[18],
    //     'fill-outline-color': colors[18],
    //     'fill-opacity': layerOptions == 20 ? 1 : opacity
    //   }
    // },
    // {
    //   id: '21',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[19],
    //     'fill-outline-color': colors[19],
    //     'fill-opacity': layerOptions == 21 ? 1 : opacity
    //   }
    // },
    {
      id: '22',
      type: 'fill',
      paint: {
        'fill-color': colors[20],
        'fill-outline-color': colors[20],
        'fill-opacity': layerOptions == 22 ? 1 : opacity
      }
    },
    // {
    //   id: '23',
    //   type: 'fill',
    //   paint: {
    //     'fill-color': colors[21],
    //     'fill-outline-color': colors[21],
    //     'fill-opacity': layerOptions == 23 ? 1 : opacity
    //   }
    // },
    {
      id: '24',
      type: 'fill',
      paint: {
        'fill-color': colors[22],
        'fill-outline-color': colors[22],
        'fill-opacity': layerOptions == 14 ? 0 : layerOptions == 24 ? 1 : opacity
      }
    },
  ], [layerOptions])

  return [layerStyles, handleLayerOptions];
}

export default useLayers;