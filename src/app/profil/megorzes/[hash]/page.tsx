import type { Metadata } from 'next'
import ProfilSavingForm from './profil-saving-form'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profil megőrzés',
    openGraph: {
      title: 'Profil megőrzés',
    }
  }
}

export default async function ProfileSavingPage() {
  return (
    <main className="page page-profile-saving">
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="info-page">
                <h1>Felhasználói fiók megerősítése</h1>

                <p>Köszönjük, hogy velünk maradsz! Kérjük, most erősítsd meg regisztrációdat!</p>

                <ProfilSavingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
