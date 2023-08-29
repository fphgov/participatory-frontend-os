"use server"

import HeroPage from '@/components/common/HeroPage'
import ScrollButton from '@/components/common/ScrollButton'
import IdeaCard from '@/components/idea/IdeaCard'
import VoteStartSection from '@/components/vote/VoteStartSection'
import { apiVoteStatus } from '@/lib/api-requests'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás sikeres',
  }
}

export default async function VoteStartPage() {
  let pageData, error

  try {
    pageData = await apiVoteStatus()
  } catch (e: any) {
    error = e.message
  }

  if (! pageData) {
    notFound()
  }

  const themes = pageData?.data?.projects.map(project => project.campaignTheme?.code as string)

  return (
    <main className="page page-vote-success">
      <div className="page-vote-success-section">
        <HeroPage title={`Sikeresen szavaztál erre az ötletre. Még ${pageData.data.voteables_count} szavazatod maradt.`}>
          <div className="button-wrapper-hero">
            <ScrollButton to="#szavazas-folytatas" className="btn btn-primary btn-headline">
              Folytatom a szavazást
            </ScrollButton>

            <ScrollButton to="#otlet-megosztasa" className="btn btn-tertiary btn-headline">
              Ötlet megosztása
            </ScrollButton>
          </div>
        </HeroPage>

        <div id="otlet-megosztasa">
          <div className="vote-project-wrapper">
            <div className="container">
              <div className="row">
                <div className="offset-md-2 col-md-8">
                  <IdeaCard idea={pageData?.data.projects[0]} ideaPreLink={'/projektek'} showStatus={false} showMore={false} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="szavazas-folytatas">
          <VoteStartSection title={`Még ${pageData.data.voteables_count} szavazatod maradt. Nézd meg a többi ötletet, és szavazz azokra is!`} isContinue={true} votedList={themes} />
        </div>
      </div>
    </main>
  )
}
