import React, { useState, useContext, useEffect, Suspense, lazy } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateConverter } from '../assets/helperFunctions'
import modernizr from 'modernizr'

const ImageGallery = lazy(() => import('react-image-gallery'))

export default function Project() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  const [workflowStateOptions, setWorkflowStateOptions] = useState(null)
  const [workflowStateExtraOptions, setWorkflowStateExtraOptions] = useState(null)
  const [project, setProject] = useState(null)
  const [originalWorkflowState, setOriginalWorkflowState] = useState(null)

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

  const getWorkflowStateOptions = () => {
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
          setWorkflowStateOptions(response.data.data)
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

  const getWorkflowStateExtraOptions = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_ADMIN_REQ_WORKFLOW_STATE_EXTRAS, config)
      .then(response => {
        if (response.data && response.data.data) {
          setWorkflowStateExtraOptions(response.data.data)
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

  const getProjects = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_PROJECT.toString().replace(':id', id)

    axios.get(link, config)
      .then(response => {
        if (response.data && response.data.workflowState) {
          setProject(response.data)
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

    const link = process.env.REACT_APP_API_ADMIN_REQ_PROJECT.toString().replace(':id', id)

    const workflowStateCode = typeof project.workflowState.code === 'undefined' ? project.workflowState : project.workflowState.code;

    if (originalWorkflowState.code !== workflowStateCode) {
      if (!confirm('Az állapotnak a változtatása e-mail küldéssel járhat. Biztosan módosítod az állapotot?')) {
        context.set('loading', false)

        return
      }
    }

    const data = {
      title: project.title,
      solution: project.solution,
      description: project.description,
      cost: project.cost ? project.cost : null,
      locationDescription: project.locationDescription,
      answer: project.answer,
      workflowState: typeof project.workflowState.code === 'undefined' ? project.workflowState : project.workflowState.code,
      workflowStateExtra: project.workflowStateExtra === null || typeof project.workflowStateExtra.code === 'undefined' ? project.workflowStateExtra : project.workflowStateExtra.code,
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
    getWorkflowStateOptions()
    getWorkflowStateExtraOptions()
    getProjects()
  }, [])

  const handleChangeInput = (e) => {
    e.persist()

    if (e.target.type === "checkbox") {
      setProject(state => ({ ...state, [ e.target.name ]: e.target.checked }))
    } else {
      setProject(state => ({ ...state, [ e.target.name ]: e.target.value }))
    }
  }

  const submitDetection = (e) => {
    e.preventDefault()
  }

  const getImageObjects = (_project) => {
    return _project.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  const getDocumentObjects = (_project) => {
    return _project.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  return (
    <>
      <div className="proposal project">
        <div className="container">
          {project ? (
            <>
              <h1 tabIndex="0" role="alert" aria-label={`Megvalósuló ötlet azonosító: ${project.id}`}>{project.id ? `Megvalósuló ötlet (${project.id})` : ''}</h1>

              <div className="error-wrapper">
              </div>

              <div className="form-wrapper">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="title">Megnevezés</label>
                      <input type="text" name="title" id="title" value={project.title} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="solution">Mit oldana meg?</label>
                      <textarea type="text" name="solution" id="solution" value={project.solution} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Leírás</label>
                      <textarea type="text" name="description" id="description" value={project.description} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign">Kampány</label>
                      <input type="text" name="campaign" id="campaign" value={project.campaign.title} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-location">Kerület</label>
                      <input type="text" name="campaign-location" id="campaign-location" value={project.campaignLocation ? project.campaignLocation.description : ' '} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-theme">Kategória</label>
                      <input type="text" name="campaign-theme" id="campaign-theme" value={project.campaignTheme.name} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="cost">Becsült költség</label>
                      <input type="text" name="cost" id="cost" value={project.cost !== null ? project.cost : ''} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="workflowState">Állapot</label>
                      <select name="workflowState" id="workflowState" value={project.workflowState.code} onChange={handleChangeInput}>
                        {workflowStateOptions ? workflowStateOptions.map((option, i) => (
                          <option key={i} value={option.code}>{option.privateTitle}</option>
                        )) : null}
                      </select>
                    </div>
                  </div>

                  {project.workflowState === 'PUBLISHED_WITH_MOD' || project.workflowState.code === 'PUBLISHED_WITH_MOD'  ? <>
                    <div className="col-sm-12 col-md-6">
                      <div className="input-wrapper">
                        <label htmlFor="workflowStateExtra">Módosítás oka</label>
                        <select name="workflowStateExtra" id="workflowStateExtra" value={project.workflowStateExtra ? project.workflowStateExtra.code : ''} onChange={handleChangeInput}>
                          <option value="" disabled>Válassz az indokok közül</option>

                          {workflowStateExtraOptions ? workflowStateExtraOptions.map((option, i) => (
                            <option key={i} value={option.code}>{option.title}</option>
                          )) : null}
                        </select>
                      </div>
                    </div>
                  </> : null}
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <h4>Beküldési információk</h4>
                      <div>Időpont: <b>{dateConverter(project.createdAt)}</b></div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4>Dokumentumok</h4>

                    {getDocumentObjects(project) && getDocumentObjects(project).length > 0 ? (
                      <>
                        <div className="media-sep">
                          <div className="documents">
                            {getDocumentObjects(project).length > 0 && getDocumentObjects(project).map((document, i) => (
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

                    {getImageObjects(project) && getImageObjects(project).length > 0 ? (
                      <>
                        <div className="media-sep">
                          {modernizr.arrow && modernizr.webgl ?
                            <Suspense fallback={<div>Betöltés...</div>}>
                              <ImageGallery items={getImageObjects(project)} showFullscreenButton={false} showNav={false} showPlayButton={false} showBullets={true} showThumbnails={false} />
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
