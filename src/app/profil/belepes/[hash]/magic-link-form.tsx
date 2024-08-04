'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Error from "@/components/common/Error"
import { loginWithMagicLinkForm } from '@/app/actions'

export default function MagicLinkForm(): JSX.Element {
  const params = useParams()
  const router = useRouter()

  const [error, setError] = useState('')

  const formRef = useRef<HTMLFormElement>(null)

  async function onLoginWithMagicLink() {
    setError('')

    const res = await loginWithMagicLinkForm((params?.hash as string || ''))

    if (res.success) {
      router.push('/')
    } else {
      setError(res.error)
    }
  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }, [])

  return <>
    <form ref={formRef} action={onLoginWithMagicLink}>
      <fieldset>
        <div style={{ display: 'inline-block' }}>{error ? <Error message={error} /> : null}</div>

        <input type="submit" value="Belépés" style={{ display: 'none' }} />
      </fieldset>
    </form>
  </>
}
