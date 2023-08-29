'use client'

import { useEffect, useState } from 'react'
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import Error from "@/components/common/Error"
import ErrorMini from '@/components/common/ErrorMini'
import { passwordChangeForm } from '@/app/actions'
import ScrollTo from '@/components/common/ScrollTo'

type PasswordChangeFormProps = {
  params: { hash: string }
}

export default function PasswordChangeForm({ params }: PasswordChangeFormProps): JSX.Element {
  const [ recaptcha, setRecaptcha ] = useState<ReCaptcha>()
  const [ recaptchaToken, setRecaptchaToken ] = useState('')
  const [ scroll, setScroll ] = useState(false)
  const [ error, setError ] = useState('')
  const [ errorObject, setErrorObject ] = useState<Record<string, string>>()

  async function onChangePassword(formData: FormData) {
    setScroll(false)
    setError('')
    setErrorObject(undefined)

    const data = {
      hash: params.hash,
      password: formData.get('password'),
      password_2: formData.get('password_2'),
      'g-recaptcha-response': recaptchaToken,
    }

    const res = await passwordChangeForm(data)

    if (res.success) {
      window.location.href = '/bejelentkezes'
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

  return <>
    {scroll && document.querySelector('.error-message-inline') ? <ScrollTo element={(document?.querySelector('.error-message-inline') as HTMLElement)?.offsetTop || 0} /> : null}

    <form className="form-horizontal" action={onChangePassword}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="legend-wrapper">
          <legend>Új jelszó beállítása</legend>
        </div>

        <div className="form-wrapper">
          <div className="input-wrapper">
            <label htmlFor="password">Jelszó <sup>*</sup></label>
            <input type="password" name="password" id="password" />

            {errorObject?.password ? Object.values(errorObject.password).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={`password-${i}`} />
            }) : null}
          </div>
        </div>

        <div className="form-wrapper">
          <div className="input-wrapper">
            <label htmlFor="password_2">Jelszó újra <sup>*</sup></label>
            <input type="password" name="password_2" id="password_2" />

            {errorObject?.password_2 ? Object.values(errorObject.password_2).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={`password_2-${i}`} />
            }) : null}
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

        <input type="submit" value="Módosítás" className="btn btn-primary btn-headline" />
      </fieldset>
    </form>
  </>
}
