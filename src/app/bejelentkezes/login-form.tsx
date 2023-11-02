'use client'

import { SetStateAction, useEffect, useState } from "react"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import Link from "next/link"
import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { loginFom } from "@/app/actions"

type LoginFormProps = {
  searchParams: Record<string, string>
}

export default function LoginForm({ searchParams } : LoginFormProps): JSX.Element {
  const [recaptcha, setRecaptcha] = useState<ReCaptcha>()
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [error, setError] = useState('')

  async function onLogin(formData: FormData) {
    setError('')
    setErrorObject(undefined)

    const res = await loginFom(formData)

    if (res?.success) {
      if (searchParams?.project) {
        window.location.href = '/projektek/' + searchParams?.project
      } else {
        // window.location.href = '/szavazas-inditasa'
        window.location.href = '/profil'
      }
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }
    }

    recaptcha?.execute()
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }, [])

  return <>
    <form className="form-horizontal" action={onLogin}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="legend-wrapper">
          <legend>Bejelentkezés</legend>

          <Link href='/regisztracio' className="create-account">Nincs még fiókod?</Link>
        </div>

        <div className="form-wrapper">
          <div className="input-wrapper">
            <label htmlFor="email">E-mail cím</label>
            <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" />

            {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={`password-${i}`} />
            }) : null}
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Jelszó</label>
            <input type="password" placeholder="Jelszó" name="password" id="password" />

            {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
              return <ErrorMini key={i} error={err} increment={`password-${i}`} />
            }) : null}
          </div>

          <ReCaptcha
            ref={(ref: any) => setRecaptcha(ref)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
            action='submit'
            verifyCallback={(recaptchaToken: SetStateAction<string>) => {
              setRecaptchaToken(recaptchaToken)
            }}
          />

          <div className="input-wrapper">
            <div className="row flex-center">
              <div className="col-6 col-sm-8 col-md-8 col-lg-8">
                <button className="btn btn-primary btn-headline btn-next">
                  Belépés
                </button>
              </div>

              <div className="forgot-btn-wrapper col-6 col-sm-4 col-md-4 col-lg-4" style={{ textAlign: 'right' }}>
                <Link href='/elfelejtett-jelszo' title="Elfelejtett jelszó">Elfelejtett jelszó</Link>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </>
}
