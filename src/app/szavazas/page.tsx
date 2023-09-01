import { redirect } from 'next/navigation'
import HeroPage from '@/components/common/HeroPage'
import VoteCategoryFilter from '@/components/vote/VoteCategoryFilter'
import VoteCategoryFilterItem from '@/components/vote/VoteCategoryFilterItem'
import VoteSearch from '@/components/vote/VoteSearch'
import { apiVoteStatus, apiVoteablePlansData } from '@/lib/api-requests'
import Error from '@/components/common/Error'
import type { Metadata } from 'next'
import IdeasWrapper from '@/components/idea/IdeasWrapper'
import NewsletterArea from '@/components/home/NesletterArea'
import { categoryResolver } from '@/utilities/categoryResolver'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import PaginationMini from '@/components/common/PaginationMini'
import VoteOrderFilter from '@/components/vote/VoteOrderFilter'
import { getToken } from '@/lib/actions'
import { getNewUrlSearchParams } from '@/utilities/getNewUrlSearchParams'

interface IProps {
  searchParams: Record<string, string>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás',
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
      query
    }

    return apiVoteablePlansData(data)
  }

  let projectList, voteStatus, error

  try {
    projectList = await getPageData()

    const token = (await getToken())?.value

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
      <main className="page page-vote">
        <div className="page-vote-single-section">
          <HeroPage title="Szavazás" content="Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le." />

          {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

          <VoteCategoryFilter>
            {["LOCAL-SMALL", "LOCAL-BIG", "CARE", "OPEN", "GREEN"].map((themeName) => (
              <VoteCategoryFilterItem key={themeName} theme={themeName} ready={votedThemes?.includes(themeName)} currentTheme={theme} href={getUrl(themeName)} />
            ))}
          </VoteCategoryFilter>

          <VoteSearch title={categoryResolver(theme)} searchParams={searchParams} baseUrl={baseUrl} ready={votedThemes?.includes(theme)} />

          <div className="vote-category-order">
            <div className="container">
              <div className="row flex-center">
                <div className="col-md-6">
                  <VoteOrderFilter searchParams={searchParams} baseUrl={baseUrl} />
                </div>

                <div className="col-md-6">
                  {projectList?._links && projectList._page_count ? (
                    <PaginationMini links={projectList._links} pageSize={12} totalItems={projectList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
                  ): null}
                </div>
              </div>
            </div>
          </div>

          <div className="list-wrapper">
            <div className="container">
              <div className="row">
                {projectList?._embedded?.projects.map((project, i) => <IdeasWrapper ideaPreLink="/projektek" key={i} idea={project} showStatus={false} showVoted={true} />)}

                <div className="col-md-12">
                  {projectList?._embedded?.projects && projectList?._embedded?.projects.length === 0 ? <p>Nincs találat a megadott feltételek alapján, próbálj meg más kategóriában vagy kevesebb/más feltétel szerint szűrni.</p> : ''}
                </div>
              </div>
            </div>
          </div>

          <div className="vote-category-pagination">
            <div className="container">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6">
                  {projectList?._links && projectList._page_count ? (
                    <PaginationMini links={projectList._links} pageSize={12} totalItems={projectList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
                  ): null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
