import React from "react";
import {
  Route,
  Switch,
  HashRouter
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Page from "./Page";
import NotFound from "./page/NotFound";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Logout from "./page/Logout";
import Vote from "./page/Vote";
import ScrollToTop from "./common/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <HashRouter>
          <ScrollToTop>
            <Header />

            <Page>
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/vote" component={Vote} />

                <Route exact path="*" component={NotFound} />
              </Switch>
            </Page>

            <Footer />
          </ScrollToTop>
        </HashRouter>
      </div>
    );
  }
}
