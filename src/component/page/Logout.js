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
    this.context.set('loading', false)
    this.context.set('token', null, () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('rk_voted')

      this.setState({
        redirect: true,
      })
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
