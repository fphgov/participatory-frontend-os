import axios from 'axios'
import Autosuggest from 'react-autosuggest'
import React, { useState, useRef, lazy, Suspense } from "react"
import debounce from 'lodash.debounce'
import modernizr from 'modernizr'
import LoadingMini from '../../../common/LoadingMini'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const IdeaMap = lazy(() => import('../../../assets/IdeaMap'))

export default function QuickSearch({ changeRaw, location, error }) {
  const [ suggestions, setSuggestions ] = useState([])
  const [ quickSeach, setQuickSeach ] = useState('')
  const [ load, setLoad ] = useState(false)
  const [ geometry, setGeometry ] = useState(null)

  const isEnableMap = modernizr.arrow && modernizr.webgl
  const hasLocation = location && location.nfn || location && location.geometry

  const getSuggestionValue = (suggestion) => {
    setSuggestions(null)

    setGeometry(suggestion.geometry)
    changeRaw('location', suggestion)

    return suggestion ? suggestion.title : ''
  }

  const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>

  const inputProps = {
    placeholder: 'Írd be és válaszd ki a közterület nevét, ha konkrét helyszínhez köthető az ötleted',
    value: quickSeach,
    disabled: false,
    onChange: (_event, { newValue }) => {
      setQuickSeach(newValue)
    },
  }

  const getAddress = (address) => {
    const data = {
      address,
    }

    setLoad(true)

    const searchData = new URLSearchParams(data)

    axios
      .post(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_GEOCODING, searchData)
      .then((response) => {
        if (response && response.status === 200 && response.data.data.features) {
          const suggestions = response.data.data.features.map((f) => {
            const myf = f.attributes.myf ? f.attributes.myf : ''
            const nfn = f.attributes.nfn ? f.attributes.nfn : ''
            const php = f.attributes.php ? f.attributes.php : ''
            const mea = f.attributes.mea ? f.attributes.mea : ''

            const name = `${nfn} kerület, ${php} ${mea}`

            const geometry = new URLSearchParams(f.geometry)

            return {
              objectid: f.attributes.objectid,
              title: typeof name !== 'undefined' ? name.trim() : null,
              myf,
              nfn,
              php,
              mea,
              geometry,
            }
          })

          setSuggestions(suggestions)
        } else {
          setSuggestions([])
        }
      })
      .catch((error) => {
        setSuggestions([])

        if (error.response && error.response.data.errors) {
          errChange(error.response.data.errors)
        }
      })
      .finally(() => {
        setLoad(false)
      })
  }

  const onSuggestionsFetchRequested = useRef(
    debounce(({ value }) => {
      getAddress(value)
    }, 400)
  )

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  return (
    <div className={`autosuggest-wrapper ${location && location.geometry ? 'autosuggest-success' : ''}`}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={(t) => {
          onSuggestionsFetchRequested.current(t);
        }}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          ...inputProps,
          ...(error ? { 'aria-invalid': 'true' } : null)
        }}
      />

      {load ? <LoadingMini /> : null}

      <div className="location-information-wrapper">
        <span><b>Helyszín információ:</b> {location && location.nfn ? 'Kiválasztott helyszín' : (location && location.geometry) ? 'Egyéni koordináta' : 'Nincs megadott helyszín'}</span>

        {hasLocation ? <div className="location-delete small">
          <button className="btn danger" onClick={() => {
            setGeometry(null)
            changeRaw('location', '')
            setQuickSeach('')
          }}><FontAwesomeIcon icon={faTrash} rel="noopener noreferrer" /> Helyszín törlése</button>
        </div> : ''}
      </div>

      {isEnableMap ?
        <Suspense fallback={<div>Térkép betöltése...</div>}>
          <IdeaMap geometry={geometry} onChange={(marker) => {
            if (marker && marker.eventType === "drag") {
              changeRaw('location', { 'attributes': null, 'geometry': new URLSearchParams({ x: marker.longitude, y: marker.latitude }).toString() })
              setQuickSeach('')
            }
          }} />
        </Suspense> : null
      }
    </div>
  )
}
