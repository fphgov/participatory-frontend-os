"use client"

import React, { useEffect } from "react"

type ScrollToProps = {
  element: number
  children?: React.ReactNode
}

export default function ScrollTo({ element, children }: ScrollToProps): JSX.Element|null {
  useEffect(() => {
    window.scrollTo({
      top: element,
      left: 0,
      behavior: 'smooth'
    })
  }, [element])

  if (children) {
    return <>{children}</>
  }

  return null
}
