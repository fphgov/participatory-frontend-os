import React, { createRef, useRef, useContext, useEffect, useState, lazy, Suspense } from 'react'
import {
  useHistory,
} from "react-router-dom"
import axios from "../assets/axios"
import ProjectsWrapper from "../common/ProjectsWrapper"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faAngleDoubleLeft, faAngleDoubleRight, faMapMarked } from "@fortawesome/free-solid-svg-icons"
import modernizr from 'modernizr'

const MapBox = lazy(() => import('../assets/MapBox'));

export default function Projects() {
  const context = useContext(StoreContext)

  const queryRef = createRef()

  let history = useHistory()

  const isEnableMap = modernizr.arrow && modernizr.webgl

  const [ count, setCount ] = useState(0)
  const [ pageCount, setPageCount ] = useState(0)
  const [ links, setLinks ] = useState([])
  const [ projects, setProjects ] = useState([])
  const [ error, setError ] = useState('')
  const [ refresh, setRefresh ] = useState(false)
  const [ filterData, setFilterData ] = useState({
    'theme': '',
    'location': '',
    'query': '',
    'page': '',
    'rand': '',
    'tag': '',
  })

  const usePrevious = (value) => {
    const ref = useRef()

    useEffect(() => {
      ref.current = value;
    })

    return ref.current;
  }

  const useHasChanged = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
  }

  const hasQueryField = useHasChanged(filterData.query)

  const clearState = () => {
    setProjects([])
    setLinks(null)
    setCount(0)
    setPageCount(0)

    setFilterData({
      theme: '',
      query: '',
      location: '',
      page: '',
      rand: filterData.rand,
      tag: '',
    })
  }

  const getProjects = () => {
    context.set('loading', true, () => {
      getProjectData()
    })
  }

  const getProjectData = () => {
    axios
    .get(process.env.REACT_APP_API_REQ_PROJECTS + window.location.search)
    .then(response => {
      if (response.data) {
        setProjects(response.data._embedded.projects)
        setLinks(response.data._links)
        setCount(response.data._total_items)
        setPageCount(response.data.pageCount)

        handleScrollPosition()
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        clearState()

        setError(error.response.data.message)
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  const filterByTag = (tag) => {
    const search = new URLSearchParams(document.location.search)

    search.delete("theme")
    search.delete("location")
    search.delete("query")
    search.delete("page")
    search.set("tag", tag.id)

    history.push({ search: search.toString() })
  }

  const clearQuery = () => {
    const search = new URLSearchParams()

    search.set("rand", filterData.rand)

    clearState()
    setRefresh(true)

    history.push({ href: window.location.href.split("?")[0] })
    history.push({ search: search.toString() })
  }

  const pagination = (page) => {
    const search = new URLSearchParams(document.location.search)

    search.set("page", page)

    history.push({ search: search.toString() })
  }

  const refreshURLParams = (e) => {
    if (e) {
      e.preventDefault()
    }

    const search = new URLSearchParams(document.location.search)

    search.delete("page")
    search.set("query", filterData.query)
    search.set("theme", filterData.theme)
    search.set("location", filterData.location)
    search.set("rand", filterData.rand)

    history.push({ search: search.toString() })
  }

  const handleChange = ({ target: { name, value } }) => {
    setFilterData({ ...filterData, [name]: value })

    queryRef.current.focus()
  }

  const toggleMap = (e) => {
    e.preventDefault()

    const map = !context.get('map')

    localStorage.setItem('map', map)
    context.set('map', map)
  }

  const crossLocationChange = (e) => {
    const locationId = e.features[0] && e.features[0].layer.id ? e.features[0].layer.id : ''

    if (filterData.location !== locationId) {
      setFilterData({ location: locationId })

      refreshURLParams()
    }
  }

  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      getProjects()
    }
  }

  const hasQueryFilter = () => {
    const hasPageParam = /^\?page=\d+$/.test(document.location.search)

    return !!window.location.search && !hasPageParam && filterData.query !== '' || filterData.theme !== '' || filterData.location !== ''
  }

  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition")

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem("scrollPosition")
    }
  }

  const handleClick = (e) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset)
  }

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  useEffect(() => {
    document.body.classList.add('page-projects')

    const search = new URLSearchParams(document.location.search)

    const rand = Math.floor(Math.random() * 100000)

    setFilterData({
      query: search.get('query') ? search.get('query') : '',
      theme: search.get('theme') ? search.get('theme') : '',
      location: search.get('location') ? search.get('location') : '',
      rand: search.get('rand') && search.get('rand') != '' ? search.get('rand') : rand,
    })

    return () => {
      document.body.classList.remove('page-projects')

      clearState()
    }
  }, [])

  useEffect(() => {
    refreshURLParams()

    if (! hasQueryField) {
      setRefresh(true)
    }
  }, [filterData])

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
      getProjects()
    }
  }, [refresh])

  const pageRegex = new RegExp("page=(\\d+)")

  const paginationShow = pageCount > 1
  const selfPageNum = (links && links.self && pageRegex.test(links.self.href)) ? links.self.href.match(pageRegex)[1] : false
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? links.prev.href.match(pageRegex)[1] : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? links.next.href.match(pageRegex)[1] : false
  const firstPageNum = (links && links.first && pageRegex.test(links.first.href)) ? links.first.href.match(pageRegex)[1] : false
  const lastPageNum = (links && links.last && pageRegex.test(links.last.href)) ? links.last.href.match(pageRegex)[1] : false

  return (
    <div className="projects">
      <div className="search-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Mely ötleteket látná szívesen megvalósulni?</h1>

              <div className="form-group">
                <label className="sr-only" htmlFor="search">Keresés</label>
                <div className="input-group">
                  <input className="form-control" type="text" name="query" value={filterData.query} placeholder="Keresés" id="search" ref={queryRef} onKeyUp={onKeyUp} onChange={handleChange} />
                  <span className="input-group-btn">
                    <button id="btn-search" className="btn btn-search form-control" type="submit" title="Keresés" onClick={getProjects}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="theme" onChange={handleChange} value={filterData.theme}>
                <option value="">Keresés kategória alapján</option>
                <option disabled="disabled">----</option>
                <option value="1">Zöld Budapest</option>
                <option value="2">Gondoskodó Budapest</option>
                <option value="3">Egész Budapest</option>
              </select>
            </div>

            <div className="col-lg-3 col-md-4 col-xs-12">
              <select name="location" onChange={handleChange} value={filterData.location}>
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

            <div className="col-lg-6 col-md-4 col-xs-12">
              <div className="filter-wrapper">
                {hasQueryFilter() && (
                  <div className="filter-clear bg-transition" onClick={clearQuery}>
                    Szűrő feltételek törlése
                  </div>
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

      <div className="container">
        {isEnableMap ?
          <div className="d-flex justify-content-end mb-3">
            <button id="btn-map-toggle" className={`map-toggle ${context.get('map') ? 'map-toggle-active' : ''}`} type="submit" title={context.get('map') ? 'Térkép kikapcsolása' : 'Térkép bekapcsolása'} onClick={toggleMap} role="button" aria-pressed={context.get('map')}>
              <div className="map-icon">
                <FontAwesomeIcon icon={faMapMarked} />
              </div>
              <div className="map-text">Térkép</div>
            </button>
          </div> : null
        }

        {context.get('map') && isEnableMap ?
          <Suspense fallback={<div>Betöltés...</div>}>
            <MapBox location={filterData.location} onClick={e => crossLocationChange(e)} />
          </Suspense> : null
        }

        <div className="search-result mt-3">
          {count} találat
        </div>
      </div>

      <div className="container">
        <div className="row">
          {projects.map((project, i) => <ProjectsWrapper handleClick={handleClick} key={i} project={project} tagClick={filterByTag} />)}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {paginationShow && (
              <div className="pagination">
                {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
                  <div onClick={() => { pagination(firstPageNum) }}><FontAwesomeIcon icon={faAngleDoubleLeft} /></div>
                )}
                {prevPageNum && (
                  <div onClick={() => { pagination(prevPageNum) }}>{prevPageNum}</div>
                )}
                {selfPageNum && (
                  <div className="active">{selfPageNum}</div>
                )}
                {nextPageNum && (
                  <div onClick={() => { pagination(nextPageNum) }}>{nextPageNum}</div>
                )}
                {(lastPageNum && nextPageNum) && (lastPageNum !== nextPageNum) && (
                  <div onClick={() => { pagination(lastPageNum) }}><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
