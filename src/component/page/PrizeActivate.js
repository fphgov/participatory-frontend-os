import React from "react"
import {
  Redirect,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'

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

  toRedirect() {
    this.setState({
      redirectLogin: true
    })
  }

  profileActivate() {
    const config = {
      headers: {
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_REQ_PROFILE_PRIZE.toString().replace(':hash', this.props.match.params.hash)

    axios.get(process.env.REACT_APP_API_SERVER + link, config)
      .then(response => {
        if (response.data) {
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

  Success(props) {
    return (
      <div className="success-message">
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
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Jelentkezés nyereményjátékra</h1>

              {! this.context.get('loading') ? (<>
                {this.state.error ? <this.Error message={this.state.error} /> : <this.Success message="Sikeresen jelentkezett a nyereményjátékra!" />}

                <div class="small">
                  <button className="btn btn-primary" onClick={this.toRedirect.bind(this)}>Vissza</button>
                </div>
              </>) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
