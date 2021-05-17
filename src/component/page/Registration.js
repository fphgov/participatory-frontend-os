import React from "react"
import {
  Redirect,
} from "react-router-dom"
import qs from 'querystring'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmAllCharForEmail, rmAllCharForName } from '../lib/removeSpecialCharacters'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default class Registration extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      success: false,
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      lastname: '',
      firstname: '',
      nickname: '',
      postal_code: '',
      birthyear: '',
      hear_about: '',
      live_in_city: '',
      privacy: '',
      recaptcha: null,
      redirectLogin: false,
    }

    this.handleChangeInput = this.handleChangeInput.bind(this)
    this.handleChangeEmailInput = this.handleChangeEmailInput.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
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
    document.body.classList.add('page-registration')

    loadReCaptcha(process.env.SITE_KEY, this.verifyCallback)
  }

  componentWillUnmount() {
    document.body.classList.remove('page-registration')
  }

  handleChangeInput(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForName(e.target.value)

    this.setState({
      [ e.target.name ]: value
    })
  }

  handleChangeEmailInput(e) {
    this.setState({
      [ e.target.name ]: rmAllCharForEmail(e.target.value)
    })
  }

  onKeyUp(e) {
    if (e.key === 'Enter') {
      this.submitRegistration(e)
    }
  }

  submitRegistration(e) {
    e.preventDefault();

    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const data = {
      hash: this.props.match.params.hash,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      nickname: this.state.nickname,
      postal_code: this.state.postal_code,
      birthyear: this.state.birthyear,
      hear_about: this.state.hear_about,
      live_in_city: this.state.live_in_city,
      privacy: this.state.privacy,
      'g-recaptcha-response': this.state.recaptcha,
    }

    this.context.set('loading', true)

    axios.post(
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_REGISTRATION,
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
      if (error.response && error.response.data && error.response.data.errors) {
        this.setState({
          error: error.response.data.errors
        })
      } else {
        this.setState({
          error: 'Váratlan hiba történt, kérjük próbálja később'
        })
      }

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
      return <Redirect to='/bejelentkezes' />
    }

    return (
      <div className="page-registration-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 offset-sm-3 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
              <form className="form-horizontal" onSubmit={this.submitRegistration.bind(this)}>
                <fieldset>
                  {this.state.error && this.state.error.message ? <this.Error message={this.state.error} /> : null}

                  <legend>Regisztráció</legend>

                  {! this.state.success ? <>
                    <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label htmlFor="username">Felhasználónév <sup>*</sup></label>
                      <p className="tipp">Az itt megadott névvel fog tudni belépni a rendszerbe. Speciális karakterek és nagybetűk nem elfogadottak.</p>
                      <input type="text" placeholder="Felhasználónév" name="username" id="username" value={this.state.username} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.username ? Object.values(this.state.error.username).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`username-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail <sup>*</sup></label>
                      <input type="text" placeholder="E-mail" name="email" id="email" value={this.state.email} onChange={this.handleChangeEmailInput} />

                      {this.state.error && this.state.error.email ? Object.values(this.state.error.email).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`email-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="password">Jelszó <sup>*</sup></label>
                      <input type="password" placeholder="Jelszó" name="password" id="password" value={this.state.password} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.password ? Object.values(this.state.error.password).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`password-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="password_confirm">Jelszó megerősítése <sup>*</sup></label>
                      <input type="password" placeholder="Jelszó megerősítése" name="password_confirm" id="password_confirm" value={this.state.password_confirm} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.password_confirm ? Object.values(this.state.error.password_confirm).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`password_confirm-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="nickname">Nyilvános név <sup>*</sup></label>
                      <p className="tipp">Ez a név fog megjelenni az oldalon.</p>
                      <input type="text" placeholder="Nyilvános név" name="nickname" id="nickname" value={this.state.nickname} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.nickname ? Object.values(this.state.error.nickname).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`nickname-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="lastname">Vezetéknév <sup>*</sup></label>
                      <input type="text" placeholder="Vezetéknév" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.lastname ? Object.values(this.state.error.lastname).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`lastname-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="firstname">Utónév <sup>*</sup></label>
                      <input type="text" placeholder="Utónév" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.firstname ? Object.values(this.state.error.firstname).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`firstname-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="birthyear">Születési év <sup>*</sup></label>
                      <input type="text" placeholder="Születési év" name="birthyear" id="birthyear" value={this.state.birthyear} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.birthyear ? Object.values(this.state.error.birthyear).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`birthyear-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="postal_code">Irányítószám <sup>*</sup></label>
                      <input type="text" placeholder="Irányítószám" name="postal_code" id="postal_code" value={this.state.postal_code} onChange={this.handleChangeInput} />

                      {this.state.error && this.state.error.postal_code ? Object.values(this.state.error.postal_code).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`postal_code-${i}`} />
                      }) : null}
                    </div>

                    <h4>Honnan értesült a részvételi költségvetésről? <sup>*</sup></h4>
                    {this.state.error && this.state.error.hear_about ? Object.values(this.state.error.hear_about).map((err, i) => {
                      return <this.ErrorMini key={i} error={err} increment={`hear_about-${i}`} />
                    }) : null}
                    <div className="form-group form-group-hear-about">
                      <label htmlFor="hear-about-friend" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-friend" value="friend" onChange={this.handleChangeInput} />Barátoktól, ismerőstől, családtól
                      </label>

                      <label htmlFor="hear-about-street" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-street" value="street" onChange={this.handleChangeInput} />Utcai plakátról
                      </label>

                      <label htmlFor="hear-about-districtevent" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-districtevent" value="districtevent" onChange={this.handleChangeInput} />Kerületi tájékoztató eseményről
                      </label>

                      <label htmlFor="hear-about-facebook" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-facebook" value="facebook" onChange={this.handleChangeInput} />Facebook bejegyzésből vagy hirdetésből
                      </label>

                      <label htmlFor="hear-about-civil" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-civil" value="civil" onChange={this.handleChangeInput} />Civil szervezet hírleveléből, vagy civil szervezeti találkozón
                      </label>

                      <label htmlFor="hear-about-library" className="radio-inline">
                        <input type="radio" name="hear_about" id="hear-about-library" value="library" onChange={this.handleChangeInput} />A Fővárosi Szabó Ervin Könyvtárban található brosúrából
                      </label>
                    </div>

                    <div className="form-group">
                      <label htmlFor="live_in_city" className="form-group-label">
                        <input className="form-control" type="checkbox" id="live_in_city" name="live_in_city" onChange={this.handleChangeInput} />
                        Kijelentem, hogy elmúltam 18 éves és budapesti lakos vagyok, vagy Budapesten dolgozom, vagy Budapesten tanulok. *
                      </label>

                      {this.state.error && this.state.error.live_in_city ? Object.values(this.state.error.live_in_city).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`live_in_city-${i}`} />
                      }) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="privacy" className="form-group-label">
                        <input className="form-control" type="checkbox" id="privacy" name="privacy" onChange={this.handleChangeInput} />
                        Elfogadom az <a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&amp;htmlpage_id=5" target="_blank" rel="noopener noreferrer">adatvédelmi tájékoztatót</a>
                      </label>

                      {this.state.error && this.state.error.privacy ? Object.values(this.state.error.privacy).map((err, i) => {
                        return <this.ErrorMini key={i} error={err} increment={`privacy-${i}`} />
                      }) : null}
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
                        Regisztrálok
                      </button>
                    </div>
                  </div>
                  </> : null}
                </fieldset>
              </form>

              {this.state.success ? <div style={{ padding: '0.35em 0.75em 0.625em' }}>
                <p>Kérjük, regisztrációja befejezéséhez aktiválja fiókját az e-mail címére küldött levélben található linkre kattintva.</p>

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
              </div> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
