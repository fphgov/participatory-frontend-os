import Link from 'next/link'
import TimeLineItem from '@/components/common/TimeLineItem'
import NewsFeed from '@/components/home/NewsFeed'
// import ProjectsFeed from '@/components/home/ProjectsFeed'
// import VoteInfoSection from '@/components/home/VoteInfoSection'
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
                  <div className="offset-lg-2 col-lg-8">
                    <h3>A szavazás szeptember 30-án éjfélkor lezárult.</h3>
                  </div>

                  <div className="offset-lg-3 col-lg-6">
                    <p>Köszönjük, hogy közel xx.xxx-en szavaztatok. Hamarosan eredményt hirdetünk.</p>

                    <Link className="btn btn-primary btn-headline btn-next" href="/hirek/lezarult-a-2023-as-szavazas">Mi történik most?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <VoteInfoSection title="A szavazás menete" hasContainerClass={true} /> */}

          <div className="light-section fix-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h3>Közösségi költségvetés menete</h3>
                </div>

                <div className="col-md-12">
                  <div className="timeline-wrapper">
                    <TimeLineItem icon='timeline-icon-1.svg' date="2022.10.15. - 12.31." description="Ötletek beküldése" />
                    <TimeLineItem icon='timeline-icon-2.svg' date="2023. első negyedév" description="Szakmai jóváhagyás" />
                    <TimeLineItem icon='timeline-icon-3.svg' date="2023. tavasz" description="Ötletfejlesztés" />
                    <TimeLineItem icon='timeline-icon-4.svg' date="2023. ősz" description="Szavazás" />
                    <TimeLineItem icon='timeline-icon-5.svg' date="2023. ősztől" description="Megvalósítás" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NewsFeed title="Kiemelt híreink" more="További híreink" />
          {/* <ProjectsFeed title="Korábbi évek nyertes ötletei" more="További nyertes ötletek" /> */}

        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
