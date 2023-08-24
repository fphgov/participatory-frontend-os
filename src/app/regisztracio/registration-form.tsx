'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import { apiRegistration } from "@/lib/api-requests"
import { rmAllCharForEmail, rmAllCharForName, rmForNumber } from "@/utilities/removeSpecialCharacters"
import { useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"

export default function RegistrationForm(): JSX.Element {
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()
  const [ success, setSuccess ] = useState(false)
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
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
    'newsletter': '',
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : rmAllCharForName(e.target.value)

    setFilterData({ ...filterData, [e.target.name]: value })
  }

  const handleChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: rmAllCharForEmail(e.target.value) })
  }

  const handleChangeNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [ e.target.name ]: rmForNumber(e.target.value) })
  }

  const handleChangeRaw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value })
  }

  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const data = {
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
      newsletter: filterData.newsletter,
      'g-recaptcha-response': recaptchaToken,
    }

    try {
      const response = await apiRegistration(data)

      if (response.data) {
        setSuccess(true)
      }
    } catch (error: any) {
      if (typeof error.message === "string") {
        setError(error.message)
      } else {
        const jsonError = JSON.parse(error.message)

        setErrorObject(jsonError)
      }

      setScroll(true)

      recaptcha?.execute()
    }
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  return (
    <>
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

      <form className="form-horizontal" onSubmit={submitRegistration}>
        <fieldset>
          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          {!success ? <>
            <div className="form-wrapper">
              <div className="input-wrapper">
                <label htmlFor="lastname">Családnév <sup>*</sup></label>
                <p className="tipp">Ha ötletet küldesz be, akkor az itt megadott neved nyilvánosan megjelenik az oldalon a beküldött ötletednél.</p>
                <input type="text" placeholder="Vezetéknév" name="lastname" id="lastname" value={filterData.lastname} onChange={handleChangeInput} />

                {errorObject?.lastname ? Object.values(errorObject.lastname).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`lastname-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="firstname">Utónév <sup>*</sup></label>
                <p className="tipp">Ha ötletet küldesz be, akkor az itt megadott neved nyilvánosan megjelenik az oldalon a beküldött ötletednél.</p>
                <input type="text" placeholder="Utónév" name="firstname" id="firstname" value={filterData.firstname} onChange={handleChangeInput} />

                {errorObject?.firstname ? Object.values(errorObject.firstname).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`firstname-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="email">E-mail <sup>*</sup></label>
                <input type="text" placeholder="E-mail" name="email" id="email" value={filterData.email} onChange={handleChangeEmailInput} />

                {errorObject?.email ? Object.values(errorObject.email).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`email-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Jelszó <sup>*</sup></label>
                <input type="password" placeholder="Jelszó" name="password" id="password" value={filterData.password} onChange={handleChangeRaw} />

                {errorObject?.password ? Object.values(errorObject.password).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="password_confirm">Jelszó megerősítése <sup>*</sup></label>
                <input type="password" placeholder="Jelszó megerősítése" name="password_confirm" id="password_confirm" value={filterData.password_confirm} onChange={handleChangeRaw} />

                {errorObject?.password_confirm ? Object.values(errorObject.password_confirm).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`password_confirm-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="birthyear">Születési év <sup>*</sup></label>
                <input type="text" placeholder="Születési év" name="birthyear" id="birthyear" maxLength={4} value={filterData.birthyear} onChange={handleChangeNumberInput} />

                {errorObject?.birthyear ? Object.values(errorObject.birthyear).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`birthyear-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="postal_code">Irányítószám *</label>
                <p className="tipp">Ahol élsz, vagy ha ez nem budapesti, akkor ahol dolgozol/tanulsz.</p>
                <input type="text" placeholder="Irányítószám" name="postal_code" id="postal_code" maxLength={4} value={filterData.postal_code} onChange={handleChangeNumberInput} />

                {errorObject?.postal_code ? Object.values(errorObject.postal_code).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`postal_code-${i}`} />
                }) : null}
              </div>

              <div className="input-wrapper">
                <label htmlFor="hear_about">Honnan értesültél a közösségi költségvetésről?</label>
                {errorObject?.hear_about ? Object.values(errorObject.hear_about).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`hear_about-${i}`} />
                }) : null}
                <div className="form-group form-group-hear-about">
                  <select name="hear_about" onChange={handleChangeInput}>
                    <option value="">Válassz a lehetőségek közül</option>
                    <option disabled>---</option>
                    <option value="friend">Családtól / baráttól / ismerőstől (személyesen)</option>
                    <option value="street">Utcai plakátról</option>
                    <option value="news">Híroldalon olvastam</option>
                    <option value="news_ads">Híroldalon hirdetésből</option>
                    <option value="transport">Buszon/villamoson láttam</option>
                    <option value="facebook_municipatory">Budapest Városháza Facebook oldalról</option>
                    <option value="facebook_im_in_budapest">Énbudapestem Facebook oldalról</option>
                    <option value="facebook">Facebook csoportból</option>
                    <option value="facebook_firend">Ismerős / barát / szervezet Facebook posztjából</option>
                    <option value="civil">Civil szervezet hírleveléből, civil szervezettől</option>
                    <option value="library">Fővárosi Szabó Ervin Könyvtárban</option>
                    <option value="other">Egyéb</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="privacy" className="form-group-label">
                  <input className="form-control" type="checkbox" id="privacy" name="privacy" value={filterData.privacy} onChange={handleChangeInput} />
                  Elolvastam és elfogadom az <a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatót</a> *
                </label>

                {errorObject?.privacy ? Object.values(errorObject.privacy).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`privacy-${i}`} />
                }) : null}
              </div>

              <div className="form-group">
                <label htmlFor="live_in_city" className="form-group-label">
                  <input className="form-control" type="checkbox" id="live_in_city" name="live_in_city" value={filterData.live_in_city} onChange={handleChangeInput} />
                  Kijelentem, hogy elmúltam 16 éves és budapesti lakos vagyok, vagy Budapesten dolgozom, vagy Budapesten tanulok. *
                </label>

                {errorObject?.live_in_city ? Object.values(errorObject.live_in_city).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`live_in_city-${i}`} />
                }) : null}
              </div>

              <div className="form-group">
                <label htmlFor="newsletter" className="form-group-label">
                  <input className="form-control" type="checkbox" id="newsletter" name="newsletter" value={filterData.newsletter} onChange={handleChangeInput} />
                  Szeretnék értesülni a közösségi költségvetés híreiről, feliratkozom a hírlevélre
                </label>

                {errorObject?.newsletter ? Object.values(errorObject.newsletter).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`newsletter-${i}`} />
                }) : null}
              </div>

              <div className="form-group">
                <label htmlFor="prize" className="form-group-label">
                  <input className="form-control" type="checkbox" id="prize" name="prize" value={filterData.prize} onChange={handleChangeInput} />
                  Szeretnék részt venni a nyereményjátékon és az ehhez szükséges adataim kezeléséhez hozzájárulok.
                </label>

                {errorObject?.prize ? Object.values(errorObject.prize).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`prize-${i}`} />
                }) : null}
              </div>

              <ReCaptcha
                ref={(ref: any) => setRecaptcha(ref)}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
                action='submit'
                verifyCallback={(recaptchaToken: string) => {
                  setRecaptchaToken(recaptchaToken)
                }}
              />

              <button className="btn btn-primary btn-headline next-step">
                Regisztrálok
              </button>
            </div>
          </> : null}
        </fieldset>
      </form>

      {success ? <div style={{ padding: '0.35em 0.75em 0.625em' }}>
          <h2>Köszönjük regisztrációd!</h2>
          <p>A végelesítéshez kérjük kattints az általunk küldött megerősítő e-mail-ben található linkre, amit ide küldtünk: {filterData.email}</p>
      </div> : null}
    </>
  )
}
