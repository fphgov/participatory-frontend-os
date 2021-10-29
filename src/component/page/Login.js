import axios from "../assets/axios"
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import {
  Redirect,
  Link,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import tokenParser from '../assets/tokenParser'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faSignInAlt } from "@fortawesome/free-solid-svg-icons"

export default function Login() {
  const context = useContext(StoreContext)

  const [redirect, setRedirect] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  const submitLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
      'g-recaptcha-response': recaptchaToken,
    }

    context.set('loading', true)

    axios
    .post(process.env.REACT_APP_API_REQ_LOGIN, new URLSearchParams(data).toString())
    .then(response => {
      if (response.data && response.data.token) {
        localStorage.setItem('auth_token', response.data.token)

        if (tokenParser('user.voted') && tokenParser('user.voted') === true) {
          localStorage.setItem('rk_voted', true)
          context.set('successVote', true)
        }

        if (tokenParser('user.votes')) {
          Object.entries(tokenParser('user.votes')).forEach(vote => {
            localStorage.setItem(vote[0], JSON.stringify(vote[1]))
            context.set(vote[0], JSON.stringify(vote[1]))
          })
        }

        context.set('token', localStorage.getItem('auth_token') || '')

        forceUpdate()

        setTimeout(() => {
          setRedirect(true)

          context.set('loading', false)
        }, 1000)

        if (response.status !== 200 && response.data && response.data.message) {
          setError(response.data.message)

          context.set('token', null)
          localStorage.removeItem('auth_token')
        }
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }

      context.set('token', null)
      localStorage.removeItem('auth_token')
    })
    .finally(() => {
      context.set('loading', false)
      recaptcha.execute()
    })
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      context.set('token', localStorage.getItem('auth_token') || '')

      setRedirect(true)

      return
    }

    document.body.classList.add('page-login')

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    return () => {
      document.body.classList.remove('page-login')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  return (
    <div className="page-login-section">
      {redirect ? <Redirect to="/" /> : null}

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
            <form className="form-horizontal" onSubmit={submitLogin}>
              <fieldset>
                {error ? <Error message={error} /> : null}

                <legend>Bejelentkezés</legend>

                <div className="form-wrapper">
                  <div className="input-wrapper">
                    <label htmlFor="email">E-mail cím</label>
                    <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                  </div>

                  <div className="input-wrapper">
                    <label htmlFor="password">Jelszó</label>
                    <input type="password" placeholder="Jelszó" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  </div>

                  <ReCaptcha
                    ref={ref => setRecaptcha(ref)}
                    sitekey={process.env.SITE_KEY}
                    action='submit'
                    verifyCallback={(recaptchaToken) => {
                      setRecaptchaToken(recaptchaToken)
                    }}
                  />

                  <div className="form-group">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12" style={{ display: "flex", justifyContent: "space-between", padding: 0 }}>
                      <Link to={`/elfelejtett-jelszo`} className="btn btn-sm" title="Elfelejtettem a jelszavam">Elfelejtettem a jelszavam</Link>
                    </div>
                  </div>

                  <div style={{ display: "inline-block" }}>
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faSignInAlt} />&nbsp;
                      Belépés
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>

            <div className="registration-info">
              <hr />

              <p>Nincs még fiókod? Regisztrálj itt!</p>

              <Link to={`/regisztracio`} className="btn btn-primary btn-sm" title="Regisztráció">
                <FontAwesomeIcon icon={faUser} />&nbsp;
                Regisztráció
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
