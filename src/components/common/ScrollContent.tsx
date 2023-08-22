"use client"

import { useEffect } from "react"

export default function ScrollContent(): JSX.Element|null {
  useEffect(() => {
    setTimeout(() => {
      const scrollContent = document.getElementById(window.location.hash.toString().replace('#', ''))

      if (scrollContent) {
        window.scrollTo({
          top: scrollContent.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [])

  return null
}
