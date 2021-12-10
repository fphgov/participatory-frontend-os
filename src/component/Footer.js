import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import OpenBP from '../img/nyitott_budapest_white.svg'
import {
  Link,
} from "react-router-dom"

export default function Footer() {
  return (
    <footer>
      <div className="dark-section">
        <div className="container">
          <div className="line-one">
            <div className="logo-wrapper">
              <img className="logo" src={OpenBP} alt="logo" />
            </div>

            <div className="sharing">
              <a href="https://www.facebook.com/budapestmindenkie" title="Kövess minket Facebookon" rel="noopener noreferrer">
                <span className="fa-layers fa-lg">
                  <FontAwesomeIcon icon={faCircle} size='2x' color="white" />
                  <FontAwesomeIcon icon={faFacebookF} mask={[ 'fab' ]} size='lg' style={{ marginLeft: 10 }} />
                </span>
              </a>
            </div>
          </div>

          <div className="copyright-wrapper">
            <div className="copyright">© 2021 Budapest Főváros Önkormányzata | Minden jog fenntartva</div>

            <ul>
              <li className="nav"><a href={`${process.env.REACT_APP_SERVER_FILE}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">Adatvédelmi tájékoztató</a></li>
              <li className="nav"><Link to="/oldal/dokumentumok">Dokumentumok</Link></li>
              <li className="nav"><Link to="/oldal/kapcsolat">Kapcsolat</Link></li>
              <li className="nav"><a href={`${process.env.REACT_APP_SERVER_FILE}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">Information in English</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
