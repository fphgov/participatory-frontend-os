// import axios from "axios"
// import Autosuggest from 'react-autosuggest'
// import debounce from 'lodash.debounce'
import React, { useRef } from 'react'
// import React, { useState, useRef } from 'react'
// import LoadingMini from '../../common/LoadingMini'
import FormPaginator from './elements/FormPaginator'
import {
  Link,
} from "react-router-dom"

export default function IdeaBasic({ nextStep, prevStep, handleChange, values }) {
  const category4 = useRef(null)
  const category5 = useRef(null)
  const category6 = useRef(null)

  // const [ suggestions, setSuggestions ] = useState([])
  // const [ quickSeach, setQuickSeach ] = useState('')
  // const [ load, setLoad ] = useState(false)

  // const getSuggestionValue = (suggestion) => {
  //   setSuggestions(null)

  //   changeRaw('location', suggestion)

  //   return suggestion ? suggestion.title : null
  // }

  // const renderSuggestion = (suggestion) => <div>{suggestion.title}</div>

  // const inputProps = {
  //   placeholder: 'Írja be a közterület nevét, ahol patkányt észlelt',
  //   value: quickSeach,
  //   disabled: false,
  //   onChange: (_event, { newValue }) => {
  //     setQuickSeach(newValue)
  //   },
  // }

  // const getAddress = (address) => {
  //   const data = {
  //     address,
  //   }

  //   setLoad(true)
  //   changeRaw('location', null)

  //   const searchData = new URLSearchParams(data)

  //   axios
  //   .post(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_GEOCODING, searchData)
  //   .then((response) => {
  //     if (response && response.status === 200 && response.data.data.features) {
  //       const suggestions = response.data.data.features.map((f) => {
  //         const nfn = f.attributes.nfn ? f.attributes.nfn : ''
  //         const php = f.attributes.php ? f.attributes.php : ''
  //         const mea = f.attributes.mea ? f.attributes.mea : ''

  //         const name = `${nfn} kerület, ${php} ${mea}`

  //         const geometry = new URLSearchParams(f.geometry)

  //           return {
  //             objectid: f.attributes.objectid,
  //             title: typeof name !== 'undefined' ? name.trim() : null,
  //             nfn,
  //             php,
  //             mea,
  //             geometry,
  //           }
  //         })

  //         setSuggestions(suggestions)
  //       } else {
  //         setSuggestions([])
  //       }
  //     })
  //     .catch((error) => {
  //       setSuggestions([])

  //       if (error.response && error.response.data.errors) {
  //         errChange(error.response.data.errors)
  //       }
  //     })
  //     .finally(() => {
  //       setLoad(false)
  //     })
  // }

  // const onSuggestionsFetchRequested = useRef(
  //   debounce(({ value }) => {
  //     getAddress(value)
  //   }, 400)
  // )

  // const onSuggestionsClearRequested = () => {
  //   setSuggestions([])
  // }

  return (
    <div>
      <h3>Ötlet helye és kategóriája</h3>

      <div className="form-group location">
        <p>Válassza ki az ötlet <b>témáját</b> *</p>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="input-wrapper">
              <label htmlFor="location">Helyszín</label>
              <div className="tipp">Lorem ipsum dolor sit amet consectetur adipisicing elit!</div>

              {/* <div>
                <div className="mb-2 mt-2">
                  <label htmlFor="quick_search">Gyorskereső</label>
                </div>

                <div
                  className={`autosuggest-wrapper ${values.location && values.location.geometry ? 'autosuggest-success' : ''
                    }`}
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
              </div> */}

              <input type="text" autoCorrect="off" autoCapitalize="none" name="location" id="location" value={values.location} onChange={handleChange} />
            </div>

            <div className="input-wrapper">
              <h4>Kategória *</h4>
              <div className="tipp">Válasszon egyet az alábbi kategóriák közül</div>

              <div className="radio-inline-block">
                <div className={`radio-inline ${values.theme === "4" ? "active" : ""}`} onClick={() => { if (category4 && category4.current) category4.current.click() }}>
                  <div className="radio-inline-symbol"></div>
                  <div className="radio-inline-content">
                    <input
                      type="radio"
                      id="theme_CARE"
                      name="theme"
                      value="4"
                      checked={values.theme === "4"}
                      ref={category4}
                      onChange={handleChange} />
                    <label htmlFor="theme_CARE">Zöld Budapest</label>

                    <p className="tipp">Témakörben olyan ötleteket várunk, melyek javaslatot tesznek például a város akadálymentesítését szolgáló-, a hajléktalan emberek életét megkönnyítő fejlesztésekre, vagy olyan találkozási pontokra, játszó-, fitnesz parkokra, amelyeket minél több korosztály szívesen használ. Budapest közösségeinek fejlődését célzó ötleteket várunk a <Link to="/oldal/eselyteremto-budapest" target="_blank">felsorolt alapelvek</Link> szerint.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "5" ? "active" : ""}`} onClick={() => { if (category5 && category5.current) category5.current.click() }}>
                  <div className="radio-inline-symbol"></div>
                  <div className="radio-inline-content">
                    <input
                      type="radio"
                      id="theme_ENVIRONMENT"
                      name="theme"
                      value="5"
                      checked={values.theme === "5"}
                      ref={category5}
                      onChange={handleChange} />
                    <label htmlFor="theme_ENVIRONMENT">Esélyteremtő Budapest</label>

                    <p className="tipp">„Zöld” ötleteket várunk a legtágabb értelemben. Közterületi zöldítések kihasználatlan, területeken, a várost zöldebb irányba befolyásoló ötletek, melyek elősegítik a sikeres alkalmazkodást az éghajlatváltozáshoz. (pl. újrahasznosítás, gyalogos-, kerékpáros közlekedés). Az ötleteknek a <Link to="/oldal/eselyteremto-budapest" target="_blank">felsorolt alapelveknek</Link> kell megfelelniük.</p>
                  </div>
                </div>

                <div className={`radio-inline ${values.theme === "6" ? "active" : ""}`} onClick={() => { if (category6 && category6.current) category6.current.click() }}>
                  <div className="radio-inline-symbol"></div>
                  <div className="radio-inline-content">
                    <input
                      type="radio"
                      id="theme_WHOLE"
                      name="theme"
                      value="6"
                      checked={values.theme === "6"}
                      ref={category6}
                      onChange={handleChange} />
                    <label htmlFor="theme_WHOLE">Egész Budapest</label>

                    <p className="tipp">Olyan projektötleteket várunk, melyek akár egész Budapest léptékűek, és valami újat, minőségi változást hoznak a budapestiek életébe. Az ötleteknek a <Link to="/oldal/egesz-budapest" target="_blank">felsorolt alapelveknek</Link> kell megfelelniük, lehet ez a téma „Zöld” vagy „Gondoskodó” is, épp csak nagyobb területet, vagy több városlakót érintsen.</p>
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
