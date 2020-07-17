import React from "react";
import {
  Link,
} from "react-router-dom";

export default class Footer extends React.Component {
    constructor() {
      super()

      this.state = {};
    }

      render() {
          return (
            <footer>
              <div className="dark-section">
                <div className="container">
                  <div className="logo-wrapper">
                    <img className="logo" src={require('../img/logo-bp-white.png')} alt="logo" />
                  </div>

                  <div className="footer-content">© Budapest Főváros Önkormányzata,<br />2020. Minden jog fenntartva.</div>

                  <Link to="/impresszum" className="light">Impresszum</Link>
                </div>
              </div>
            </footer>
          )
      }
}