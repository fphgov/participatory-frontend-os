import HeroPage from '@/components/common/HeroPage'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás indítása',
  }
}

export default async function VotePage() {
  return (
    <main className="page page-vote-start">
      <div className="page-vote-start-section">
        <HeroPage title="Szavazás" content="Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le." />
      </div>
    </main>
  )
}
