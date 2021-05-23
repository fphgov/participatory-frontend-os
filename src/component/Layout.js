import React from "react"
import SEO from "./common/SEO"

function Layout(props) {
  return (
    <div className="page">
      <SEO title="Szavazzon most!" />

      {props.children}
    </div>
  )
}

export default Layout
