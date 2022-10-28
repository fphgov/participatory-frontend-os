import React, { useState, useContext, useRef } from "react"
import { toast } from 'react-toastify'
import axios from '../assets/axios'
import StoreContext from '../../StoreContext'
import { getHungarianDateFormat } from '../assets/dateFormats'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faCalendarDay, faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import Gallery from "./Gallery"
import { getImages, getDocuments } from '../assets/helperFunctions'
import RichTextEditor from '../common/RichTextEditor'

export default function ImplementationElem({ implementation, onChangeElem }) {
  const context = useContext(StoreContext)

  const editorRef = useRef(null)

  const [error, setError] = useState('')

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const images = getImages(implementation.medias)
  const documents = getDocuments(implementation.medias)

  const modifyImplementation = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    let formData = new FormData()

    formData.append('content', editorRef.current.getContent().replace('<p><br></p>', ''))

    Array.from(media).forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`media[${i}]`, file)
      }
    })

    axios.post(
      process.env.REACT_APP_API_ADMIN_REQ_IMPLEMENTATION.toString().replace(':id', implementation.id),
      formData,
      config
    )
      .then(response => {
        if (response.status === 200) {
          notify(`🎉 ${response.data.message}`)
          onChangeElem(implementation)
        } else {
          notify('⛔️ Sikertelen a megvalósulás módosítása')
        }

        if (response.status !== 200 && response.data && response.data.message) {
          setError(response.data.message)
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen a megvalósulás módosítása')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const removeImplementation = () => {
    if (!confirm("Biztos törölni szeretnéd a megvalósulást?")) {
      return
    }

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.delete(
      process.env.REACT_APP_API_ADMIN_REQ_IMPLEMENTATION_DELETE.toString().replace(':id', implementation.id),
      config
    )
      .then(response => {
        if (response.status === 200) {
          notify(`🎉 ${response.data.message}`)
          onChangeElem(implementation)
        } else {
          notify('⛔️ Sikertelen a megvalósulás törlés')
        }

        if (response.status !== 200 && response.data && response.data.message) {
          setError(response.data.message)
        }
      })
      .catch(() => {
        notify('⛔️ Sikertelen a megvalósulás törlés')
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  return (
    <>
      <details>
        <summary>
          <div className="implementation-heading">
            <div className="implementation-info">
              <div className="implementation-time">
                <FontAwesomeIcon icon={faCalendarDay} />
                {getHungarianDateFormat(new Date(implementation.createdAt))}
              </div>
            </div>
          </div>
        </summary>

        {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <RichTextEditor
            initialValue={implementation.content}
            onInit={(evt, editor) => editorRef.current = editor}
            init={{
              height: 500,
            }}
          />

        <div className="implementation-attachments">
          {images.length > 0 ? (
            <>
              <div className="media-sep">
                <Gallery items={images} showThumbnails={true}  />
              </div>
            </>
          ) : null}

          {documents.length > 0 ? (
            <>
              <h4>Csatolmányok:</h4>
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
          ) : null}
        </div>

        <div className="implementation-footer">
          <button type="button" className="btn btn-small btn-warning" onClick={modifyImplementation}>
            <FontAwesomeIcon icon={faPen} /> Módosítás mentése
          </button>

          <button type="button" className="btn btn-small btn-danger" onClick={removeImplementation}>
            <FontAwesomeIcon icon={faTrash} /> Törlés
          </button>
        </div>
      </details>
    </>
  )
}
