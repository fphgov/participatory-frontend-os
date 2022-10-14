import React, { createRef, useRef, useContext, useEffect, useState } from 'react'
import {
  useHistory,
} from "react-router-dom"
import axios from "../assets/axios"
import IdeasWrapper from "../common/IdeasWrapper"
import StoreContext from '../../StoreContext'
import Pagination from "../common/Pagination"
import SearchArea from '../common/SearchArea'
import generateRandomValue from '../assets/generateRandomValue'

export default function Projects() {
  const context = useContext(StoreContext)

  const queryRef = createRef()

  let history = useHistory()

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
    .get(process.env.REACT_APP_API_REQ_PROJECTS + window.location.search)
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
        title="Megvalósuló ötletek"
        tipp="Az ötleteket itt abban a formában láthatod, ahogy azokat az ötletgazdák beadták. A szűrők segítségével tudod szűkíteni a megjelenített listát."
        tipp2=""
        type="project"
        queryRef={queryRef}
        values={filterData}
        inputChange={handleChange}
        triggerFindAction={getProjects}
        clearQuery={clearQuery}
        error={error} />

      <div className="container">
        <div className="search-result mt-3">
          {count} találat
        </div>
      </div>

      <div className="container">
        <div className="row">
          {projects.map((project, i) => <IdeasWrapper handleClick={handleClick} key={i} idea={project} isBuilding={true} tagClick={filterByTag} />)}
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
