import React, { useContext, useEffect, useState } from "react"
import axios from "../assets/axios"
import {
  Link,
  useParams,
  useHistory,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default function Statistics() {
  const context = useContext(StoreContext)

  let history = useHistory()
  let { id } = useParams()

  const [error, setError] = useState('')
  const [tabs, setTabs] = useState([])
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [currentTabIndex, setCurrentTabIndex] = useState(4)

  const updateProjects = () => {
    const filteredProjects = currentTabIndex !== 0 ? projects.filter((t) => t.campaign_theme.id === currentTabIndex) : projects

    setFilteredProjects(filteredProjects)
  }

  const updateTabs = () => {
    const tabs = projects.map((t) => {
      return {
        id: t.campaign_theme.id,
        name: t.campaign_theme.name,
      }
    }).filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i).sort((a, b) => a.id - b.id)

    setTabs(tabs)
  }

  const handleClickTab = (e) => {
    history.push(`/statisztika/${e.currentTarget.tabIndex}`)

    setCurrentTabIndex(e.currentTarget.tabIndex)
  }

  const getStatisticsData = () => {
    axios
    .get(process.env.REACT_APP_API_REQ_PROFILE_STATISTICS)
    .then(response => {
      if (response.data) {
        setProjects(response.data._embedded.projects)
        setFilteredProjects(response.data._embedded.projects)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setProjects([])
        setFilteredProjects([])
        setError(error.response.data.message)
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-statistics')

    const parsedId = parseInt(id)

    if (parsedId) {
      setCurrentTabIndex(parsedId)
    }

    context.set('loading', true, () => {
      getStatisticsData()
    })

    return () => {
      document.body.classList.remove('page-statistics')
    }
  }, [])

  useEffect(() => {
    updateProjects()
  }, [currentTabIndex])

  useEffect(() => {
    updateProjects()
    updateTabs()
  }, [projects])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const ProjectsWrapper = (props) => {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div className="stat-wrapper">
          <div className="stat-inner">
            <div className={`stat-content${props.project.win ? ' stat-content-win' : ''}`}>
              <Link to={`/projektek/${props.project.id}`}>
                <div className="stat-content-inner">
                  <div className="stat-id">{props.place + 1}.</div>
                  <div className="stat-title">{props.project.title}</div>
                </div>

                <div className="stat-content-inner">
                  <div className="stat-id" style={{ visibility: 'hidden' }}>{props.place + 1}.</div>
                  <div className="stat-count"><span>{props.project.voted} szavazat</span></div>
                  {props.project.win ? <div className="stat-win">(nyert)</div> : null}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="statistics">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Ötletekre leadott szavazatok</h1>

            {error ? <Error message={error} /> : null}

            <div className="tab-wrapper">
              <ul className="tab">
                {tabs.map((tab) => (
                  <li key={tab.id} tabIndex={tab.id} className={`${currentTabIndex === tab.id ? 'active' : ''}`} onClick={handleClickTab}><a>{tab.name}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {filteredProjects.map((project, i) => <ProjectsWrapper key={i} project={project} place={i} tagClick={() => {}} />)}
        </div>
      </div>
    </div>
  )
}
