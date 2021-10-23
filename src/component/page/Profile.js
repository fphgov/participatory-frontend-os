import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
  Link,
} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faKey, faSave, faSignOutAlt, faIdCardAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import IdeasWrapper from "../common/IdeasWrapper"
import CardPlaceholder from "../common/CardPlaceholder"
import tokenParser from '../assets/tokenParser'

export default function Profile() {
  const context = useContext(StoreContext)

  const [profile, setProfile] = useState(null)
  const [ideas, setIdeas] = useState([])
  const [loadIdeas, setLoadIdeas] = useState(false)
  const [error, setError] = useState('')
  const [redirectLogout, setRedirectLogout] = useState(false)
  const [redirectLogin, setRedirectLogin] = useState(false)
  const [credential, setCredential] = useState({
    password: '',
    password_again: '',
  })

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const getPageContent = () => {
    getProfileData()
    getIdeas()
  }

  const getProfileData = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${context.get('token')}`,
      }
    }

    axios
      .get(process.env.REACT_APP_API_REQ_PROFILE, config)
      .then(response => {
        if (response.data && response.data.data) {
          setProfile(response.data.data)
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setRedirectLogin(true)

          return
        }

        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const getIdeas = () => {
    const username = tokenParser('user.username')

    if (! username) {
      setLoadIdeas(false)

      return
    }

    const data = {
      username,
    }

    axios
      .get(process.env.REACT_APP_API_REQ_IDEAS + '?' + new URLSearchParams(data).toString())
      .then(response => {
        if (response.data && response.data._embedded && response.data._embedded.ideas) {
          setIdeas(response.data._embedded.ideas)
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setRedirectLogin(true)

          return
        }

        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }
      })
      .finally(() => {
        setLoadIdeas(false)
      })
  }

  const submitPassword = (e) => {
    e.preventDefault()

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      }
    }

    const data = {
      password: credential.password,
      password_again: credential.password_again
    }

    axios.post(
      process.env.REACT_APP_API_REQ_PASSWORD,
      new URLSearchParams(data).toString(),
      config
    ).then(response => {
      context.set('loading', false)

      if (response.status === 200) {
        setCredential({
          password: '',
          password_again: '',
        })

        notify('🎉 Sikeres jelszó módosítás')
      } else {
        notify('⛔️ Sikertelen jelszó módosítás')
      }

      if (response.status !== 200 && response.data && response.data.message) {
        setError(response.data.message)
      }
    }).catch(error => {
      context.set('loading', false)

      if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors);
        setError(error.response.data.errors)
      }

      notify('⛔️ Sikertelen jelszó módosítás')
    })
  }

  const handleChangeInput = (e) => {
    e.persist()

    setCredential({ ...credential, [ e.target.name ]: e.target.value })
  }

  useEffect(() => {
    document.body.classList.add('page-profile')

    setLoadIdeas(true)
    context.set('loading', true)

    if (! localStorage.getItem('auth_token')) {
      setRedirectLogin(true)
    }

    return () => {
      document.body.classList.remove('page-profile')
    }
  }, [])

  useEffect(() => {
    if (context.get('token')) {
      getPageContent()
    }
  }, [context.get('token')])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
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

  const ProfileBox = ({ profile }) => {
    return (
      <div className="box-profile">
        <p>A megadott adatok jelenleg nem módosíthatóak.</p>

        <div className="profile-item">
          <div className="profile-item-name">Név</div>
          <div className="profile-item-value">{profile.lastname + ' ' + profile.firstname}</div>
        </div>

        <div className="profile-item">
          <div className="profile-item-name">E-mail</div>
          <div className="profile-item-value">{profile.email}</div>
        </div>
      </div>
    )
  }

  const deleteAccount = () => {
    if (! confirm("Biztos törölni szeretnéd a fiókod?")) {
      return
    }

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      }
    }

    axios.delete(
      process.env.REACT_APP_API_REQ_PROFILE_DELETE,
      config
    ).then(response => {
      context.set('loading', false)

      if (response.status === 200) {
        notify(response.data.message)

        setTimeout(() => {
          setRedirectLogout(true)
        }, 10000)
      } else {
        notify('⛔️ Sikertelen fiók törlés')
      }

      if (response.status !== 200 && response.data && response.data.message) {
        setError(response.data.message)
      }
    }).catch(error => {
      context.set('loading', false)

      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      }

      notify('⛔️ Sikertelen fiók törlés')
    })
  }

  return (
    <div className="page-profile-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}
      {redirectLogout ? <Redirect to='/kijelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

            <div className="section">
              <h2><FontAwesomeIcon icon={faIdCardAlt} /> Fiók információk</h2>

              {profile ? <ProfileBox profile={profile} /> : null}

              <div className="btn-wrapper btn-wrapper-flex">
                <Link className="btn btn-primary" to="/kijelentkezes"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</Link>

                <button className="btn btn-danger btn-danger-2" onClick={deleteAccount}><FontAwesomeIcon icon={faTrash} /> Fiók törlése</button>
              </div>
            </div>

            <div className="section">
              <h2><FontAwesomeIcon icon={faKey} /> Jelszó változtatás</h2>

              <form onSubmit={submitPassword}>
                <fieldset>
                  <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label htmlFor="password">Új jelszó</label>
                      <input type="password" name="password" id="password" value={credential.password} onChange={handleChangeInput} />

                      {error && error.password ? Object.values(error.password).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="password_again">Új jelszó ismét</label>
                      <input type="password" name="password_again" id="password_again" value={credential.password_again} onChange={handleChangeInput} />

                      {error && error.password_again ? Object.values(error.password_again).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`password_again-${i}`} />
                      }) : null}
                    </div>

                    <div className="btn-wrapper btn-wrapper-flex">
                      <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSave} /> Mentés</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>

            <div className="section">
              <h2><FontAwesomeIcon icon={faLightbulb} /> Beküldött ötletek ({ideas.length})</h2>

              <div className="row">
                {ideas.length > 0 && !loadIdeas && ideas.map((idea, i) => <IdeasWrapper handleClick={() => {}} key={i} idea={idea} />)}

                {ideas.length == 0 && loadIdeas && <>
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <CardPlaceholder />
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <CardPlaceholder />
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <CardPlaceholder />
                  </div>
                </>}

                {ideas.length == 0 && !loadIdeas && <div className="col-sm-12 col-md-6 col-lg-4">
                  <p>Nincs beküldött ötlet</p>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
