import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  HashRouter,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Page from "./Page";
import Home from "./page/Home";
import Impressum from "./page/Impressum";
import Contacts from "./page/Contacts";
import Login from "./page/Login";
import Proposal from "./page/Proposal";
import Proposals from "./page/Proposals";
import Logout from "./page/Logout";
import Profile from "./page/Profile";
import SEO from "./common/SEO";

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SEO />

        <HashRouter>
          <Header />

          <Page>
            <Switch>
              <HashRouter path="/bejelentkezes">
                <Login />
              </HashRouter>
              <HashRouter path="/kijelentkezes">
                <Logout />
              </HashRouter>
              <HashRouter path="/impresszum">
                <Impressum />
              </HashRouter>
              <HashRouter path="/elerhetosegek">
                <Contacts />
              </HashRouter>
              <HashRouter path="/profil">
                <Profile />
              </HashRouter>
              <HashRouter path="/javaslat">
                <Proposal />
              </HashRouter>
              <HashRouter path="/javaslatok">
                <Proposals / >
              </HashRouter>
              <HashRouter path="/">
                <Home />
              </HashRouter>
            </Switch>
          </Page>

          <Footer />
        </HashRouter>
      </div>
    );
  }
}
