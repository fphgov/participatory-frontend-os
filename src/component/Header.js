import React, { useEffect, useState, useRef } from "react"
import randomId from 'random-id'
import {
  Link,
} from "react-router-dom"
import tokenParser from './assets/tokenParser'
import Logo from '../img/logo-horizontal.svg'

function useOutside(ref, cb) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb()
      }
    }

    document.addEventListener("focusin", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusout", handleClickOutside);
    };
  }, [ref]);
}

const Menu = ({ menu, pathname, onClick, rand }) => {
  const [isOpen, setIsOpen] = useState(false)
  const submenuRef = useRef(null)

  useOutside(submenuRef, () => { setIsOpen(false) })

  return (<>
    {menu.map((menuItem, i) => {
      if (
        menuItem.onHideLoggedIn === true && localStorage.getItem('auth_token') !== null ||
        menuItem.onHideLoggedOut === true && localStorage.getItem('auth_token') === null
      ) return;

      if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

      if (menuItem.outside) {
        return (
          <li key={`${rand}-${i}`} className={menuItem.highlight ? 'highlight' : ''}>
            <a href={menuItem.href} onClick={onClick} rel="noopener noreferrer">{menuItem.title}</a>
          </li>
        )
      }

      if (menuItem.submenu) {
        return (
          <li key={`${rand}-${i}`} className={isOpen ? 'open' : ''} ref={submenuRef}>
            <button type="button" aria-expanded={isOpen} onClick={() => { setIsOpen(! isOpen) }}>{menuItem.title}<span className="caret"></span></button>

            <ul className="submenu">
              <Menu menu={menuItem.submenu} pathname={pathname} onClick={() => { setIsOpen(! isOpen); onClick() }} rand={randomId(30, 'aA0')} />
            </ul>
          </li>
        )
      }

      return (
        <li key={`${rand}-${i}`} className={menuItem.highlight ? 'highlight' : ''}>
          <Link to={menuItem.href} className={menuItem.href.split("?")[0] === pathname ? 'active' : ''} onClick={onClick}>{menuItem.title}</Link>
        </li>
      )
    })}
  </>)
}

const MobileMenu = ({ menu, pathname, onClick }) => {
  return (
    <div className="mobile-menu">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul>
              <Menu menu={menu} pathname={pathname} onClick={onClick} rand={randomId(30, 'aA0')} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header({ children }) {
  const [pathname, setPathname] = useState('/')
  const [openMenu, setOpenMenu] = useState(false)

  const menu = [
    { title: "Mi ez?", href: "/oldal/bovebben-a-kozossegi-koltsegvetesrol", outside: false },
    { title: "Ötletek", href: '', outside: false, submenu: [
      { title: "Beküldött", href: "/otletek?campaign=2", outside: true },
      { title: "Feldolgozott", href: "/tervek", outside: false },
      { title: "Megvalósuló", href: "/projektek?status=under_construction", outside: false },
    ] },
    { title: "Hírek, rendezvények", href: "/hirek", outside: false },
    { title: "Bejelentkezés", href: "/bejelentkezes", highlight: false, onHideLoggedIn: true, onHideLoggedOut: false },
    { title: "Fiók", href: "/profil", highlight: false, onHideLoggedIn: false, onHideLoggedOut: true, outside: false, profile: false },
    // { title: "Szavazás", href: "/szavazas", outside: false, highlight: true },
    { title: "Ötletbeküldés", href: "/bekuldesi-informacio", outside: false, highlight: true },
  ]

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [window.location.pathname])

  return (
    <header>
      <nav className="main-navigation">
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="col-xs-6 col-sm-6 col-md-2">
              <div className="logo-wrapper">
                <a href="/" rel="noopener noreferrer" onClick={() => { sessionStorage.removeItem('page') }}>
                  <img src={Logo} alt="Budapest Közösségi Költségvetés" />
                </a>
              </div>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-10">
              <ul className="desktop-menu">
                <Menu menu={menu} pathname={pathname} onClick={() => {}} rand={randomId(30, 'aA0')} />
              </ul>

              <div className="hamburger-menu-wrapper">
                <div className="hamburger-menu" onClick={() => { toggleMenu() }}>
                  <div className="hamburger-menu-elem"></div>
                  <div className="hamburger-menu-elem"></div>
                  <div className="hamburger-menu-elem"></div>
                </div>
                <div className="hamburger-menu-subtitle">MENÜ</div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {openMenu ? <MobileMenu menu={menu} pathname={pathname} onClick={toggleMenu} /> : null}

      {children}
    </header>
  )
}
