import React, { useEffect, useContext } from 'react'
import StoreContext from '../../StoreContext'

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
                <h1>Ötlet adott fázisának megfelelő nagy és max kétsoros cím</h1>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe voluptatem incidunt ea perferendis hic dolores culpa aut impedit eum repellendus, eos, ratione voluptatibus totam? Fugit, ea? Culpa nam voluptates consectetur!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
