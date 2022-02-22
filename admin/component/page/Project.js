import React, { useState, useContext, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateConverter } from '../assets/helperFunctions'
import Implementation from "../common/Implementation"
import { Editor } from 'react-draft-wysiwyg'
import { createEditorStateWithText } from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'
import Gallery from "../common/Gallery"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function Project() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  let formData = new FormData()

  const [editorState, setEditorState] = useState(createEditorStateWithText(''))
  const [tempMedia, setTempMedia] = useState([])
  const [implementationMedia, setImplementationMedia] = useState([])
  const [workflowStateOptions, setWorkflowStateOptions] = useState(null)
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

    formData.append('title', project.title)
    formData.append('solution', project.solution)
    formData.append('description', project.description)
    formData.append('cost', project.cost ? project.cost : null)
    formData.append('locationDescription', project.locationDescription)
    formData.append('answer', project.answer)
    formData.append('workflowState', workflowStateCode)
    formData.append('theme', project.campaignTheme.id)
    formData.append('implementation', stateToHTML(editorState.getCurrentContent()))

    Array.from(tempMedia).forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`medias[${i}]`, file)
      }
    })

    Array.from(implementationMedia).forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`implementationMedia[${i}]`, file)
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
      .catch(() => {
        notify('⛔️ Sikertelen módosítás')
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

  const onImplementationFileChange = (e) => {
    setImplementationMedia(e.target.files)
  }

  const getImageObjects = (_project) => {
    return _project.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

      return link
    })
  }

  const getDocumentObjects = (_project) => {
    return _project.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  const images = project ? getImageObjects(project) : []

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
                  <div className="col-sm-12 col-md-12">
                    <h4>Hol tartunk a megvalósítással?</h4>

                    <Implementation implementations={project.implementations} />

                    <div className="implementation-add">
                      <details>
                        <summary>
                          <h4>Új megvalósítás</h4>
                        </summary>

                        <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={setEditorState}
                        />

                        <h4>Megvalósítási média feltöltés</h4>

                        <input id="implementationMedia" name="implementationMedia" type="file" multiple onChange={onImplementationFileChange} />
                      </details>
                    </div>
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
