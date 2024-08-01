"use server"

import HeroPage from '@/components/common/HeroPage'
import ScrollButton from '@/components/common/ScrollButton'
import Share from '@/components/common/Share'
import BannerArea from '@/components/home/BannerArea'
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

  const isFinalSection = themes?.length === 5

  const heroTitle = isFinalSection ? 'Köszönjük a szavazataidat, minden kategóriában sikeresen szavaztál.' : `Sikeresen szavaztál erre az ötletre. Még ${pageData.data.voteables_count} szavazatod maradt.`
  const heroContent = isFinalSection ? 'Ne maradj le a Közösségi Költségvetés híreiről és eseményeiről. Görgess az oldal aljára, és iratkozz fel hírlevelünkre!' : ''

  return (
    <>
      <main className="page page-vote-success">
        <div className="page-vote-success-section">
          <HeroPage title={heroTitle}>
            <p>{heroContent}</p>

            <div className="button-wrapper-hero">
              {!isFinalSection ? <>
                <ScrollButton to="#szavazas-folytatas" className="btn btn-primary btn-headline">
                  Folytatom a szavazást
                </ScrollButton>

                <ScrollButton to="#otlet-megosztasa" className="btn btn-tertiary btn-headline">
                  Ötlet megosztása
                </ScrollButton>
              </> : <>
                <ScrollButton to="#hirlevel" className="btn btn-tertiary btn-headline">
                  Hírlevél feliratkozás
                </ScrollButton>
              </>}
            </div>
          </HeroPage>

          <div id="otlet-megosztasa">
            <div className="vote-project-wrapper">
              <div className="container">
                <div className="row">
                  <div className="offset-md-2 col-md-8">
                    <IdeaCard idea={pageData?.data.projects[0]} ideaPreLink={'/projektek'} showStatus={false} showMore={false} autoHeight={true} />

                    <div className="page-vote-success-share">
                      <div className="page-vote-success-share-title">Oszd meg másokkal is!</div>
                      <div className="page-vote-success-share-content">
                        <Share directHref={`/projektek/${pageData?.data.projects[0].id}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {! isFinalSection ? <>
            <div id="szavazas-folytatas">
              <VoteStartSection title={`Még ${pageData.data.voteables_count} szavazatod maradt. Nézd meg a többi ötletet, és szavazz azokra is!`} isContinue={true} votedList={themes} />
            </div>
          </> : null}
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
