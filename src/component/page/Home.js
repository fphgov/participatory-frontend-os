import React, { useEffect, useContext, useState } from 'react'
import StoreContext from '../../StoreContext'
import { getDateFormat, getHungarianDateFormat } from '../assets/dateFormats'
import {
  Link,
} from "react-router-dom"
import API from '../assets/axios'
import CountDown from '../common/CountDown'
import Newsletter from '../../img/hirlevel.png'
import HeroTexts from '../../img/kozossegi_koltsegvetes_hero_logo.svg'
import CategoryLogo1 from '../../img/zold_budapest_white_category.svg'
import CategoryLogo2 from '../../img/eselyteremto_budapest_white_category.svg'
import CategoryLogo3 from '../../img/nyitott_budapest_white_category.svg'

export default function Home() {
  const context = useContext(StoreContext)

  const [posts, setPosts] = useState([])

  const disabledIdeaSubmit = 0

  const getPageContent = () => {
    setPosts(null)
    context.set('loading', true)

    const categoryIds = [1, 2, 3]

    const data = {
      category: categoryIds,
      limit: 3,
    }

    API.get(
      process.env.REACT_APP_API_REQ_POSTS + '?' + new URLSearchParams(data).toString()
    ).then(response => {
      if (response.data && response.data.data) {
        setPosts(response.data.data)
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
                {/* <div className="hero-images-wrapper">
                  <img src={HeroTexts} className="full-width" alt="Szöveg buborék illusztráció" />
                </div> */}

                <div className="hero-images-wrapper">
                  <img src={HeroTexts} alt="Közösségi költségvetés logója" />
                </div>

                {/* <h2>Szavazz a legjobb ötletre!</h2> */}

                {/* <CountDown endDate={new Date(`09/01/2022`)} beforeText="Még " afterText="-ig" finalText="A szavazás lezárult." /> */}

                {/* <p>Dönts te arról, mire fordítson Budapest egymilliárd forintot!</p> */}

                {/* { disabledIdeaSubmit ? <>
                  <p>Hamarosan újraindul a fővárosi részvételi költségvetés, 2021-ben közösségi költségvetés néven.</p>
                  <p>Aktiváld fiókod a tőlünk kapott emailben, ha szeretnél az idei ötletgyűjtésben is részt venni.</p>
                </> : <>
                  <p>Üdvözlünk a budapesti közösségi költségvetés honlapján!</p>
                  <p>Regisztrálj és add be ötletedet 2022. január 31-ig!</p>
                </> } */}

                {/* <p>Az ötletek jelenleg feldolgozás alatt vannak, nézd meg <Link to="/hirek/lezarult-az-otletbeadasi-szakasz-mi-jon-most" style={{ color: '#fff' }}>mi történik most</Link> az ötletekkel!</p>
                <p>Szavazni nyáron tudsz majd.</p> */}

                {/* <p>Jelentkezz a közösségi költségvetés tanácsába!</p> */}

                {/* <Link to="/hirek/vegyel-reszt-a-dontesben-hogy-a-beadott-es-jovahagyott-otletek-kozul-melyek-valosulhassanak-meg-budapesten-jelentkezz-a-kozossegi-koltsegvetes-tanacsaba" className="btn btn-primary">
                  Jelentkezés
                </Link> */}

                {/* {disabledIdeaSubmit ? null : <>
                  <Link className="btn btn-primary" to="/bekuldes">Ötletet adok be</Link>
                </>} */}

                {/* <Link className="btn btn-primary" to="/szavazas">Szavazok</Link> */}

                {/* <h2>Lezárult a szavazás</h2> */}

                {/* <p>A személyesen leadott szavazatok összesítését követően jelentkezünk a nyertes ötletek listájával</p> */}

                <h2>Kihirdettük az idei nyertes ötleteket!</h2>

                <p>Hamarosan újra várjuk a Budapest jobbító ötleteket.</p>

                <Link className="btn btn-primary" to="/hirek/ujabb-18-lakossagi-otletet-valosit-meg-a-fovarosi-onkormanyzat-ime-a-budapesti-kozossegi-koltsegvetes-idei-nyertesei">Megnézem az ötleteket</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section news-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-12 col-sm-12">
              <h2>Hírek / Rendezvények</h2>
            </div>

            <div className="col-md-6 col-xs-12 col-sm-12">
              <div className="more-posts">
                <Link to="/hirek">További hírek</Link>
              </div>
            </div>
          </div>

          <div className="posts">
            {Array.isArray(posts) && posts.map((post, i) => {
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
                          <div>• <span>{post.category.name}</span></div>
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
              {/* <h2>Ötletbeküldés menete</h2> */}
              <h2>A közösségi költségvetés menete</h2>

              <Link to={`/oldal/bovebben-a-reszveteli-koltsegvetesrol`}>
                <img src="/files/folyamatabra.png" alt="Közösségi költségvetés folyamat ábrája" />
              </Link>

              {/* <div className="row flex-center">
                <div className="col-md-6">
                  <div className="iframe-video" dangerouslySetInnerHTML={{ __html: '<iframe width="100%" height="315" src="https://www.youtube.com/embed/w9P1n0ZZJW4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                </div>
                <div className="col-md-6">
                  <div className="timeline-item">
                    <h3>Ötletelés</h3>
                    <p>Nézz körül, járj nyitott szemmel. Gondolkodj új dolgokban, ötleteddel hozz létre valamit. <Link to="/hirek/tudnivalok-az-otletek-benyujtasarol-2021">Ismerd meg a kategóriákat és a kereteket</Link>, hogy ötleted minden kritériumnak megfeleljen és sikeresen eljusson a megvalósításig.</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Beküldés</h3>
                    <p>Regisztrálj az otlet.budapest.hu oldalon és nyújtsd be ötleted a megfelelő kategóriába 2022. január 31-ig</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Beküldés után</h3>
                    <p><Link to="/hirek/tudnivalok-az-otletek-benyujtasarol-2021#mi-tortenik-az-otletek-beadasa-utan">Nézd meg</Link>, mi történik az ötleteddel beküldés után</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>A közösségi költségvetés kategóriái</h2>
            </div>
          </div>

          <div className="categories">
            <div className="row">
              <div className="col-md-4">
                <Link to="/hirek/tudnivalok-az-otletek-benyujtasarol-2021#zold-budapest" className="category-item">
                  <div className="category-image"><img src={CategoryLogo1} alt="Zöld Budapest logó" /></div>
                  <h3 className="category-title">Zöld Budapest</h3>
                  <div className="category-descrption">Zöldebb utcák, élettel teli parkok, mindenki számára elérhető, környezettudatos megoldások</div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/hirek/tudnivalok-az-otletek-benyujtasarol-2021#eselyteremto-budapest" className="category-item">
                  <div className="category-image"><img src={CategoryLogo2} alt="Esélyteremtő Budapest logó" /></div>
                  <h3 className="category-title">Esélyteremtő Budapest</h3>
                  <div className="category-descrption">A társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életének támogatása</div>
                </Link>
              </div>

              <div className="col-md-4">
                <Link to="/hirek/tudnivalok-az-otletek-benyujtasarol-2021#nyitott-budapest" className="category-item">
                  <div className="category-image"><img src={CategoryLogo3} alt="Nyitott Budapest logó" /></div>
                  <h3 className="category-title">Nyitott Budapest</h3>
                  <div className="category-descrption">Együttműködések, új, kísérleti megoldások, digitális fejlesztések, rövid távú, közösségépítő ötletek</div>
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
