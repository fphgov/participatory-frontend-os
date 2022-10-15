import React, { useEffect, useContext, useState } from 'react'
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  Redirect
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

  let location = useLocation()
  let { path } = useRouteMatch()

  const [ redirect, setRedirect ] = useState(false)
  const [ profile, setProfile ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState('')
  const [ scroll, setScroll ] = useState(false)
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
    'cost': '',
    'locationDescription': '',
    'locationDistrict': '',
    'privacy': false,
  })

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
    ideaFormData.append('cost', formData.cost)
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

        localStorage.removeItem('idea')

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
        setError(error.response.data.errors)
        setScroll(true)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később. Amennyiben a hiba ismétlődik, kérünk, küldd el ötleted a <a href="mailto:nyitott@budapest.hu">nyitott@budapest.hu</a>-ra december 31. éjfélig. Köszönjük megértésedet!')
        setScroll(true)
      }

      recaptcha.execute()
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-idea-submission')

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    if (localStorage.getItem('idea') !== null) {
      try {
        const jsonIdea = JSON.parse(localStorage.getItem('idea'))

        if (jsonIdea['medias']) {
          jsonIdea['medias'] = []
        }

        setFormData(jsonIdea)
      } catch (error) {
        console.warn(error);
      }
    }

    return () => {
      document.body.classList.remove('page-idea-submission')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('idea', JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    setProfile(tokenParser('user'))

    return () => {
      setProfile(null)
    }
  }, [context.get('token')])

  useEffect(() => {
    if (profile === null) {
      setRedirect(true)
    }
  }, [profile])

  return (
    <div className="page-idea-submission-section">
      {scroll && document.querySelector('.error-message') ? <ScrollTo element={document.querySelector('.error-message').offsetTop} /> : null}

      {redirect ? <Redirect to={{ pathname: '/bejelentkezes', state: { redirect: '/bekuldes' } }}/> : null}

      {!success ? <>
        <HeroPage title="Ötlet beküldése">
          <p>Köszönjük, hogy megosztod velünk ötleted!</p>
        </HeroPage>

        <div className="form-status-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                <ul className="form-status">
                  <li><Link to={`${path}`}><span className={location.pathname === `${path}` ? 'active': ''}>1</span> <div className="description">Kategória megadása</div></Link></li>
                  <li><Link to={`${path}/adatok`}><span className={location.pathname === `${path}/adatok` ? 'active' : ''}>2</span> <div className="description">Részletek leírása</div></Link></li>
                  <li><Link to={`${path}/attekintes`}><span className={location.pathname === `${path}/attekintes` ? 'active' : ''}>3</span> <div className="description">Áttekintés és beküldés</div></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </> : null}

      <div className="container">
        <div className="row">
          <div className="col-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
            <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }}>
              <fieldset>
                {(typeof error === 'string') ? <Error message={error} /> : null}

                {!success ? <>
                  <div className="form-wrapper-idea">
                    <Switch>
                      <Route path={`${path}`} exact>
                        <IdeaCategory
                          nextStepTo={`${path}/adatok`}
                          handleChange={handleChangeInput}
                          changeRaw={changeRaw}
                          changeInputAddress={handleChangeInputAddress}
                          profile={profile}
                          error={error}
                          values={formData} />
                      </Route>
                      <Route path={`${path}/adatok`}>
                        <IdeaBasic
                          nextStepTo={`${path}/attekintes`}
                          handleAddElem={handleAddElem}
                          handleRemoveElem={handleRemoveElem}
                          handleChange={handleChangeInputTitle}
                          handleChangeNumber={handleChangeInputNumber}
                          profile={profile}
                          changeRaw={changeRaw}
                          error={error}
                          values={formData} />
                      </Route>
                      <Route path={`${path}/attekintes`}>
                        <IdeaOverview
                          values={formData}
                          profile={profile}
                          error={error}
                          submitIdea={submitIdea} />
                      </Route>
                    </Switch>
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

            {success ? <div className="info-page">
              {document.body.classList.add('page-full-dark')}

              <h2>Köszönjük, hogy megosztottad velünk ötleted!</h2>
              <p>Megkaptuk ötletedet, pár napon belül, rövid ellenőrzést követően mindenki számára láthatóvá válik a honlapon a beküldött ötletek között. Erről e-mailen kapsz majd visszajelzést. Ha van további ötleted, add be azt is most!</p>
              <a href="/bekuldes" className="btn btn-secondary">Új ötletet küldök be</a>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
