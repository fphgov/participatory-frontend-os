import type { Metadata } from 'next'
import HeroPage from '@/components/common/HeroPage'
import VoteStartSection from '@/components/vote/VoteStartSection'
import { apiVoteStatus } from '@/lib/api-requests'
import { getToken } from '@/lib/actions'
import { generateRandomValue } from '@/utilities/generateRandomValue'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás indítása',
    openGraph: {
      title: 'Szavazás indítása',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

interface IProps {
  searchParams: Record<string, string>
}

export default async function VoteStartPage({ searchParams }: IProps) {
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
        <HeroPage title="Szavazás">
          <p>Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le.</p>
          <p>Ügyelj arra, hogy egyszer szavazhatsz, és szavazatod végleges, azt nem változtathatod meg!</p>
        </HeroPage>

        <VoteStartSection title="Válassz egy kategóriát és szavazz a kedvenc ötletedre!" subtitle="Több ötlet is megvalósulhat!" rand={searchParams?.rand || generateRandomValue().toString()} votedList={themes} />
      </div>
    </main>
  )
}
