import Link from 'next/link'

export default async function ProfileActivateSuccessPage() {
  return (
    <main className="page page-profile-activate page-full-dark">
      <div className="page-profile-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="info-page">
                <h1>Felhasználói fiók aktiválása</h1>

                <p>A fiók aktiválásához kattints az alábbi gombra:</p>

                <div className="success-message">
                  Sikeresen aktiváltad a fiókod!
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
