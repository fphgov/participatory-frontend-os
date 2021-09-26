import axios from "./assets/axios"
import React, { useEffect, useContext } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import Page from "./Page"
import NotFound from "./page/NotFound"
import Login from "./page/Login"
import Statistics from "./page/Statistics"
import Project from "./page/Project"
import Projects from "./page/Projects"
import ProfileActivate from "./page/ProfileActivate"
import PrizeActivate from "./page/PrizeActivate"
import Registration from "./page/Registration"
import ResetPassword from "./page/ResetPassword"
import ForgotPassword from "./page/ForgotPassword"
import Logout from "./page/Logout"
import Profile from "./page/Profile"
import ScrollToTop from "./common/ScrollToTop"
import CookieNotice from "./common/CookieNotice"
import StoreContext from '../StoreContext'
import tokenParser from './assets/tokenParser'

export default function App() {
  const context = useContext(StoreContext)

  const getConfig = () => {
    context.set('loading', true)

    axios
    .get(process.env.REACT_APP_API_REQ_CONFIG)
    .then(response => {
      context.set('loading', false)

      if (response.data) {
        context.set('config', response.data)
      }
    })
    .catch(() => {
      context.set('loading', false)
      context.set('config', null)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      context.set('token', localStorage.getItem('auth_token') || '')

      const voted = tokenParser('user.voted')

      const successVote = voted || !!localStorage.getItem('rk_voted')

      setTimeout(() => {
        context.set('successVote', successVote)
      }, 100)
    } else {
      context.set('token', null)
    }

    if (localStorage.getItem('map')) {
      context.set('map', (localStorage.getItem('map') === 'true') ? true : false)
    }

    getConfig()
  }, [])

  return (
    <div className="app">
      <Router basename={process.env.REACT_APP_BASENAME}>
        {(process.env.GA_ID || process.env.GTM_ID) ? <CookieNotice /> : ''}
        <ScrollToTop>
          <Header />

          <Page>
            <Switch>
              <Route exact path="/" component={Projects} />
              <Route exact path="/bejelentkezes" component={Login} />
              <Route exact path="/kijelentkezes" component={Logout} />
              <Route exact path="/statisztika" component={Statistics} />
              <Route exact path="/statisztika/:id" component={Statistics} />
              <Route exact path="/projektek" component={Projects} />
              <Route exact path="/projektek/:id" component={Project} />
              <Route exact path="/profil" component={Profile} />
              <Route exact path="/profil/aktivalas/:hash" component={ProfileActivate} />
              <Route exact path="/profil/nyeremeny-aktivalas/:hash" component={PrizeActivate} />
              <Route exact path="/profil/jelszo/:hash" component={ResetPassword} />
              <Route exact path="/regisztracio" component={Registration} />
              <Route exact path="/elfelejtett-jelszo" component={ForgotPassword} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </Page>

          <Footer />
        </ScrollToTop>
      </Router>
    </div>
  )
}
