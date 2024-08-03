'use client'

import { SetStateAction, useEffect, useState } from "react"
// @ts-ignore
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"
import Link from "next/link"
import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { loginFom } from "@/app/actions"
import { useModalHardContext } from "@/context/modalHard"
import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation"

type LoginModalFormProps = {
  searchParams: ReadonlyURLSearchParams
}

export default function LoginModalForm({ searchParams } : LoginModalFormProps): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()

  const { openModalHard, setOpenModalHard, setDataModalHard } = useModalHardContext()

  const [recaptcha, setRecaptcha] = useState<ReCaptcha>()
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  async function onLogin(formData: FormData) {
    setError('')
    setErrorObject(undefined)

    const res = await loginFom(formData)

    if (res?.success) {
      if (searchParams.get('project')) {
        window.location.href = '/projektek/' + searchParams.get('project')
      } else if (searchParams.get('from')) {
        window.location.href = '/' + searchParams.get('from')
      } else {
        window.location.href = window.location.origin + window.location.pathname
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

  const removeSearchParams = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString())

    nextSearchParams.delete('auth')

    router.replace(`${pathname}?${nextSearchParams}`)
  }

  const getModalContent = () => {
    return (
      <>
        <form className="" action={onLogin}>
          <fieldset>
            {error ? <Error message={error} /> : null}

            <hr />

            <p>Ha már korábban regisztráltál itt, add meg email címed és jelszavad a belépéshez!</p>

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

              <div className="modal-links">
                <Link href='/elfelejtett-jelszo' title="Elfelejtett jelszó">Elfelejtett jelszó</Link>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary btn-headline btn-next">
                  Mehet
                </button>

                <button type="button" className="btn btn-primary-solid btn-solid-underline btn-solid-padding" onClick={() => { setOpenModalHard(false) }}>
                  Mégse
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </>
    )
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })

    setDataModalHard({
      title: 'Belépés',
      content: getModalContent(),
      showCancelButton: false
    })

    setOpenModalHard(true)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (! openModalHard && loaded) {
      removeSearchParams()
    }
  }, [openModalHard])

  return <></>
}
