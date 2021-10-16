import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
  Link,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faSignOutAlt, faIdCardAlt, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import IdeasWrapper from "../common/IdeasWrapper"
import CardPlaceholder from "../common/CardPlaceholder"

export default function Profile() {
  const context = useContext(StoreContext)

  const [profile, setProfile] = useState(null)
  const [ideas, setIdeas] = useState([])
  const [loadIdeas, setLoadIdeas] = useState(false)
  const [error, setError] = useState('')
  const [redirectLogin, setRedirectLogin] = useState(false)

  const getPageContent = async () => {
    await getProfileData()
  }

  const getProfileData = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${context.get('token')}`,
      }
    }

    return axios
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

  const getIdeas = () => {
    const data = {
      ids: profile.ideas
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

  useEffect(() => {
    document.body.classList.add('page-profile')

    setLoadIdeas(true)
    context.set('loading', true)

    return () => {
      document.body.classList.remove('page-profile')
    }
  }, [])

  useEffect(() => {
    if (context.get('token')) {
      getPageContent()
    }
  }, [context.get('token')])

  useEffect(() => {
    if (profile && profile.ideas) {
      getIdeas()
    }
  }, [profile])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
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

  const handleClick = () => {
  }

  return (
    <div className="page-profile-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error ? <Error message={error} /> : null}

            <div className="section">
              <h2><FontAwesomeIcon icon={faIdCardAlt} /> Fiók információk</h2>

              {profile ? <ProfileBox profile={profile} /> : null}
            </div>

            <div className="section">
              <h2><FontAwesomeIcon icon={faLightbulb} /> Beküldött ötletek ({ideas.length})</h2>

              <div className="row">
                {ideas.length > 0 && !loadIdeas && ideas.map((idea, i) => <IdeasWrapper handleClick={handleClick} key={i} idea={idea} />)}

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

            <div className="btn-wrapper btn-wrapper-flex">
              <Link className="btn btn-primary" to="/kijelentkezes"><FontAwesomeIcon icon={faSignOutAlt} /> Kijelentkezés</Link>
              <Link className="btn btn-danger" to="/"><FontAwesomeIcon icon={faTrash} /> Fiók törlése</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
