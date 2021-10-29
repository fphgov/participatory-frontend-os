import React, { useContext, lazy, Suspense } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarked } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'

const MapBox = lazy(() => import('../assets/MapBox'));

export default function FindMap({ isEnableMap, location, crossLocationChange, toggleMap }) {
  const context = useContext(StoreContext)

  return (
    <>
      {isEnableMap ?
        <div className="d-flex justify-content-end mb-3">
          <button id="btn-map-toggle" className={`map-toggle ${context.get('map') ? 'map-toggle-active' : ''}`} type="submit" title={context.get('map') ? 'Térkép elrejtése' : 'Térkép megjelenítése'} onClick={toggleMap} role="button" aria-pressed={context.get('map')}>
            <div className="map-icon">
              <FontAwesomeIcon icon={faMapMarked} />
            </div>
            <div className="map-text">Térkép</div>
          </button>
        </div> : null
      }

      {context.get('map') && isEnableMap ?
        <Suspense fallback={<div>Betöltés...</div>}>
          <MapBox location={location} onClick={e => crossLocationChange(e)} />
        </Suspense> : null
      }
    </>
  )
}
