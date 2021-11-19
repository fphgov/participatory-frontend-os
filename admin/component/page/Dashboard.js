import axios from "../assets/axios"
import React from "react"
import {
  Redirect,
} from "react-router-dom"
import StoreContext from '../../StoreContext'
import tokenParser from '../assets/tokenParser'

export default class Dashboard extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      redirectLogin: false,
      close: false,
      countVotes: 'N/A',
      countOfflineVotes: 'N/A',
      countUsers: 'N/A',
      error: [],
    }

    this.context.set('loading', true, () => {
      this.getSettingsData()
    })
  }

  getSettingsData() {
    if (! ['developer', 'admin'].includes(tokenParser('user.role'))) {
      this.context.set('loading', false)

      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_OPTIONS.toString()

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data) {
          this.setState({
            close: response.data.settings && response.data.settings.close ? response.data.settings.close : false,
            countVotes: response.data.infos && response.data.infos.countVotes ? response.data.infos.countVotes : 'N/A',
            countOfflineVotes: response.data.infos && response.data.infos.countOfflineVotes ? response.data.infos.countOfflineVotes : 'N/A',
            countUsers: response.data.infos && response.data.infos.countUsers ? response.data.infos.countUsers : 'N/A',
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
      .finally(() => {
        this.context.set('loading', false)
      })
  }

  componentDidMount() {
    if (localStorage.getItem('auth_admin_token') === null) {
      this.setState({
        redirectLogin: true
      })
    } else {
      this.context.set('token', localStorage.getItem('auth_admin_token'))
      this.context.set('loggedIn', true)

      this.setState({
        redirect: true
      })
    }

    document.body.classList.add('page-dashboard')
  }

  componentWillUnmount() {
    document.body.classList.remove('page-dashboard')
  }

  handleChangeInput(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    this.setState({
      [ e.target.name ]: value
    })
  }

  handleVoteClose() {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const data = {
      close: this.state.close,
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_OPTIONS,
      new URLSearchParams(data).toString(),
      config
    )
      .then(response => {
        if (response.data) {
          this.setState({
            success: true
          })
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          this.setState({
            error: error.response.data.errors
          })
        }
      })
      .finally(() => {
        this.context.set('loading', false)
      })
  }

  handleIdeaExport() {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob'
    }

    this.context.set('loading', true)

    axios.get(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_IDEA_EXPORT,
      config
    )
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([ response.data ]));
        const link = document.createElement('a');

        link.href = url;
        link.setAttribute('download', `export-ideas-${(new Date()) - 0}.xlsx`);

        document.body.appendChild(link);

        link.click();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          this.setState({
            error: error.response.data.errors
          })
        }
      })
      .finally(() => {
        this.context.set('loading', false)
      })
  }

  handleCacheClear() {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      },
    }

    this.context.set('loading', true)

    axios.get(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_CACHE_CLEAR,
      config
    )
      .then(() => {
        this.context.set('loading', false)
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          this.setState({
            error: error.response.data.errors
          })
        }
      })
      .finally(() => {
        this.context.set('loading', false)
      })
  }

  ErrorMini(props) {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
  }

  groupBy(list, props) {
    return list.reduce((a, b) => {
      (a[ b[ props ] ] = a[ b[ props ] ] || []).push(b);
      return a;
    }, {});
  }

  render() {
    const { redirectLogin } = this.state

    if (redirectLogin) {
      return <Redirect to='/login' />
    }

    return (
      <div className="dashboard">
        <div className="container">
          <h1>Irányítópult</h1>

          {['developer', 'admin'].includes(tokenParser('user.role')) ? (
            <>
              <h4>Statisztika</h4>

              <div className="box-wrapper-card">
                <div className="box-card">
                  <div className="box-title">
                    <h3>Ötletek</h3>
                  </div>

                  <div className="box-content">
                    <div className="box">Összesen<br /><span>N/A</span></div>
                    <div className="box">Közzétett<br /><span>N/A</span></div>
                    <div className="box">Elutasított<br /><span>N/A</span></div>
                  </div>
                </div>

                <div className="box-card">
                  <div className="box-title">
                    <h3>Szavazatok</h3>
                  </div>

                  <div className="box-content">
                    <div className="box" aria-label={`Online szavazatok száma ${this.state.countVotes}`}>Online<br /><span>{this.state.countVotes}</span></div>
                    <div className="box" aria-label={`Offline szavazatok száma ${this.state.countOfflineVotes}`}>Offline<br /><span>{this.state.countOfflineVotes}</span></div>
                    <div className="box" aria-label={`Szavazatok száma összesen ${this.state.countVotes != 'N/A' && this.state.countOfflineVotes !== 'N/A' ? this.state.countVotes + this.state.countOfflineVotes : 'N/A'}`}>Összesen<br />
                      <span>{
                        this.state.countVotes != 'N/A' && this.state.countOfflineVotes !== 'N/A' ? this.state.countVotes + this.state.countOfflineVotes : 'N/A'
                      }</span>
                    </div>
                  </div>
                </div>

                <div className="box-card">
                  <div className="box-title">
                    <h3>Felhasználók</h3>
                  </div>

                  <div className="box-content">
                    <div className="box">Összesen<br /><span>{this.state.countUsers}</span></div>
                  </div>
                </div>
              </div>

              <h4>Gyorsgombok</h4>

              <div>
                <div className="action-wrapper">
                  <button className="box box-button" onClick={this.handleCacheClear.bind(this)}>Gyorsítótár ürítés</button>
                  <button className="box box-button" onClick={this.handleIdeaExport.bind(this)}>Ötletek exportálás</button>
                  <button className="box box-button" onClick={this.handleVoteClose.bind(this)} disabled>Szavazás megnyitása</button>
                </div>
              </div>
            </>
          ) : <div>Válasszon a menüpontok közül.</div>}
        </div>
      </div>
    )
  }
}
