import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beküldés',
  }
}

export default async function IdeaSubmissionPage() {
  return (
    <main className="page page-page">
      <div className="page-profile-single-section">
        <p>Jelenleg nincs beküldési időszak.</p>
      </div>
    </main>
  )
}
