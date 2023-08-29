import type { Metadata } from 'next'
import HeroPage from '@/components/common/HeroPage'
import VoteStartSection from '@/components/vote/VoteStartSection'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás indítása',
  }
}

export default async function VoteStartPage() {
  return (
    <main className="page page-vote-start">
      <div className="page-vote-start-section">
        <HeroPage title="Szavazás" content="Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le." />

        <VoteStartSection title="Válassz egy kategóriát és szavazz a kedvenc ötletedre!" />
      </div>
    </main>
  )
}
