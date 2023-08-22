"use client"

import { useState, useEffect } from "react"

export default function HamburgerMenu(): JSX.Element {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    if (openMenu) {
      document.body.classList.add('open-menu')
    } else {
      document.body.classList.remove('open-menu')
    }
  }, [openMenu])

  return (
    <div className="hamburger-menu-wrapper" onClick={toggleMenu}>
      <div className="hamburger-menu">
        <div className="hamburger-menu-elem"></div>
        <div className="hamburger-menu-elem"></div>
        <div className="hamburger-menu-elem"></div>
      </div>
      <div className="hamburger-menu-subtitle">MENÜ</div>
    </div>
  )
}
