import React, { useContext, useEffect, useState } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

export default function ProfileSaving() {
  const context = useContext(StoreContext)

  const [ profileSave, setProfileSave ] = useState(false)
  const [ subscribeNewsletter, setSubscribeNewsletter ] = useState(false)
  const [ liveInCity, setLiveInCity ] = useState(false)
  const [ privacy, setPrivacy ] = useState(false)
  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  let { hash } = useParams()

  const submitProfileActivate = (e) => {
    e.preventDefault();

    context.set('loading', true)

    setError('')

    const link = process.env.REACT_APP_API_REQ_PROFILE_CONFIRMATION.toString().replace(':hash', hash)

    const formData = {
      profile_save: profileSave,
      newsletter: subscribeNewsletter,
      live_in_city: liveInCity,
      privacy: privacy,
    }

    axios
    .post(link, new URLSearchParams(formData).toString())
    .then(response => {
      if (response.status === 200 && response.data.message) {
        setSuccess(true)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      } else if (error.response && error.response.data.message) {
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

  const ErrorMini = (props) => {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
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
            <h1>Felhasználói fiók megerősítése</h1>

            {error && typeof error === 'string' ? <Error message={error} /> : null}
            {success ? <Success message="Sikeresen aktiváltad a fiókod!" /> : null}

            {! success ? <>
              <p>Köszönjük, hogy velünk maradsz! Kérjük, most erősítsd meg regisztrációdat!</p>

              <form onSubmit={submitProfileActivate}>
                <div className="form-group">
                  <label htmlFor="profile_save" className="form-group-label">
                    <input className="form-control" type="checkbox" id="profile_save" name="profile_save" value={profileSave} onClick={() => { setProfileSave(! profileSave)} } />
                    Regisztráció megerősítése
                  </label>
                  <p className="tipp">A most megerősített regisztrációdat később már nem kell évente újra jóváhagyni. Ha a jövőben megszüntetnéd regisztrációdat, a honlapon a bejelentkezést követően a Fiók menüpontban ezt bármikor megteheted.</p>

                  {error && error.profile_save ? Object.values(error.profile_save).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`profile_save-${i}`} />
                  }) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="newsletter" className="form-group-label">
                    <input className="form-control"  type="checkbox" id="newsletter" name="newsletter" value={subscribeNewsletter} onClick={() => { setSubscribeNewsletter(! subscribeNewsletter)} } />
                    Feliratkozom a közösségi költségvetés hírlevelére
                  </label>
                  <p className="tipp">Ne maradj le a közösségi költségvetéssel kapcsolatos legfontosabb hírekről és eseményekről, iratkozz fel hírlevelünkre! A hírlevelet körülbelül havonta egyszer küldjük ki, abban kizárólag a közösségi költségvetéssel kapcsolatban adunk információt, tájékoztatást, és a jövőben bármikor leiratkozhatsz róla.</p>

                  {error && error.newsletter ? Object.values(error.newsletter).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`newsletter-${i}`} />
                  }) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="live_in_city" className="form-group-label">
                    <input className="form-control" type="checkbox" id="live_in_city" name="live_in_city" onClick={() => { setLiveInCity(! liveInCity)} } />
                    Megerősítem, hogy elmúltam 16 éves, és jelenleg is budapesti lakos vagyok, vagy Budapesten dolgozom, vagy Budapesten tanulok.
                  </label>

                  {error && error.live_in_city ? Object.values(error.live_in_city).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`live_in_city-${i}`} />
                  }) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="privacy" className="form-group-label">
                    <input className="form-control" type="checkbox" id="privacy" name="privacy" value={privacy} onChange={() => { setPrivacy(! privacy)} } />
                    Elfogadom az <a href={`${process.env.REACT_APP_SERVER_FILE}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatvédelmi tájékoztatót</a> *
                  </label>

                  {error && error.privacy ? Object.values(error.privacy).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`privacy-${i}`} />
                  }) : null}
                </div>

                <input type="submit" value="Aktiválom" className="btn btn-primary" />
              </form>
            </> : null}

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
