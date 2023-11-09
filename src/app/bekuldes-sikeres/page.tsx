import type { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beküldés sikeres',
  }
}

export default async function IdeaSubmissionSuccessPage() {
  return (
    <main className="page page-success page-center page-full-dark">
      <div className="page-profile-single-section">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="info-page">
                <h1>Köszönjük, hogy megosztottad velünk ötleted!</h1>

                <p>Megkaptuk ötletedet, pár napon belül, rövid ellenőrzést követően mindenki számára láthatóvá válik a honlapon a beküldött ötletek között. Erről e-mailen kapsz majd visszajelzést. Ha van további ötleted, add be azt is most!</p>

                <Link href="/bekuldesi-informacio" className="btn btn-secondary">Új ötletet küldök be</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
