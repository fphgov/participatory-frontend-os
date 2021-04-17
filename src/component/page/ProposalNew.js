import axios from "axios"
import React from "react"
import qs from 'querystring'
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'

export default class ProposalNew extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      error: '',
      redirect: false,
      redirectLogin: false,
      title: '',
      description: '',
      cost: '',
      location: 'budapest',
    }
  }

  componentDidMount() {
    document.body.classList.add('page-new-proposal')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-new-proposal')
  }

  handleChangeInput(e) {
    this.setState({ [ e.target.name ]: e.target.value })
  }

  handleOnlyNumberChangeInput(e) {
    const numberRegex = /[^0-9]+/g

    let value = e.target.value

    if (numberRegex.test(value)) {
      value = value.replace(numberRegex, '')
    }

    this.setState({ error: '', [ e.target.name ]: e.target.value.replace(numberRegex, '') || "" })
  }

  submitProposal() {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        'Accept': 'application/json',
      }
    }

    const data = {
      title: this.state.title,
      description: this.state.description,
      cost: this.state.cost,
      location: this.state.location,
    }

    axios.post(
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_NEW_PROPOSAL,
      qs.stringify(data),
      config
    )
    .then(response => {
      if (response.data) {
        this.setState({
          redirect: true
        })
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        this.setState({
          redirectLogin: true
        })

        this.context.set('loading', false)

        return;
      }

      if (error.response && error.response.data && error.response.data.errors) {
        this.setState({
          error: error.response.data.errors
        })
      }

      this.context.set('loading', false)
    })
  }

  Error(props) {
    return (
      <div className="error-message">
        {props.message && props.message.error && props.message.error.map((error, i) => {
          return (
            <div>{error}</div>
          )
        })}
      </div>
    )
  }

  render() {
    const { redirect, redirectLogin } = this.state

    if (redirect) {
      return <Redirect to='/' />
    }

    if (redirectLogin) {
      return <Redirect to='/bejelentkezes' />
    }

    return (
      <div className="proposal">
        <div className="container">
          <h1>Javaslat</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, aut eum qui necessitatibus molestiae ratione cum eos impedit incidunt voluptas rem delectus, laboriosam doloremque explicabo debitis voluptatibus ullam odit.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta, aut eum qui necessitatibus molestiae ratione cum eos impedit incidunt voluptas rem delectus, laboriosam doloremque explicabo debitis voluptatibus ullam odit.</p>

          {this.state.error ? <this.Error message={this.state.error} /> : null}

          <div className="form-wrapper">
            <div className="input-wrapper">
              <label htmlFor="title">Rövid megnevezés</label>
              <div className="input-tipp">Adjon meg egy címet a javaslatának.</div>
              <input type="text" placeholder="Rövid megnevezés" name="title" id="title" value={this.state.title} onChange={this.handleChangeInput.bind(this)} />

              { this.state.error && this.state.error.title ? Object.values(this.state.error.title).map((err, i) => {
                return (<div key={i} className="error-message-inline">{err}</div>)
              }) : null }
            </div>

            <div className="input-wrapper">
              <label htmlFor="description">Leírás</label>
              <div className="input-tipp">Fejtse ki, hogy miről szól a projekt.</div>
              <textarea placeholder="Leírás" name="description" id="description" value={this.state.description} onChange={this.handleChangeInput.bind(this)} />

              {this.state.error && this.state.error.description ? Object.values(this.state.error.description).map((err, i) => {
                return (<div key={i} className="error-message-inline">{err}</div>)
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="cost">Költség</label>
              <div className="input-tipp">Adja meg a javaslat becsült költségét. A költség értéke forintban értendő, ezres kerekítés nélkül.</div>
              <input type="text" placeholder="1000000" name="cost" id="cost" value={this.state.cost} onChange={this.handleOnlyNumberChangeInput.bind(this)} />

              {this.state.error && this.state.error.cost ? Object.values(this.state.error.cost).map((err, i) => {
                return (<div key={i} className="error-message-inline">{err}</div>)
              }) : null}
            </div>

            <div className="input-wrapper">
              <label htmlFor="location">Helyszín</label>
              <div className="input-tipp">Adja meg a kerületet vagy ha egész Budapestre vonatkozik, akkor Budapestet.</div>
              <select name="location" id="location" value={this.state.location} onChange={this.handleChangeInput.bind(this)}>
                <option value="budapest">Budapest</option>
                <option value="I">Budapest I.</option>
                <option value="II">Budapest II.</option>
                <option value="III">Budapest III.</option>
                <option value="IV">Budapest IV.</option>
                <option value="V">Budapest V.</option>
                <option value="VI">Budapest VI.</option>
                <option value="VII">Budapest VII.</option>
                <option value="VIII">Budapest VIII.</option>
                <option value="IX">Budapest IX.</option>
                <option value="X">Budapest X.</option>
                <option value="XI">Budapest XI.</option>
                <option value="XII">Budapest XII.</option>
                <option value="XIII">Budapest XIII.</option>
                <option value="XIV">Budapest XIV.</option>
                <option value="XV">Budapest XV.</option>
                <option value="XVI">Budapest XVI.</option>
                <option value="XVII">Budapest XVII.</option>
                <option value="XVIII">Budapest XVIII.</option>
                <option value="XIX">Budapest XIX.</option>
                <option value="XX">Budapest XX.</option>
                <option value="XXI">Budapest XXI.</option>
                <option value="XXII">Budapest XXII.</option>
                <option value="XXIII">Budapest XXIII.</option>
              </select>

              {this.state.error && this.state.error.location ? Object.values(this.state.error.location).map((err, i) => {
                return (<div key={i} className="error-message-inline">{err}</div>)
              }) : null}
            </div>

            <input type="submit" value="Beküldés" className="btn btn-primary" onClick={this.submitProposal.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}
