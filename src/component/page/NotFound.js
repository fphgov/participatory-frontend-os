import React from "react"
import SEO from '../common/SEO'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page-not-found-section">
        <SEO title="Szavazzon most!" />

        <div className="container">
          <div className="page-not-found-content">
            <img src={require('../../img/logo-bp-monocrom.png')} />

            <p>404 - Az oldal nem található</p>
          </div>
        </div>
      </div>
    )
  }
}
