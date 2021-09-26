import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default function ProfileActivate() {
  const context = useContext(StoreContext)

  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  let { hash } = useParams()

  const profileActivate = () => {
    const link = process.env.REACT_APP_API_REQ_PROFILE_ACTIVATE.toString().replace(':hash', hash)

    axios
    .get(link)
    .then(response => {
      if (response.data) {

      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbálja később')
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-profile-activate')

    context.set('loading', true, () => {
      profileActivate()
    })

    return () => {
      document.body.classList.remove('page-profile-activate')
    }
  }, [])

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const Success = (props) => {
    return (
      <div className="success-message">
        {props.message}
      </div>
    )
  }

  return (
    <div className="page-profile-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Felhasználói fiók aktíválása</h1>

            {! context.get('loading') ? (<>
              {error ? <Error message={error} /> : <Success message="A felhasználói fiókjának aktiválását elindítottuk." />}

              <div className="small">
                <button className="btn btn-primary" onClick={() => { setRedirectLogin(true) }}>Vissza</button>
              </div>
            </>) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
