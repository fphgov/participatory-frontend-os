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
import Home from "./page/Home";
import Impressum from "./page/Impressum";
import Contacts from "./page/Contacts";
import Login from "./page/Login";
import ProposalNew from "./page/ProposalNew";
import Proposal from "./page/Proposal";
import Proposals from "./page/Proposals";
import Projects from "./page/Projects";
import Logout from "./page/Logout";
import Profile from "./page/Profile";
import SEO from "./common/SEO";
import ScrollToTop from "./common/ScrollToTop";

export default class App extends React.Component {
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
                <Route exact path="/" component={Home} />
                <Route exact path="/bejelentkezes" component={Login} />
                <Route exact path="/kijelentkezes" component={Logout} />
                <Route exact path="/impresszum" component={Impressum} />
                <Route exact path="/elerhetosegek" component={Contacts} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/profil" component={Profile} />
                {/* <Route exact path="/javaslat/bekuldes" component={ProposalNew} /> */}
                {/* <Route exact path="/javaslat/:hashId" component={Proposal} />
                <Route exact path="/javaslatok" component={Proposals} /> */}

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
