import axios from "../assets/axios"
import React, { useState, useContext, useEffect } from "react"
import {
  Redirect
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import tokenParser from '../assets/tokenParser'
import { ToastContainer, toast } from 'react-toastify';

const notify = (message) => toast.dark(message, {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

const ErrorMini = (props) => {
  if (typeof props.error === 'object') {
    return Object.values(props.error).map((e, i) => {
      return (<div key={i} className="error-message-inline">{e}</div>)
    })
  } else {
    return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
  }
}

export default function Vote() {
  const context = useContext(StoreContext)

  const [redirectLogin, setRedirectLogin] = useState(false)
  const [campaigns, setCampaigns] = useState(null)
  const [projects, setProjects] = useState(null)
  const [stats, setStats] = useState(null)
  const [campaign, setCampaign] = useState('')
  const [project, setProject] = useState('')
  const [voteCount, setVoteCount] = useState('')
  const [error, setError] = useState([])

  const getSettingsData = () => {
    if (!['developer', 'admin', 'editor'].includes(tokenParser('user.role'))) {
      context.set('loading', false)

      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_VOTE.toString()

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data) {
          setCampaigns(response.data && response.data.campaigns ? response.data.campaigns : null)
          setProjects(response.data && response.data.projects ? response.data.projects : null)
          setStats(response.data && response.data.stats ? response.data.stats : null)

          context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }

        context.set('loading', false)
      })
  }

  const addVoteData = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    context.set('loading', true)

    const data = {
      project: project,
      voteCount: voteCount,
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_VOTE,
      new URLSearchParams(data).toString(),
      config
    )
    .then(response => {
      if (response.data && response.data.success) {
        setCampaign('')
        setProject('')
        setError([])
        setStats(response.data && response.data.stats ? response.data.stats : null)
      }

      notify('🎉 Sikeres a szavazat rögzítése')
    })
    .catch(error => {
      notify('⛔️ Sikertelen a szavazat rögzítése')

      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('auth_admin_token') === null) {
      setRedirectLogin(true)
    }

    document.body.classList.add('page-votes')

    context.set('loading', true)

    getSettingsData()

    return () => {
      document.body.classList.remove('page-votes')
    }
  }, [])

  useEffect(() => {
    if (projects) {
      setProjects(Object.values(projects).filter((project) => project.campaign == campaign))
    }
  }, [campaign])

  return (
    <div className="vote">
      {redirectLogin ? <Redirect to='/login' /> : null}

      <div className="container">
        <h1>Szavazat hozzáadása</h1>

        <div className="vote-selection">
          <div className="input-wrapper">
            <label htmlFor="campaign">Időszak választás</label>

            <select id="campaign" name="campaign" onChange={(e) => { setCampaign(e.target.value) }} value={campaign}>
              <option value="">Válasszon a lehetőségek közül</option>
              <option disabled>---</option>

              {campaigns !== null && campaigns.map((elem, k) => {
                return (
                  <option key={k} value={elem.id}>#{elem.id} {elem.name}</option>
                )
              })}
            </select>

            {error && error.project ? Object.values(error.project).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={i} />
            }) : null}
          </div>

          <div className="input-wrapper">
            <label htmlFor="project">Ötlet választás</label>

            <select id="project" name="project" onChange={(e) => { setProject(e.target.value) }} value={project}>
              <option value="">Válasszon a lehetőségek közül</option>
              <option disabled>---</option>

              {projects !== null && Object.values(projects).flatMap(x => x.elems).map((elem, k) => {
                return (
                  <option key={k} value={elem.id}>#{elem.id} {elem.name}</option>
                )
              })}
            </select>

            {error && error.project ? Object.values(error.project).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={i} />
            }) : null}
          </div>

          <div className="input-wrapper">
            <label htmlFor="voteCount">Ötletre adott szavazatok száma</label>
            <input id="voteCount" name="voteCount" type="number" onChange={(e) => { setVoteCount(e.target.value) }} value={voteCount} />

            {error && error.voteCount ? Object.values(error.voteCount).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={i} />
            }) : null}
          </div>
        </div>

        <div style={{ marginTop: 25, marginBottom: 45 }}>
          <button type="button" className="btn btn-primary" onClick={addVoteData}>Szavazat hozzáadása</button>
        </div>

        <h1>Offline szavazatok</h1>

        <div className="vote-stat-wrapper">
          {stats !== null && Object.values(stats).map((stat, i) => {
            let contrast = true;
            let prevProjectId;
            return (
              <div className="vote-stat-box" key={i}>
                <h2 className="vote-stat-title">{stat.title}</h2>
                <div className="vote-stat-content">
                  {stat.times !== null && Object.values(stat.times)
                    .sort((a, b) => a.date > b.date ? 1 : -1)
                    .sort((a, b) => a.projectId > b.projectId ? 1 : -1)
                    .map((stat, y) => {
                      if (prevProjectId !== stat.projectId) {
                        contrast = !contrast;
                      }
                      prevProjectId = stat.projectId;
                      return (
                        <div className={`vote-stat-elem vote-stat-elem-${contrast ? 'odd' : 'even'}`} key={y}>
                          <div className="vote-stat-name"><span className="vote-stat-id">#{stat.projectId}</span> {stat.projectName}</div>
                          <div className="vote-stat-date">{stat.date}</div>
                          <div className="vote-stat-count">{stat.count} szavazat</div>
                        </div>
                      )
                    })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
