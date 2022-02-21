import React, { useState, useContext, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { dateConverter } from '../assets/helperFunctions'
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

export default function Idea() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  let formData = new FormData()

  const [tempMedia, setTempMedia] = useState([])
  const [workflowStateOptions, setWorkflowStateOptions] = useState(null)
  const [workflowStateExtraOptions, setWorkflowStateExtraOptions] = useState(null)
  const [idea, setIdea] = useState(null)
  const [originalWorkflowState, setOriginalWorkflowState] = useState(null)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

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
    formData.append('answer', idea.answer)
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

  const onFileChange = (e) => {
    setTempMedia(e.target.files)
  }

  const getImageObjects = (_idea) => {
    return _idea.medias.filter(media => documentMimes.indexOf(media.type) === -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA.toString().replace(':id', item.id)

      return link
    })
  }

  const getDocumentObjects = (_idea) => {
    return _idea.medias.filter(media => documentMimes.indexOf(media.type) > -1).map((item) => {
      const link = process.env.REACT_APP_API_SERVER + process.env.REACT_APP_API_REQ_MEDIA_DOWNLOAD.toString().replace(':id', item.id)

      return { original: link }
    })
  }

  const images = idea ? getImageObjects(idea) : []

  const onThumbnail = (index) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  const thumbnails = () => {
    return (
      <div className="implementation-thumbnail-container">
        {images.map((image, index) =>
        (
          <div
            className="implementation-thumbnail-block"
            key={index} tabIndex="0"
            aria-label="Miniatűr előnézeti kép"
            onClick={() => onThumbnail(index)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onThumbnail(index)
              }
            }}>
            <img className="implementation-thumbnail-image" src={image} />
          </div>
        ))}
      </div>
    )
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
                      <label htmlFor="theme">Kategória</label>
                      <input type="text" name="theme" id="theme" value={idea.campaignTheme.name} onChange={handleChangeInput} disabled />
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
                        {workflowStateOptions ? workflowStateOptions.map((option, i) => (
                          <option key={i} value={option.code}>{option.privateTitle}</option>
                        )) : null}
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
                        </select>
                      </div>
                    </div>
                  </> : null}

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="location_description">Helyszín leírás</label>
                      <input type="text" name="location_description" id="location_description" value={idea.locationDescription} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="answer">Hivatal visszajelzése</label>
                      <textarea name="answer" id="answer" value={idea.answer} onChange={handleChangeInput} />
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

                    {images && images.length > 0 ? (
                      <>
                        <div className="media-sep">
                          {images && thumbnails()}
                          {isOpen && <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                            onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                          />}
                        </div>
                      </>
                    ) : 'Nincs kapcsolódó kép'}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <h4>Média feltöltés</h4>

                    <input id="file" name="file" type="file" multiple onChange={onFileChange} />
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
