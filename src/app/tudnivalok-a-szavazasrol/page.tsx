import HeroPage from '@/components/common/HeroPage'
import type { Metadata } from 'next'
import Link from 'next/link'
import BannerArea from '@/components/home/BannerArea'
import SectionBoxDetails from '@/components/profile/SectionBoxDetails'
import { Community, Happening, HowIsItDescided, Mastermind, Realization, Who, WhoAndHow } from '../szavazasi-informacio/content'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Tudnivalók a szavazásról',
    openGraph: {
      title: 'Tudnivalók a szavazásról',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function IdeaInfoPage() {
  return (
    <>
      <main className="page page-idea-info">
        <div className="page-info-single-section">

          <HeroPage title="Tudnivalók a szavazásról">
          </HeroPage>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="vote-info-wrapper">
                  <h5>Tudnivalók a szavazás menetével kapcsolatban</h5>

                  <SectionBoxDetails summary="Kik és hogyan szavazhatnak?" fullWidth={true}>
                    <WhoAndHow />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="Hogyan dől el, hogy mely ötletek valósulnak meg?" fullWidth={true}>
                    <HowIsItDescided />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="Ki valósítja meg az ötleteket?" fullWidth={true}>
                    <Who />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="Az ötletgazdának mi a szerepe a megvalósításban?" fullWidth={true}>
                    <Mastermind />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="A helyi közösségnek, érintetteknek van beleszólása a projekt megvalósításába?" fullWidth={true}>
                    <Community />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="Mikor valósulnak meg a nyertes ötletek?" fullWidth={true}>
                    <Realization />
                  </SectionBoxDetails>

                  <SectionBoxDetails summary="Mit tehetnek az ötletgazdák, hogy sokan szavazzanak az ötletükre?" fullWidth={true}>
                    <Happening />
                  </SectionBoxDetails>

                  <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link className="btn btn-primary btn-headline btn-next" href="/szavazas-inditasa">Elindítom a szavazást</Link>
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
