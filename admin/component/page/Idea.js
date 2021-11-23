import React, { useState, useContext, useEffect, Suspense, lazy } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateCoverter } from '../assets/helperFunctions'
import modernizr from 'modernizr'

const ImageGallery = lazy(() => import('react-image-gallery'))

export default function Idea() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  const [options, setOptions] = useState(null)
  const [idea, setIdea] = useState(null)
  const [ originalWorkflowState, setOriginalWorkflowState] = useState(null)

  const documentMimes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
  ]

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const getOptions = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_ADMIN_REQ_WORKFLOW_STATES, config)
      .then(response => {
        if (response.data && response.data.data) {
          setOptions(response.data.data)
        } else {
          notify('⛔️ Sikertelen adat lekérés')
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen adat lekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const getIdeas = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_IDEA.toString().replace(':id', id)

    axios.get(link, config)
      .then(response => {
        if (response.data && response.data) {
          setIdea(response.data)
          setOriginalWorkflowState(response.data.workflowState)
        } else {
          notify('⛔️ Sikertelen adat lekérés')
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen adat lekérés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const postDetection = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_IDEA.toString().replace(':id', id)

    const workflowStateCode = typeof idea.workflowState.code === 'undefined' ? idea.workflowState : idea.workflowState.code;

    if (originalWorkflowState.code !== workflowStateCode) {
      if (!confirm('Az állapotnak a változtatása e-mail küldéssel járhat. Biztosan módosítod az állapotot?')) {
        context.set('loading', false)

        return
      }
    }

    const data = {
      title: idea.title,
      solution: idea.solution,
      description: idea.description,
      cost: idea.cost ? idea.cost : null,
      locationDescription: idea.locationDescription,
      workflowState: typeof idea.workflowState.code === 'undefined' ? idea.workflowState : idea.workflowState.code,
    }

    axios.post(link, new URLSearchParams(data), config)
      .then(response => {
        if (response.data && response.data.data.success) {
          notify('🎉 Sikeres módosítás')
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen módosítás')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  useEffect(() => {
    getOptions()
    getIdeas()
  }, [])

  const handleChangeInput = (e) => {
    e.persist()

    if (e.target.type === "checkbox") {
      setIdea(state => ({ ...state, [ e.target.name ]: e.target.checked }))
    } else {
      setIdea(state => ({ ...state, [ e.target.name ]: e.target.value }))
    }
  }

  const submitDetection = (e) => {
    e.preventDefault()
  }

  const getImageObjects = (_idea) => {
    return _idea.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  const getDocumentObjects = (_idea) => {
    return _idea.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  return (
    <>
      <div className="proposal idea">
        <div className="container">
          {idea ? (
            <>
              <h1 tabIndex="0" role="alert" aria-label={`Ötlet azonosító: ${idea.id}`}>{idea.id ? `Ötlet (${idea.id})` : ''}</h1>

              <div className="error-wrapper">
              </div>

              <div className="form-wrapper">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="title">Megnevezés</label>
                      <input type="text" name="title" id="title" value={idea.title} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="solution">Mit oldana meg?</label>
                      <textarea type="text" name="solution" id="solution" value={idea.solution} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Leírás</label>
                      <textarea type="text" name="description" id="description" value={idea.description} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign">Kampány</label>
                      <input type="text" name="campaign" id="campaign" value={idea.campaign.title} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-location">Kerület</label>
                      <input type="text" name="campaign-location" id="campaign-location" value={idea.campaignLocation ? idea.campaignLocation.description : ' '} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-theme">Kategória</label>
                      <input type="text" name="campaign-theme" id="campaign-theme" value={idea.campaignTheme.name} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="cost">Becsült költség</label>
                      <input type="text" name="cost" id="cost" value={idea.cost !== null ? idea.cost : ''} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="workflowState">Állapot</label>
                      <select name="workflowState" id="workflowState" value={idea.workflowState.code} onChange={handleChangeInput}>
                        {options ? options.map((option, i) => (
                          <option key={i} value={option.code}>{option.title}</option>
                        )) : null}
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="location_description">Helyszín leírás</label>
                      <input type="text" name="location_description" id="location_description" value={idea.locationDescription} onChange={handleChangeInput} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <h4>Beküldési információk</h4>
                      <div>Név: <b>{idea.submitter.lastname} {idea.submitter.firstname}</b></div>
                      <div>Időpont: <b>{dateCoverter(idea.createdAt)}</b></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4>Hivatkozások</h4>

                    {idea.links && idea.links.length > 0 ? (
                      <>
                        <ul className="links">
                          {idea.links.map((link, i) => {
                            return (
                              <li key={`link-${i}`}><a href={link} rel="noopener noreferrer">{link}</a></li>
                            )
                          })}
                        </ul>
                      </>
                    ) : 'Nincs kapcsolódó hivatkozás'}
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <h4>Dokumentumok</h4>

                    {getDocumentObjects(idea) && getDocumentObjects(idea).length > 0 ? (
                      <>
                        <div className="media-sep">
                          <div className="documents">
                            {getDocumentObjects(idea).length > 0 && getDocumentObjects(idea).map((document, i) => (
                              <a key={i} href={document.original} target="_blank" rel="noopener noreferrer">
                                <div key={i} className="document">
                                  <FontAwesomeIcon icon={faFilePdf} />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : 'Nincs kapcsolódó dokumentum'}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4>Képek</h4>

                    {getImageObjects(idea) && getImageObjects(idea).length > 0 ? (
                      <>
                        <div className="media-sep">
                          {modernizr.arrow && modernizr.webgl ?
                            <Suspense fallback={<div>Betöltés...</div>}>
                              <ImageGallery items={getImageObjects(idea)} showFullscreenButton={false} showNav={false} showPlayButton={false} showBullets={true} showThumbnails={false} />
                            </Suspense> : null
                          }
                        </div>
                      </>
                    ) : 'Nincs kapcsolódó kép'}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="button-wrapper">
                      <button className="btn btn-primary" onClick={postDetection}>Mentés</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
