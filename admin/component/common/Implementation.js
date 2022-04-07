import React, { useState, useContext, useEffect, useRef } from "react"
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import ImplementationElem from './ImplementationElem'
import { Editor } from 'react-draft-wysiwyg'
import { createEditorStateWithText } from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'

export default function Implementation({ projectId }) {
  const context = useContext(StoreContext)

  const mediaRef = useRef(null)

  const [error, setError] = useState('')
  const [newEditorState, setNewEditorState] = useState(createEditorStateWithText(''))
  const [implementations, setImplementations] = useState([])
  const [medias, setMedias] = useState([])

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  const onImplementationFileChange = (e) => {
    setMedias(e.target.files)
  }

  const resetImplementationForm = () => {
    setMedias([])
    setNewEditorState(createEditorStateWithText(''))
    mediaRef.current.value = null
  }

  const getImplementations = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.get(
      process.env.REACT_APP_API_ADMIN_REQ_IMPLEMENTATIONS + '?' + (new URLSearchParams(`project=${projectId}`)).toString(),
      config
    )
    .then(response => {
      if (response.data && response.data.data) {
        setImplementations(response.data.data)
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

  const newImplementation = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    let formData = new FormData()

    formData.append('project', projectId)
    formData.append('content', stateToHTML(newEditorState.getCurrentContent()).replace('<p><br></p>', ''))

    Array.from(medias).forEach((file, i) => {
      if (file instanceof File) {
        formData.append(`medias[${i}]`, file)
      }
    })

    axios.post(
      process.env.REACT_APP_API_ADMIN_REQ_IMPLEMENTATIONS,
      formData,
      config
    )
    .then(response => {
      if (response.status === 200) {
        notify(`🎉 ${response.data.message}`)
        resetImplementationForm()
        getImplementations()
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

  useEffect(() => {
    setTimeout(() => {
      getImplementations()
    }, 10)
  }, [])

  return (
    <div className="implementation-wrapper">
      {implementations && Array.isArray(implementations) && implementations.filter((c) => c.parentImplementation == null).map((implementation, key) => (
        <div key={key} className="implementation-item">
          <ImplementationElem implementation={implementation} projectId={projectId} onChangeElem={getImplementations} />
        </div>
      ))}

      <div className="implementation-add">
        <details>
          <summary>
            <h4>Új megvalósítás</h4>
          </summary>

          <Editor
            editorState={newEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setNewEditorState}
          />

          <h4>Megvalósítási média feltöltés</h4>

          <input ref={mediaRef} id="media" name="media" type="file" multiple onChange={onImplementationFileChange} />

          <div className="implementation-add-footer">
            <button type="button" className="btn btn-small btn-warning" onClick={newImplementation}>
              <FontAwesomeIcon icon={faPlus} /> Hozzáadás
            </button>
          </div>
        </details>
      </div>
    </div>
  )
}
