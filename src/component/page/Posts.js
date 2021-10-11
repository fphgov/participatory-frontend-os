import React, { useEffect, useState, useContext } from 'react'
import {
  Redirect,
  Link
} from "react-router-dom"
import API from '../assets/axios'
import StoreContext from '../../StoreContext'

export default function Posts() {
  const context = useContext(StoreContext)

  const [ rawContent, setRawContent ] = useState(null)
  const [ error, setError ] = useState('')
  const [ redirect, setRedirect ] = useState(false)

  const getPageContent = () => {
    setRawContent(null)
    context.set('loading', true)

    API.get(
      process.env.REACT_APP_API_REQ_POSTS
    ).then(response => {
      if (response.data && response.data.data) {
        setRawContent(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbálja később')
      }

      setRedirect(true)
    }).finally(() => {
      context.set('loading', false)
    })
  }

  const Error = (props) => {
    return (
      <div className="error-message">
        {props.message}
      </div>
    )
  }

  useEffect(() => {
    document.body.classList.add('page-posts')

    getPageContent()

    return () => {
      document.body.classList.remove('page-posts')
    }
  }, [])

  return (
    <div className="page-posts-section">
      {redirect ? <Redirect to="/404" /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error ? <Error message={error} /> : null}

            <div className="posts">
              {rawContent && rawContent.map((post, i) => (
                <div key={i} className="post-item">
                  <div className="post-image">{post.featuredImage ? <img src={`/files/${post.featuredImage.filename}`} /> : null}</div>
                  <div className="post-title">{post.title}</div>
                  <div className="post-more"><Link to={`/hirek/${post.slug}`}>Tovább</Link></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
