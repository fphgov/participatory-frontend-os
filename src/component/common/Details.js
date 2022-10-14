import React, { useState } from "react"

export default function Details({ summary, children, startOpen = false, className = '' }){
  const [open, setOpen] = useState(startOpen)
  return (
    <details className={className} {...(open ? { open: true } : {})}>
      <summary
        onClick={(e) => {
          e.preventDefault()
          setOpen((open) => !open)
        }}
      >
        {typeof summary === "function" ? summary(open) : summary}
      </summary>

      {open ? <div className="detail-content">{children}</div> : null}
    </details>
  )
}
