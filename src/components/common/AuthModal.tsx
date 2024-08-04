"use client"

import { useSearchParams } from 'next/navigation'
import LoginModalForm from "@/components/common/LoginModalForm"
import { useModalHardContext } from '@/context/modalHard'

export default function AuthModal(): JSX.Element {
  const searchParams = useSearchParams()
  const { setOpenModalHard } = useModalHardContext()

  const auth = searchParams.get('auth')

  if (! (auth === "login" || auth === "password")) {
    setOpenModalHard(false)

    return <></>
  }

  return (
    <>
      {auth === "login" || auth === "password" ? <LoginModalForm searchParams={searchParams} /> : null}
    </>
  )
}
