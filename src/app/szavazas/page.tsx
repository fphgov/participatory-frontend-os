"use server"

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import HeroPage from '@/components/common/HeroPage'
import VoteCategoryFilterSecondary from '@/components/vote/VoteCategoryFilterSecondary'
import VoteCategoryFilterItem from '@/components/vote/VoteCategoryFilterItem'
import { apiVoteStatus, apiVoteablePlansData } from '@/lib/api-requests'
import Error from '@/components/common/Error'
import IdeasWrapper from '@/components/idea/IdeasWrapper'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import { getToken } from '@/lib/actions'
import { getNewUrlSearchParams } from '@/utilities/getNewUrlSearchParams'
import BannerArea from '@/components/home/BannerArea'
import VoteButtonCard from '@/components/vote/VoteButtonCard'

interface IProps {
  searchParams: Record<string, string>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás',
    openGraph: {
      title: 'Szavazás',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

export default async function VotePage({ searchParams }: IProps) {
  const baseUrl = "/szavazas"
  const theme = searchParams?.theme?.toString().toUpperCase() || 'LOCAL-SMALL'
  const rand = searchParams?.rand?.toString() || generateRandomValue().toString()
  const page = searchParams?.page || "1"
  const query = searchParams?.query || ''
  const tag = searchParams?.tag || ''
  const orderBy = searchParams?.orderBy || ''
  const location = ["LOCAL-SMALL", "LOCAL-BIG"].includes(theme) ? searchParams?.location || '' : ''

  const getUrl = (themeId?: string) => {
    const urlSearchParams = {
      theme: themeId ? themeId.toUpperCase() : '',
      rand,
      tag,
      orderBy,
    }

    return baseUrl + '?' + getNewUrlSearchParams(urlSearchParams)
  }

  if (! searchParams?.rand) {
    redirect(getUrl(theme))
  }

  const getPageData = async () => {
    const data = {
      theme,
      status: 'VOTING_LIST',
      rand,
      page,
      tag,
      orderBy,
      location,
      query
    }

    return apiVoteablePlansData(data)
  }

  let projectList, voteStatus, error

  const token = (await getToken())?.value

  try {
    projectList = await getPageData()

    if (token) {
      voteStatus = await apiVoteStatus()
    }
  } catch (e: any) {
    error = e.message
  }

  if (! projectList) {
    return (
      <main className="page page-vote">
        <div className="page-vote-single-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const votedThemes = voteStatus?.data?.projects?.map(project => project.campaignTheme?.code)

  return (
    <>
      <main className="page page-vote page-vote-type-2">
        <div className="page-vote-single-section">
          <HeroPage title="Szavazás" content="Minden kategóriában 3 szavazatot adhatsz le." />

          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <VoteCategoryFilterSecondary>
            {["LOCAL-SMALL", "LOCAL-BIG", "CARE", "OPEN", "GREEN"].map((themeName) => (
              <VoteCategoryFilterItem key={themeName} theme={themeName} ready={votedThemes?.includes(themeName)} currentTheme={theme} href={getUrl(themeName)} />
            ))}
          </VoteCategoryFilterSecondary>

          <div className="list-wrapper">
            <div className="container">
              <div className="row">
                {projectList?._embedded?.projects.map((project, i) => <IdeasWrapper
                  className={`col-sm-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 ${project.voted ? 'voted' : ''}`}
                  ideaPreLink="/projektek"
                  key={i}
                  idea={project}
                  showStatus={false}
                  showVoted={false}
                  showDescription={false}
                  extraButton={
                    <VoteButtonCard showVoteButton={!project.voted} disableVoteButton={false} errorVoteable={""} token={token} projectId={project.id} />
                  }
                  footerExtend={
                    project.voted ? <div className="prop-build">Már szavaztál erre az ötletre</div> : null
                  }
                  />)}

                <div className="col-md-12">
                  {projectList?._embedded?.projects && projectList?._embedded?.projects.length === 0 ? <p>Nincs találat a megadott feltételek alapján, próbálj meg más kategóriában vagy kevesebb/más feltétel szerint szűrni.</p> : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
