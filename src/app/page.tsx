// import VoteInfoSectionSec from '@/components/home/VoteInfoSectionSec'
import TimeLineItem from '@/components/common/TimeLineItem'
import BannerArea from '@/components/home/BannerArea'
import NewsFeed from '@/components/home/NewsFeed'
import ProjectsFeed from '@/components/home/ProjectsFeed'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className="page">
        <div className="page-home-section">
          <div className="hero">
            <div className="hero-content">
              <div className="container">
                <div className="row">
                  <div className="offset-lg-2 col-lg-8">
                    <h3>Február 21-ig tudod támogatni a kedvenc ötleteidet! A lakossági támogatás során a 300 legnépszerűbb ötletet keressük.</h3>
                  </div>

                  <div className="offset-lg-3 col-lg-6">
                    <p>A fővárosi közösségi költségvetésbe beérkezett ötletek közül bármennyit támogathatsz, egyszer, a megadott határidőig. A 300 legtöbb támogatást gyűjtő ötlet jut tovább szakmai értékelésre. Az alábbi űrlapra kattintva tudod támogatni a kedvenceidet.</p>
                    <a className="btn btn-primary btn-headline btn-next" href="https://budapest.hu/urlapok/kk-lakossagi-eloszures" target="_blank">Tovább a támogatásra</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="light-section fix-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Új lépéssel bővült a közösségi költségvetés folyamata!</h3>
                </div>
                <p className="centered-paragraph">Idén először a beadott ötleteknek támogatókat kell szerezniük ahhoz, hogy szakmai szűrésre kerüljenek. Támogatók gyűjtésére 2025. február 6-21. között lesz lehetőség. A 300 legtöbb támogatást szerzett ötlet kerül a szakmai értékelők elé. <Link href={`/hirek/lakossagi-tamogatas-uj-fazis-a-kozossegi-koltsegvetesben`}>Itt olvashatsz bővebben</Link> arról, hogy miért van erre szükség és mik a pontos szabályok.</p>
                <div className="col-md-12">
                  <div className="timeline-wrapper">
                    <TimeLineItem icon='timeline-icon-1-done.svg' date="2024. 12. 30. - 2025. 01. 31." description="Ötletek beküldése" />
                    <TimeLineItem icon='timeline-icon-like.svg' date="2025. 02. 06. - 2025. 02. 21." description="Lakossági támogatás" />
                    <TimeLineItem icon='timeline-icon-2.svg' date="2025. tél / tavasz" description="Szakmai jóváhagyás" />
                    <TimeLineItem icon='timeline-icon-4.svg' date="2025. ősz" description="Szavazás" />
                    <TimeLineItem icon='timeline-icon-5.svg' date="2025. ősztől" description="Megvalósítás" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <VoteInfoSectionSec title="A szavazás menete" hasContainerClass={true} /> */}

          <ProjectsFeed title="Korábbi évek nyertes ötletei" more="További nyertes ötletek" />

          <NewsFeed title="Híreink" more="További híreink" />

        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
