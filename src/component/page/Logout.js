import React from "react"
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default class Logout extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      redirect: false,
      error: null
    }

    this.context.set('loading', true, () => {
      this.submitLogout()
    })
  }

  componentDidMount() {
    document.body.classList.add('page-logout')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-logout')
  }

  submitLogout() {
    this.context.set('token', null)
    this.context.set('loggedIn', false)
    this.context.set('loading', false)

    this.setState({
      redirect: true,
    })
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }

    return null
  }
}
