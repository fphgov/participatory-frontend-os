import Banner from './Banner'

export default function BannerArea(): JSX.Element|null {
  return (
    <div className="banner-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="banner-wrapper">
              <div className="banner-item">
                <Banner id="nyeremenyjatok" image="prize" imageWidth={72} imageHeight={72} col={2}>
                  <h2>Szavazz és nyerj értékes ajándékokat!</h2>

                  <div>
                    <a className="btn btn-primary btn-next" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Hogyan nyerhetek?</a>
                  </div>
                </Banner>
              </div>

              <div className="banner-item">
                <Banner id="hirlevel" image="newsletter" imageWidth={108} imageHeight={60} col={4} imageFit={true}>
                  <h2>Ne maradj le a közösségi költségvetés legfrissebb híreiről!</h2>

                  <div>
                    <a className="btn btn-white btn-dark btn-next" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Feliratkozás</a>
                  </div>
                </Banner>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
