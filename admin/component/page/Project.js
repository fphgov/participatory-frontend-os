import React, { useState, useContext, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateConverter } from '../assets/helperFunctions'
import Implementation from "../common/Implementation"
import Gallery from "../common/Gallery"
import { getImages, getDocuments } from '../assets/helperFunctions'

export default function Project() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  let formData = new FormData()

  const [error, setError] = useState('')
  const [tempMedia, setTempMedia] = useState([])
  const [workflowStateOptions, setWorkflowStateOptions] = useState(null)
  const [project, setProject] = useState(null)
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

  const postDetection = (e) => {
    e.preventDefault()

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

    formData.append('title', project.title)
    formData.append('solution', project.solution)
    formData.append('description', project.description)
    formData.append('cost', project.cost ? project.cost : null)
    formData.append('locationDescription', project.locationDescription)
    formData.append('answer', project.answer)
    formData.append('workflowState', workflowStateCode)
    formData.append('theme', project.campaignTheme.id)

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

            getProjects()
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
    getProjects()
  }, [])

  const handleChangeInput = (e) => {
    e.persist()

    if (e.target.type === "checkbox") {
      setProject(state => ({ ...state, [e.target.name]: e.target.checked }))
    } else {
      setProject(state => ({ ...state, [e.target.name]: e.target.value }))
    }
  }

  const onFileChange = (e) => {
    setTempMedia(e.target.files)
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

  const images = getImages(project && project.medias ? project.medias : [])
  const documents = getDocuments(project && project.medias ? project.medias : [])

  return (
    <>
      <div className="proposal project">
        <div className="container">
          {project ? (
            <>
              <h1 tabIndex="0" role="alert" aria-label={`Megvalósuló ötlet azonosító: ${project.id}`}>{project.id ? `Megvalósuló ötlet (${project.id})` : ''}</h1>

              <div className="error-wrapper">
              </div>

              <form className="form-wrapper" onSubmit={postDetection}>
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="title">Megnevezés</label>
                      <input type="text" name="title" id="title" value={project.title} onChange={handleChangeInput} />

                      {error && error.title ? Object.values(error.title).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`title-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="solution">Mit oldana meg?</label>
                      <textarea type="text" name="solution" id="solution" value={project.solution} onChange={handleChangeInput} />

                      {error && error.solution ? Object.values(error.solution).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`solution-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Leírás</label>
                      <textarea type="text" name="description" id="description" value={project.description} onChange={handleChangeInput} />

                      {error && error.description ? Object.values(error.description).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`description-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign">Kampány</label>
                      <input type="text" name="campaign" id="campaign" value={project.campaign.title} onChange={handleChangeInput} disabled />

                      {error && error.campaign ? Object.values(error.campaign).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaign-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-location">Kerület</label>
                      <input type="text" name="campaign-location" id="campaign-location" value={project.campaignLocation ? project.campaignLocation.description : ' '} onChange={handleChangeInput} disabled />

                      {error && error.campaignLocation ? Object.values(error.campaignLocation).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaignLocation-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="campaign-theme">Kategória</label>
                      <input type="text" name="campaign-theme" id="campaign-theme" value={project.campaignTheme.name} onChange={handleChangeInput} disabled />

                      {error && error.campaignTheme ? Object.values(error.campaignTheme).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`campaignTheme-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="cost">Becsült költség</label>
                      <input type="text" name="cost" id="cost" value={project.cost !== null ? project.cost : ''} onChange={handleChangeInput} />

                      {error && error.cost ? Object.values(error.cost).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`cost-${i}`} />
                      }) : null}
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

                      {error && error.workflowState ? Object.values(error.workflowState).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`workflowState-${i}`} />
                      }) : null}
                    </div>
                  </div>
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="button-wrapper">
                      <button type="submit" className="btn btn-primary">Mentés</button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="space"></div>

              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <h2>Hol tartunk a megvalósítással?</h2>

                  <Implementation implementations={project.implementations} projectId={project.id} />
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
