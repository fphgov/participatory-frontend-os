import React from 'react'
import {
  Link,
  Redirect,
  useLocation
} from "react-router-dom"

export default function IdeaSuccess() {
  let location = useLocation()

  return (
    <div className="page-idea-submission-section">
      <div className="container">
        <div className="row">
          <div className="col-12 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
            { location.state && location.state.access ? <>
              <div className="info-page">
                {document.body.classList.add('page-full-dark')}

                <h2>Köszönjük, hogy megosztottad velünk ötleted!</h2>
                <p>Megkaptuk ötletedet, pár napon belül, rövid ellenőrzést követően mindenki számára láthatóvá válik a honlapon a beküldött ötletek között. Erről e-mailben kapsz majd visszajelzést. Ha van további ötleted, add be azt is most!</p>

                <Link to={"/bekuldes"} className="btn btn-secondary">Új ötletet küldök be</Link>
              </div>
            </> : <Redirect to="/" /> }
          </div>
        </div>
      </div>
    </div>
  )
}
