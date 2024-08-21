"use server"

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import HeroPage from '@/components/common/HeroPage'
import VoteCategoryFilterSecondary from '@/components/vote/VoteCategoryFilterSecondary'
import VoteCategoryFilterItem from '@/components/vote/VoteCategoryFilterItem'
import { apiVoteStatus, apiVoteablePlansData } from '@/lib/api-requests'
import Error from '@/components/common/Error'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import { getValidToken } from '@/lib/actions'
import { getNewUrlSearchParams } from '@/utilities/getNewUrlSearchParams'
import ShowProjects from "@/components/vote/ShowProjects"
import { categoryResolver } from "@/utilities/categoryResolver"
import VoteCallback from '@/components/common/VoteCallback'

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

export default async function VotePage({searchParams}: IProps) {
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

  if (!searchParams?.rand) {
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

  const token = await getValidToken()

  try {
    projectList = await getPageData()

    if (token) {
      voteStatus = await apiVoteStatus()
    }
  } catch (e: any) {
    error = e.message
  }

  if (!projectList) {
    return (
      <main className="page page-vote">
        <div className="page-vote-single-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {(typeof error === 'string' && error !== '') ? <Error message={error}/> : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const votedThemes = voteStatus?.data?.projects?.map(project => project.campaignTheme?.code)
  const noVotesLeft = voteStatus?.data?.voteables_count_by_campaign_themes?.[theme] === 0

  return (
    <>
      <VoteCallback loggedIn={typeof token === 'string'} voteStatus={voteStatus} />

      <main className="page page-vote page-vote-type-2">
        <div className="page-vote-single-section">
          <HeroPage title="Szavazás" content="Minden kategóriában 3 szavazatot adhatsz le." />

          {(typeof error === 'string' && error !== '') ? <Error message={error}/> : null}

          <VoteCategoryFilterSecondary>
            {["LOCAL-SMALL", "LOCAL-BIG", "CARE", "OPEN", "GREEN"].map((themeName) => (
              <VoteCategoryFilterItem
                key={themeName}
                theme={themeName}
                ready={votedThemes?.includes(themeName)}
                currentTheme={theme} href={getUrl(themeName)} />
            ))}
          </VoteCategoryFilterSecondary>

          <ShowProjects
            projectList={projectList}
            enableMapList={(theme === 'LOCAL-SMALL' || theme === 'LOCAL-BIG')}
            noVotesLeft={noVotesLeft}
            token={token}
            title={categoryResolver(theme)}
            searchParams={searchParams}
            baseUrl={baseUrl}
            voteStatus={voteStatus}
            theme={theme}
            rand={rand}
          />
        </div>
      </main>
    </>
  )
}
