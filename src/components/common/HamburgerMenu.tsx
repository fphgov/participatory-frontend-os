"use client"

import { useState, useEffect } from "react"

export default function HamburgerMenu(): JSX.Element {
  const [openMenu, setOpenMenu] = useState(false)

  const refreshClass = (openMenu: boolean) => {
    if (openMenu) {
      document.body.classList.add('open-menu')
    } else {
      document.body.classList.remove('open-menu')
    }
  }

  const toggleMenu = () => {
    if (document.body.classList.contains('open-menu') && !openMenu) {
      setOpenMenu(true)
    } else if (!document.body.classList.contains('open-menu') && openMenu) {
      refreshClass(true)
    } else {
      setOpenMenu(!openMenu)
    }
  }

  useEffect(() => {
    refreshClass(openMenu)
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
