import Link from 'next/link'
import TimeLineItem from '@/components/common/TimeLineItem'
import NewsFeed from '@/components/home/NewsFeed'
//import VoteInfoSection from '@/components/home/VoteInfoSection'
import NewsletterArea from '@/components/home/NesletterArea'
import ProjectsFeed from '@/components/home/ProjectsFeed'

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

          {/*<VoteInfoSection title="A szavazás menete" hasContainerClass={true} />*/}

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
                    <TimeLineItem icon='timeline-icon-3.svg' date="2024. tavasz" description="Ötletfejlesztés" />
                    <TimeLineItem icon='timeline-icon-4.svg' date="2024. ősz" description="Szavazás" />
                    <TimeLineItem icon='timeline-icon-5.svg' date="2024. ősztől" description="Megvalósítás" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
