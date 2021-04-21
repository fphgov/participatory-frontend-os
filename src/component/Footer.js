import React from "react";
import OpenBP from '../img/nyitott_budapest_white.svg'

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
                <div className="line-one">
                  <div className="logo-wrapper">
                    <img className="logo" src={OpenBP} alt="logo" />
                  </div>

                  <div className="sharing">
                    <a href="https://www.facebook.com/budapestmindenkie" title="Kövessen minket Facebookon">
                      <span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"></i><i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i></span>
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
