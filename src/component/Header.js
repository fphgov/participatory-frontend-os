import React from "react"
import {
  Link,
} from "react-router-dom"
import StoreContext from '../StoreContext'
import tokenParser from './assets/tokenParser'
import Logo from '../img/kozossegi_koltsegvetes.svg'
import VoteModal from "./common/VoteModal"
import getGravatarURL from "./lib/gravatar"

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu">
      <div className="container">
        <ul>
          {props.menu.map((menuItem, i) => {
            if (
              menuItem.onHideLoggedIn === true && localStorage.getItem('auth_token') !== null ||
              menuItem.onHideLoggedOut === true && localStorage.getItem('auth_token') === null
            ) return;

            if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

            if (menuItem.outside) {
              return (
                <li key={i.toString()}>
                  <a href={menuItem.href} onClick={props.onClick} rel="noopener noreferrer">{menuItem.title}</a>
                </li>
              )
            }

            if (menuItem.profile) {
              return (
                <li key={i.toString()} className={menuItem.highlight ? 'highlight' : ''}>
                  <Link to={menuItem.href} className={`profile-menu`} onClick={props.onClick}>
                    <div className="avatar"><img src={getGravatarURL(tokenParser('user.email'))} alt="Avatar kép" aria-hidden="true" /><span className="profil-name">{tokenParser('user.firstname')}</span></div>
                  </Link>
                </li>
              )
            }

            return (
              <li key={i.toString()}>
                <Link to={menuItem.href} onClick={props.onClick}>{menuItem.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default class Header extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      pathname: '/',
      openMenu: false,
      menu: [
        { title: "Mi a közösségi költségvetés?", href: "/oldal/bovebben-a-reszveteli-koltsegvetesrol", outside: false },
        { title: "Ötletbeküldés", href: "/bekuldes", outside: false },
        { title: "Beküldött ötletek", href: "/otletek?campaign=2", outside: true },
        { title: "Megvalósuló ötletek", href: "/projektek?status=under_construction", outside: false },
        { title: "Hírek", href: "/hirek", outside: false },
        { title: "Rendezvények", href: "/rendezvenyek", outside: false },
        { title: "Bejelentkezés", href: "/bejelentkezes", highlight: false, onHideLoggedIn: true, onHideLoggedOut: false },
        { title: "Fiók", href: "/profil", highlight: false, onHideLoggedIn: false, onHideLoggedOut: true, outside: false, profile: false },
      ]
    }
  }

  toggleMenu() {
    this.setState({
      openMenu: ! this.state.openMenu,
    })
  }

  componentDidMount() {
    this.setState({
      pathname: window.location.pathname,
    })
  }

  componentDidUpdate() {
    if (window.location.pathname !== this.state.pathname) {
      this.setState({
        pathname: window.location.pathname,
      })
    }
  }

  render() {
    const config = this.context.get('config')
    const showVoteModal = config && !(config && config.options && config.options.close)

    return (
      <header>
        <nav className="main-navigation">
          <div className="container-fluid">
            <div className="row flex-center">
              <div className="col-xs-6 col-sm-6 col-md-4">
                <div className="logo-wrapper">
                  <a href="/" rel="noopener noreferrer">
                    <img src={Logo} alt="Budapest Közösségi Költségvetés" />
                  </a>
                </div>
              </div>

              <div className="col-xs-6 col-sm-6 col-md-8">
                <ul className="desktop-menu">
                  {this.state.menu.map((menuItem, i) => {
                    if (
                      menuItem.onHideLoggedIn === true && localStorage.getItem('auth_token') !== null ||
                      menuItem.onHideLoggedOut === true && localStorage.getItem('auth_token') === null
                    ) return;

                    if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

                    if (menuItem.outside) {
                      return (
                        <li key={i.toString()} className={menuItem.highlight ? 'highlight' : ''}>
                          <a href={menuItem.href} className={menuItem.href === this.state.pathname ? 'active' : ''} rel="noopener noreferrer">{menuItem.title}</a>
                        </li>
                      )
                    }

                    if (menuItem.profile) {
                      return (
                        <li key={i.toString()} className={menuItem.highlight ? 'highlight' : ''}>
                          <Link to={menuItem.href} className={`profile-menu`}>
                            <div className="avatar"><img src={getGravatarURL(tokenParser('user.email'))} alt="Avatar kép" aria-hidden="true" /><span className="profil-name">{tokenParser('user.firstname')}</span></div>
                          </Link>
                        </li>
                      )
                    }

                    return (
                      <li key={i.toString()} className={menuItem.highlight ? 'highlight' : ''}>
                        <Link to={menuItem.href} className={menuItem.href === this.state.pathname ? 'active' : ''}>{menuItem.title}</Link>
                      </li>
                    )
                  })}
                </ul>

                <div className="hamburger-menu-wrapper">
                  <div className="hamburger-menu" onClick={() => { this.toggleMenu() }}>
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

        {showVoteModal && 0 ? <VoteModal open={this.context.get('rk_modal_open')} /> : null}

        {this.state.openMenu ? <MobileMenu menu={this.state.menu} onClick={() => { this.toggleMenu() }} /> : null}

        { this.props.children }
      </header>
    )
  }
}
