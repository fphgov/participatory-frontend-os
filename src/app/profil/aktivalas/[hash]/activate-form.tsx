'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Error from "@/components/common/Error"
import { apiProfileActivate } from "@/lib/api-requests"

export default function ActivateForm(): JSX.Element {
  const params = useParams()
  const router = useRouter()

  const [error, setError] = useState('')

  async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')

    try {
      await apiProfileActivate((params?.hash as string || ''))

      router.push("/profil/aktivalas/sikeres")
    } catch (e: any) {
      if (typeof e.message === "string") {
        setError(e.message)
      }
    }
  }

  return <>
    <form onSubmit={submitLogin}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <input type="submit" value="Aktiválom" className="btn btn-secondary" />
      </fieldset>
    </form>
  </>
}
