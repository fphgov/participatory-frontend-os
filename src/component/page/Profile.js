import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default function Profile() {
  const context = useContext(StoreContext)

  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')
  const [redirectLogin, setRedirectLogin] = useState(false)

  const getProfileData = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${context.get('token')}`,
      }
    }

    axios
    .get(process.env.REACT_APP_API_REQ_PROFILE, config)
    .then(response => {
      if (response.data) {
        setProfile(response.data)
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

  useEffect(() => {
    document.body.classList.add('page-profile')

    context.set('loading', true, () => {
      getProfileData()
    })

    return () => {
      document.body.classList.remove('page-profile')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const ProfileBox = (props) => {
    return (
      <div className="box-profile">
        <p><b>Név:</b> {props.profile.lastname + ' ' + props.profile.firstname}</p>
        <p><b>E-mail:</b> {props.profile.email}</p>
      </div>
    )
  }

  return (
    <div className="page-profile-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Profil</h1>

            {error ? <Error message={error} /> : null}

            {profile ? <ProfileBox profile={profile} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
