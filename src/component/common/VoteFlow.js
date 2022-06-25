import React, { useEffect, useState, useContext } from 'react'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { rmAllCharForName } from '../lib/removeSpecialCharacters'
import API from '../assets/axios'
import ScrollTo from "../common/ScrollTo"
import ScrollToTop from "../common/ScrollToTop"
import tokenParser from '../assets/tokenParser'
import StoreContext from '../../StoreContext'
import VoteCategory from '../common/form/VoteCategory'
import VoteOverview from '../common/form/VoteOverview'

export default function VoteFlow() {
  const context = useContext(StoreContext)

  const [ projects, setProjects ] = useState([])
  const [ profile, setProfile ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ success, setSuccess ] = useState(false)
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState(null)
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ step, setStep ] = useState(1)
  const [ formData, setFormData ] = useState({
    'theme_CARE_small': 0,
    'theme_CARE_big': 0,
    'theme_GREEN_small': 0,
    'theme_GREEN_big': 0,
    'theme_OPEN_small': 0,
    'theme_OPEN_big': 0,
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

    setFormData({ ...formData, [ e.target.name ]: value })
  }

  useEffect(() => {
    document.body.classList.add('page-vote')

    getVotableProjects()

    loadReCaptcha(process.env.SITE_KEY, (recaptchaToken) => {
      setRecaptchaToken(recaptchaToken)
    })

    return () => {
      document.body.classList.remove('page-vote')
    }
  }, [])

  useEffect(() => {
    setProfile(tokenParser('user'))

    return () => {
      setProfile(null)
    }
  }, [context.get('token')])

  const getVotableProjects = () => {
    context.set('loading', true)

    API.get(
      process.env.REACT_APP_API_REQ_VOTE_LIST
    ).then(response => {
      if (response.data && response.data.data) {
        setProjects(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }

      setRedirect(true)
    }).finally(() => {
      context.set('loading', false)
    })
  }

  const submitVote = (e) => {
    if (e) {
      e.preventDefault()
    }

    context.set('loading', true)

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

    ideaFormData.append('projects[0]', formData.theme_CARE_small)
    ideaFormData.append('projects[1]', formData.theme_CARE_big)
    ideaFormData.append('projects[2]', formData.theme_GREEN_small)
    ideaFormData.append('projects[3]', formData.theme_GREEN_big)
    ideaFormData.append('projects[4]', formData.theme_OPEN_small)
    ideaFormData.append('projects[5]', formData.theme_OPEN_big)
    ideaFormData.append('g-recaptcha-response', recaptchaToken)

    API.post(
      process.env.REACT_APP_API_REQ_PROFILE_VOTE,
      ideaFormData,
      config
    )
    .then(response => {
      if (response.data && response.status === 200) {
        setSuccess(true)
      }
    })
    .catch(error => {
      if (window.Rollbar && window.Rollbar.info) {
        window.Rollbar.info("Send vote impossible", error.response)
      }

      if (error.response && error.response.status === 403) {
        setError('Google reCapcha ellenőrzés sikertelen')
        setScroll(true)
      } if (error.response && error.response.status === 500) {
        if (error.response.headers[ 'content-type' ] && error.response.headers[ 'content-type' ].match(/text\/html/)) {
          const wafInfo = getWafInfo(error.response.data)

          setError('A tűzfalunk hibát érzékelt, ezért az ötletet nem tudjuk befogadni. A kellemetlenségért elnézést kérünk! Kérünk, vedd fel velünk a kapcsolatot a <a href="mailto:nyitott@budapest.hu?subject=WAF%20probléma%20(' + wafInfo.messageId + ')&body=Tisztelt%20Főváros!%0D%0A%0D%0APróbáltam%20ötletet%20beadni,%20de%20hibaüzenetet%20kaptam.%0D%0A%0D%0AA%20hiba%20azonosítója:%20' + wafInfo.messageId + '">nyitott@budapest.hu</a> címen! (A hiba azonosítója: ' + wafInfo.messageId + ')')
          setScroll(true)
        }
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
        setScroll(true)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később. Amennyiben a hiba ismétlődik, kérünk, küldd el ötleted a <a href="mailto:nyitott@budapest.hu">nyitott@budapest.hu</a>-ra január 31. éjfélig. Köszönjük megértésedet!')
        setScroll(true)
      }

      recaptcha.execute()
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  return (
    <div className="vote-flow">
      {scroll && document.querySelector('.error-message') ? <ScrollTo element={document.querySelector('.error-message').offsetTop} /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {! success ? <>
              <form className="form-horizontal" onSubmit={(e) => { e.preventDefault() }}>
                <h2>Szavazás a 2021/22-es közösségi költségvetés ötleteire</h2>

              <ul className="form-status" aria-hidden="true">
                <li><span className={step >= 1 ? 'active' : ''}>1</span></li>
                <li><span className={step >= 2 ? 'active' : ''}>2</span></li>
                <li><span className={step >= 3 ? 'active' : ''}>3</span></li>
                <li><span className={step >= 4 ? 'active' : ''}>4</span></li>
              </ul>

              {(() => {
                switch (step) {
                  case 1:
                    return (
                      <ScrollToTop>
                        <VoteCategory
                          name={'Zöld Budapest'}
                          code="GREEN"
                          description={<>
                            <p>Budapest felkészül a klímaváltozásra. Zöldebb utcák, élettel teli parkok, mindenki számára elérhető, környezettudatos megoldások - ilyen ötleteket találsz ebben a kategóriában.</p>

                            <p>Kérjük jelöld be a kis ötletek és a nagy ötletek közül, amelyikre szavazni szeretnél, majd kattints a Tovább gombra.</p>
                          </>}
                          nextStep={nextStep}
                          prevStep={null}
                          handleChange={handleChangeInput}
                          error={error}
                          values={formData}
                          projects={projects}
                        />
                      </ScrollToTop>
                    )
                  case 2:
                    return (
                      <ScrollToTop>
                        <VoteCategory
                          name={'Esélyteremtő Budapest'}
                          code="CARE"
                          description={<>
                            <p>A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel, például szociális segítségnyújtással. Ilyen ötleteket találsz ebben a kategóriában.</p>

                            <p>Kérjük jelöld be a kis ötletek és a nagy ötletek közül, amelyikre szavazni szeretnél, majd kattints a Tovább gombra.</p>
                          </>}
                          nextStep={nextStep}
                          prevStep={prevStep}
                          handleChange={handleChangeInput}
                          error={error}
                          values={formData}
                          projects={projects}
                        />
                      </ScrollToTop>
                    )
                  case 3:
                    return (
                      <ScrollToTop>
                        <VoteCategory
                          name={'Nyitott Budapest'}
                          code="OPEN"
                          description={<>
                            <p>Egy nyitott város a szívügyed?Együttműködések, új, kísérleti megoldások, digitális fejlesztések, rövid távú, közösségépítő ötletek.Ilyen ötleteket találsz ebben a kategóriában.</p>

                            <p>Kérjük jelöld be a kis ötletek és a nagy ötletek közül, amelyikre szavazni szeretnél, majd kattints a Tovább gombra.</p>
                          </>}
                          nextStep={nextStep}
                          prevStep={prevStep}
                          handleChange={handleChangeInput}
                          error={error}
                          values={formData}
                          projects={projects}
                        />
                      </ScrollToTop>
                    )
                  case 4:
                    return (
                      <ScrollToTop>
                        <VoteOverview
                          firstStep={firstStep}
                          values={formData}
                          onSubmit={submitVote}
                          profile={profile}
                          error={error}
                          projects={projects}
                        />
                      </ScrollToTop>
                    )
                }
              })()}

              <ReCaptcha
                ref={ref => setRecaptcha(ref)}
                sitekey={process.env.SITE_KEY}
                action='submit'
                verifyCallback={(recaptchaToken) => {
                  setRecaptchaToken(recaptchaToken)
                }}
              />
              </form>
            </> : null}

            {success ? <div style={{ padding: '0.35em 0.75em 0.625em' }}>
              <h3>Köszönjük, hogy leadtad a 2021/22-es közösségi költségvetésben is a szavazatodat</h3>
              <p>A beküldést sikeresen rögzítettük. Pár percen belül kapni fogsz erről egy megerősítő e-mailt, melyben szerepelni fog az általad kiválasztott ötleteknek a listája.</p>
            </div> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
