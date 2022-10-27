import React, { useEffect, useState, useContext } from 'react'
import {
  Redirect,
  useParams,
} from "react-router-dom"
import API from '../assets/axios'
import PopUp from '../assets/PopUp'
import { getHungarianDateFormat } from '../assets/dateFormats'
import StoreContext from '../../StoreContext'
import SocialIconBtnFb from '../../img/social-fb-btn.svg'
import SidebarCard from '../common/SidebarCard'

export default function Post() {
  const context = useContext(StoreContext)

  const [ rawContent, setRawContent ] = useState(null)
  const [ error, setError ] = useState('')
  const [ redirect, setRedirect ] = useState(false)

  let { slug } = useParams()

  const getPageContent = () => {
    setRawContent(null)
    context.set('loading', true)

    API.get(
      process.env.REACT_APP_API_REQ_POST.toString().replace(':slug', slug)
    ).then(response => {
      if (response.data && response.data.data) {
        setRawContent(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
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
    setTimeout(() => {
      const scrollContent = document.getElementById(window.location.hash.toString().replace('#', ''))

      if (scrollContent) {
        window.scrollTo({
          top: scrollContent.offsetTop,
          left: 0,
          behavior: 'smooth'
        })
      }
    }, 100)
  }, [rawContent])

  useEffect(() => {
    document.body.classList.add('page-post')

    getPageContent()

    return () => {
      document.body.classList.remove('page-post')
    }
  }, [])

  return (
    <div className="page-post-section">
      {redirect ? <Redirect to="/404" /> : null}

      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            {error ? <Error message={error} /> : null}

            {rawContent ? <>
              <h1>{rawContent.title}</h1>

              {rawContent.createdAt ? <span className="time">{getHungarianDateFormat(rawContent.createdAt)}</span> : null}<span>• {rawContent.category.name}</span>
              {rawContent.featuredImage ? <div className="featured-image"><img src={`${process.env.REACT_APP_SERVER_FILE}/${rawContent.featuredImage.filename}`} /></div> : null}
              {rawContent.description ? <div className="description" dangerouslySetInnerHTML={{ __html: rawContent.description }} /> : null}
              {rawContent.content ? <div dangerouslySetInnerHTML={{ __html: rawContent.content }} /> : null}

              <div className="prop-single-share">
                <div className="prop-info-title">Megosztás</div>
                <div className="prop-info-content">
                  <PopUp url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} title="Megosztom az ötletet Facebookon">
                    <img src={SocialIconBtnFb} alt="Facebook logo" />
                  </PopUp>
                </div>
              </div>
            </> : null}
          </div>

          <div className="col-md-12 col-lg-4">
            {rawContent ? <>
              <SidebarCard>
                <div className="light section-newsletter">
                  <h2>Iratkozz fel hírlevelünkre!</h2>

                  <p>Ne maradj le a közösségi költségvetéssel kapcsolatos legfontosabb hírekről és eseményekről, iratkozz fel hírlevelünkre!</p>

                  <a className="btn btn-primary" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Feliratkozás</a>
                </div>
              </SidebarCard>
            </> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
