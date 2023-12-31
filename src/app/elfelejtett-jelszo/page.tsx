import type { Metadata } from 'next'
import RegistrationForm from "@/app/elfelejtett-jelszo/forgot-password-form"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Elfelejtett jelszó',
    openGraph: {
      title: 'Elfelejtett jelszó',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default function ForgotPassword() {
  return (
    <main className="page page-forgot-password page-full-dark">
      <div className="page-forgot-password-section">

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <RegistrationForm />
          </div>
        </div>
      </div>

      </div>
    </main>
  )
}
