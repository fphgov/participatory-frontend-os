import React, { useEffect, useContext } from 'react'
import StoreContext from '../../StoreContext'
import {
  Link,
} from "react-router-dom"

export default function Home() {
  const context = useContext(StoreContext)

  useEffect(() => {
    document.body.classList.add('page-home')

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
              <div className="offset-md-2 col-md-8">
                <h2>Ötlet adott fázisának megfelelő nagy és max kétsoros cím</h2>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

                <Link className="btn btn-primary" to="/bekuldes">Beküldök ötletet</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-section news-feed">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2>Hírek</h2>
            </div>

            <div className="col-md-6">
              <div className="more-posts">
                <Link to="/hirek">További hírek</Link>
              </div>
            </div>
          </div>

          <div className="posts">
            <article className="post-card">
              <Link className="post-card-image-link" to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                <div className="post-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
              </Link>

              <div className="post-card-content">
                <Link to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                  <header className="post-full-header">
                    <section className="post-full-meta">
                      <time className="post-full-meta-date" dateTime="2020-09-14">2020. szeptember 14.</time>
                    </section>

                    <h1 className="post-full-title">Budapestiek ötleteit valósítja meg egymilliárd forintból a fővárosi önkormányzat</h1>
                  </header>

                  <footer className="post-card-meta">
                    <div className="post-more-wrapper">
                      <div className="post-more">Tovább</div>
                    </div>

                  </footer>
                </Link>
              </div>
            </article>

            <article className="post-card">
              <Link className="post-card-image-link" to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                <div className="post-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
              </Link>

              <div className="post-card-content">
                <Link to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                  <header className="post-full-header">
                    <section className="post-full-meta">
                      <time className="post-full-meta-date" dateTime="2020-09-14">2020. szeptember 14.</time>
                    </section>

                    <h1 className="post-full-title">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h1>
                  </header>

                  <footer className="post-card-meta">
                    <div className="post-more-wrapper">
                      <div className="post-more">Tovább</div>
                    </div>
                  </footer>
                </Link>
              </div>
            </article>

            <article className="post-card">
              <Link className="post-card-image-link" to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                <div className="post-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
              </Link>

              <div className="post-card-content">
                <Link to="/hirek/indul-budapest-reszveteli-koltsegvetese">
                  <header className="post-full-header">
                    <section className="post-full-meta">
                      <time className="post-full-meta-date" dateTime="2020-09-14">2020. szeptember 14.</time>
                    </section>

                    <h1 className="post-full-title">Budapestiek ötleteit valósítja meg egymilliárd forintból a fővárosi önkormányzat</h1>
                  </header>

                  <footer className="post-card-meta">
                    <div className="post-more-wrapper">
                      <div className="post-more">Tovább</div>
                    </div>
                  </footer>
                </Link>
              </div>
            </article>
          </div>

        </div>
      </div>

      <div className="light-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Ötletbeküldés menete</h2>

              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>

              <div className="row flex-center">
                <div className="col-md-6">
                  <div className="iframe-video" dangerouslySetInnerHTML={{ __html: '<iframe width="100%" height="315" src="https://www.youtube.com/embed/fzK79PgKITI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                </div>
                <div className="col-md-6">
                  <div className="timeline-item">
                    <h3>Ötletelés</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Ötletek beküldése - október</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</p>
                  </div>

                  <div className="timeline-item">
                    <h3>Ötletek feldolgozása - november</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</p>
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

              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
            </div>
          </div>

          <div className="categories">
            <div className="row">
              <div className="col-md-4">
                <div className="category-item">
                  <div className="category-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
                  <h3 className="category-title">Zöldebb városért</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="category-item">
                  <div className="category-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
                  <h3 className="category-title">Esélyteremtő városért</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="category-item">
                  <div className="category-image"><img src="http://localhost/files/n_1_1254965691.png" alt="" /></div>
                  <h3 className="category-title">Mert Budapest mindenkié</h3>
                  <div className="category-descrption">Lorem Ipsum is simply dummy text of the printing and typesetting industry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="light-section newsletter">
        <div className="container">
          <div className="row flex-center">
            <div className="col-md-4">
              <img src="https://budapest.hu/Kpek2021/hirlevel.png" alt="Értesüljön egy helyen a fővárosi ügyekről promóciós kép" />
            </div>
            <div className="col-md-8">
              <h3>Érdekli, hogy mi történik Budapesten? Iratkozzon fel a Fővárosi Önkormányzat hírlevelére!</h3>

              <p>Új, átláthatóbb és letisztultabb formátumban jelentkezünk minden héten a főváros legfontosabb ügyeivel a megújult hírlevelünkben.</p>

              <a className="btn btn-primary" href="https://hirlevel.budapest.hu/subscribe.php?cid=8ILl2QAD-" target="_blank">Kattintson ide a feliratkozáshoz</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
