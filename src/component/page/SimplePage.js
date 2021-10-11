import React, { useEffect, useState, useContext } from 'react'
import {
  Redirect,
  useParams,
} from "react-router-dom"
import API from '../assets/axios'
import StoreContext from '../../StoreContext'

export default function SimplePage() {
  const context = useContext(StoreContext)

  const [ rawContent, setRawContent ] = useState(null)
  const [ error, setError ] = useState('')
  const [ redirect, setRedirect ] = useState(false)

  let { slug } = useParams()

  const getPageContent = () => {
    setRawContent(null)
    context.set('loading', true)

    API.get(
      process.env.REACT_APP_API_REQ_PAGE.toString().replace(':slug', slug)
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
    getPageContent()
  }, [slug])

  useEffect(() => {
    document.body.classList.add('page-page')

    return () => {
      document.body.classList.remove('page-page')
    }
  }, [])

  return (
    <div className="page-page-section">
      {redirect ? <Redirect to="/404" /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error ? <Error message={error} /> : null}

            {rawContent && rawContent.content ? <div dangerouslySetInnerHTML={{ __html: rawContent.content }} /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}