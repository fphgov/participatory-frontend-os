import React, { useContext, useEffect, useState } from 'react'
import {
  useParams,
} from "react-router-dom"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmForNumber, rmAllCharForEmail, rmAllCharForName } from '../lib/removeSpecialCharacters'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import ScrollTo from "../common/ScrollTo"

export default function Registration() {
  const context = useContext(StoreContext)

  let { hash } = useParams()

  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ filterData, setFilterData ] = useState({
    'email': '',
    'password': '',
    'password_confirm': '',
    'lastname': '',
    'firstname': '',
    'postal_code': '',
    'birthyear': '',
    'hear_about': '',
    'live_in_city': '',
    'privacy': '',
    'prize': '',
  })

  const handleChangeInput = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForName(e.target.value)

    setFilterData({ ...filterData, [e.target.name]: value })
  }

  const handleChangeEmailInput = (e) => {
    setFilterData({ ...filterData, [e.target.name]: rmAllCharForEmail(e.target.value) })
  }

  const handleChangeNumberInput = (e) => {
    setFilterData({ ...filterData, [ e.target.name ]: rmForNumber(e.target.value) })
  }

  const handleChangeRaw = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value })
  }

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

  const submitRegistration = (e) => {
    e.preventDefault()

    setScroll(false)

    const data = {
      hash,
      email: filterData.email,
      password: filterData.password,
      password_confirm: filterData.password_confirm,
      lastname: filterData.lastname,
      firstname: filterData.firstname,
      postal_code: filterData.postal_code,
      birthyear: filterData.birthyear,
      hear_about: filterData.hear_about,
      live_in_city: filterData.live_in_city,
      privacy: filterData.privacy,
      prize: filterData.prize,
      'g-recaptcha-response': recaptchaToken,
    }

    context.set('loading', true)

    axios.post(
      process.env.REACT_APP_API_REQ_REGISTRATION,
      new URLSearchParams(data).toString()
    )
    .then(response => {
      if (response.data) {
        setSuccess(true)

        context.set('loading', false)
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen')
        setScroll(true)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
        setScroll(true)
      } else {
        setError('Váratlan hiba történt, kérjük próbáld később')
        setScroll(true)
      }

      recaptcha.execute()
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-registration')

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    return () => {
      document.body.classList.remove('page-registration')
    }
  }, [])

  return (
    <div className="page-registration-section">
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3">
            <form className="form-horizontal" onSubmit={submitRegistration}>
              <fieldset>
                {(typeof error === 'string') ? <Error message={error} /> : null}

                <legend>Regisztráció</legend>

                {!success ? <>
                  <div className="form-wrapper">
                    <div className="input-wrapper">
                      <label htmlFor="lastname">Vezetéknév <sup>*</sup></label>
                      <input type="text" placeholder="Vezetéknév" name="lastname" id="lastname" value={filterData.lastname} onChange={handleChangeInput} />

                      {error && error.lastname ? Object.values(error.lastname).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`lastname-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="firstname">Utónév <sup>*</sup></label>
                      <input type="text" placeholder="Utónév" name="firstname" id="firstname" value={filterData.firstname} onChange={handleChangeInput} />

                      {error && error.firstname ? Object.values(error.firstname).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`firstname-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="email">E-mail <sup>*</sup></label>
                      <input type="text" placeholder="E-mail" name="email" id="email" value={filterData.email} onChange={handleChangeEmailInput} />

                      {error && error.email ? Object.values(error.email).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`email-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="password">Jelszó <sup>*</sup></label>
                      <input type="password" placeholder="Jelszó" name="password" id="password" value={filterData.password} onChange={handleChangeRaw} />

                      {error && error.password ? Object.values(error.password).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="password_confirm">Jelszó megerősítése <sup>*</sup></label>
                      <input type="password" placeholder="Jelszó megerősítése" name="password_confirm" id="password_confirm" value={filterData.password_confirm} onChange={handleChangeRaw} />

                      {error && error.password_confirm ? Object.values(error.password_confirm).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`password_confirm-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="birthyear">Születési év <sup>*</sup></label>
                      <input type="text" placeholder="Születési év" name="birthyear" id="birthyear" maxlength="4" value={filterData.birthyear} onChange={handleChangeNumberInput} />

                      {error && error.birthyear ? Object.values(error.birthyear).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`birthyear-${i}`} />
                      }) : null}
                    </div>

                    <div className="input-wrapper">
                      <label htmlFor="postal_code">Irányítószám</label>
                      <p className="tipp">Ahol élsz, vagy ha ez nem budapesti, akkor ahol dolgozol/tanulsz.</p>
                      <input type="text" placeholder="Irányítószám" name="postal_code" id="postal_code" maxlength="4" value={filterData.postal_code} onChange={handleChangeNumberInput} />

                      {error && error.postal_code ? Object.values(error.postal_code).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`postal_code-${i}`} />
                      }) : null}
                    </div>

                    <h4>Honnan értesültél a közösségi költségvetésről?</h4>
                    {error && error.hear_about ? Object.values(error.hear_about).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`hear_about-${i}`} />
                    }) : null}
                    <div className="form-group form-group-hear-about">
                      <select name="hear_about" onChange={handleChangeInput}>
                        <option value="">Válassz a lehetőségek közül</option>
                        <option disabled>---</option>
                        <option value="friend">Barátoktól, ismerőstől, családtól</option>
                        <option value="street">Utcai plakátról</option>
                        <option value="news">Híroldalról, rádióból, TV-ből</option>
                        <option value="transport">Tömegközlekedési jármű hirdetésből</option>
                        <option value="districtevent">Kerületi tájékoztató eseményről</option>
                        <option value="facebook">Facebook bejegyzésből vagy hirdetésből</option>
                        <option value="civil">Civil szervezet hírleveléből, vagy civil szervezeti találkozón</option>
                        <option value="library">A Fővárosi Szabó Ervin Könyvtárban található brosúrából</option>
                        <option value="other">Egyéb</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="live_in_city" className="form-group-label">
                        <input className="form-control" type="checkbox" id="live_in_city" name="live_in_city" value={filterData.live_in_city} onChange={handleChangeInput} />
                        Kijelentem, hogy elmúltam 16 éves és budapesti lakos vagyok, vagy Budapesten dolgozom, vagy Budapesten tanulok. *
                      </label>

                      {error && error.live_in_city ? Object.values(error.live_in_city).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`live_in_city-${i}`} />
                      }) : null}
                    </div>

                    <div className="form-group">
                      <label htmlFor="privacy" className="form-group-label">
                        <input className="form-control" type="checkbox" id="privacy" name="privacy" value={filterData.privacy} onChange={handleChangeInput} />
                        Elfogadom az <a href={`${process.env.REACT_APP_SERVER_FILE}/adatkezelesi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatvédelmi tájékoztatót</a> *
                      </label>

                      {error && error.privacy ? Object.values(error.privacy).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`privacy-${i}`} />
                      }) : null}
                    </div>

                    <ReCaptcha
                      ref={ref => setRecaptcha(ref)}
                      sitekey={process.env.SITE_KEY}
                      action='submit'
                      verifyCallback={(recaptchaToken) => {
                        setRecaptchaToken(recaptchaToken)
                      }}
                    />

                    <div style={{ display: "inline-block" }}>
                      <button className="btn btn-primary">
                        <span className="glyphicon glyphicon-lock"></span>
                        Regisztrálok
                      </button>
                    </div>
                  </div>
                </> : null}
              </fieldset>
            </form>

            {success ? <div style={{ padding: '0.35em 0.75em 0.625em' }}>
              <p>Kérünk, a regisztrációd befejezéséhez aktiváld a fiókod az e-mail címedre küldött levélben található linkre kattintva.</p>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
