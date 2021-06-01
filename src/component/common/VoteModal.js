import React, { useRef, useEffect, useContext, useState } from "react"
import { useLocation, Link } from 'react-router-dom'
import qs from 'querystring'
import axios from "../assets/axios"
import StoreContext from '../../StoreContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowAltCircleUp, faArrowAltCircleDown, faTrash, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

export default function VoteModal(props) {
  const context = useContext(StoreContext)
  const location = useLocation()
  const voteModal = useRef(null)
  const [error, setError] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const height = voteModal && voteModal.current && voteModal.current.scrollHeight && props.open === true ? voteModal.current.scrollHeight : 54

  const enumOptions = [
    'rk_vote_GREEN',
    'rk_vote_CARE',
    'rk_vote_WHOLE',
  ]

  const checkLoggedIn = () => {
      setLoggedIn(!!context.get('token'))
  }

  const checkOptions = () => {
    enumOptions.forEach((option) => {
      const voteItem = localStorage.getItem(option)

      if (!voteItem) {
        context.set(option, null)
        return false
      }

      try {
        const pVoteItem = JSON.parse(voteItem)

        context.set(option, pVoteItem)
      } catch (error) {
        return false
      }

      return true
    })
  }

  useEffect(() => {
    context.set('rk_modal_open', false)
    checkLoggedIn()
    checkOptions()

    if (!localStorage.getItem('vote_modal_first')) {
      context.set('rk_modal_open', true)

      localStorage.setItem('vote_modal_first', true)
    }
  }, [location])

  useEffect(() => {
    checkLoggedIn()
    checkOptions()
  }, [])

  const enableSendVote = () => {
    return context.get(enumOptions[0]) && context.get(enumOptions[1]) && context.get(enumOptions[2])
  }

  const sendVote = () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${context.get('token')}`,
        'Accept': 'application/json',
      }
    }

    const data = {}

    enumOptions.forEach((option) => {
      data[option] = context.get(option).id
    })

    context.set('loading', true)

    axios.post(
      process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_PROFILE_VOTE,
      qs.stringify(data),
      config
    ).then(response => {
      if (response.data) {
        localStorage.setItem('rk_voted', "true")

        context.set('successVote', true)
        context.set('loading', false)
      }
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else if (error.response && error.response.data && error.response.data.errors) {
        setError(error.response.data.errors)
      }

      context.set('loading', false)
    })
  }

  return (
    <div className="vote-modal" style={{ height: height }} ref={voteModal}>
      <div className="container">
        <h3 style={{ textTransform: 'uppercase' }} onClick={() => { context.set('rk_modal_open', ! props.open) }}>
          Kattintson ide a szavazás megkezdéséhez {props.open ? <FontAwesomeIcon icon={faArrowAltCircleUp} /> : <FontAwesomeIcon icon={faArrowAltCircleDown} />}
        </h3>

        {loggedIn ? <>
          <div className="vote-option-wrapper">
            <div className={`vote-option vote-option-1 ${! context.get('rk_vote_GREEN') ? 'vote-option-placeholder' : ''}`}>
              {context.get('rk_vote_GREEN') ? <div className="vote-option-item">
                <div className="vote-option-content">
                  <div className="vote-option-title">{context.get('rk_vote_GREEN').title}</div>
                  <div className="vote-option-description">{context.get('rk_vote_GREEN').description}</div>
                </div>
                <div className="vote-option-actions">
                  {! context.get('successVote') ?
                    <div className="vote-action-remove" onClick={() => { localStorage.removeItem('rk_vote_GREEN'); checkOptions()}} title="Törlés">
                      <FontAwesomeIcon icon={faTrash} />
                    </div> : null
                  }
                </div>
              </div> : <a href={`${process.env.REACT_APP_BASENAME}/projektek?query=&theme=1`.replaceAll('//', '/')} className="placeholder-text">Kattinson ide, és válasszon a <strong>Zöld Budapest</strong> kategóriából egy ötletet (kötelező)</a>}
            </div>
            <div className={`vote-option vote-option-2 ${!context.get('rk_vote_CARE') ? 'vote-option-placeholder' : ''}`}>
              {context.get('rk_vote_CARE') ? <div className="vote-option-item">
                <div className="vote-option-content">
                  <div className="vote-option-title">{context.get('rk_vote_CARE').title}</div>
                  <div className="vote-option-description">{context.get('rk_vote_CARE').description}</div>
                </div>
                <div className="vote-option-actions">
                  {! context.get('successVote') ?
                    <div className="vote-action-remove" onClick={() => { localStorage.removeItem('rk_vote_CARE'); checkOptions() }} title="Törlés">
                      <FontAwesomeIcon icon={faTrash} />
                    </div> : null
                  }
                </div>
              </div> : <a href={`${process.env.REACT_APP_BASENAME}/projektek?query=&theme=2`.replaceAll('//', '/')} className="placeholder-text">Kattinson ide, és válasszon a <strong>Gondoskodó Budapest</strong> kategóriából egy ötletet (kötelező)</a>}
            </div>
            <div className={`vote-option vote-option-3 ${!context.get('rk_vote_WHOLE') ? 'vote-option-placeholder' : ''}`}>
              {context.get('rk_vote_WHOLE') ? <div className="vote-option-item">
                <div className="vote-option-content">
                  <div className="vote-option-title">{context.get('rk_vote_WHOLE').title}</div>
                  <div className="vote-option-description">{context.get('rk_vote_WHOLE').description}</div>
                </div>
                <div className="vote-option-actions">
                  {! context.get('successVote') ?
                    <div className="vote-action-remove" onClick={() => { localStorage.removeItem('rk_vote_WHOLE'); checkOptions() }} title="Törlés">
                      <FontAwesomeIcon icon={faTrash} />
                    </div> : null
                  }
                </div>
              </div> : <a href={`${process.env.REACT_APP_BASENAME}/projektek?query=&theme=3`.replaceAll('//', '/')} className="placeholder-text">Kattinson ide, és válasszon a <strong>Egész Budapest</strong> kategóriából egy ötletet (kötelező)</a>}
            </div>
          </div>

          {error ? <p>{error.message}</p> : null}

          {!context.get('successVote') ? <>
            <div className={`btn btn-primary btn-vote-final ${enableSendVote() ? 'btn-vote-active' : ''}`} onClick={() => sendVote()}>Beküldöm a szavazatom <sup>*</sup></div>
            <p><sup>*</sup> A gomb megnyomása után a kiválasztott ötletetekre leadott szavazatok véglegesednek, módosításra nincs lehetőség.</p>
          </> : <p>Az Ön szavazatai véglegesedtek, módosításra nincs lehetőség.</p>}
        </> : <div className="vote-login">
            <p><Link to={`/bejelentkezes`}>Jelentkezzen be</Link> a szavazáshoz!</p>
        </div>}

        {loggedIn && localStorage.getItem('rk_voted', "true") ? <Link className="btn btn-primary btn-vote-more" to={`/statisztika`}>Leadott szavazatok</Link> : null}

        {loggedIn ? <Link to={`/kijelentkezes`} className="logout"><FontAwesomeIcon icon={faSignOutAlt} />Kijelentkezés</Link> : null}
      </div>
    </div>
  )
}
