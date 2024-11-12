'use client'

import { SetStateAction, useCallback, useEffect, useRef, useState } from "react"
// @ts-ignore
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"
import Link from "next/link"
import Error from "@/components/common/Error"
import ErrorMini from "@/components/common/ErrorMini"
import { loginFom } from "@/app/actions"
import { useModalHardContext } from "@/context/modalHard"
import { ReadonlyURLSearchParams, usePathname, useRouter } from "next/navigation"
import CheckboxUncontrolled from "./form-element/CheckboxUncontrolled"

type LoginModalFormProps = {
  searchParams: ReadonlyURLSearchParams
}

export default function LoginModalForm({ searchParams } : LoginModalFormProps): JSX.Element {
  const router = useRouter()
  const { openModalHard, setOpenModalHard, setDataModalHard, setScrollModalHard } = useModalHardContext()
  const containerRef = useRef(null);
  const [recaptcha, setRecaptcha] = useState<ReCaptcha>()
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const [errorObject, setErrorObject] = useState<Record<string, string>|undefined>(undefined)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }, [searchParams])
  const from = searchParams.get('from') || null
  const pathname = usePathname()

  async function onLogin(formData: FormData) {
    setScrollModalHard(false)

    const res = await loginFom(formData)

    if (res?.success && res?.token) {
      if (searchParams.get('project')) {
        window.location.href = '/projektek/' + searchParams.get('project')
      } else if (searchParams.get('from')) {
        window.location.href = '/' + searchParams.get('from')
      } else {
        removeSearchParams()
      }
    } else if (res?.success && res?.message) {
      setDataModalHard({
        title: 'Belépés',
        content: res.message,
        showCancelButton: true
      })
    } else {
      if (res?.message) {
        setError(res.message)
      } else {
        setErrorObject(res.jsonError)
        setError(res.error)
      }

      setTimeout(() => {
        setScrollModalHard(true)
      }, 10)
    }

    recaptcha?.execute()
  }

  const removeSearchParams = () => {
    const nextSearchParams = new URLSearchParams(searchParams.toString())

    nextSearchParams.delete('from')
    nextSearchParams.delete('auth')

    router.replace(`${pathname}?${nextSearchParams.toString()}`)
  }

  const filteredSearchParams = () => {
    const filteredSearchParams = new URLSearchParams()

    if (searchParams.get('theme') !== null) {
      filteredSearchParams.append('theme', searchParams.get('theme')?.toString() || '');
    }

    if (searchParams.get('rand') !== null) {
      filteredSearchParams.append('rand', searchParams.get('rand')?.toString() || '');
    }

    if (searchParams.get('location') !== null) {
      filteredSearchParams.append('location', searchParams.get('location')?.toString() || '');
    }

    if (localStorage.getItem('vote')) {
      filteredSearchParams.append('vote', localStorage.getItem('vote')?.toString() || '');
    }

    return filteredSearchParams.toString()
  }

  const getModalContent = (tab: string) => {
    const isLoginTab = tab === 'login'
    const isAuthentication = searchParams.get('auth') === "authentication"
    const isRegistration = searchParams.get('auth') === "registration"

    return (
      <>
        <form className="" action={onLogin} ref={containerRef}>
          <fieldset>
            <input type="hidden" name="type" value={searchParams.get('auth')?.toString() || 'login'} />
            <input type="hidden" name="pathname" value={(from ?? pathname) + '?' + filteredSearchParams()} />

            {error ? <Error message={error} /> : null}

            {!isAuthentication && !isRegistration &&
              <div className="modal-tabs">
                <Link
                  href={pathname + '?' + createQueryString('auth', 'login')}
                  className={`${isLoginTab ? 'active' : ''}`}
                  prefetch={false}
                  >
                  Hitelesítő e-maillel
                </Link>

                <Link
                  href={pathname + '?' + createQueryString('auth', 'password')}
                  className={`${!isLoginTab ? 'active' : ''}`}
                  prefetch={false}
                >
                  Jelszóval
                </Link>
              </div>
            }

            <div className="sub-text-wrapper">
                {!isLoginTab && !isAuthentication && !isRegistration ?
                  <p>Ha már korábban regisztráltál itt, add meg e-mail címed és jelszavad a belépéshez!</p> : null}
                {isLoginTab && !isAuthentication && !isRegistration ? <p>Ha már korábban regisztráltál itt, add meg e-mail címed és elküldjük a belépéshez szükséges
                  linket!</p> : null}
                {isAuthentication || isRegistration ?
                  <p>Add meg e-mail címed és elküldjük a belépéshez szükséges linket.</p> : null}
            </div>

            <div className="form-wrapper">
              <div className="input-wrapper">
                <label htmlFor="email">E-mail cím: *</label>
                <input type="text" autoCorrect="off" autoCapitalize="none" placeholder="E-mail cím" name="email" id="email" />

                {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
                  return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                }) : null}
              </div>

              {!isLoginTab && !isAuthentication && !isRegistration ? <>
                <div className="input-wrapper">
                  <label htmlFor="password">Jelszó</label>
                  <input type="password" placeholder="Jelszó" name="password" id="password" />

                  {errorObject && errorObject.password ? Object.values(errorObject.password).map((err, i) => {
                    return <ErrorMini key={i} error={err} increment={`password-${i}`} />
                  }) : null}
                </div>
              </> : null}

              {isAuthentication || isRegistration? <>
                <div className="checkboxes-wrapper">

                  <div className="form-group">
                    <CheckboxUncontrolled
                      id="privacy"
                      name="privacy"
                      label={
                        <p>
                          Elolvastam és elfogadom az <a
                          href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatkezelesi_tajekoztato.pdf`} target="_blank"
                          rel="noopener noreferrer">adatvédelmi tájékoztatót</a> *
                        </p>
                      }
                    />

                    {errorObject?.privacy ? Object.values(errorObject.privacy).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`privacy-${i}`}/>
                    }) : null}
                  </div>

                  <div className="form-group">
                    <CheckboxUncontrolled
                      id="live_in_city"
                      name="live_in_city"
                      label={
                        <p>Kijelentem, hogy elmúltam 14 éves és budapesti lakos vagyok, vagy Budapesten dolgozom,
                        vagy Budapesten tanulok. *</p>
                      }
                    />

                    {errorObject?.live_in_city ? Object.values(errorObject.live_in_city).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`live_in_city-${i}`}/>
                    }) : null}
                  </div>

                  <h3>Ha új felhasználó vagy:</h3>

                  <div className="form-group">
                    <CheckboxUncontrolled
                      id="newsletter"
                      name="newsletter"
                      label={
                        <p>Szeretnék feliratkozni a hírlevélre</p>
                      }
                    />

                    {errorObject?.newsletter ? Object.values(errorObject.newsletter).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`newsletter-${i}`}/>
                    }) : null}
                  </div>

                  {0 ?
                  <div className="form-group">
                    <CheckboxUncontrolled
                      id="prize"
                      name="prize"
                      label={
                        <p>Szeretnék részt venni a <Link href="/hirek/szavazz-es-nyerj-belepot-furdobe-allatkertbe-szinhazba-es-mas-klassz-helyekre" target="_blank">nyereményjátékban</Link>.</p>
                      }
                    />

                    {errorObject?.prize ? Object.values(errorObject.prize).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`prize-${i}`}/>
                    }) : null}
                  </div> : null}

                </div>
              </> : null}

              <ReCaptcha
                ref={(ref: any) => setRecaptcha(ref)}
                sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
                action='submit'
                verifyCallback={(recaptchaToken: SetStateAction<string>) => {
                  setRecaptchaToken(recaptchaToken)
                }}
              />

              <div className="modal-links">
                {isLoginTab ?
                  <Link
                    href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatkezelesi_tajekoztato.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    prefetch={false}
                  >
                      Adatkezelési tájékoztató
                  </Link> : null}
                {!isLoginTab && !isAuthentication && !isRegistration ? <Link href="/elfelejtett-jelszo">Elfelejtett jelszó</Link> : null}
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary btn-headline btn-next">
                  {isAuthentication || isRegistration ? 'E-mail küldése' : 'Belépés'}
                </button>

                <button
                  type="button"
                  className="btn btn-primary-solid btn-solid-underline btn-solid-padding"
                  onClick={() => {
                    setOpenModalHard(false)
                  }}
                >
                  Mégse
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </>
    )
  }

  const renderContent = () => {
    let title = 'Belépés'

    if (searchParams.get('auth') === 'authentication') {
      title = 'Hitelesítés'
    } else if (searchParams.get('auth') === 'registration') {
      title = 'Regisztráció'
    }

    setDataModalHard({
      title: title,
      content: getModalContent(searchParams.get('auth')?.toString() || 'login'),
      showCancelButton: false
    })

    setOpenModalHard(true)
  }

  useEffect(() => {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })

    renderContent()

    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!openModalHard && loaded) {
      removeSearchParams()
    }
  }, [openModalHard, loaded])

  useEffect(() => {
    if (loaded) {
      setError('')
      renderContent()
    }
  }, [loaded, searchParams])

  useEffect(() => {
    if (loaded && error) {
      renderContent()
    }
  }, [loaded, error])

  return <></>
}
