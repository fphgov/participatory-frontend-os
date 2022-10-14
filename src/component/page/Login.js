import axios from "../assets/axios"
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import {
  Redirect,
  Link,
  useLocation
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default function Login() {
  const context = useContext(StoreContext)

  const [redirect, setRedirect] = useState(false)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const location = useLocation()

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

    document.body.classList.add('page-login', 'page-full-dark')

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    return () => {
      document.body.classList.remove('page-login', 'page-full-dark')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const ManualRedirect = ({ byState, location }) => {
    if (! byState) {
      return null
    }

    if (location) {
      return <Redirect to={location.redirect} />
    }

    return <Redirect to="/" />
  }

  return (
    <div className="page-login-section">
      <ManualRedirect byState={redirect} location={location.state ? location.state : false} />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <form className="form-horizontal" onSubmit={submitLogin}>
              <fieldset>
                {error ? <Error message={error} /> : null}

                <div className="legend-wrapper">
                  <legend>Bejelentkezés</legend>

                  <Link to={`/regisztracio`} className="create-account">Nincs még fiókod?</Link>
                </div>

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

                  <div className="input-wrapper">
                    <div className="row flex-center">
                      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <button className="btn btn-primary btn-headline btn-next">
                          Belépés
                        </button>
                      </div>

                      <div className="forgot-btn-wrapper col-xs-8 col-sm-8 col-md-8 col-lg-8" style={{ textAlign: 'right' }}>
                        <Link to={`/elfelejtett-jelszo`} title="Elfelejtett jelszó">Elfelejtett jelszó</Link>
                      </div>
                    </div>
                 </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
