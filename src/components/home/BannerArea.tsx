import Banner from './Banner'

export default function BannerArea({ withWin = false, forceFullWidth = false }): JSX.Element|null {
  return (
    <div className="banner-area">
      <div className="row">
        <div className={withWin && forceFullWidth ? "col-12" : "offset-lg-3 col-lg-6"}>
          <div className="banner-wrapper">
            {withWin ?
              <div className="banner-item">
                <Banner id="nyeremenyjatok" image="prize" imageWidth={72} imageHeight={72} col={2}>
                  <h2>Szavazz és nyerj értékes ajándékokat!</h2>

                  <div>
                    <a className="btn btn-primary btn-next" href="/hirek/szavazz-es-nyerj-belepot-furdobe-allatkertbe-szinhazba-es-mas-klassz-helyekre" target="_blank" rel="noopener noreferrer">Hogyan nyerhetek?</a>
                  </div>
                </Banner>
              </div> : null}

            <div className="banner-item">
              <Banner id="hirlevel" image="newsletter" imageWidth={108} imageHeight={60} col={4} imageFit={true}>
                <h2>Ne maradj le a közösségi költségvetés legfrissebb híreiről és eseményeiről, iratkozz fel hírlevelünkre!</h2>

                <div>
                  <a className="btn btn-white btn-dark btn-next" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Feliratkozom</a>
                </div>
              </Banner>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
