import React from "react";
import OpenBP from '../img/nyitott_budapest_white.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export default class Footer extends React.Component {
    render() {
        return (
          <footer>
            <div className="dark-section">
              <div className="container">
                <div className="line-one">
                  <div className="logo-wrapper">
                    <img className="logo" src={OpenBP} alt="logo" />
                  </div>

                  <div className="sharing" style={{marginRight: 20}}>
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
                    <li className="nav"><a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&amp;htmlpage_id=5">Adatvédelmi tájékoztató</a></li>

                    <li className="nav"><a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&amp;htmlpage_id=9">Dokumentumok</a></li>

                    <li className="nav"><a href="https://otlet.budapest.hu/pb/jsp/site/Portal.jsp?page=htmlpage&amp;htmlpage_id=3">Kapcsolat</a></li>
                  </ul>
                </div>

                <div className="links-wrapper app-version">&nbsp;</div>
              </div>
            </div>
          </footer>
        )
    }
}
