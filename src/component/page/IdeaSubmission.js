import React, { useEffect, useContext, useState } from 'react'
import {
  Link,
} from "react-router-dom"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmForNumber, rmAllCharForName, rmAllCharForTitle, rmAllCharForAddress } from '../lib/removeSpecialCharacters'
import { getWafInfo } from '../assets/helperFunctions'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import ScrollTo from "../common/ScrollTo"
import tokenParser from '../assets/tokenParser'
import IdeaBasic from "../common/form/IdeaBasic"
import IdeaCategory from "../common/form/IdeaCategory"
import IdeaOverview from "../common/form/IdeaOverview"
import HeroPage from '../common/HeroPage'

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
    'location': '',
    'locationDescription': '',
    'locationDistrict': '',
    'privacy': false,
  })

  const firstStep = () => {
    setError(null)
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

  const handleChangeInputNumber = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : rmForNumber(e.target.value)

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
      <div className="error-message" dangerouslySetInnerHTML={{ __html: props.message }}>
      </div>
    )
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
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }

    const ideaFormData = new FormData()

    ideaFormData.append('title', formData.title)
    ideaFormData.append('solution', formData.solution)
    ideaFormData.append('description', formData.description)
    ideaFormData.append('theme', formData.theme)
    ideaFormData.append('location_description', formData.locationDescription)
    ideaFormData.append('location_district', formData.locationDistrict)
    ideaFormData.append('privacy', formData.privacy)
    ideaFormData.append('g-recaptcha-response', recaptchaToken)

    if (typeof formData['location'] === 'object') {
      ideaFormData.append('location', new URLSearchParams(formData['location']))
    } else {
      ideaFormData.append('location', formData.location)
    }

    formData.links.forEach((link, i) => {
      ideaFormData.append(`links[${i}]`, link)
    })

    Array.from(formData.medias).forEach((file, i) => {
      if (file instanceof File) {
        ideaFormData.append(`medias[${i}]`, file)
      }
    })

    context.set('loading', true)

    axios
    .post(
      process.env.REACT_APP_API_REQ_PROFILE_IDEA,
      ideaFormData,
      config
    )
    .then(response => {
      if (response.data) {
        setSuccess(true)

        context.set('loading', false)
      }
    })
    .catch(error => {
      if (window.Rollbar && window.Rollbar.info) {
        window.Rollbar.info("Idea submission impossible", error.response)
      }

      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen')
        setScroll(true)
      } if (error.response && error.response.status === 500) {
        if (error.response.headers['content-type'] && error.response.headers['content-type'].match(/text\/html/)) {
          const wafInfo = getWafInfo(error.response.data)

          setError('A tűzfalunk hibát érzékelt, ezért az ötletet nem tudjuk befogadni. A kellemetlenségért elnézést kérünk! Kérünk, vedd fel velünk a kapcsolatot a <a href="mailto:nyitott@budapest.hu?subject=WAF%20probléma%20(' + wafInfo.messageId + ')&body=Tisztelt%20Főváros!%0D%0A%0D%0APróbáltam%20ötletet%20beadni,%20de%20hibaüzenetet%20kaptam.%0D%0A%0D%0AA%20hiba%20azonosítója:%20' + wafInfo.messageId + '">nyitott@budapest.hu</a> címen! (A hiba azonosítója: ' + wafInfo.messageId + ')')
          setScroll(true)
        }
      } else if (error.response && error.response.data && error.response.data.errors) {
        console.log(error.response.data.errors)
        setScroll(true)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később. Amennyiben a hiba ismétlődik, kérünk, küldd el ötleted a <a href="mailto:nyitott@budapest.hu">nyitott@budapest.hu</a>-ra január 31. éjfélig. Köszönjük megértésedet!')
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
      {scroll && document.querySelector('.error-message') ? <ScrollTo element={document.querySelector('.error-message').offsetTop} /> : null}

      <HeroPage title="Ötlet beküldése">
        <p>Köszönjük, hogy megosztod velünk ötleted! A kitöltési folyamat nem szakítható meg!</p>
      </HeroPage>

      <div className="form-status-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <ul className="form-status">
                <li><span className={step >= 1 ? 'active': ''}>1</span> <div className="description">Kategória megadása</div></li>
                <li><span className={step >= 2 ? 'active' : ''}>2</span> <div className="description">Részletek leírása</div></li>
                <li><span className={step >= 3 ? 'active' : ''}>3</span> <div className="description">Áttekintés és beküldés</div></li>
              </ul>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }}>
              <fieldset>
                {(typeof error === 'string') ? <Error message={error} /> : null}

                {!success ? <>
                  <div className="form-wrapper-idea">
                    {(() => {
                      switch (step) {
                        case 1:
                          return (
                            <IdeaCategory
                              nextStep={nextStep}
                              handleChange={handleChangeInput}
                              changeRaw={changeRaw}
                              changeInputAddress={handleChangeInputAddress}
                              profile={profile}
                              error={error}
                              values={formData} />
                          )
                        case 2:
                          return (
                            <IdeaBasic
                              nextStep={nextStep}
                              handleAddElem={handleAddElem}
                              handleRemoveElem={handleRemoveElem}
                              handleChange={handleChangeInputTitle}
                              handleChangeNumber={handleChangeInputNumber}
                              profile={profile}
                              changeRaw={changeRaw}
                              error={error}
                              values={formData} />
                          )
                        case 3:
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
              <p>Az ötletbeküldés sikeres, hamarosan kapsz egy megerősítő e-mailt.</p>
            </div> : null}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  )
}
