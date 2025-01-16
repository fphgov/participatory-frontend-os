// @ts-ignore
import randomId from 'random-id'
import Image from 'next/image'
import { MobileNavigation, Navigation } from '@/ui/Navigation'
import HamburgerMenu from './common/HamburgerMenu'
import { generateRandomValue } from '@/utilities/generateRandomValue'

type IHeader = {
  loggedIn: boolean
}

export default function Header({ loggedIn }: IHeader): JSX.Element {
  const rand = generateRandomValue().toString()

  const menu = [
    { title: "Mi ez?", href: "/oldal/bovebben-a-kozossegi-koltsegvetesrol", outside: false },
    // { title: "Tudnivalók a szavazáshoz", href: "/tudnivalok-a-szavazasrol", outside: false },
    { title: "Hírek, rendezvények", href: "/hirek", outside: false },
    { title: "Ötletek", href: "#", outside: false, submenuItems: [
      { title: "Beküldött", href: `/otletek?campaign=5&rand=${rand}`, outside: true },
      { title: "Feldolgozott", href: `/tervek?rand=${rand}`, outside: false },
      { title: "Megvalósuló", href: `/projektek?rand=${rand}`, outside: false },
    ] },
    { title: "Fiókom", href: "/profil", highlight: false, onHideLoggedIn: false, onHideLoggedOut: true, outside: false, profile: false, icon: 'account', onHideDesktop: true },
    { title: "Ötletbeküldés", href: "/bekuldesi-informacio", outside: false, highlight: true },
    { title: "Belépés", href: "?auth=login", highlight: false, onHideLoggedIn: true, onHideLoggedOut: false, onHideMobile: true, icon: 'account' },
    { title: "Regisztráció", href: "?auth=registration", outside: false, highlight: false, onHideLoggedIn: true, secondHighlight: true, onHideMobile: true, onHideDesktop: false },
    { title: "Fiókom", href: "/profil", highlight: false, onHideLoggedIn: false, onHideLoggedOut: true, outside: false, profile: false, icon: 'account', onHideMobile: true },
    // { title: "Szavazás", href: "/szavazas-inditasa", outside: false, highlight: true },
    { title: "Belépés", href: "?auth=login", outside: false, highlight: false, onHideLoggedIn: true, secondHighlight: true, onHideDesktop: true },
    { title: "Regisztráció", href: "?auth=registration", outside: false, highlight: false, onHideLoggedIn: true, secondHighlight: true, onHideDesktop: true },
    { title: "Kijelentkezés", href: "/kijelentkezes", outside: false, highlight: false, onHideLoggedOut: true, secondHighlight: true, onHideDesktop: true },
  ]

  return (
    <header>
      <nav className="main-navigation">
        <div className="container">
          <div className="row flex-center">
            <div className="col-6 col-xs-6 col-sm-6 col-md-2">
              <div className="logo-wrapper">
                <a href="/" rel="noopener noreferrer">
                  <Image
                    src="/images/logo-horizontal.svg"
                    width={179}
                    height={42}
                    alt="Budapest Közösségi Költségvetés"
                  />
                </a>
              </div>
            </div>

            <div className="col-6 col-xs-6 col-sm-6 col-md-10">
              <ul className="desktop-menu">
                <Navigation menuItems={menu} rand={randomId(30, 'aA0')} loggedIn={loggedIn} />
              </ul>

              <HamburgerMenu />
            </div>
          </div>
        </div>
      </nav>

      <MobileNavigation menuItems={menu} loggedIn={loggedIn} />
    </header>
  )
}
