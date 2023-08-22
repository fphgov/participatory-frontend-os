"use client"

import React, { useState } from "react"

type DetailsProps = {
  summary: React.ReactNode|string
  children: React.ReactNode
  startOpen?: boolean
  className?: string
}

export default function Details({ summary, children, startOpen = false, className = '' }: DetailsProps) {
  const [open, setOpen] = useState(startOpen)

  return (
    <details className={className} {...(open ? { open: true } : {})}>
      <summary
        onClick={(e) => {
          e.preventDefault()

          setOpen((open) => !open)
        }}
      >
        {summary}
      </summary>

      {open ? <div className="detail-content">{children}</div> : null}
    </details>
  )
}
