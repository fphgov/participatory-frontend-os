import React from "react"
import {
  Redirect,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import ScrollTo from "../common/ScrollTo"

export default class ProfileActivate extends React.Component {
  static contextType = StoreContext

  constructor(props, context) {
    super(props, context)

    this.state = {
      redirectLogin: false,
      error: false,
      success: '',
    }

    this.context.set('loading', false)
  }

  toRedirect() {
    this.setState({
      redirectLogin: true
    })
  }

  profileActivate() {
    this.context.set('loading', true)

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

        if (response.status === 200) {
          this.setState({
            success: response.data.message
          })
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
    const { redirectLogin, error, success } = this.state

    if (redirectLogin) {
      return <Redirect to='/bejelentkezes' />
    }

    return (
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Jelentkezés nyereményjátékra</h1>

              <p>A fővárosi részvételi költségvetésbe szavazatot leadó és a nyereményjátékra jelentkező budapestiek közül kisorsolunk 20 főt, akik a BKV Zrt. jóvoltából ellátogathatnak az 50-es években - a 2-es metróval egyidőben - kiépített, sokáig titokban tartott, a köznyelvben Rákosi-bunkerként ismert atombiztos óvóhelyre.</p>

              <p>A lenti gombra kattintva tud jelentkezni a nyereményjátékra.<br />A jelentkezéssel elfogadja az adatkezelési tájékoztatónk 5/C pontja szerinti, a nyereményjátékhoz <a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&htmlpage_id=5" style={{ textDecoration: 'underline' }}>kapcsolódó adatkezelést</a>.</p>

              <p>A nyerteseket augusztus folyamán emailben értesítjük.</p>

              <div className="form-scroll"></div>

              {error ? <ScrollTo element={document.querySelector('.form-scroll').offsetTop}><this.Error message={error} /></ScrollTo> : null}
              {success ? <this.Success message="Sikeresen jelentkezett a nyereményjátékra!" /> : null}

              {! success ? <input type="submit" value="Jelentkezem" className="btn btn-primary" onClick={this.profileActivate.bind(this)} /> : null}

              {! this.context.get('loading') && success ? (<>
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
