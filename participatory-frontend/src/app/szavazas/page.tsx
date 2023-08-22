import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás',
  }
}

export default async function VotePage() {
  return (
    <main className="page page-page">
      <div className="page-profile-single-section">

      </div>
    </main>
  )
}
