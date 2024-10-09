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
                    <h3>Köszönjük a közel 29 ezren szavaztatok!</h3>
                  </div>

                  <div className="offset-lg-3 col-lg-6">
                    <p>
                      Gyere el az eredményhirdetésre október 11-én a Városháza Pop-up parkba!
                    </p>

                    <Link className="btn btn-primary btn-headline btn-next" href="/hirek/gyere-el-az-eredmenyhirdetesre-oktober-11-en">Érdekel az esemény</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <VoteInfoSectionSec title="A szavazás menete" hasContainerClass={true} /> */}

          <NewsFeed title="Híreink" more="További híreink" />

          <ProjectsFeed title="Korábbi évek nyertes ötletei" more="További nyertes ötletek" />

          <div className="light-section fix-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Közösségi költségvetés menete</h3>
                </div>

                <div className="col-md-12">
                  <div className="timeline-wrapper">
                    <TimeLineItem icon='timeline-icon-1-done.svg' date="2023.11.15. - 2024.01.05." description="Ötletek beküldése" />
                    <TimeLineItem icon='timeline-icon-2-done.svg' date="2024. első negyedév" description="Szakmai jóváhagyás" />
                    <TimeLineItem icon='timeline-icon-3-done.svg' date="2024. tavasz" description="Ötletfejlesztés" />
                    <TimeLineItem icon='timeline-icon-4-done.svg' date="2024. ősz" description="Szavazás" />
                    <TimeLineItem icon='timeline-icon-5.svg' date="2024. ősztől" description="Megvalósítás" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
