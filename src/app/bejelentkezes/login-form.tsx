'use client'

import { SetStateAction, useEffect, useReducer, useState } from "react"
import { ReCaptcha, loadReCaptcha } from 'react-recaptcha-v3'
import Link from "next/link"
import Error from "@/components/common/Error"
import { apiLoginUser } from "@/lib/api-requests"

export default function LoginForm(): JSX.Element {
  const [recaptcha, setRecaptcha] = useState<ReCaptcha>()
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      email,
      password,
      recaptchaToken,
    }

    try {
      await apiLoginUser(data)

      forceUpdate()
    } catch (e) {

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
    <form className="form-horizontal" onSubmit={submitLogin}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <div className="legend-wrapper">
          <legend>Bejelentkezés</legend>

          <Link href='/regisztracio' className="create-account">Nincs még fiókod?</Link>
        </div>

        <div className="form-wrapper">
          <div className="input-wrapper">
            <label htmlFor="email">E-mail cím</label>
            <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Jelszó</label>
            <input type="password" placeholder="Jelszó" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
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
