'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Error from "@/components/common/Error"
import { loginWithMagicLinkForm } from '@/app/actions'

export default function MagicLinkForm(): JSX.Element {
  const params = useParams()
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  async function onLoginWithMagicLink() {
    setError('')

    const res = await loginWithMagicLinkForm((params?.hash as string || ''))
    const urlParams = new URLSearchParams(window.location.search);
    const pathname = urlParams.get('pathname') ?? '/';

    if (res.success) {
      router.push(pathname)
    } else {
      setError(res.error)
      setTimeout(() => {router.push('/')}, 2000);
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
