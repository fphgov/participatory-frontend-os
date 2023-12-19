import Link from 'next/link'
import TimeLineItem from '@/components/common/TimeLineItem'
import NewsFeed from '@/components/home/NewsFeed'
import VoteInfoSection from '@/components/home/VoteInfoSection'
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
                  <div className="offset-lg-2 col-lg-8">
                    <h3>Köszönjük a … ötletet!</h3>
                  </div>

                  <div className="offset-lg-3 col-lg-6">
                    <p>A 2023/24-es fővárosi közösségi költségvetés ötletbeadási időszaka 2024. január 5-én lezárult. Jelenleg az ötletek szakmai értékelése zajlik, aminek eredményéről minden ötletgazdát emailben értesítünk. A jóváhagyott ötletekre várhatóan 2024 szeptemberében lehet majd szavazni. </p>

                    <Link className="btn btn-primary btn-headline btn-next" href="/szavazas-inditasa">Mi történik most?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <VoteInfoSection title="A szavazás menete" hasContainerClass={true} />

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
                    <TimeLineItem icon='timeline-icon-2.svg' date="2024. első negyedév" description="Szakmai jóváhagyás" />
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
