import React from "react"
import Logo from '../img/logo-bp.svg'

export default class Footer extends React.Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <footer>
        <div className="dark-section">
          <div className="container">
            <div className="footer-content">
              <div className="row">
                <div className="col-md-12 justify-content-md-center justify-content-lg-start">
                  <div className="footer-media-center">
                    <img className="footer-logo" src={Logo} alt="Nyitott Budapest Logo" />
                  </div>
                </div>

                <div className="col-md-12 col-lg-8 pt-2 justify-content-md-center justify-content-lg-start">
                  <div className="footer-text">
                    © 2021 Budapest Főváros Önkormányzata | Minden jog fenntartva
                  </div>
                </div>

                <div className="col-md-12 col-lg-4 pt-2 justify-content-md-center justify-content-lg-end text-lg-right">
                  <div className="footer-media-down">
                    <a href="mailto:nyitott@budapest.hu" className="light" rel="noopener noreferrer">nyitott@budapest.hu</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
