import type { Metadata } from 'next'
import HeroPage from '@/components/common/HeroPage'
import VoteStartSection from '@/components/vote/VoteStartSection'
import { apiVoteStatus } from '@/lib/api-requests'
import { getToken } from '@/lib/actions'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás indítása',
  }
}

export default async function VoteStartPage() {
  const token = (await getToken())?.value

  let pageData, error

  if (token) {
    try {
      pageData = await apiVoteStatus()
    } catch (e: any) {
      error = e.message
    }
  }

  const themes = pageData?.data?.projects.map(project => project.campaignTheme?.code as string)

  return (
    <main className="page page-vote-start">
      <div className="page-vote-start-section">
        <HeroPage title="Szavazás" content="Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le." />

        <VoteStartSection title="Válassz egy kategóriát és szavazz a kedvenc ötletedre!" votedList={themes} />
      </div>
    </main>
  )
}
