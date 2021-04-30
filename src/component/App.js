import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Page from "./Page";
import NotFound from "./page/NotFound";
// import Home from "./page/Home";
// import Impressum from "./page/Impressum";
// import Contacts from "./page/Contacts";
import Login from "./page/Login";
import Project from "./page/Project";
import Projects from "./page/Projects";
import ProfileActivate from "./page/ProfileActivate";
import Registration from "./page/Registration";
import ResetPassword from "./page/ResetPassword";
import ForgotPassword from "./page/ForgotPassword";
import ForgotAccount from "./page/ForgotAccount";
import Logout from "./page/Logout";
import Profile from "./page/Profile";
import SEO from "./common/SEO";
import ScrollToTop from "./common/ScrollToTop";
import StoreContext from '../StoreContext'
import tokenParser from './assets/tokenParser'

export default class App extends React.Component {
  static contextType = StoreContext

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.context.set('token', localStorage.getItem('auth_token') || '')

      const voted = tokenParser('user.voted')

      const successVote = voted || !!localStorage.getItem('rk_voted')

      setTimeout(() => {
        this.context.set('successVote', successVote)
      }, 100)
    } else {
      this.context.set('token', null)
    }
  }

  render() {
    return (
      <div className="app">
        <SEO />

        <Router basename={process.env.REACT_APP_BASENAME}>
          {(process.env.GA_ID || process.env.GTM_ID) ? <CookieNotice /> : ''}
          <ScrollToTop>
            <Header />

            <Page>
              <Switch>
                <Route exact path="/" component={Projects} />
                <Route exact path="/bejelentkezes" component={Login} />
                <Route exact path="/kijelentkezes" component={Logout} />
                {/* <Route exact path="/impresszum" component={Impressum} /> */}
                {/* <Route exact path="/elerhetosegek" component={Contacts} /> */}
                <Route exact path="/projektek" component={Projects} />
                <Route exact path="/projektek/:id" component={Project} />
                <Route exact path="/profil" component={Profile} />
                <Route exact path="/profil/aktivalas/:hash" component={ProfileActivate} />
                <Route exact path="/profil/jelszo/:hash" component={ResetPassword} />
                <Route exact path="/regisztracio" component={Registration} />
                <Route exact path="/elfelejtett-felhasznalonev" component={ForgotAccount} />
                <Route exact path="/elfelejtett-jelszo" component={ForgotPassword} />

                <Route exact path="*" component={NotFound} />
              </Switch>
            </Page>

            <Footer />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}
