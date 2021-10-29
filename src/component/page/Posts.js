import React, { useEffect, useState, useContext } from 'react'
import {
  Redirect,
  Link
} from "react-router-dom"
import API from '../assets/axios'
import { getDateFormat, getHungarianDateFormat } from '../assets/dateFormats'
import StoreContext from '../../StoreContext'

export default function Posts() {
  const context = useContext(StoreContext)

  const [ rawContent, setRawContent ] = useState(null)
  const [ error, setError ] = useState('')
  const [ redirect, setRedirect ] = useState(false)

  const getPageContent = () => {
    setRawContent(null)
    context.set('loading', true)

    const categoryIds = [1, 3]

    const data = {
      category: categoryIds,
    }

    API.get(
      process.env.REACT_APP_API_REQ_POSTS + '?' + new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data && response.data.data) {
        setRawContent(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbáld később')
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
                <article key={i} className="post-card">
                  <Link className="post-card-image-link" to={`/hirek/${post.slug}`}>
                    <div className="post-image">{post.featuredImage ? <img src={`${process.env.REACT_APP_SERVER_FILE}/${post.featuredImage.filename}`} /> : null}</div>
                  </Link>

                  <div className="post-card-content">
                    <Link to={`/hirek/${post.slug}`}>
                      <header className="post-full-header">
                        <section className="post-full-meta">
                          {post.createdAt ? <time className="post-full-meta-date" dateTime={getDateFormat(post.createdAt)}>{getHungarianDateFormat(post.createdAt)}</time> : null}
                          <span>• {post.category.name}</span>
                        </section>

                        <h1 className="post-full-title">{post.title}</h1>
                      </header>

                      <footer className="post-card-meta">
                        <div className="post-more-wrapper">
                          <div className="post-more">Tovább</div>
                        </div>
                      </footer>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
