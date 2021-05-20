import React from "react"
import {
  Redirect,
} from "react-router-dom"
import qs from 'querystring'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import SEO from '../common/SEO'

export default class ResetPassword extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      password: '',
      password_2: '',
      redirectLogin: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  postResetPassword() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const data = {
      hash: this.props.match.params.hash,
      password: this.state.password,
      password_2: this.state.password_2,
    }

    axios.post(
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROFILE_RESET_PASSWORD,
      qs.stringify(data),
      config
    ).then(response => {
      if (response.data) {
        this.setState({
          redirectLogin: true
        })

        this.context.set('loading', false)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        this.setState({
          error: error.response.data.message
        })
      } else {
        this.setState({
          error: 'Váratlan hiba történt, kérjük próbálja később'
        })
      }

      this.context.set('loading', false)
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.postResetPassword()
    }
  }

  Error(props) {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  render() {
    const { redirectLogin } = this.state

    if (redirectLogin) {
      return <Redirect to='/bejelentkezes' />
    }

    return (
      <div className="page-reset-password-section">
        <SEO title="Szavazzon most!" />

        <div className="container">
          <h1>Új jelszó beállítása</h1>

          {this.state.error ? <this.Error message={this.state.error} /> : <p>Adja meg az új jelszót.</p>}

          {!this.state.success ? <div className="row">
            <div className="col-lg-4">
              <div className="control-group">
                <label className="control-label" htmlFor="password">Jelszó * : </label>
                <input className="form-control" type="password" name="password" value={this.state.password} placeholder="Jelszó" id="password" onKeyUp={this.onKeyUp} onChange={this.handleChange} />
              </div>
              <div className="control-group">
                <label className="control-label" htmlFor="password_2">Jelszó újra * : </label>
                <input className="form-control" type="password" name="password_2" value={this.state.password_2} placeholder="Jelszó újra" id="password_2" onKeyUp={this.onKeyUp} onChange={this.handleChange} />
              </div>
              <div className="form-actions">
                <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Küldés" onClick={(e) => {
                  e.preventDefault()
                  this.postResetPassword()
                }} />
              </div>
            </div>
          </div> : null}
        </div>
      </div>
    )
  }
}
