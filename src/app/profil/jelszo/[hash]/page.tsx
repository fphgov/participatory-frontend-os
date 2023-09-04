import type { Metadata } from 'next'
import PasswordResetForm from './password-reset-form'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jelszó módosítás',
    openGraph: {
      title: 'Jelszó módosítás',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

type PasswordResetPageProps = {
  params: { hash: string }
}

export default async function PasswordResetPage({ params }: PasswordResetPageProps) {
  return (
    <main className="page page-reset-password page-full-dark">
      <div className="page-reset-password-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PasswordResetForm params={params} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
