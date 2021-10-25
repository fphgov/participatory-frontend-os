import React, { useEffect, useContext, useState } from 'react'
import {
  Link,
} from "react-router-dom"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmAllCharForName, rmAllCharForTitle, rmAllCharForAddress } from '../lib/removeSpecialCharacters'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import ScrollTo from "../common/ScrollTo"
import tokenParser from '../assets/tokenParser'
import IdeaBasic from "../common/form/IdeaBasic"
import IdeaLocation from "../common/form/IdeaLocation"
import IdeaInformation from "../common/form/IdeaInformation"
import IdeaOverview from "../common/form/IdeaOverview"

export default function IdeaSubmission() {
  const context = useContext(StoreContext)

  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ step, setStep ] = useState(1)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ formData, setFormData ] = useState({
    'title': '',
    'solution': '',
    'description': '',
    'links': [],
    'medias': [],
    'theme': '',
    'participateChoose': '',
    'participate': '',
    'location': '',
    'privacy': false,
  })

  const firstStep = () => {
    setStep(1)
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const nextStep = () => {
    if (step <= 4) {
      setStep(step + 1)
    }
  }

  const handleChangeInput = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForName(e.target.value)

    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleChangeInputTitle = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForTitle(e.target.value)

    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleChangeInputAddress = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmAllCharForAddress(e.target.value)

    setFormData({ ...formData, [ e.target.name ]: value })
  }

  const handleChangeRaw = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const changeRaw = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleAddElem = (name, value) => {
    formData[name].push(value)

    setFormData({ ...formData, [name]: formData[name] })
  }

  const handleRemoveElem = (name, value) => {
    const item = removeItemOnce(formData[name], value)

    setFormData({ ...formData, [name]: item })
  }

  const removeItemOnce = (array, value) => {
    const index = array.indexOf(value)

    if (index > -1) {
      array.splice(index, 1);
    }

    return array;
  }

  useEffect(() => {
    document.body.classList.add('page-idea-submission')

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    return () => {
      document.body.classList.remove('page-idea-submission')
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

  const submitIdea = (e) => {
    if (e) {
      e.preventDefault()
    }

    setError(null)
    setScroll(false)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      }
    }

    const data = {
      ...formData,
      'g-recaptcha-response': recaptchaToken,
    }

    delete data['links']
    delete data['medias']
    delete data['participateChoose']

    if (typeof data['location'] === 'object') {
      data['location'] = new URLSearchParams(data['location'])
    }

    const search = new URLSearchParams(data)

    formData.links.forEach((link, i) => {
      search.append(`links[${i}]`, link)
    })

    Array.from(formData.medias).forEach((file, i) => {
      search.append(`medias[${i}]`, file)
    })

    context.set('loading', true)

    axios
    .post(
      process.env.REACT_APP_API_REQ_PROFILE_IDEA,
      search.toString(),
      config
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
        setError('Váratlan hiba történt, kérjük próbálja később')
        setScroll(true)
      }

      recaptcha.execute()
      context.set('loading', false)
    })
  }

  useEffect(() => {
    setProfile(tokenParser('user'))

    return () => {
      setProfile(null)
    }
  }, [context.get('token')])

  return (
    <div className="page-idea-submission-section">
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={document.querySelector('.error-message-inline').offsetTop} /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }}>
              <fieldset>
                {(typeof error === 'string') ? <Error message={error} /> : null}

                <legend>Ötlet beküldése</legend>

                {!success ? <>
                  <p>Üdvözöljük Budapest közösségi költségvetésének ötletbenyújtó felületén!</p>

                  <p>Javasoljuk, hogy ötlete benyújtása előtt mindenképp olvassa el <Link to="/hirek/tudnivalok-az-otletek-benyujtasarol" target="_blank">a kategóriák leírásait és a beküldésről szóló cikket</Link>.</p>

                  <p>Hasznos, ha akkor kezd neki ötlete beküldésének, ha azt már átgondolta és leírta részleteiben, mert az űrlap kitöltése nem szakítható félbe. A beérkezett ötletek ellenőrzés után nyilvánosan megtekinthetők lesznek a Beküldött ötletek menüpontban.</p>

                  <p>Köszönjük, hogy megosztja velünk az ötletét!</p>

                  {profile ? <>
                    <div className="form-wrapper-idea">
                      <ul className="form-status">
                        <li><span className={step >= 1 ? 'active': ''}>1</span></li>
                        <li><span className={step >= 2 ? 'active' : ''}>2</span></li>
                        <li><span className={step >= 3 ? 'active' : ''}>3</span></li>
                        <li><span className={step >= 4 ? 'active' : ''}>4</span></li>
                      </ul>

                      {(() => {
                        switch (step) {
                          case 1:
                            return (
                              <IdeaBasic
                                nextStep={nextStep}
                                prevStep={null}
                                handleAddElem={handleAddElem}
                                handleRemoveElem={handleRemoveElem}
                                handleChange={handleChangeInputTitle}
                                profile={profile}
                                changeRaw={changeRaw}
                                profile={profile}
                                error={error}
                                values={formData} />
                            )
                          case 2:
                            return (
                              <IdeaLocation
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChangeInput}
                                changeRaw={changeRaw}
                                changeInputAddress={handleChangeInputAddress}
                                profile={profile}
                                error={error}
                                values={formData} />
                            )
                          case 3:
                            return (
                              <IdeaInformation
                                nextStep={nextStep}
                                prevStep={prevStep}
                                handleChange={handleChangeInput}
                                handleChangeTitle={handleChangeInputTitle}
                                profile={profile}
                                error={error}
                                values={formData} />
                            )
                          case 4:
                            return (
                              <IdeaOverview
                                firstStep={firstStep}
                                values={formData}
                                profile={profile}
                                error={error}
                                submitIdea={submitIdea} />
                            )
                          }
                      })()}
                    </div>
                  </> : <p>Ötlet beküldéshez <Link to="/bejelentkezes">be kell jelentkezni</Link>.</p>}
                </>: null}
              </fieldset>

              <ReCaptcha
                ref={ref => setRecaptcha(ref)}
                sitekey={process.env.SITE_KEY}
                action='submit'
                verifyCallback={(recaptchaToken) => {
                  setRecaptchaToken(recaptchaToken)
                }}
              />
            </form>

            {success ? <div style={{ padding: '0.35em 0.75em 0.625em' }}>
              <p>Az ötlet beküldés sikeres, hamarosan kap egy megerősítő e-mailt.</p>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
