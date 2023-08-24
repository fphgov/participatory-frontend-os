'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { apiProfileSaving } from "@/lib/api-requests"

export default function ProfilSavingForm(): JSX.Element {
  const params = useParams()
  const router = useRouter()

  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()
  const [ filterData, setFilterData ] = useState({
    'profile_save': false,
    'newsletter': false,
    'live_in_city': false,
    'privacy': false,
  })

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFilterData({ ...filterData, [e.target.name]: value })
  }

  async function submitProfileSaving(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setErrorObject(undefined)
    setError('')

    const data = {
      ...filterData,
      'g-recaptcha-response': recaptchaToken,
    }

    try {
      await apiProfileSaving((params?.hash as string || ''), data)

      router.push("/profil/megorzes/sikeres")
    } catch (e: any) {
      try {
        const jsonError = JSON.parse(e.message)

        setErrorObject(jsonError)
      } catch (jError: any) {
        if (typeof e?.message === "string") {
          setError(e.message)
        }
      }

      recaptcha?.execute()
    }
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  return <>
    <form className="form-horizontal" onSubmit={submitProfileSaving}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="form-group">
          <label htmlFor="profile_save" className="form-group-label">
            <input className="form-control" type="checkbox" id="profile_save" name="profile_save" defaultChecked={filterData.profile_save} onChange={handleChangeInput} />
            Regisztráció megerősítése
          </label>
          <p className="tipp">A most megerősített regisztrációdat később már nem kell évente újra jóváhagyni. Ha a jövőben megszüntetnéd regisztrációdat, a honlapon a bejelentkezést követően a Fiók menüpontban ezt bármikor megteheted.</p>

          {errorObject && errorObject.profile_save ? Object.values(errorObject.profile_save).map((err, i) => {
            return <ErrorMini key={i} error={err} increment={`profile_save-${i}`} />
          }) : null}
        </div>

        <div className="form-group">
          <label htmlFor="newsletter" className="form-group-label">
            <input className="form-control"  type="checkbox" id="newsletter" name="newsletter" defaultChecked={filterData.newsletter} onChange={handleChangeInput} />
            Feliratkozom a közösségi költségvetés hírlevelére
          </label>
          <p className="tipp">Ne maradj le a közösségi költségvetéssel kapcsolatos legfontosabb hírekről és eseményekről, iratkozz fel hírlevelünkre! A hírlevelet körülbelül havonta egyszer küldjük ki, abban kizárólag a közösségi költségvetéssel kapcsolatban adunk információt, tájékoztatást, és a jövőben bármikor leiratkozhatsz róla.</p>

          {errorObject && errorObject.newsletter ? Object.values(errorObject.newsletter).map((err, i) => {
            return <ErrorMini key={i} error={err} increment={`newsletter-${i}`} />
          }) : null}
        </div>

        <div className="form-group">
          <label htmlFor="live_in_city" className="form-group-label">
            <input className="form-control" type="checkbox" id="live_in_city" name="live_in_city" defaultChecked={filterData.live_in_city} onChange={handleChangeInput} />
            Megerősítem, hogy elmúltam 16 éves, és jelenleg is budapesti lakos vagyok, vagy Budapesten dolgozom, vagy Budapesten tanulok.
          </label>

          {errorObject && errorObject.live_in_city ? Object.values(errorObject.live_in_city).map((err, i) => {
            return <ErrorMini key={i} error={err} increment={`live_in_city-${i}`} />
          }) : null}
        </div>

        <div className="form-group">
          <label htmlFor="privacy" className="form-group-label">
            <input className="form-control" type="checkbox" id="privacy" name="privacy" defaultChecked={filterData.privacy} onChange={handleChangeInput} />
            Elfogadom az <a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">adatvédelmi tájékoztatót</a> *
          </label>

          {errorObject && errorObject.privacy ? Object.values(errorObject.privacy).map((err, i) => {
            return <ErrorMini key={i} error={err} increment={`privacy-${i}`} />
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

        <input type="submit" value="Aktiválom" className="btn btn-primary" />
      </fieldset>
    </form>
  </>
}
