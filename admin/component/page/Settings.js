import axios from "../assets/axios"
import React, { useState, useContext, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import StoreContext from '../../StoreContext'
import Tabs from '../common/Tabs'
import TabContent from '../common/TabContent'
import tokenParser from '../assets/tokenParser'
import IdeaAnswer from './settings/IdeaAnswer'
import IdeaEmail from './settings/IdeaEmail'

export default function Settings() {
  const context = useContext(StoreContext)

  const [ tab, setTab ] = useState('email')

  const [ error, setError ] = useState('')
  const [ state, setState ] = useState({
    mailCode: '',
  })

  const [ mailOptions, setMailOptions ] = useState([])
  const [ mail, setMail ] = useState({
    subject: '',
    html: '',
    plainText: ''
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

  const handleChangeEmail = (e) => {
    e.persist()

    setMail({ ...mail, [ e.target.name ]: e.target.value })
    setError('')
  }

  const getMails = () => {
    context.set('loading', true)

    if (! ['developer', 'admin'].includes(tokenParser('user.role'))) {
      context.set('loading', false)

      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_EMAILS.toString()

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data && response.data.data) {
          setMailOptions(response.data.data)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }

        notify('⛔️ Sikertelen adatlekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const getMail = () => {
    setMail({
      subject: '',
      html: '',
      plainText: ''
    })

    context.set('loading', true)

    if (![ 'developer', 'admin' ].includes(tokenParser('user.role'))) {
      context.set('loading', false)

      return
    }

    if (! state.mailCode) {
      return
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_EMAIL.toString().replace(':code', state.mailCode)

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data && response.data.data) {
          setMail(response.data.data)
        }
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }

        notify('⛔️ Sikertelen adatlekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const saveEmail = (e) => {
    e.preventDefault()

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_EMAIL.toString().replace(':code', state.mailCode)

    axios.post(
      process.env.REACT_APP_API_ADMIN_SERVER + link,
      new URLSearchParams(mail).toString(),
      config
    ).then(response => {
      if (response.status === 200) {
        notify('🎉 Sikeres módosítás')
      } else {
        notify('⛔️ Sikertelen módosítás')
      }
    }).catch(() => {
      notify('⛔️ Sikertelen módosítás')
    })
      .finally(() => {
        context.set('loading', false)
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

  useEffect(() => {
    getMails()
  }, [])

  useEffect(() => {
    getMail()
  }, [state.mailCode])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="settings">
              <h1>Beállítások</h1>

              <Tabs value={tab} onChange={(id) => { setTab(id) }}>
                <TabContent id="email" name="E-mail szövegek">
                  <h2>E-mail szövegek</h2>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-wrapper">
                        <label htmlFor="mailCode">E-mail sablon</label>
                        <select type="text" name="mailCode" id="mailCode" onChange={handleChangeInput} value={state.mailCode}>
                          <option value="" disabled>Válassz az e-mail sablonok közül</option>

                          {mailOptions ? mailOptions.map((option, i) => (
                            <option key={i} value={option.code}>{option.name}</option>
                          )) : null}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-wrapper">
                        <label htmlFor="subject">Tárgy</label>
                        <input type="text" name="subject" id="subject" onChange={handleChangeEmail} value={mail.subject} />

                        {error && error.subject ? Object.values(error.subject).map((err, i) => {
                          return <ErrorMini key={i} error={err} increment={`subject-${i}`} />
                        }) : null}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-wrapper">
                        <label htmlFor="plainText">Szöveges formátum</label>
                        <div className="tipp">Ügyelj arra, hogy 1 sorban maximálisan 78 karakter helyezhető el! <a href="https://www.rfc-editor.org/rfc/rfc5322.txt" target="_blank">RFC5322</a></div>
                        <textarea name="plainText" id="plainText" onChange={handleChangeEmail} value={mail.plainText} />

                        {error && error.plainText ? Object.values(error.plainText).map((err, i) => {
                          return <ErrorMini key={i} error={err} increment={`plainText-${i}`} />
                        }) : null}
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="input-wrapper">
                        <label htmlFor="html">HTML formátum</label>
                        <textarea name="html" id="html" onChange={handleChangeEmail} value={mail.html} />

                        {error && error.html ? Object.values(error.html).map((err, i) => {
                          return <ErrorMini key={i} error={err} increment={`html-${i}`} />
                        }) : null}
                      </div>
                    </div>
                  </div>

                  {mail && mail.html && mail.plainText ? (
                    <div className="mt-4 mb-4">
                      <button className="btn btn-primary" onClick={saveEmail}>Mentés</button>
                    </div>
                  ) : null}
                </TabContent>

                <TabContent id="idea_answer" name="Ötlet válaszok importálása">
                  <IdeaAnswer />
                </TabContent>

                <TabContent id="idea_email" name="E-mail küldés ötletgazdáknak">
                  <IdeaEmail />
                </TabContent>

                <TabContent id="periods" name="Időszakok">
                  <h2>Időszakok</h2>

                  Hamarosan...
                </TabContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
