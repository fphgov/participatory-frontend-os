"use client"

import Image from 'next/image'
import PopUp from '@/components/common/PopUp'
import { useEffect, useState } from 'react'

type ShareProps = {
  directHref?: string
}

export default function Share({ directHref }: ShareProps): JSX.Element|null {
  const [href, setHref] = useState('')

  useEffect(() => {
    if (directHref) {
      setHref(encodeURIComponent(window.location.origin + directHref))
    } else {
      setHref(encodeURIComponent(window.location.href))
    }
  }, [])

  return (
    <div className="share-wrapper">
      <PopUp url={`https://www.facebook.com/sharer/sharer.php?u=${href}`} title="Megosztom az ötletet Facebookon">
        <Image
          src="/images/social-fb-btn.svg"
          width={36}
          height={36}
          alt="Facebook logo"
        />
      </PopUp>

      <PopUp url={`https://www.linkedin.com/sharing/share-offsite/?url=${href}`} title="Megosztom az ötletet a LinkedIn-en">
        <Image
          src="/images/social-linkedin-btn.svg"
          width={36}
          height={36}
          alt="LinkedIn logo"
        />
      </PopUp>
    </div>
  )
}
