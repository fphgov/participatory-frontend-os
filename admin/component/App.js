import React from "react"
import {
  Route,
  Switch,
  HashRouter
} from "react-router-dom"
import Layout from "./Layout"
import NotFound from "./page/NotFound"
import Dashboard from "./page/Dashboard"
import Login from "./page/Login"
import Logout from "./page/Logout"
import Vote from "./page/Vote"
import Ideas from "./page/Ideas"
import Idea from "./page/Idea"
import ScrollToTop from "./common/ScrollToTop"
import Posts from "./page/Posts"
import Post from "./page/Post"
import Profile from "./page/Profile"
import 'react-toastify/dist/ReactToastify.css'

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <HashRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" render={() => <Layout><Dashboard /></Layout>} />
              <Route exact path="/login" render={() => <Layout><Login /></Layout>} />
              <Route exact path="/logout" render={() => <Layout><Logout /></Layout>} />
              <Route exact path="/vote" render={() => <Layout><Vote /></Layout>} />
              <Route exact path="/posts" render={() => <Layout><Posts /></Layout>} />
              <Route exact path="/posts/:id" render={() => <Layout><Post /></Layout>} />
              <Route exact path="/profile" render={() => <Layout><Profile /></Layout>} />
              <Route exact path="/ideas" render={() => <Layout><Ideas /></Layout>} />
              <Route exact path="/ideas/:id" render={() => <Layout><Idea /></Layout>} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </ScrollToTop>
        </HashRouter>
      </div>
    )
  }
}
