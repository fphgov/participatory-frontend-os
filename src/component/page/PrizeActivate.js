import React, { useContext, useState } from "react"
import {
  Redirect,
  useParams,
} from "react-router-dom"
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import ScrollTo from "../common/ScrollTo"

export default function ProfileActivate() {
  const context = useContext(StoreContext)

  const [ success, setSuccess ] = useState(false)
  const [ error, setError ] = useState('')
  const [ redirectLogin, setRedirectLogin ] = useState(false)

  let { hash } = useParams()

  const submitProfileActivate = () => {
    context.set('loading', true)

    const link = process.env.REACT_APP_API_REQ_PROFILE_PRIZE.toString().replace(':hash', hash)

    axios
    .get(link)
    .then(response => {
      if (response.status === 200) {
        setSuccess(response.data.message)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbálja később')
      }
    })
    .finally(() => {
      context.set('loading', false)
    })
  }

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const Success = (props) => {
    return (
      <div className="success-message">
        {props.message}
      </div>
    )
  }

  return (
    <div className="page-profile-section">
      {redirectLogin ? <Redirect to='/bejelentkezes' /> : null }

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Jelentkezés nyereményjátékra</h1>

            <p>A fővárosi közösségi költségvetésbe szavazatot leadó és a nyereményjátékra jelentkező budapestiek közül kisorsolunk 20 főt, akik a BKV Zrt. jóvoltából ellátogathatnak az 50-es években - a 2-es metróval egyidőben - kiépített, sokáig titokban tartott, a köznyelvben Rákosi-bunkerként ismert atombiztos óvóhelyre.</p>

            <p>A lenti gombra kattintva tudsz jelentkezni a nyereményjátékra.<br />A jelentkezéssel elfogadod az adatkezelési tájékoztatónk 5/C pontja szerinti, a nyereményjátékhoz <a href={`${process.env.REACT_APP_SERVER_FILE}/files/adatkezelesi_tajekozato.pdf`} style={{ textDecoration: 'underline' }} rel="noopener noreferrer">kapcsolódó adatkezelést</a>.</p>

            <p>A nyerteseket augusztus folyamán emailben értesítjük.</p>

            <div className="form-scroll"></div>

            {error ? <ScrollTo element={document.querySelector('.form-scroll').offsetTop}><Error message={error} /></ScrollTo> : null}
            {success ? <Success message="Sikeresen jelentkezett a nyereményjátékra!" /> : null}

            {!success ? <input type="submit" value="Jelentkezem" className="btn btn-primary" onClick={() => {
              submitProfileActivate()
            }} /> : null}

            {!context.get('loading') && success ? (<>
              <div className="small">
                <button className="btn btn-primary" onClick={() => { setRedirectLogin(true) }}>Vissza</button>
              </div>
            </>) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
