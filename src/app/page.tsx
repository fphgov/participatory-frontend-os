import VoteInfoSectionSec from '@/components/home/VoteInfoSectionSec'
import NewsletterArea from '@/components/home/NesletterArea'

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
                    <h3>Tele vagyunk ötletekkel. Szavazz október 7-ig!</h3>
                  </div>

                  <div className="col-12">
                    <p>Döntsünk közösen, mire fordítson Budapest egymilliárd forintot!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <VoteInfoSectionSec title="A szavazás menete" hasContainerClass={true} />
        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
