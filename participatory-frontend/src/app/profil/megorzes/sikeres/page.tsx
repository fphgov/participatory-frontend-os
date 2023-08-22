import Link from 'next/link'

export default async function ProfileSavingSuccessPage() {
  return (
    <main className="page page-profile-activate">
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="info-page">
                <h1>Felhasználói fiók megerősítése</h1>

                <div className="success-message">
                  Sikeresen megerősítetted a fiókod!
                </div>

                <div className="small">
                  <Link href="/bejelentkezes" className="btn btn-secondary">Tovább</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
