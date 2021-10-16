import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function SearchArea({ title, values, queryRef, inputChange, triggerFindAction, clearQuery, error }) {
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      triggerFindAction()
    }
  }

  const hasQueryFilter = () => {
    const hasPageParam = /^\?page=\d+$/.test(document.location.search)

    return !!window.location.search && !hasPageParam && values.query !== '' || values.theme !== '' || values.location !== '' || values.campaign !== ''
  }

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  return (
    <>
      <div className="search-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{title}</h1>

              <div className="form-group">
                <label className="sr-only" htmlFor="search">Keresés</label>
                <div className="input-group">
                  <input className="form-control" type="text" name="query" value={values.query} placeholder="Keresés" id="search" ref={queryRef} onKeyUp={onKeyUp} onChange={inputChange} />
                  <span className="input-group-btn">
                    <button id="btn-search" className="btn btn-search form-control" type="submit" title="Keresés" onClick={triggerFindAction}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="theme" onChange={inputChange} value={values.theme}>
                <option value="">Keresés kategória alapján</option>
                <option disabled="disabled">----</option>
                <option value="GREEN">Zöld Budapest</option>
                <option value="CARE">Esélyteremtő Budapest</option>
                <option value="WHOLE">Egész Budapest</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="location" onChange={inputChange} value={values.location}>
                <option value="">Keresés kerület alapján</option>
                <option disabled="disabled">----</option>
                <option value="1">Nem köthető konkrét helyszínhez (32)</option>
                <option value="2">I. kerület (0)</option>
                <option value="3">II. kerület (0)</option>
                <option value="4">III. kerület (5)</option>
                <option value="5">IV. kerület (0)</option>
                <option value="6">V. kerület (0)</option>
                <option value="7">VI. kerület (1)</option>
                <option value="8">VII. kerület (3)</option>
                <option value="9">VIII. kerület (4)</option>
                <option value="10">IX. kerület (2)</option>
                <option value="11">X. kerület (2)</option>
                <option value="12">XI. kerület (2)</option>
                <option value="13">XII. kerület (0)</option>
                <option value="14">XIII. kerület (1)</option>
                <option value="15">XIV. kerület (4)</option>
                <option value="16">XV. kerület (0)</option>
                <option value="17">XVI. kerület (0)</option>
                <option value="18">XVII. kerület (0)</option>
                <option value="19">XVIII. kerület (0)</option>
                <option value="20">XIX. kerület (0)</option>
                <option value="21">XX. kerület (0)</option>
                <option value="22">XXI. kerület (1)</option>
                <option value="23">XXII. kerület (0)</option>
                <option value="24">Margitsziget (1)</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="campaign" onChange={inputChange} value={values.campaign}>
                <option value="">Keresés időszak alapján</option>
                <option disabled="disabled">----</option>
                <option value="1">2020/2021</option>
                <option value="2">2021/2022</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <div className="filter-wrapper">
                {hasQueryFilter() && (
                  <button className="filter-clear bg-transition" onClick={clearQuery}>
                    Szűrő feltételek törlése
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {error ?
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Error message={error} />
              </div>
            </div>
          </div> : null
        }
      </div>
    </>
  )
}
