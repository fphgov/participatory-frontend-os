import React from "react"
import {
  Redirect,
} from "react-router-dom"
import qs from 'querystring'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default class ForgotAccount extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      email: '',
      success: false,
      redirectLogin: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  postForgotPassword() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const data = {
      email: this.state.email,
    };

    axios.post(
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROFILE_FORGOT_PASSWORD,
      qs.stringify(data),
      config
    ).then(response => {
      if (response.data) {
        this.setState({
          success: true
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
      this.postForgotPassword()
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
      <div className="page-forgot-password-section">
        <div className="container">
          <h1>Elfelejtett felhasználónév</h1>

          {this.state.error ? <this.Error message={this.state.error} />: <div>
            {! this.state.success ? <p>Kérjük, adja meg e-mail címét. A felhasználónevét e-mailben kapja meg.</p> : null}

            {this.state.success ? <>
              <p>Amennyiben az e-mail cím szerepel a rendszerünkben úgy kiküldtük a megadott e-mail címre: {this.state.email}</p>

              <div className="row">
                <div className="col-lg-4">
                  <div className="form-actions">
                    <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Tovább a bejelentkezésre" onClick={(e) => {
                      e.preventDefault()

                      this.setState({
                        redirectLogin: true
                      })
                    }} />
                  </div>
                </div>
              </div>
            </> : null}

            {! this.state.success ? <div className="row">
              <div className="col-lg-4">
                <div className="control-group">
                  <label className="control-label" htmlFor="email">E-mail * : </label>
                  <input className="form-control" type="text" name="email" value={this.state.email} placeholder="E-mail" id="email" onKeyUp={this.onKeyUp} onChange={this.handleChange} />
                </div>
                <div className="form-actions">
                  <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Küldés" onClick={(e) => {
                    e.preventDefault()
                    this.postForgotPassword()
                  }} />
                </div>
              </div>
            </div> : null}
          </div>}
        </div>
      </div>
    )
  }
}
