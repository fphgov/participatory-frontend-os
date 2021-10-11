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

            <div className="sharing" style={{ marginRight: 20 }}>
              <a href="https://www.facebook.com/budapestmindenkie" title="Kövessen minket Facebookon">
                <span className="fa-layers fa-lg">
                  <FontAwesomeIcon icon={faCircle} size='2x' color="white" />
                  <FontAwesomeIcon icon={faFacebookF} mask={[ 'fab' ]} size='lg' inverse style={{ marginLeft: 10 }} />
                </span>
              </a>
            </div>
          </div>

          <div className="copyright-wrapper">
            <div className="copyright">© 2021 Budapest Főváros Önkormányzata | Minden jog fenntartva</div>

            <ul>
              <li className="nav"><a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=solrProjectSearch&sort_name=date&sort_order=desc&conf=proposals_list&fq=campaign_text:A">Beküldött ötletek 2020/2021</a></li>

              <li className="nav"><a href="/files/adatkezelesi_tajekozato.pdf">Adatvédelmi tájékoztató</a></li>
              <li className="nav"><Link to="/oldal/dokumentumok">Dokumentumok</Link></li>
              <li className="nav"><Link to="/oldal/kapcsolat">Kapcsolat</Link></li>
            </ul>
          </div>

          <div className="links-wrapper app-version">&nbsp;</div>
        </div>
      </div>
    </footer>
  )
}
