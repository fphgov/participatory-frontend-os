import React from "react"

export default function HeroPage({ title, content, link = null, children }) {
  return (
    <div className="hero-page">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {link}

            <h1>{title}</h1>

            {content ? <p>{content}</p> : <>{children}</>}
          </div>
        </div>
      </div>
    </div>
  )
}
