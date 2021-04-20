import axios from "axios"
import React from "react"
import qs from 'querystring'
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
      return <Redirect to='/projects' />
    }

    return (
      <div className="page-login-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 offset-sm-3 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
              <form className="form-horizontal" onSubmit={this.submitLogin.bind(this)}>
                <fieldset>
                  {this.state.error ? <this.Error message={this.state.error} /> : null}

                  <legend>Bejelentkezés</legend>

                  <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail cím</label>
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
                      <a className="btn btn-sm" title="Elfelejtettem a felhasználónevem" href="#">Felhasználónév emlékeztető</a>
                      <a className="btn btn-sm" title="Elfelejtettem a jelszavam" href="#">Jelszó emlékeztető</a>
                    </div>
                  </div>
                </fieldset>
              </form>

              <div className="registration-info">
                <hr />

                <p>Nincs még fiókja? Regisztráljon itt!</p>

                <a className="btn btn-primary btn-sm" title="Regisztráció" href="jsp/site/Portal.jsp?page=mylutecedatabase&amp;action=createAccount">
                  <span className="glyphicon glyphicon-plus"></span>&nbsp;
                  Regisztráció
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
