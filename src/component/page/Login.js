import axios from "axios"
import React from "react"
import qs from 'querystring'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import {
  Redirect,
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import tokenParser from '../assets/tokenParser'

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
    if (localStorage.getItem('auth_token')) {
      this.context.set('token', localStorage.getItem('auth_token') || '')

      this.setState({
        redirect: true,
      })

      return
    }

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
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
      'g-recaptcha-response': this.state.recaptcha,
    }

    this.context.set('loading', true)

    axios.post(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_LOGIN, qs.stringify(data))
    .then(response => {
      if (response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)

        if (tokenParser('user.voted') && tokenParser('user.voted') === true) {
          localStorage.setItem('rk_voted', true)
          this.context.set('successVote', true)
        }

        if (tokenParser('user.votes')) {
          Object.entries(tokenParser('user.votes')).forEach(vote => {
            localStorage.setItem(vote[0], JSON.stringify(vote[1]))
            this.context.set(vote[0], JSON.stringify(vote[1]))
          })
        }

        this.context.set('token', localStorage.getItem('auth_token') || '')

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
          localStorage.removeItem('auth_token')
        }

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
      localStorage.removeItem('auth_token')

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
      return <Redirect to='/projektek' />
    }

    return (
      <div className="page-login-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
              <form className="form-horizontal" onSubmit={this.submitLogin.bind(this)}>
                <fieldset>
                  {this.state.error ? <this.Error message={this.state.error} /> : null}

                  <legend>Bejelentkezés</legend>

                  <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail cím vagy felhasználónév</label>
                      <input type="text" placeholder="E-mail cím" name="email" id="email" value={this.state.email} onChange={this.handleChangeInput.bind(this)} />
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

                    <div style={{ display: "inline-block" }}>
                      <button className="btn btn-primary">
                        <span className="glyphicon glyphicon-lock"></span>
                        Belépés
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
                      <Link to={`/elfelejtett-felhasznalonev`} className="btn btn-sm" title="Elfelejtettem a felhasználónevem">Elfelejtettem a felhasználónevem</Link>
                      <Link to={`/elfelejtett-jelszo`} className="btn btn-sm" title="Elfelejtettem a jelszavam">Elfelejtettem a jelszavam</Link>
                    </div>
                  </div>
                </fieldset>
              </form>

              <div className="registration-info">
                <hr />

                <p>Nincs még fiókja? Regisztráljon itt!</p>

                <Link to={`/regisztracio`} className="btn btn-primary btn-sm" title="Regisztráció">
                  <span className="glyphicon glyphicon-plus"></span>&nbsp;
                  Regisztráció
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
