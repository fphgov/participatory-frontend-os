"use client"

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginModalForm from "@/components/common/LoginModalForm"
import { useModalHardContext } from '@/context/modalHard'

type AuthModalProps = {
  loggedIn: boolean
}

export const fetchCache = 'force-no-store';

export default function AuthModal({ loggedIn }: AuthModalProps): JSX.Element {
  const searchParams = useSearchParams()
  const { setOpenModalHard } = useModalHardContext()
  const auth = searchParams.get('auth')

  useEffect(() => {
    if (! (auth === "login" || auth === "password" || auth === "authentication" || auth === "registration") || loggedIn) {
      setOpenModalHard(false)
    }
  }, [auth, loggedIn])

  return (
    <>
      {auth === "login" || auth === "password" || auth === "authentication" || auth === "registration" ? <LoginModalForm searchParams={searchParams} /> : null}
    </>
  )
}
