import React from "react";
import {
  Link,
} from "react-router-dom";
import StoreContext from '../StoreContext'
import tokenParser from './assets/tokenParser'
import Logo from '../img/logo-bp-participatory.svg'
import VoteModal from "./common/VoteModal"

const MobileMenu = (props) => {
  return (
    <div className="mobile-menu">
      <div className="container">
        <ul>
          {props.menu.map((menuItem, i) => {
            if (menuItem.onHideLoggedIn === true && localStorage.getItem('auth_token')) return;

            if (Array.isArray(menuItem.roles) && !menuItem.roles.includes(tokenParser('user.role'))) return;

            if (menuItem.outside) {
              return (
                <li key={i.toString()}>
                  <a href={menuItem.href}>{menuItem.title}</a>
                </li>
              )
            }

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
      pathname: '/',
      openMenu: false,
      menu: [
        { title: "Mi ez?", href: "https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&htmlpage_id=2", outside: true },
        // { title: "Beküldött ötletek", href: "https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=solrProjectSearch&sort_name=date&sort_order=desc&conf=proposals_list&fq=campaign_text:A", outside: true },
        { title: "Hírek", href: "https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page_id=4", outside: true },
        { title: "Szavazás", href: "/projektek", highlight: true },
        // { title: "Bejelentkezés", href: "/bejelentkezes", highlight: true, onHideLoggedIn: true },
        // { title: "Kijelentkezés", href: "/kijelentkezes", highlight: true, onHideLoggedIn: false },
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
          <div className="container">
            <div className="row flex-center">
              <div className="col-xs-6 col-sm-6 col-md-4">
                <div className="logo-wrapper">
                  <a href="/">
                    <img src={Logo} alt="Budapest Részvételiségi Költségvetés"/>
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
                          <a href={menuItem.href} className={menuItem.href === this.state.pathname ? 'active' : ''}>{menuItem.title}</a>
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
                </div>
              </div>
            </div>
          </div>
        </nav>

        {showVoteModal ? <VoteModal open={this.context.get('rk_modal_open')} /> : null}

        {this.state.openMenu ? <MobileMenu menu={this.state.menu} onClick={() => { this.toggleMenu() }} /> : null}

        { this.props.children }
      </header>
    )
  }
}
