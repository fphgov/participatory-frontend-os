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
      rk_vote_CARE: '',
      rk_vote_GREEN: '',
      rk_vote_WHOLE: '',
      error: [],
    }

    this.context.set('loading', true, () => {
      this.getSettingsData()
    })

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('auth_token') === null) {
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
    if (! [ 'developer', 'admin', 'editor' ].includes(tokenParser('user.role'))) {
      this.context.set('loading', false)

      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_VOTE.toString()

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data) {
          this.setState({
            projects: response.data && response.data.projects ? response.data.projects : null,
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
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json',
      }
    }

    this.context.set('loading', true)

    const data = {
      rk_vote_CARE: this.state.rk_vote_CARE,
      rk_vote_GREEN: this.state.rk_vote_GREEN,
      rk_vote_WHOLE: this.state.rk_vote_WHOLE,
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_VOTE,
      qs.stringify(data),
      config
    ).then(response => {
      if (response.data && response.data.success) {
        console.log(response.data.success)

        this.setState({
          rk_vote_CARE: '',
          rk_vote_GREEN: '',
          rk_vote_WHOLE: '',
          error: [],
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
      <div className="votes">
        <div className="container">
          <h1>Szavazat hozzáadása</h1>

          {this.state.projects !== null && Object.values(this.state.projects).map((project, i) => {
            return (
              <div key={i} className="vote-selection">
                <h2>{project.name}</h2>

                <select name={`rk_vote_${project.code}`} onChange={this.handleChange} value={this.state[`rk_vote_${project.code}`]}>
                  <option value="">Válasszon a lehetőségek közül</option>
                  <option disabled>---</option>

                  {project.elems.map((elem, k) => {
                    return (
                      <option key={k} value={elem.id}>#{elem.id} {elem.name}</option>
                    )
                  })}
                </select>

                {this.state.error && this.state.error[`rk_vote_${project.code}`] ? Object.values(this.state.error[`rk_vote_${project.code}`]).map((err, i) => {
                  return <this.ErrorMini key={i} error={err} increment={i} />
                }) : null}
              </div>
            )
          })}

          <div style={{ marginTop: 25, marginBottom: 45 }}>
            <button className="btn btn-primary" onClick={this.addVoteData.bind(this)}>Szavazat hozzáadása</button>
          </div>
        </div>

        <ToastContainer />
      </div>
    )
  }
}
