"use client"

import { useSearchParams } from 'next/navigation'
import LoginModalForm from "@/components/common/LoginModalForm"


export default function AuthModal(): JSX.Element {
  const searchParams = useSearchParams()

  const auth = searchParams.get('auth')

  return (
    <>
      {auth === "login" ? <LoginModalForm searchParams={searchParams} /> : null}
    </>
  )
}
