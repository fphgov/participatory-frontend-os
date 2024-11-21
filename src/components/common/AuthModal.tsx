"use client"

import {SetStateAction, useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import LoginModalForm from "@/components/common/LoginModalForm"
import { useModalHardContext } from '@/context/modalHard'
// @ts-ignore
import { ReCaptcha, loadReCaptcha } from "@icetee/react-recaptcha-v3"

type AuthModalProps = {
  loggedIn: boolean
}

export default function AuthModal({ loggedIn }: AuthModalProps): JSX.Element {
  const searchParams = useSearchParams()
  const { setOpenModalHard } = useModalHardContext()
  const auth = searchParams.get('auth')
  const [recaptcha, setRecaptcha] = useState<ReCaptcha>()
  const [recaptchaToken, setRecaptchaToken] = useState('')

  useEffect(() => {
    if (! (auth === "login" || auth === "password" || auth === "authentication" || auth === "registration") || loggedIn) {
      setOpenModalHard(false)
    }
  }, [auth, loggedIn])

  if (auth === "login" || auth === "password" || auth === "authentication" || auth === "registration") {
    // @ts-ignore
    loadReCaptcha(process.env.NEXT_PUBLIC_SITE_KEY, (recaptchaToken: string) => {
      setRecaptchaToken(recaptchaToken)
    })
  }

  return (
    <>
      {auth === "login" || auth === "password" || auth === "authentication" || auth === "registration" ?
        <>
          <LoginModalForm searchParams={searchParams} recaptcha={recaptcha} />
          <ReCaptcha
            ref={(ref: any) => setRecaptcha(ref)}
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''}
            action='submit'
            verifyCallback={(recaptchaToken: SetStateAction<string>) => {
              setRecaptchaToken(recaptchaToken)
            }}
          />
        </> : null}
    </>
  )
}
