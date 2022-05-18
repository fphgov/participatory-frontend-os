import React, { useState, useEffect } from "react"
import axios from "../assets/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export default function SearchArea({ title, tipp, tipp2, values, queryRef, inputChange, triggerFindAction, clearQuery, error, type }) {
  const [ themes, setThemes ] = useState([])
  const [ locations, setLocations ] = useState([])
  const [ statuses, setStatuses ] = useState([])
  const [ campaigns, setCampaigns ] = useState([])

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      triggerFindAction(e)
    }
  }

  const hasQueryFilter = () => {
    const hasPageParam = /^\?page=\d+$/.test(document.location.search)

    return !!window.location.search && !hasPageParam && values.query !== '' || values.theme !== '' || values.location !== '' || values.campaign !== '' || values.status !== ''
  }

  const getFilterParams = (params) => {
    let reqLink = process.env.REACT_APP_API_REQ_FILTER_IDEAS

    if (type === 'project') {
      reqLink = process.env.REACT_APP_API_REQ_FILTER_PROJECTS
    } else if (type === 'plan') {
      reqLink = process.env.REACT_APP_API_REQ_FILTER_PLANS
    }

    const searchParams = typeof params === 'undefined' ? window.location.search : '?' + params

    axios
      .get(reqLink + searchParams)
      .then(response => {
        if (response.data) {
          setThemes(response.data.theme)
          setLocations(response.data.location)
          setStatuses(response.data.status)
          setCampaigns(response.data.campaign)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }
      })
  }

  useEffect(() => {
    getFilterParams()
  }, [])

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

              <p>{tipp}</p>

              <p>{tipp2}</p>

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
              <select name="campaign" onChange={(e) => {
                const search = new URLSearchParams(document.location.search)
                search.set("campaign", e.target.value)

                getFilterParams(search.toString())

                inputChange(e)
              }} value={values.campaign}>
                <option value="">Keresés időszak alapján</option>
                <option disabled="disabled">----</option>
                {campaigns && campaigns.map((campaign, i) => (
                  <option key={i} value={campaign.id}>{campaign.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="theme" onChange={inputChange} value={values.theme}>
                <option value="">Keresés kategória alapján</option>
                <option disabled="disabled">----</option>
                {themes && themes.map((theme, i) => (
                  <option key={i} value={theme.code}>{theme.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="location" onChange={inputChange} value={values.location}>
                <option value="">Keresés kerület alapján</option>
                <option disabled="disabled">----</option>
                {locations && locations.map((location, i) => (
                  <option key={i} value={location.code}>{location.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="status" onChange={inputChange} value={values.status}>
                <option value="">Keresés állapot alapján</option>
                <option disabled="disabled">----</option>
                {statuses && statuses.map((status, i) => (
                  <option key={i} value={status.code}>{status.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-9 col-md-8 col-xs-12"></div>
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
