"use client"

import React, { PropsWithChildren } from "react"

type ScrollButtonProps = PropsWithChildren & {
  to: string
  className?: string
}

const ScrollButton = ({ children, to, ...props }: ScrollButtonProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const targetId = to.replace(/.*\#/, "")
    const elem = document.getElementById(targetId)

    window.scrollTo({
      top: elem?.getBoundingClientRect().top,
      behavior: "smooth",
    })
  }

  return (
    <button type="button" {...props} onClick={handleScroll}>
      {children}
    </button>
  )
}
export default ScrollButton
