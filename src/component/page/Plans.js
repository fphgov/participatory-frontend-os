import React, { createRef, useRef, useContext, useEffect, useState } from 'react'
import {
  useHistory,
} from "react-router-dom"
import axios from "../assets/axios"
import ProjectsWrapper from "../common/ProjectsWrapper"
import StoreContext from '../../StoreContext'
import modernizr from 'modernizr'
import Pagination from "../common/Pagination"
import FindMap from "../common/FindMap"
import SearchArea from '../common/SearchArea'
import generateRandomValue from '../assets/generateRandomValue'

export default function Plans() {
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
    'campaign': '',
    'status': '',
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
      campaign: '',
      status: '',
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
    .get(process.env.REACT_APP_API_REQ_PLANS + window.location.search)
    .then(response => {
      if (response.data) {
        setProjects(response.data._embedded.projects)
        setLinks(response.data._links)
        setCount(response.data._total_items)
        setPageCount(response.data._page_count)

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

    setRefresh(true)
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

    setRefresh(true)
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
    search.set("campaign", filterData.campaign)
    search.set("status", filterData.status)
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
      setFilterData({ ...filterData, location: 'AREA' + locationId })

      refreshURLParams()
    }
  }

  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition")

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem("scrollPosition")
    }
  }

  const handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset)
  }

  useEffect(() => {
    document.body.classList.add('page-projects')

    const search = new URLSearchParams(document.location.search)

    setFilterData({
      query: search.get('query') ? search.get('query') : '',
      theme: search.get('theme') ? search.get('theme') : '',
      location: search.get('location') ? search.get('location') : '',
      campaign: search.get('campaign') ? search.get('campaign') : '',
      status: search.get('status') ? search.get('status') : '',
      rand: search.get('rand') && search.get('rand') != '' ? search.get('rand') : generateRandomValue(),
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

  return (
    <div className="projects">
      <SearchArea
        title="Feldolgozott ötletek"
        tipp="Itt láthatók az eredetileg beadott és szakmai jóváhagyást kapott ötletek átdolgozásával, újrafogalmazásával, adott esetben összevonásával létrehozott végleges ötletek."
        tipp2="Az eredeti ötleteket is meg tudod nyitni az adatlapon szereplő „Kapcsolódó ötletek” cím alatt, és azt is látod itt, ha több ötlet összevonásával alakult ki egy javaslat. Az itt látható feldolgozott ötletek kerülnek évente a közösségi költségvetési tanács elé, amely értékeli ezeket, majd javaslatot tesz arra, hogy melyik ötletek kerüljenek szavazólapra."
        type="plan"
        queryRef={queryRef}
        values={filterData}
        inputChange={handleChange}
        triggerFindAction={getProjects}
        clearQuery={clearQuery}
        error={error} />

      <div className="container">
        <FindMap isEnableMap={isEnableMap} location={filterData.location} crossLocationChange={crossLocationChange} toggleMap={toggleMap} />

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
            <Pagination links={links} onChange={pagination} size={pageCount} />
          </div>
        </div>
      </div>
    </div>
  )
}