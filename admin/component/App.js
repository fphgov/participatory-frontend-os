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
import Projects from "./page/Projects"
import Project from "./page/Project"
import ScrollToTop from "./common/ScrollToTop"
import Posts from "./page/Posts"
import Post from "./page/Post"
import PostNew from "./page/PostNew"
import Profile from "./page/Profile"
import Settings from "./page/Settings"
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
              <Route exact path="/posts/new" render={() => <Layout><PostNew /></Layout>} />
              <Route exact path="/posts/:id(\d+)" render={() => <Layout><Post /></Layout>} />
              <Route exact path="/settings" render={() => <Layout><Settings /></Layout>} />
              <Route exact path="/profile" render={() => <Layout><Profile /></Layout>} />
              <Route exact path="/ideas" render={() => <Layout><Ideas /></Layout>} />
              <Route exact path="/ideas/:id(\d+)" render={() => <Layout><Idea /></Layout>} />
              <Route exact path="/projects" render={() => <Layout><Projects /></Layout>} />
              <Route exact path="/projects/:id(\d+)" render={() => <Layout><Project /></Layout>} />

              <Route exact path="*" component={NotFound} />
            </Switch>
          </ScrollToTop>
        </HashRouter>
      </div>
    )
  }
}
