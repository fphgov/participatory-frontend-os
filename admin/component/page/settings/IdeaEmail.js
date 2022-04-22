import axios from "../../assets/axios"
import React, { useState, useContext, useRef } from "react"
import { toast } from 'react-toastify'
import StoreContext from '../../../StoreContext'

export default function IdeaEmail() {
  const context = useContext(StoreContext)

  const fileRef = useRef(null)

  const [error, setError] = useState('')
  const [file, setFile] = useState(null)

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  let formData = new FormData()

  const saveIdeaEmail = (e) => {
    e.preventDefault()

    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_IDEA_EMAIL_IMPORT

    formData.append('file', file)

    axios.post(link, formData, config)
      .then(response => {
        if (response.data && response.data.data) {
          notify('🎉 ' + response.data.data.message)
        }

        resetImplementationForm()
      })
      .catch((error) => {
        notify('⛔️ Sikertelen importálás')

        if (error.response && error.response.data && error.response.data.errors) {
          setError(error.response.data.errors)
        }
      })
      .finally(() => {
        context.set('loading', false)
      })
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

  const resetImplementationForm = () => {
    setError('')
    setFile(null)
    fileRef.current.value = null
  }

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0] instanceof File) {
      setFile(e.target.files[0])
    }
  }

  return (
    <>
      <h2>E-mailek kiküldése ötletgazdáknak</h2>

      <form onSubmit={saveIdeaEmail}>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-wrapper">
              <label htmlFor="file">E-mailek importálása</label>
              <input ref={fileRef} type="file" name="file" id="file" onChange={onFileChange} />

              {error && error.file ? Object.values(error.file).map((err, i) => {
                return <ErrorMini key={i} error={err} increment={`file-${i}`} />
              }) : null}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="button-wrapper button-wrapper-justify">
              <button type="submit" className="btn btn-primary">Importálás</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
