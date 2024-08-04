"use server"

import type { Metadata } from 'next'
import MagicLinkForm from './magic-link-form'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Aktíválás',
    openGraph: {
      title: 'Aktíválás',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

type MagicLoginPageProps = {
  params: { hash: string }
}

export default async function MagicLoginPage({ params }: MagicLoginPageProps) {
  return (
    <main className="page page-profile-activate page-full-dark">
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="info-page">
                <h1>Hamarosan átirányítunk</h1>

                <MagicLinkForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
