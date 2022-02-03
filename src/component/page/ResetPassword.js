import React, { useContext, useState, useEffect } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom";
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default function ResetPassword() {
  const context = useContext(StoreContext)

  let { hash } = useParams()

  const [ password, setPassword ] = useState('')
  const [ passwordSec, setPasswordSec ] = useState('')
  const [ success, setSuccess ] = useState('')
  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  const submitResetPassword = (e) => {
    e.preventDefault()

    context.set('loading', true, () => {
      postResetPassword()
    })
  }

  const postResetPassword = () => {
    const data = {
      hash: hash,
      password,
      password_2: passwordSec,
    }

    axios
    .post(
      process.env.REACT_APP_API_REQ_PROFILE_RESET_PASSWORD,
      new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data) {
        setSuccess(true)
        setRedirectLogin(true)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-reset-password')

    return () => {
      document.body.classList.remove('page-reset-password')
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
    <div className="page-reset-password-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <form className="form-horizontal" onSubmit={submitResetPassword}>
              <fieldset>
                {error ? <Error message={error} /> : <p>Add meg az új jelszót.</p>}

                {!success ? <>
                  <legend>Új jelszó beállítása</legend>

                  <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label className="control-label" htmlFor="password">Jelszó * : </label>
                      <input className="form-control" type="password" name="password" value={password} placeholder="Jelszó" id="password" onChange={(e) => {
                        setPassword(e.target.value)
                      }} />
                    </div>

                    <div className="input-wrapper">
                      <label className="control-label" htmlFor="password_2">Jelszó újra * : </label>
                      <input className="form-control" type="password" name="password_2" value={passwordSec} placeholder="Jelszó újra" id="password_2" onChange={(e) => {
                        setPasswordSec(e.target.value)
                      }} />
                    </div>

                    <div className="input-wrapper">
                      <div className="form-actions">
                        <input className="btn btn-primary btn-small" id="button-send" type="submit" name="btnSend" value="Küldés" />
                      </div>
                    </div>
                  </div>
                </> : null}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
