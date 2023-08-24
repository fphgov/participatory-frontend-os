'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import randomId from 'random-id'
import { usePathname } from 'next/navigation'
import NavigationIcon from '@/components/common/NavigationIcon'

export type MenuProps = {
  menuItems: MenuItem[]
  onClick?: () => void
  rand?: string
  loggedIn: boolean
}

export type MenuItem = {
  title: string
  href: string
  roles?: []
  submenuItems?: MenuItem[]
  highlight?: boolean
  outside?: boolean
  onHideLoggedIn?: boolean
  onHideLoggedOut?: boolean
  icon?: string
}

function useOutside(ref: any, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: FocusEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        cb()
      }
    }

    document.addEventListener("focusin", handleClickOutside)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("focusout", handleClickOutside)
    }
  }, [ref])
}

export function MobileNavigation({ menuItems, loggedIn }: MenuProps): JSX.Element|null {
  return (
    <div className="mobile-menu">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul>
              <Navigation menuItems={menuItems} rand={randomId(30, 'aA0')} loggedIn={loggedIn} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Navigation({ menuItems, onClick = () => {}, rand, loggedIn }: MenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const submenuRef = useRef(null)
  const pathname = usePathname()

  useOutside(submenuRef, () => { setIsOpen(false) })

  return (<>
    {menuItems?.map((menuItem: MenuItem, i: number) => {
      if (
        menuItem?.onHideLoggedIn === true && loggedIn === true ||
        menuItem?.onHideLoggedOut === true && loggedIn === false
      ) return

      if (menuItem?.outside) {
        return (
          <li key={`${rand}-${i}`} className={menuItem?.highlight ? 'highlight' : ''}>
            <a href={menuItem.href} onClick={onClick} rel="noopener noreferrer">{menuItem.title}</a>
          </li>
        )
      }

    if (menuItem?.submenuItems) {
      return (
        <li key={`${rand}-${i}`} className={isOpen ? 'open' : ''} ref={submenuRef}>
          <button type="button" aria-expanded={isOpen} onClick={() => { setIsOpen(! isOpen) }}>{menuItem.title}<span className="caret"></span></button>

          <ul className="submenu">
            <Navigation
              menuItems={menuItem.submenuItems}
              onClick={() => { setIsOpen(! isOpen); onClick() }}
              rand={randomId(30, 'aA0')}
              loggedIn={loggedIn}
            />
          </ul>
        </li>
      )
    }

    return (
        <li key={`${rand}-${i}`} className={menuItem?.highlight ? 'highlight' : ''}>
          <Link href={menuItem.href} className={menuItem.href.split("?")[0] === pathname ? 'active' : ''} onClick={onClick}>
            {menuItem?.icon ? <div>
              <NavigationIcon icon={menuItem?.icon} />
              {menuItem.title}
            </div> : menuItem.title}
          </Link>
        </li>
      )
    })}
  </>)
}
