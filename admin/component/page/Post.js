import React, { useState, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
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
        if (response.data && response.data) {
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
      formData.append('file', e.target.files[0])
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
    formData.append('created', post.createdAt)

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

  return (
    <>
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
                      <label htmlFor="title">Megnevezés</label>
                      <input type="text" name="title" id="title" value={post.title} onChange={handleChangeInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="slug">URL hivatkozás</label>
                      <div className="tipp">Megnevezés tartalmát másold át.</div>
                      <input type="text" name="slug" id="slug" value={post.slug} onChange={handleChangeSlugInput} />
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-4">
                    <div className="input-wrapper">
                      <label htmlFor="createdAt">Dátum</label>
                      <input type="datetime-local" name="createdAt" id="createdAt" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" value={post.createdAt} onChange={handleChangeInput} />
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12">
                    <div className="input-wrapper">
                      <label htmlFor="description">Bevezető</label>
                      <textarea type="text" name="description" id="description" value={post.description} onChange={handleChangeInput} />
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
