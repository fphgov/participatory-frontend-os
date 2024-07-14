'use client'

import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"
import { apiLostPassword } from "@/lib/api-requests"
import { rmAllCharForEmail } from "@/utilities/removeSpecialCharacters"
import { useEffect, useState } from "react"
import ScrollTo from "@/components/common/ScrollTo"
import ForgotPasswordSuccess from "@/app/elfelejtett-jelszo/forgot-password-success"
import { forgotPasswordForm } from "@/app/actions"

export default function ForgotPasswordForm(): JSX.Element {
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>|undefined>(undefined)
  const [ successMessage, setSuccessMessage ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ filterData, setFilterData ] = useState({
    'email': '',
  })

  const handleChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({ ...filterData, [e.target.name]: rmAllCharForEmail(e.target.value) })
  }

  async function onForgotPassword() {
    setScroll(false)
    setErrorObject(undefined)
    setError('')

    const data = {
      email: filterData.email,
      'g-recaptcha-response': recaptchaToken,
    }

    const res = await forgotPasswordForm(data)

    if (res.successMessage) {
      setSuccessMessage(res.successMessage)
    } else {
      setErrorObject(res.jsonError)
      setError(res.error)
    }

    setScroll(true)

    recaptcha?.execute()
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  if (successMessage) {
    return <ForgotPasswordSuccess message={successMessage} />
  }

  return (
    <>
      {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

      <form className="form-horizontal" action={onForgotPassword}>
        <fieldset>
          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <div className="legend-wrapper">
            <legend>Elfelejtett jelszó</legend>
          </div>

          <p className="info"><span>Kérünk, add meg az e-mail címed. Az aktiváló linket e-mailben kapod meg.</span></p>

          <div className="form-wrapper" style={{ width: '100%' }}>
            <div className="input-wrapper">
              <label htmlFor="email">E-mail cím</label>
              <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" value={filterData.email} onChange={handleChangeEmailInput} />

              {errorObject?.email ? Object.values(errorObject.email).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`email-${i}`} />
              }) : null}
            </div>

            <div className="input-wrapper">
              <button type="submit" className="btn btn-primary btn-headline btn-next">
                Küldés
              </button>
            </div>
          </div>

          <ReCaptcha
            ref={(ref: any) => setRecaptcha(ref)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
            action='submit'
            verifyCallback={(recaptchaToken: string) => {
              setRecaptchaToken(recaptchaToken)
            }}
          />
        </fieldset>
      </form>
    </>
  )
}
