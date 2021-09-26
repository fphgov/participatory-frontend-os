import axios from "../assets/axios"
import React, { useState, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import StoreContext from '../../StoreContext'

export default function Profile() {
  const context = useContext(StoreContext)

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [ display, setDisplay ] = useState({
    pwChange: true
  })

  const [ state, setState ] = useState({
    password1: '',
    password2: ''
  })

  const [ errors, setErrors ] = useState({
    password1: '',
    password2: '',
    password: ''
  })

  const handleChangeInput = (e) => {
    e.persist()

    setState(state => ({ ...state, [ e.target.name ]: e.target.value }))
    setErrors(state => ({ ...state, [ e.target.name ]: '', password: '' }))
  }

  const submitPassword = (e) => {
    e.preventDefault()

    context.set('loading', true)

    if (passwordCheck()) {
      context.set('loading', false)
      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const data = {
      password: state.password1
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
    }).catch(error => {
      context.set('loading', false)

      notify('⛔️ Sikertelen jelszó módosítás')
    })

  }

  function passwordCheck() {
    if (state.password1 === '') {
      setErrors(state => ({ ...state, password1: 'A mező nem lehet üres' }))
      return true;
    }

    if (state.password2 === '') {
      setErrors(state => ({ ...state, password2: 'A mező nem lehet üres' }))
      return true;
    }

    if (state.password1 !== state.password2) {
      setErrors(state => ({ ...state, password: 'A két jelszó nem egyezik' }))
      return true;
    }
    return false;
  }

  return (
    <div>
      <div className="container profile">
        <div className="col-lg-3">
          <h1>Profil</h1>
          <h2 onClick={e => {
            setDisplay(state => ({ ...state, pwChange: !display.pwChange }))
          }}>Jelszóváltoztatás</h2>
        </div>

        {display.pwChange && <div className="pw-change">
          <div className="input-wrapper col-lg-4">
            <label htmlFor="password1">Új jelszó</label>
            <input type="password" name="password1" id="password1" onChange={handleChangeInput} />
            {errors.password1 && <div className="alert alert-danger">{errors.password1}</div>}
          </div>

          <div className="input-wrapper col-lg-4">
            <label htmlFor="password2">Új jelszó ismét</label>
            <input type="password" name="password2" id="password2" onChange={handleChangeInput} />
            {errors.password2 && <div className="alert alert-danger">{errors.password2}</div>}
            {errors.password && <div className="alert alert-danger">{errors.password}</div>}
          </div>
        </div>}

        <div className="mt-4 mb-4 col-lg-4">
          {(!errors.password1 && !errors.password2) && <button className="btn btn-primary" onClick={submitPassword}>Mentés</button>}
          {(errors.password1 || errors.password2) && <button className="btn btn-disabled" disabled onClick={submitPassword}>Mentés</button>}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
