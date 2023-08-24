"use client"

import { useEffect, useState } from 'react'
import Error from '@/components/common/Error'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import { FilterResponse } from '@/lib/types'
import shallowEqual from '@/utilities/shallowEquals'

interface SearchAreaProps {
  title: string
  tipp: string
  tipp2: string
  type: "project"|"plan"|"idea"
  baseUrl: string
  searchParams: Record<string, string>
  filterParams: FilterResponse
  error: any
}

export default function SearchArea({ title, tipp, tipp2, baseUrl, filterParams, searchParams, type, error }: SearchAreaProps): JSX.Element|null {
  const campaigns = filterParams.campaign || []
  const themes = filterParams.theme || []
  const locations = filterParams.location || []
  const statuses = filterParams.status || []

  const defaultFilterData = {
    'theme': '',
    'location': '',
    'campaign': '',
    'status': '',
    'query': '',
    'page': '',
    'rand': generateRandomValue().toString(),
    'tag': '',
  }

  const originalFilterData = Object.assign({
    ...defaultFilterData
  }, Object.fromEntries((new URLSearchParams(searchParams)).entries()))

  const [filterData, setFilterData] = useState(originalFilterData)
  const [query, setQuery] = useState(originalFilterData.query)

  const getNewUrlSearchParams = () => {
    const filteredParams = Object.entries(filterData).filter(([key, value]) => value !== '')

    return new URLSearchParams(filteredParams)
  }

  const getUrl = () => {
    return baseUrl + '?' + getNewUrlSearchParams().toString()
  }

  const hasQueryFilter = () => {
    return (
      filterData.page !== '' ||
      filterData.query !== '' ||
      filterData.theme !== '' ||
      filterData.location !== '' ||
      filterData.campaign !== '' ||
      filterData.status !== '' ||
      filterData.tag !== ''
    )
  }

  const clearQuery = () => {
    const newFilterData = {
      ...defaultFilterData,
      rand: filterData.rand
    }

    setFilterData(newFilterData)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    setFilterData({
      ...filterData,
      query
    })
  }

  useEffect(() => {
    if (! shallowEqual(filterData, originalFilterData)) {
      window.location.href = getUrl()
    }
  }, [filterData, originalFilterData])

  return (
    <div className="search-area">
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-12">
              <h1>{title}</h1>

              <p>{tipp}</p>

              <p>{tipp2}</p>

              <div className="form-group">
                <label className="sr-only" htmlFor="search">Keresés</label>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    name="query"
                    value={query}
                    placeholder="Keresés"
                    id="search"
                    onChange={(e) => {
                    setQuery(e.target.value)
                    }}
                  />
                  <span className="input-group-btn">
                    <button id="btn-search" className="btn btn-search form-control" type="submit" title="Keresés">
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
                  setFilterData({
                    ...filterData,
                    campaign: e.target.value
                  })
                }} value={filterData.campaign}>
                  <option value="">Keresés időszak alapján</option>
                  <option disabled>----</option>
                  {campaigns && campaigns.map((campaign, i) => (
                    <option key={i} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="theme" onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    theme: e.target.value
                  })
                }} value={filterData.theme}>
                <option value="">Keresés kategória alapján</option>
                <option disabled>----</option>
                {themes && themes.map((theme, i) => (
                  <option key={i} value={theme.code}>{theme.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="location" onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    location: e.target.value
                  })
                }} value={filterData.location}>
                <option value="">Keresés kerület alapján</option>
                <option disabled>----</option>
                {locations && locations.map((location, i) => (
                  <option key={i} value={location.code}>{location.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="status" onChange={(e) => {
                  setFilterData({
                    ...filterData,
                    status: e.target.value
                  })
                }} value={filterData.status}>
                <option value="">Keresés állapot alapján</option>
                <option disabled>----</option>
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
                    Feltételek törlése
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
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
  )
}
