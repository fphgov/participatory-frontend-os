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

  const [idea, setIdea] = useState(null)

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

  const getDetection = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_IDEA.toString().replace(':id', id)

    axios.get(process.env.REACT_APP_API_ADMIN_SERVER + link, config)
      .then(response => {
        if (response.data && response.data) {
          setIdea(response.data)
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

  useEffect(() => {
    getDetection()
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
                      <input type="text" name="title" id="title" value={idea.title} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="solution">Mit oldana meg?</label>
                      <textarea type="text" name="solution" id="solution" value={idea.solution} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Leírás</label>
                      <textarea type="text" name="description" id="description" value={idea.description} onChange={handleChangeInput} disabled />
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
                      <input type="text" name="campaign-location" id="campaign-location" value={idea.campaignLocation.description} onChange={handleChangeInput} disabled />
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
                      <input type="text" name="cost" id="cost" value={idea.cost} onChange={handleChangeInput} disabled />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <label htmlFor="status">Állapot</label>
                      <input type="text" name="status" id="status" value={idea.workflowState.title} onChange={handleChangeInput} disabled />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="input-wrapper">
                      <h4>Beküldés</h4>
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
              </div>
            </>
          ) : null}
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
