import axios from "../assets/axios"
import React from "react"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default class Login extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      email: '',
      password: '',
      error: '',
      redirect: false,
      recaptcha: null,
    }
  }

  verifyCallback = (recaptchaToken) => {
    this.setState({
      recaptcha: recaptchaToken,
    })
  }

  updateToken = () => {
    this.recaptcha.execute();
  }

  componentDidMount() {
    if (localStorage.getItem('auth_admin_token')) {
      this.context.set('token', localStorage.getItem('auth_admin_token') || '')

      this.setState({
        redirect: true,
      })

      return
    }

    this.context.set('loading', false)

    document.body.classList.add('page-login')

    loadReCaptcha(process.env.SITE_KEY, this.verifyCallback)
  }

  componentWillUnmount() {
    document.body.classList.remove('page-login')
  }

  handleChangeInput(e) {
    this.setState({ error: '', [ e.target.name ]: e.target.value })
  }

  submitLogin(e) {
    e.preventDefault()

    const data = {
      email: this.state.email,
      password: this.state.password,
      'g-recaptcha-response': this.state.recaptcha,
    }

    this.context.set('loading', true)

    axios.post(process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_LOGIN, new URLSearchParams(data).toString())
      .then(response => {
        if (response.data && response.data.token) {
          localStorage.setItem('auth_admin_token', response.data.token)

          this.context.set('token', localStorage.getItem('auth_admin_token') || '')

          this.forceUpdate()

          setTimeout(() => {
            this.setState({
              redirect: true
            })

            this.context.set('loading', false)
          }, 1000)

          if (response.status !== 200 && response.data && response.data.message) {
            this.setState({
              error: response.data.message
            })

            this.context.set('token', null)
            localStorage.removeItem('auth_admin_token')
          }

          this.updateToken()
          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          })
        }

        this.context.set('token', null)
        localStorage.removeItem('auth_admin_token')

        this.updateToken()
        this.context.set('loading', false)
      })
  }

  Error(props) {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="page-login-section">
        <div className="container">
          <div className="col-md-6 offset-md-3">
            {this.state.error ? <this.Error message={this.state.error} /> : null}
          </div>

          <form onSubmit={this.submitLogin.bind(this)}>
            <div className="form-wrapper">
              <div className="input-wrapper">
                <label htmlFor="email">E-mail cím</label>
                <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" value={this.state.email} onChange={this.handleChangeInput.bind(this)} />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Jelszó</label>
                <input type="password" placeholder="Jelszó" name="password" id="password" value={this.state.password} onChange={this.handleChangeInput.bind(this)} />
              </div>

              <ReCaptcha
                ref={ref => this.recaptcha = ref}
                sitekey={process.env.SITE_KEY}
                action='submit'
                verifyCallback={this.verifyCallback}
              />

              <input type="submit" value="Bejelentkezés" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
