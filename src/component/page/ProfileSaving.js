import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default function ProfileSaving() {
  const context = useContext(StoreContext)

  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  let { hash } = useParams()

  const submitProfileActivate = () => {
    context.set('loading', true)

    const link = process.env.REACT_APP_API_REQ_PROFILE_ACTIVATE.toString().replace(':hash', hash)

    axios
    .get(link)
    .then(response => {
      if (response.status === 200) {
        setSuccess(true)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbáld később')
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-profile-activate')

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
            <h1>Felhasználói fiók aktiválása</h1>

            <p>Hamarosan újraindul a fővárosi részvételi költségvetés, 2021-ben közösségi költségvetés néven. Aktiváld fiókod, ha szeretnél az idei ötletgyűjtésben is részt venni.</p>

            {error ? <Error message={error} /> : null}
            {success ? <Success message="Sikeresen aktiváltad a fiókod!" /> : null}

            {! success ? <input type="submit" value="Aktiválom" className="btn btn-primary" onClick={() => {
              submitProfileActivate()
            }} /> : null}

            <p><i>Ha nem nyomsz az aktiválás gombra, 2021. november 1-jén éjfél után töröljük a fiókodat. Ezután ötlet beküldéséhez újra kell majd regisztrálnod.</i></p>

            {!context.get('loading') && success ? (<>
              <div className="small">
                <button className="btn btn-primary" onClick={() => { setRedirectLogin(true) }}>Tovább</button>
              </div>
            </>) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
