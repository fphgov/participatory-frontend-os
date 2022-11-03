import React, { useState, useContext, useEffect, useRef } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateConverter } from '../assets/helperFunctions'
import Gallery from "../common/Gallery"
import { getImages, getDocuments } from '../assets/helperFunctions'
import RichTextEditor from '../common/RichTextEditor'

export default function Idea() {
  const context = useContext(StoreContext)

  const editorRef = useRef(null)

  const { id } = useParams()

  let formData = new FormData()

  const [error, setError] = useState('')
  const [tempMedia, setTempMedia] = useState([])
  const [workflowStateOptions, setWorkflowStateOptions] = useState(null)
  const [workflowStateExtraOptions, setWorkflowStateExtraOptions] = useState(null)
  const [idea, setIdea] = useState(null)
  const [originalWorkflowState, setOriginalWorkflowState] = useState(null)

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
        if (response.data && response.data.workflowState) {
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

    setError('')

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
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

    formData.append('title', idea.title)
    formData.append('solution', idea.solution)
    formData.append('description', idea.description)
    formData.append('cost', idea.cost ? idea.cost : null)
    formData.append('locationDescription', idea.locationDescription)
    formData.append('answer', editorRef.current.getContent())
    formData.append('workflowState', typeof idea.workflowState.code === 'undefined' ? idea.workflowState : idea.workflowState.code)
    formData.append('workflowStateExtra', idea.workflowStateExtra === null || typeof idea.workflowStateExtra.code === 'undefined' ? idea.workflowStateExtra : idea.workflowStateExtra.code)
    formData.append('theme', idea.campaignTheme.id)

    Array.from(tempMedia).forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`medias[${i}]`, file)
      }
    })

    axios.post(link, formData, config)
      .then(response => {
        if (response.data && response.data.data.success) {
          notify('🎉 Sikeres módosítás')

          setTimeout(() => {
            context.set('loading', true)

            getIdeas()
          }, 1000)
        }
      })
      .catch(error => {
        notify('⛔️ Sikertelen módosítás')

        if (error.response && error.response.data && error.response.data.errors) {
          setError(error.response.data.errors)
        }
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  useEffect(() => {
    getWorkflowStateOptions()
    getWorkflowStateExtraOptions()
    getIdeas()
  }, [])

  const handleChangeInput = (e) => {
    e.persist()

    if (e.target.type === "checkbox") {
      setIdea(state => ({ ...state, [e.target.name]: e.target.checked }))
    } else {
      setIdea(state => ({ ...state, [e.target.name]: e.target.value }))
    }
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

  const onFileChange = (e) => {
    setTempMedia(e.target.files)
  }

  const images = getImages(idea && idea.medias ? idea.medias : [])
  const documents = getDocuments(idea && idea.medias ? idea.medias : [])

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

                      {error && error.title ? Object.values(error.title).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`title-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="solution">Mit oldana meg?</label>
                      <textarea type="text" name="solution" id="solution" value={idea.solution} onChange={handleChangeInput} />

                      {error && error.solution ? Object.values(error.solution).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`solution-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Leírás</label>
                      <textarea type="text" name="description" id="description" value={idea.description} onChange={handleChangeInput} />

                      {error && error.description ? Object.values(error.description).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`description-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign">Kampány</label>
                      <input type="text" name="campaign" id="campaign" value={idea.campaign.title} onChange={handleChangeInput} disabled />

                      {error && error.campaign ? Object.values(error.campaign).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaign-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-location">Kerület</label>
                      <input type="text" name="campaign-location" id="campaign-location" value={idea.campaignLocation ? idea.campaignLocation.description : ' '} onChange={handleChangeInput} disabled />

                      {error && error.campaignLocation ? Object.values(error.campaignLocation).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaignLocation-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="theme">Kategória</label>
                      <input type="text" name="theme" id="theme" value={idea.campaignTheme.name} onChange={handleChangeInput} disabled />

                      {error && error.campaignTheme ? Object.values(error.campaignTheme).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaignTheme-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="cost">Becsült költség</label>
                      <input type="text" name="cost" id="cost" value={idea.cost !== null ? idea.cost : ''} onChange={handleChangeInput} />

                      {error && error.cost ? Object.values(error.cost).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`cost-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="workflowState">Állapot</label>
                      <select name="workflowState" id="workflowState" value={idea.workflowState.code} onChange={handleChangeInput}>
                        {workflowStateOptions ? workflowStateOptions.map((option, i) => (
                          <option key={i} value={option.code}>{option.privateTitle}</option>
                        )) : null}

                        {error && error.workflowState ? Object.values(error.workflowState).map((err, i) => {
                          return <ErrorMini key={i} error={err} increment={`workflowState-${i}`} />
                        }) : null}
                      </select>
                    </div>
                  </div>

                  {idea.workflowState === 'PUBLISHED_WITH_MOD' || idea.workflowState.code === 'PUBLISHED_WITH_MOD' ? <>
                    <div className="col-sm-12 col-md-6">
                      <div className="input-wrapper">
                        <label htmlFor="workflowStateExtra">Módosítás oka</label>
                        <select name="workflowStateExtra" id="workflowStateExtra" value={idea.workflowStateExtra ? idea.workflowStateExtra.code : ''} onChange={handleChangeInput}>
                          <option value="" disabled>Válassz az indokok közül</option>

                          {workflowStateExtraOptions ? workflowStateExtraOptions.map((option, i) => (
                            <option key={i} value={option.code}>{option.title}</option>
                          )) : null}

                          {error && error.workflowStateExtra ? Object.values(error.workflowStateExtra).map((err, i) => {
                            return <ErrorMini key={i} error={err} increment={`workflowStateExtra-${i}`} />
                          }) : null}
                        </select>
                      </div>
                    </div>
                  </> : null}

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="location_description">Helyszín leírás</label>
                      <input type="text" name="location_description" id="location_description" value={idea.locationDescription} onChange={handleChangeInput} />

                      {error && error.locationDescription ? Object.values(error.locationDescription).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`locationDescription-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="answer">Hivatal visszajelzése</label>
                      <RichTextEditor
                        initialValue={idea.answer}
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                          height: 500,
                        }}
                      />

                      {error && error.answer ? Object.values(error.answer).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`answer-${i}`} />
                      }) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <h4>Beküldési információk</h4>
                      <div>Név: <b>{idea.submitter.lastname} {idea.submitter.firstname}</b></div>
                      <div>E-mail: <b>{idea.submitter.email}</b></div>
                      <div>Időpont: <b>{dateConverter(idea.createdAt)}</b></div>
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

                    {error && error.links ? Object.values(error.links).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`links-${i}`} />
                    }) : null}
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <h4>Dokumentumok</h4>

                    {documents && documents.length > 0 ? (
                      <>
                        <div className="media-sep">
                          <div className="documents">
                            {documents.length > 0 && documents.map((document, i) => (
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

                    {images && images.length > 0 ? (
                      <>
                        <div className="media-sep">
                          <Gallery items={images} showThumbnails={true} />
                        </div>
                      </>
                    ) : 'Nincs kapcsolódó kép'}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4>Csatolmány feltöltés</h4>

                    <input id="file" name="file" type="file" multiple onChange={onFileChange} />

                    {error && error.file ? Object.values(error.file).map((err, i) => {
                      return <ErrorMini key={i} error={err} increment={`file-${i}`} />
                    }) : null}
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
