import React from "react"

export default function NotFound() {
  return (
    <div className="page-not-found-section">
      <div className="container">
        <div className="page-not-found-content">
          <img src={require('../../img/logo-bp-monocrom.png')} />

          <p>404 - Az oldal nem található</p>
        </div>
      </div>
    </div>
  )
}
