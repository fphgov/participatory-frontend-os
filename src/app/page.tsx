import VoteInfoSectionSec from '@/components/home/VoteInfoSectionSec'
import BannerArea from '@/components/home/BannerArea'

export default function Home() {
  return (
    <>
      <main className="page">
        <div className="page-home-section">
          <div className="hero">
            <div className="hero-content">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h3>Augusztus 21-én indul a szavazás!</h3>
                  </div>

                  <div className="col-12">
                    <p>
                      Idén 175 ötlet szerepel a szavazólistán, amelyekre augusztus 21. és október 7. között tudtok szavazni.
                    </p>

                    <Link
                      className="btn btn-primary btn-headline btn-next"
                      href="https://otlet.budapest.hu/hirek/indul-a-kozossegi-koltsegvetes-szavazasi-idoszaka">
                      Részletek
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <VoteInfoSectionSec title="A szavazás menete" hasContainerClass={true} />
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
