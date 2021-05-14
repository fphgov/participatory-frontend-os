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
      localStorage.removeItem('rk_vote_CARE')
      localStorage.removeItem('rk_vote_WHOLE')
      localStorage.removeItem('rk_vote_GREEN')

      this.setState({
        redirect: true,
      })
    })
    this.context.set('rk_vote_CARE', null)
    this.context.set('rk_vote_WHOLE', null)
    this.context.set('rk_vote_GREEN', null)
  }

  render() {
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }

    return null
  }
}
