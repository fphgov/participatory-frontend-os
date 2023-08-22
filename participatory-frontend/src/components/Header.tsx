import randomId from 'random-id'
import Image from 'next/image'
import { MobileNavigation, Navigation } from '@/ui/Navigation'
import HamburgerMenu from './common/HamburgerMenu'

type IHeader = {
  loggedIn: boolean
}

export default function Header({ loggedIn }: IHeader): JSX.Element {
  const menu = [
    { title: "Mi ez?", href: "/oldal/bovebben-a-kozossegi-koltsegvetesrol", outside: false },
    { title: "Hírek, rendezvények", href: "/hirek", outside: false },
    { title: "Ötletek", href: "#", outside: false, submenuItems: [
      { title: "Beküldött", href: "/otletek?campaign=3", outside: true },
      { title: "Feldolgozott", href: "/tervek", outside: false },
      { title: "Megvalósuló", href: "/projektek", outside: false },
    ] },
    { title: "Szavazás", href: "/szavazas-inditas", outside: false, highlight: true },
    { title: "Bejelentkezés", href: "/bejelentkezes", highlight: false, onHideLoggedIn: true, onHideLoggedOut: false },
    { title: "Fiókom", href: "/profil", highlight: false, onHideLoggedIn: false, onHideLoggedOut: true, outside: false, profile: false, icon: 'account' },
    // { title: "Ötletbeküldés", href: "/bekuldesi-informacio", outside: false, highlight: true },
  ]

  return (
    <header>
      <nav className="main-navigation">
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="col-xs-6 col-sm-6 col-md-2">
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

            <div className="col-xs-6 col-sm-6 col-md-10">
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
