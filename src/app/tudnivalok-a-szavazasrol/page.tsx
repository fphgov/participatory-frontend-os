import HeroPage from '@/components/common/HeroPage'
import type { Metadata } from 'next'
import Link from 'next/link'

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

                <Link className="btn btn-primary btn-headline btn-next" href="/szavazas-inditasa">Elindítom a szavazást</Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
