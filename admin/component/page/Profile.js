import axios from "../assets/axios"
import React, { useState, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify'
import StoreContext from '../../StoreContext'

export default function Profile() {
  const context = useContext(StoreContext)

  const [ error, setError ] = useState('')

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const [ display, setDisplay ] = useState({
    pwChange: true
  })

  const [ credential, setCredential ] = useState({
    password: '',
    password_again: ''
  })

  const handleChangeInput = (e) => {
    e.persist()

    setCredential({ ...credential, [ e.target.name ]: e.target.value })
    setError('')
  }

  const submitPassword = (e) => {
    e.preventDefault()

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const data = {
      password: credential.password,
      password_again: credential.password_again
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_PASSWORD,
      new URLSearchParams(data).toString(),
      config
    ).then(response => {
      context.set('loading', false)

      if (response.status === 200) {
        notify('🎉 Sikeres jelszó módosítás')
      } else {
        notify('⛔️ Sikertelen jelszó módosítás')
      }
    }).catch(() => {
      context.set('loading', false)

      notify('⛔️ Sikertelen jelszó módosítás')
    })
  }

  const ErrorMini = (props) => {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="profile">
              <h1>Profil</h1>
              <h2>Jelszóváltoztatás</h2>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="input-wrapper">
                  <label htmlFor="password">Új jelszó</label>
                  <input type="password" name="password" id="password" onChange={handleChangeInput} />

                  {error && error.password_again ? Object.values(error.password_again).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
                  }) : null}
                </div>

                <div className="input-wrapper">
                  <label htmlFor="password_again">Új jelszó ismét</label>
                  <input type="password" name="password_again" id="password_again" onChange={handleChangeInput} />

                  {error && error.password_again ? Object.values(error.password_again).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
                  }) : null}
                </div>
              </div>
            </div>

            <div className="mt-4 mb-4">
              <button className="btn btn-primary" onClick={submitPassword}>Mentés</button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
