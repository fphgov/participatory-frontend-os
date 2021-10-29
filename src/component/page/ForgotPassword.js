import React, { useContext, useState } from "react"
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

  const postForgotPassword = () => {
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
        <h1>Elfelejtett jelszó</h1>

        {error ? <Error message={error} /> : <div>
          {!success ? <p>Kérünk, add meg az e-mail címed. Az aktiváló linket e-mailben kapod meg.</p> : null}

          {success ? <>
            <p>Amennyiben szerepel az e-mail cím a rendszerben, úgy az aktiváló linket kiküldtük.</p>

            <div className="row">
              <div className="col-lg-4">
                <div className="form-actions">
                  <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Tovább a bejelentkezésre" onClick={(e) => {
                    e.preventDefault()

                    setRedirectLogin(true)
                  }} />
                </div>
              </div>
            </div>
          </> : null}

          {!success ? <div className="row">
            <div className="col-lg-4">
              <div className="control-group">
                <label className="control-label" htmlFor="email">E-mail * : </label>
                <input className="form-control" type="text" name="email" value={email} placeholder="E-mail" id="email" onChange={(e) => {
                  setEmail(e.target.value)
                }} />
              </div>
              <div className="form-actions">
                <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Küldés" onClick={(e) => {
                  e.preventDefault()

                  context.set('loading', true, () => {
                    postForgotPassword()
                  })
                }} />
              </div>
            </div>
          </div> : null}
        </div>}
      </div>
    </div>
  )
}
