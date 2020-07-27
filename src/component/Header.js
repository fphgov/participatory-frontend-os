import React from "react";
import {
  Link,
} from "react-router-dom";
import StoreContext from '../StoreContext'

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu">
      <div className="container">
        <ul>
          {props.menu.map((menuItem, i) => {
            return (
              <li key={i.toString()}>
                <Link to={menuItem.href}>{menuItem.title}</Link>
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
      openMenu: false,
      menu: [
        { title: "Kezdőlap", href: "/" },
        { title: "Javaslat beküldése", href: "/javaslat/bekuldes", onHideLoggedIn: false },
        { title: "Beküldött javaslatok", href: "/javaslatok" },
        { title: "Bejelentkezés", href: "/bejelentkezes", onHideLoggedIn: true },
        { title: "Kijelentkezés", href: "/kijelentkezes", onHideLoggedIn: false },
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
        <nav className="main-navigation">
          <div className="container">
            <div className="row flex-center">
              <div className="col-xs-6 col-sm-6 col-md-4">
                <div className="logo-wrapper">
                  <Link to="/">
                    <img src={require('../img/logo-bp-participatory.png')} alt="Budapest Részvételiségi Költségvetés Logo"/>
                  </Link>
                </div>
              </div>

              <div className="col-xs-6 col-sm-6 col-md-8">
                <ul className="desktop-menu">
                  {this.state.menu.map((menuItem, i) => {
                    if (
                      menuItem.onHideLoggedIn === true && this.context.get('loggedIn') ||
                      ! this.context.get('loggedIn') && menuItem.onHideLoggedIn === false
                    ) return;

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
