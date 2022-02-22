import React from "react";
import {
  Link,
} from "react-router-dom";
import StoreContext from '../StoreContext'
import tokenParser from './assets/tokenParser'

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu">
      <div className="container">
        <div className="row">
          <ul>
            {props.menu.map((menuItem, i) => {
              if (menuItem.onHideLoggedIn === true && localStorage.getItem('auth_admin_token')) return;

              if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

              return (
                <li key={i.toString()}>
                  <Link to={menuItem.href}>{menuItem.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default class Header extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      openMenu: false,
      menu: [
        { title: "Projektek", href: "/projects", onHideLoggedOut: true, roles: [ 'developer', 'admin', 'editor' ] },
        { title: "Ötletek", href: "/ideas", onHideLoggedOut: true, roles: [ 'developer', 'admin', 'editor' ] },
        { title: "Szavazat hozzáadása", href: "/vote", onHideLoggedOut: true, roles: [ 'developer', 'admin', 'editor' ] },
        { title: "Cikkek", href: "/posts", onHideLoggedOut: true, roles: [ 'developer', 'admin', 'editor' ] },
        { title: "Beállítások", href: "/settings", onHideLoggedOut: true, roles: [ 'developer', 'admin' ] },
        { title: "Bejelentkezés", href: "/login", onHideLoggedIn: true },
        { title: "Profil", href: "/profile", onHideLoggedOut: true },
        { title: "Kijelentkezés", href: "/logout", onHideLoggedOut: true },
      ]
    }
  }

  toggleMenu() {
    this.setState({
      openMenu: ! this.state.openMenu,
    })
  }

  render() {
    return (
      <header>
        <div className="main-navigation-top">
          <div className="container">
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-4">
                <a href="https://otlet.budapest.hu" rel="noopener noreferrer">Vissza az otlet.budapest.hu főoldalára</a>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-8 col-right">
                <a href="https://otlet.budapest.hu" target="_blank" rel="noopener noreferrer">budapest.hu</a>
              </div>
            </div>
          </div>
        </div>

        <nav className="main-navigation">
          <div className="container">
            <div className="row flex-center">
              <div className="col-xs-6 col-sm-4 col-md-2">
                <div className="logo-wrapper">
                  <Link to={"/"}>
                    <img src={require('../img/logo-bp-monocrom.png')} />
                  </Link>
                </div>
              </div>

              <div className="col-xs-6 col-sm-8 col-md-10">
                <ul className="desktop-menu">
                  {this.state.menu.map((menuItem, i) => {
                    if (
                      menuItem.onHideLoggedIn === true && localStorage.getItem('auth_admin_token') !== null ||
                      menuItem.onHideLoggedOut === true && localStorage.getItem('auth_admin_token') === null
                    ) return;

                    if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

                    return (
                      <li key={i.toString()}>
                        <Link to={menuItem.href}>{menuItem.title}</Link>
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
                </div>
              </div>
            </div>
          </div>
        </nav>

        {this.state.openMenu ? <MobileMenu menu={this.state.menu} /> : null}

        { this.props.children }
      </header>
    )
  }
}
