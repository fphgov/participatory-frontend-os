import type { Metadata } from 'next'
import ActivateForm from './activate-form'

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

export default async function ResetPasswordPage() {
  return (
    <main className="page page-profile-activate page-full-dark">
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="info-page">
                <h1>Felhasználói fiók aktiválása</h1>

                <p>A fiók aktiválásához kattints az alábbi gombra:</p>

                <ActivateForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
