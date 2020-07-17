import axios from "axios"
import React from "react"
import qs from 'querystring'
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default class Login extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      email: '',
      password: '',
      error: '',
      redirect: false
    }
  }

  componentDidMount() {
    document.body.classList.add('page-login')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-login')
  }

  handleChangeInput(e) {
    this.setState({ error: '', [ e.target.name ]: e.target.value })
  }

  submitLogin() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }

    axios.post(process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_LOGIN, qs.stringify(data))
    .then(response => {
      if (response.data && response.data.token) {
        this.context.set('token', response.data.token)
        this.context.set('loggedIn', true)

        this.setState({
          redirect: true
        })
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        this.setState({
          error: error.response.data.message
        })
      }
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
    const { redirect } = this.state

    if (redirect) {
      return <Redirect to='/profil' />
    }

    return (
      <div className="page-login-section">
        <div className="container">
          <h1>Bejelentkezés</h1>

          {this.state.error ? <this.Error message={this.state.error} /> : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <label htmlFor="email">E-mail cím</label>
              <input type="text" placeholder="E-mail cím" name="email" id="email" value={this.state.email} onChange={this.handleChangeInput.bind(this)} />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Jelszó</label>
              <input type="password" placeholder="Jelszó" name="password" id="password" value={this.state.password} onChange={this.handleChangeInput.bind(this)} />
            </div>

            <input type="submit" value="Bejelentkezés" className="btn btn-primary" onClick={this.submitLogin.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
