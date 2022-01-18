import axios from "../assets/axios"
import React, { useState, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify'
import StoreContext from '../../StoreContext'
import Tabs from '../common/Tabs'
import TabContent from '../common/TabContent'

export default function Settings() {
  const context = useContext(StoreContext)

  const [ tab, setTab ] = useState('email')

  const [ error, setError ] = useState('')
  const [ state, setState ] = useState({
    email: '',
  })

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const handleChangeInput = (e) => {
    e.persist()

    setState({ ...state, [ e.target.name ]: e.target.value })
    setError('')
  }

  const submitPassword = (e) => {
    e.preventDefault()

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + process.env.REACT_APP_API_ADMIN_REQ_PASSWORD,
      new URLSearchParams(data).toString(),
      config
    ).then(response => {
      context.set('loading', false)

      if (response.status === 200) {
        notify('🎉 Sikeres jelszó módosítás')
      } else {
        notify('⛔️ Sikertelen jelszó módosítás')
      }
    }).catch(() => {
      context.set('loading', false)

      notify('⛔️ Sikertelen jelszó módosítás')
    })
  }

  const ErrorMini = (props) => {
    if (typeof props.error === 'object') {
      return Object.values(props.error).map((e, i) => {
        return (<div key={i} className="error-message-inline">{e}</div>)
      })
    } else {
      return (<div key={props.increment} className="error-message-inline">{props.error}</div>)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="profile">
              <h1>Beállítások</h1>
            </div>

            <Tabs value={tab} onChange={(id) => { setTab(id) }}>
              <TabContent id="email" name="E-mail szövegek">
                <h2>E-mail szövegek</h2>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-wrapper">
                      <label htmlFor="emailType">E-mail sablon</label>
                      <select type="text" name="emailType" id="emailType" onChange={handleChangeInput}>
                        <option value="Valami">Valami 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="input-wrapper">
                      <label htmlFor="emailText">Szöveges formátum</label>
                      <textarea type="emailText" name="emailText" id="emailText" onChange={handleChangeInput} value="ok" />

                      {error && error.emailText ? Object.values(error.emailText).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`emailText-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="input-wrapper">
                      <label htmlFor="emailHtml">HTML formátum</label>
                      <textarea type="emailHtml" name="emailHtml" id="emailHtml" onChange={handleChangeInput} value="ok" />

                      {error && error.emailHtml ? Object.values(error.emailHtml).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`emailHtml-${i}`} />
                      }) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-4">
                  <button className="btn btn-primary" onClick={submitPassword}>Mentés</button>
                </div>
              </TabContent>

              <TabContent id="periods" name="Időszakok">
                <h2>Időszakok</h2>

                Hamarosan...
              </TabContent>
            </Tabs>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
