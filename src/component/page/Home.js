import React, { useEffect, useContext, useState } from 'react'
import StoreContext from '../../StoreContext'
import { getDateFormat, getHungarianDateFormat } from '../assets/dateFormats'
import {
  Link,
} from "react-router-dom"
import API from '../assets/axios'
import Newsletter from '../../img/hirlevel.png'
import HeroLogo from '../../img/kozossegi_koltsegvetes_hero_logo.svg'

export default function Home() {
  const context = useContext(StoreContext)

  const [posts, setPosts] = useState([])

  const getPageContent = () => {
    setPosts(null)
    context.set('loading', true)

    const data = {
      limit: 3
    }

    API.get(
      process.env.REACT_APP_API_REQ_POSTS + '?' + new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data && response.data.data) {
        setPosts(response.data.data)
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérjük próbálja később')
      }
    }).finally(() => {
      context.set('loading', false)
    })
  }

  useEffect(() => {
    document.body.classList.add('page-home')

    getPageContent()

    return () => {
      document.body.classList.remove('page-home')
    }
  }, [])

  return (
    <div className="page-home-section">
      <div className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <img src={HeroLogo} alt="Közösségi Költségvetés logója" />

                <h2>Adj egy jó ötlet!</h2>

                <p>Üdvözlünk a budapesti közösségi költségvetés honlapján!</p>
                <p>Regisztrálj és add be ötletedet 2022. január 31-ig!</p>

                <Link className="btn btn-primary" to="/bekuldes">Ötletet adok be</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section news-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-6 col-sm-6">
              <h2>Hírek / Rendezvények</h2>
            </div>

            <div className="col-md-6 col-xs-6 col-sm-6">
              <div className="more-posts">
                <Link to="/hirek">További hírek</Link>
              </div>
            </div>
          </div>

          <div className="posts">
            {posts && posts.map((post, i) => {
              return (
                <article key={i} className="post-card">
                  <Link className="post-card-image-link" to={`/hirek/${post.slug}`}>
                    <div className="post-image">{post.featuredImage ? <img src={`${process.env.REACT_APP_SERVER_FILE}/${post.featuredImage.filename}`} /> : null}</div>
                  </Link>

                  <div className="post-card-content">
                    <Link to={`/hirek/${post.slug}`}>
                      <header className="post-full-header">
                        <section className="post-full-meta">
                          {post.createdAt ? <time className="post-full-meta-date" dateTime={getDateFormat(post.createdAt)}>{getHungarianDateFormat(post.createdAt)}</time> : null}
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
              )
            })}
          </div>

        </div>
      </div>

      <div className="light-section fix-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Ötletbeküldés menete</h2>

              <div className="row flex-center">
                <div className="col-md-6">
                  <div className="iframe-video" dangerouslySetInnerHTML={{ __html: '<iframe width="100%" height="315" src="https://www.youtube.com/embed/gk08qFY9Q7o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                </div>
                <div className="col-md-6">
                  <div className="timeline-item">
                    <h3>Ötletelés</h3>
                    <p>Nézz körül, járj nyitott szemmel. Gondolkodj új dolgokban, ötleteddel hozz létre valamit. Ismerd meg a kategóriákat és a kereteket, hogy ötleted minden kritériumnak megfeleljen és sikeresen eljusson a megvalósításig.</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Beküldés</h3>
                    <p>Regisztrálj az otlet.budapest.hu oldalon és nyújtsd be ötleted a megfelelő kategóriába 2022. január 31-ig</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Beküldés után</h3>
                    <p>Nézd meg, mi történik az ötleteddel beküldés után</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Kategória cím</h2>
            </div>
          </div>

          <div className="categories">
            <div className="row">
              <div className="col-md-4">
                <Link to="/oldal/kiiras#zold-budapest" className="category-item">
                  <div className="category-image"><img src={`${process.env.REACT_APP_SERVER_FILE}/n_1_1254965691.png`} alt="" /></div>
                  <h3 className="category-title">Zöld Budapest</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/oldal/kiiras#eselyteremto-budapest" className="category-item">
                  <div className="category-image"><img src={`${process.env.REACT_APP_SERVER_FILE}/n_1_1254965691.png`} alt="" /></div>
                  <h3 className="category-title">Esélyteremtő Budapest</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/oldal/kiiras#nyitott-budapest" className="category-item">
                  <div className="category-image"><img src={`${process.env.REACT_APP_SERVER_FILE}/n_1_1254965691.png`} alt="" /></div>
                  <h3 className="category-title">Nyitott Budapest</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="light-section newsletter">
        <div className="container">
          <div className="row flex-center">
            <div className="col-md-4">
              <img src={Newsletter} alt="Értesüljön egy helyen a fővárosi ügyekről promóciós kép" />
            </div>
            <div className="col-md-8">
              <h3>Érdekel, hogy mi történik Budapesten? Iratkozz fel a Fővárosi Önkormányzat hírlevelére!</h3>

              <p>Új, átláthatóbb és letisztultabb formátumban jelentkezünk minden héten a főváros legfontosabb ügyeivel megújult hírlevelünkben.</p>

              <a className="btn btn-primary" href="https://hirlevel.budapest.hu/subscribe.php?cid=8ILl2QAD-" target="_blank" rel="noopener noreferrer">Kattints ide a feliratkozáshoz</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
