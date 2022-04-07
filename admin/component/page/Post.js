import React, { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams, Redirect } from 'react-router-dom'
import slugify from 'slugify'
import StoreContext from '../../StoreContext'
import axios from '../assets/axios'
import { getDateLocalFormat } from '../assets/dateFormats'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import { createEditorStateWithText } from 'draft-js-plugins-editor'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default function Post() {
  const context = useContext(StoreContext)
  const { id } = useParams()

  const [editorState, setEditorState] = useState(createEditorStateWithText(''))
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [file, setFile] = useState(null)
  const [statusOptions, setStatusOptions] = useState(null)
  const [categoryOptions, setCategoryOptions] = useState(null)
  const [post, setPost] = useState()

  let formData = new FormData()

  const notify = (message) => toast.dark(message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  const getStatusOptions = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_ADMIN_REQ_POST_STATUS, config)
      .then(response => {
        if (response.data && response.data.data) {
          setStatusOptions(response.data.data)
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

  const getCategoryOptions = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    axios.get(process.env.REACT_APP_API_ADMIN_REQ_POST_CATEGORY, config)
      .then(response => {
        if (response.data && response.data.data) {
          setCategoryOptions(response.data.data)
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

  const getPost = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_POST.toString().replace(':id', id)

    axios.get(link, config)
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data

          data.createdAt = getDateLocalFormat(data.createdAt)

          setPost(data)

          let contentState = stateFromHTML(data.content)

          setEditorState(EditorState.createWithContent(contentState))
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

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0] instanceof File) {
      setFile(e.target.files[0])
    }
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

    const link = process.env.REACT_APP_API_ADMIN_REQ_POST.toString().replace(':id', id)

    formData.append('title', post.title)
    formData.append('slug', post.slug)
    formData.append('description', post.description)
    formData.append('content', stateToHTML(editorState.getCurrentContent()))
    formData.append('category', typeof post.category.code === 'undefined' ? post.category : post.category.code)
    formData.append('status', typeof post.status.code === 'undefined' ? post.status : post.status.code)
    formData.append('file', file)
    formData.append('created', post.createdAt)

    axios.post(link, formData, config)
      .then(response => {
        if (response.data && response.data.data.success) {
          notify('🎉 Sikeres módosítás')

          setRedirect(true)
        }
      })
      .catch((error) => {
        notify('⛔️ Sikertelen módosítás')

        if (error.response && error.response.data && error.response.data.errors) {
          setError(error.response.data.errors)
        }
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  const deleteDetection = () => {
    context.set('loading', true)

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_admin_token')}`,
        'Accept': 'application/json',
      }
    }

    const link = process.env.REACT_APP_API_ADMIN_REQ_POST_DELETE.toString().replace(':id', id)

    axios.delete(link, config)
      .then(response => {
        if (response.data && response.data.data.success) {
          notify('🎉 Sikeres törlés')

          setRedirect(true)
        }
      })
      .catch((error) => {
        notify('⛔️ Sikertelen törlés')

        if (error.response && error.response.data && error.response.data.errors) {
          setError(error.response.data.errors)
        }
      })
      .finally(() => {
        context.set('loading', false)
      })
  }

  useEffect(() => {
    getStatusOptions()
    getCategoryOptions()
    getPost()
  }, [])

  const handleChangeInput = (e) => {
    e.persist()

    if (e.target.type === "checkbox") {
      setPost(state => ({ ...state, [ e.target.name ]: e.target.checked }))
    } else {
      setPost(state => ({ ...state, [ e.target.name ]: e.target.value }))
    }
  }

  const handleChangeSlugInput = (e) => {
    e.persist()

    const sluged = slugify(e.target.value, {
      replacement: '-',
      lower: true,
      locale: 'hu',
      trim: true,
      strict: false
    })

    setPost(state => ({ ...state, [ e.target.name ]: sluged }))
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

  return (
    <>
      {redirect ? (
        <Redirect to='/posts' />
      ) : null}

      <div className="proposal post">
        <div className="container">
          {post ? (
            <>
              <h1 tabIndex="0" role="alert" aria-label={`Cikk azonosító: ${post.id}`}>{post.id ? `Cikk (${post.id})` : ''}</h1>

              <div className="error-wrapper">
              </div>

              <div className="form-wrapper">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="title">Cikk megnevezés</label>
                      <input type="text" name="title" id="title" value={post.title} onChange={handleChangeInput} />

                      {error && error.title ? Object.values(error.title).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`title-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="slug">URL hivatkozás</label>
                      <div className="tipp">Megnevezés tartalmát másold át.</div>
                      <input type="text" name="slug" id="slug" value={post.slug} onChange={handleChangeSlugInput} />

                      {error && error.slug ? Object.values(error.slug).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`slug-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-4">
                    <div className="input-wrapper">
                      <label htmlFor="createdAt">Dátum</label>
                      <input type="datetime-local" name="createdAt" id="createdAt" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" value={post.createdAt} onChange={handleChangeInput} />

                      {error && error.created ? Object.values(error.created).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`created-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-4">
                    <div className="input-wrapper">
                      <label htmlFor="category">Kategória</label>
                      <select name="category" id="category" value={post.category.code} onChange={handleChangeInput}>
                        {categoryOptions ? categoryOptions.map((option, i) => (
                          <option key={i} value={option.code}>{option.name}</option>
                        )) : null}
                      </select>

                      {error && error.category ? Object.values(error.category).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`category-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-4">
                    <div className="input-wrapper">
                      <label htmlFor="status">Állapot</label>
                      <select name="status" id="status" value={post.status.code} onChange={handleChangeInput}>
                        {statusOptions ? statusOptions.map((option, i) => (
                          <option key={i} value={option.code}>{option.name}</option>
                        )) : null}
                      </select>

                      {error && error.status ? Object.values(error.status).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`status-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="row">
                      {post.featuredImage ?
                        <div className="col-sm-12 col-md-4">
                          <div className="input-wrapper">
                            <div className="post-image">
                              <img src={`${process.env.REACT_APP_SERVER_FILE}/${post.featuredImage.filename}`} alt="Kiemelt kép" />
                            </div>
                          </div>
                        </div>
                      : null}

                      <div className="col-sm-12 col-md-12">
                        <div className="input-wrapper">
                          <label htmlFor="file">Kiemelt kép</label>
                          <input type="file" name="file" id="file" onChange={onFileChange} />

                          {error && error.file ? Object.values(error.file).map((err, i) => {
                            return <ErrorMini key={i} error={err} increment={`file-${i}`} />
                          }) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Bevezető</label>
                      <textarea type="text" name="description" id="description" value={post.description} onChange={handleChangeInput} />

                      {error && error.description ? Object.values(error.description).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`description-${i}`} />
                      }) : null}
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="content">Tartalom</label>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={setEditorState}
                      />

                      {error && error.content ? Object.values(error.content).map((err, i) => {
                        return <ErrorMini key={i} error={err} increment={`content-${i}`} />
                      }) : null}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="button-wrapper button-wrapper-justify">
                      <button type="submit" className="btn btn-primary" onClick={postDetection}>Mentés</button>
                      <button type="button" className="btn btn-danger" onClick={deleteDetection}>Törlés</button>
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
