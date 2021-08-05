import axios from "../assets/axios"
import React from "react"
import {
  Redirect
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import tokenParser from '../assets/tokenParser'
import qs from 'querystring'
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

export default class Vote extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      redirectLogin: false,
      projects: null,
      stats: null,
      project: '',
      voteCount: '',
      error: [],
    }

    this.context.set('loading', true, () => {
      this.getSettingsData()
    })

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('auth_admin_token') === null) {
      this.setState({
        redirectLogin: true
      })
    }

    document.body.classList.add('page-votes')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-votes')
  }

  getSettingsData() {
    if (!['developer', 'admin', 'editor'].includes(tokenParser('user.role'))) {
      this.context.set('loading', false)

      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_VOTE.toString()

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data) {
          this.setState({
            projects: response.data && response.data.projects ? response.data.projects : null,
            stats: response.data && response.data.stats ? response.data.stats : null,
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          })
        }

        this.context.set('loading', false)
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addVoteData() {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    this.context.set('loading', true)

    const data = {
      project: this.state.project,
      voteCount: this.state.voteCount,
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_VOTE,
      qs.stringify(data),
      config
    ).then(response => {
      if (response.data && response.data.success) {
        this.setState({
          project: '',
          voteCount: '',
          error: [],
          stats: response.data && response.data.stats ? response.data.stats : null,
        })
      }

      notify('🎉 Sikeres a szavazat rögzítése')

      this.context.set('loading', false)
    })
      .catch(error => {
        this.context.set('loading', false)

        notify('⛔️ Sikertelen a szavazat rögzítése')

        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          })
        } else if (error.response && error.response.data && error.response.data.errors) {
          this.setState({
            error: error.response.data.errors
          })
        }
      })
  }

  ErrorMini(props) {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
  }

  render() {
    const { redirectLogin } = this.state

    if (redirectLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className="vote">
        <div className="container">
          <h1>Szavazat hozzáadása</h1>

          <div className="vote-selection">
            <div className="input-wrapper">
              <label htmlFor="project">Ötlet választás</label>

              <select id="project" name="project" onChange={this.handleChange} value={this.state.project}>
                <option value="">Válasszon a lehetőségek közül</option>
                <option disabled>---</option>

                {this.state.projects !== null && Object.values(this.state.projects).flatMap(x => x.elems).map((elem, k) => {
                  return (
                    <option key={k} value={elem.id}>#{elem.id} {elem.name}</option>
                  )
                })}
              </select>

              {this.state.error && this.state.error.project ? Object.values(this.state.error.project).map((err, i) => {
                return <this.ErrorMini key={i} error={err} increment={i} />
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="voteCount">Ötletre adott szavazatok száma</label>
              <input id="voteCount" name="voteCount" type="number" onChange={this.handleChange} value={this.state.voteCount} />

              {this.state.error && this.state.error.voteCount ? Object.values(this.state.error.voteCount).map((err, i) => {
                return <this.ErrorMini key={i} error={err} increment={i} />
              }) : null}
            </div>
          </div>

          <div style={{ marginTop: 25, marginBottom: 45 }}>
            <button className="btn btn-primary" onClick={this.addVoteData.bind(this)}>Szavazat hozzáadása</button>
          </div>

          <h1>Offline szavazatok</h1>

          <div className="vote-stat-wrapper">
            {this.state.stats !== null && Object.values(this.state.stats).map((stat, i) => {
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
}
