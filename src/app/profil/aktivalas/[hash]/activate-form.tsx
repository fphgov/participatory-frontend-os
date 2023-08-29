'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Error from "@/components/common/Error"
import { profileActivateForm } from '@/app/actions'

export default function ActivateForm(): JSX.Element {
  const params = useParams()
  const router = useRouter()

  const [error, setError] = useState('')

  async function onChangePassword() {
    setError('')

    const res = await profileActivateForm((params?.hash as string || ''))

    if (res.success) {
      router.push("/profil/aktivalas/sikeres")
    } else {
      setError(res.error)
    }
  }

  return <>
    <form action={onChangePassword}>
      <fieldset>
        {error ? <Error message={error} /> : null}

        <input type="submit" value="Aktiválom" className="btn btn-secondary" />
      </fieldset>
    </form>
  </>
}
