import axios from "axios"
import Autosuggest from 'react-autosuggest'
import debounce from 'lodash.debounce'
import React, { useState, useRef } from 'react'
import LoadingMini from '../../common/LoadingMini'
import FormPaginator from './elements/FormPaginator'
import {
  Link,
} from "react-router-dom"

export default function IdeaLocation({ nextStep, prevStep, handleChange, changeRaw, changeInputAddress, values }) {
  const category4 = useRef(null)
  const category5 = useRef(null)
  const category6 = useRef(null)

  const [ suggestions, setSuggestions ] = useState([])
  const [ quickSeach, setQuickSeach ] = useState('')
  const [ load, setLoad ] = useState(false)

  const getSuggestionValue = (suggestion) => {
    setSuggestions(null)

    changeRaw('location', suggestion)

    return suggestion ? suggestion.title : ''
  }

  const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>

  const inputProps = {
    placeholder: 'Írd be a közterület nevét, ha konkrét helyszínhez köthető',
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
    changeRaw('location', null)

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
    <div>
      <h3>Ötlet helye és kategóriája</h3>

      <div className="form-group location">
        <p>Válaszd ki az ötlet <b>témáját</b> *</p>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="input-wrapper">
              <label htmlFor="location">Helyszín</label>
              <div className="tipp">Ha az ötleted egy konkrét helyszínre szól, vagy szeretnéd, hogy egy adott városrészben valósuljon meg, írd le a helyszínt minél pontosabban! Kérjük, vedd figyelembe, hogy különböző okok miatt nem biztos, hogy ötletedet a Főváros pontosan az általad javasolt helyszínen meg tudja valósítani.</div>

              <div
                className={`autosuggest-wrapper ${values.location && values.location.geometry ? 'autosuggest-success' : ''}`}
              >
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
                    ...(values.error && values.error.location ? { 'aria-invalid': 'true' } : null)
                  }}
                />

                {load ? <LoadingMini /> : null}
              </div>

              <div>{values.error && values.error.location && iterateErrors(values.error.location, 'suggestion-error')}</div>
            </div>

            <div className="input-wrapper">
              <h4>Kategória *</h4>
              <div className="tipp">A közösségi költségvetés, az Otthon Budapesten programmal összhangban három kategóriában kínál lehetőséget az ötletek beadására. Kérjük, válassz, hogy a te ötleted melyik kategóriába tartozik az alábbiak közül!</div>

              <div className="radio-inline-block">
                <div className={`radio-inline ${values.theme === "4" ? "active" : ""}`} onClick={() => { if (category4 && category4.current) category4.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_GREEN"
                      name="theme"
                      value="4"
                      checked={values.theme === "4"}
                      ref={category4}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_GREEN">Zöld Budapest</label>

                    <p className="tipp">A Zöld Budapest azt jelenti, hogy a főváros szerepet vállal abban, hogy városunk zöldebbé váljon és segíti a budapestieket, hogy környezettudatosan éljenek. Közös célunk, hogy a főváros felkészüljön a 21. század egyik legnagyobb kihívására, a klímaváltozásra.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "5" ? "active" : ""}`} onClick={() => { if (category5 && category5.current) category5.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_CARE"
                      name="theme"
                      value="5"
                      checked={values.theme === "5"}
                      ref={category5}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_CARE">Esélyteremtő Budapest</label>

                    <p className="tipp">Az Esélyteremtő Budapest kategória célja, hogy az önkormányzat csökkenteni tudja a társadalmi különbségeket, segítse a hátrányos helyzetű közösségek életét.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "6" ? "active" : ""}`} onClick={() => { if (category6 && category6.current) category6.current.click() }}>
                  <div className="radio-inline-symbol">
                    <div className="radio-inline-hide"></div>
                    <input
                      type="radio"
                      id="theme_WHOLE"
                      name="theme"
                      value="6"
                      checked={values.theme === "6"}
                      ref={category6}
                      onChange={handleChange} />
                  </div>
                  <div className="radio-inline-content">
                    <label htmlFor="theme_WHOLE">Nyitott Budapest</label>

                    <p className="tipp">A Nyitott Budapest kategória célja az együttműködés fejlesztése a város közösségeiben, illetve a budapestiek és a főváros, valamint annak intézményei között. Ennek megvalósítása érdekében keresünk új, kísérleti megoldásokat, közösségépítő ötleteket és mindenki által könnyen használható és elérhető digitális fejlesztéseket. Ezzel a főváros célja, hogy gyorsabb, okosabb és praktikusabb megoldásokat nyújtson a budapestieknek.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FormPaginator prevStep={prevStep} nextStep={nextStep} />
      </div>
    </div>
  )
}
