"use client"

import Image from 'next/image'
import PopUp from '@/components/common/PopUp'
import { useEffect, useState } from 'react'

type ShareBoxProps = {
  title?: string
}

export default function ShareBox({ title = "Megosztás" }: ShareBoxProps): JSX.Element|null {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(encodeURIComponent(window.location.href))
}, [])

  return (
    <div className="prop-single-share">
      <div className="prop-info-title">{title}</div>
      <div className="prop-info-content">
        <PopUp url={`https://www.facebook.com/sharer/sharer.php?u=${url}`} title="Megosztom az ötletet Facebookon">
          <Image
            src="/images/social-fb-btn.svg"
            width={36}
            height={36}
            alt="Facebook logo"
          />
        </PopUp>
      </div>
    </div>
  )
}
