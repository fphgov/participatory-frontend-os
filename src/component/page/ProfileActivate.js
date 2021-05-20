import React from "react"
import {
  Redirect,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import SEO from '../common/SEO'

export default class ProfileActivate extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      redirectLogin: false
    }

    this.context.set('loading', true, () => {
      this.profileActivate()
    })
  }

  profileActivate() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_REQ_PROFILE_ACTIVATE.toString().replace(':hash', this.props.match.params.hash)

    axios.get(process.env.REACT_APP_API_SERVER + link, config)
      .then(response => {
        if (response.data) {
          this.setState({
            redirectLogin: true
          })

          this.context.set('loading', false)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          this.setState({
            error: error.response.data.message
          })
        } else {
          this.setState({
            error: 'Váratlan hiba történt, kérjük próbálja később'
          })
        }

        this.context.set('loading', false)
      })
  }

  Error(props) {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  render() {
    const { redirectLogin } = this.state

    if (redirectLogin) {
      return <Redirect to='/bejelentkezes' />
    }

    return (
      <div className="page-profile-section">
        <SEO title="Szavazzon most!" />

        <div className="container">
          <h1>Felhasználói fiók aktíválása</h1>

          {this.state.error ? <this.Error message={this.state.error} /> : <p>A felhasználói fiókjának aktíválása folyamatban van.</p>}
        </div>
      </div>
    )
  }
}
