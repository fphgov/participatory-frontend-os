import React, { useContext, useState, useEffect } from "react"
import {
  Redirect,
} from "react-router-dom"
import API from '../assets/axios'
import StoreContext from '../../StoreContext'

export default function ForgotPassword() {
  const context = useContext(StoreContext)

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [redirectLogin, setRedirectLogin] = useState(false)

  const postForgotPassword = (e) => {
    e.preventDefault();

    context.set('loading', true)

    const data = {
      email,
    }

    API.post(
      process.env.REACT_APP_API_REQ_PROFILE_FORGOT_PASSWORD,
      new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data) {
        setSuccess(true)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }
    }).finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-forgot-password', 'page-full-dark')

    return () => {
      document.body.classList.remove('page-forgot-password', 'page-full-dark')
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
    <div className="page-forgot-password-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            {success ? <>
              <h2>Elfelejtett jelszó</h2>
              <p className="tipp">Amennyiben szerepel az e-mail cím a rendszerben, úgy az aktiváló linket kiküldtük.</p>

              <div className="row">
                <div className="col-lg-4">
                  <div className="form-actions">
                    <input className="btn btn-primary btn-headline btn-next" id="button-send" type="submit" name="btnSend" value="Tovább a bejelentkezésre" onClick={(e) => {
                      e.preventDefault()

                      setRedirectLogin(true)
                    }} />
                  </div>
                </div>
              </div>
            </> : null}

            {! success ? <>
              <form className="form-horizontal" onSubmit={postForgotPassword}>
                <fieldset>
                  {error ? <Error message={error} /> : null}

                  <div className="legend-wrapper">
                    <legend>Elfelejtett jelszó</legend>
                  </div>

                  {! success ? <p className="info">Kérünk, add meg az e-mail címed. Az aktiváló linket e-mailben kapod meg.</p> : null}

                  <div className="form-wrapper" style={{ width: '100%' }}>
                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail cím</label>
                      <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>

                    <div className="input-wrapper">
                      <button type="submit" className="btn btn-primary btn-headline btn-next">
                        Küldés
                      </button>
                  </div>
                  </div>
                </fieldset>
              </form>
            </> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
