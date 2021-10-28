import axios from "./assets/axios"
import React, { useEffect, useContext } from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom"
import Layout from "./Layout"
import NotFound from "./page/NotFound"
import Login from "./page/Login"
import Statistics from "./page/Statistics"
import Home from "./page/Home"
import SimplePage from "./page/SimplePage"
import Posts from "./page/Posts"
import PostsEvent from "./page/PostsEvent"
import Post from "./page/Post"
import Project from "./page/Project"
import Projects from "./page/Projects"
import Idea from "./page/Idea"
import Ideas from "./page/Ideas"
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
import IdeaSubmission from "./page/IdeaSubmission"
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const context = useContext(StoreContext)

  const getConfig = () => {
    context.set('loading', true)

    axios
    .get(process.env.REACT_APP_API_REQ_CONFIG)
    .then(response => {
      if (response.data) {
        sessionStorage.setItem('config', JSON.stringify(response.data))
        context.set('config', response.data)
      }
    })
    .catch(() => {
      context.set('config', null)
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      const exp = tokenParser('exp')

      if (new Date(exp * 1000) < new Date()) {
        localStorage.removeItem('auth_token')
      }
    }

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

    if (! sessionStorage.getItem('config')) {
      getConfig()
    } else {
      try {
        context.set('config', JSON.parse(sessionStorage.getItem('config')))
      } catch (e) {}
    }
  }, [])

  return (
    <div className="app">
      <Router basename={process.env.REACT_APP_BASENAME}>
        {(process.env.GA_ID || process.env.GTM_ID) ? <CookieNotice /> : ''}

        <ScrollToTop>
          <Switch>
            <Route exact path="/" render={() => <Layout><Home /></Layout>} />
            <Route exact path="/bejelentkezes" render={() => <Layout><Login /></Layout>} />
            <Route exact path="/kijelentkezes" render={() => <Layout><Logout /></Layout>} />
            <Route exact path="/bekuldes" render={() => <Layout><IdeaSubmission /></Layout>} />
            <Route exact path="/oldal/:slug" render={() => <Layout><SimplePage /></Layout>} />
            <Route exact path="/rendezvenyek" render={() => <Layout><PostsEvent /></Layout>} />
            <Route exact path="/hirek" render={() => <Layout><Posts /></Layout>} />
            <Route exact path="/hirek/:slug" render={() => <Layout><Post /></Layout>} />
            <Route exact path="/statisztika" render={() => <Layout><Statistics /></Layout>} />
            <Route exact path="/statisztika/:id" render={() => <Layout><Statistics /></Layout>} />
            <Route exact path="/otletek" render={() => <Layout><Ideas /></Layout>} />
            <Route exact path="/otletek/:id" render={() => <Layout><Idea /></Layout>} />
            <Route exact path="/projektek" render={() => <Layout><Projects /></Layout>} />
            <Route exact path="/projektek/:id" render={() => <Layout><Project /></Layout>} />
            <Route exact path="/profil" render={() => <Layout><Profile /></Layout>} />
            <Route exact path="/profil/aktivalas/:hash" render={() => <Layout><ProfileActivate /></Layout>} />
            <Route exact path="/profil/nyeremeny-aktivalas/:hash" render={() => <Layout><PrizeActivate /></Layout>} />
            <Route exact path="/profil/jelszo/:hash" render={() => <Layout><ResetPassword /></Layout>} />
            <Route exact path="/regisztracio" render={() => <Layout><Registration /></Layout>} />
            <Route exact path="/elfelejtett-jelszo" render={() => <Layout><ForgotPassword /></Layout>} />
            <Route exact path="/404" render={() => <Layout><NotFound /></Layout>} />

            <Route exact path="*" render={() => <Layout><NotFound /></Layout>} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  )
}
