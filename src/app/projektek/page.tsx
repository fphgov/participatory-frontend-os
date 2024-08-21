import type { Metadata } from 'next'
import PaginationMini from '@/components/common/PaginationMini'
import SearchArea from '@/components/common/SearchArea'
import IdeasWrapper from '@/components/idea/IdeasWrapper'
import { apiProjectsData, apiProjectsFilter, apiVoteStatus } from '@/lib/api-requests'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import { getNewUrlSearchParams } from '@/utilities/getNewUrlSearchParams'
import { NextPage } from "next"
import { redirect } from 'next/navigation'
import BannerArea from '@/components/home/BannerArea'
import { getToken } from '@/lib/actions'
import VoteCallback from '@/components/common/VoteCallback'

interface IProps {
  searchParams: Record<string, string>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Megvalósuló ötletek',
    openGraph: {
      title: 'Megvalósuló ötletek',
      type: 'website',
      locale: 'hu_HU',
      images: ['/opengraph-image.png'],
    }
  }
}

const Ideas: NextPage<IProps> = async ({ searchParams }) => {
  const baseUrl = "/projektek"
  const rand = searchParams?.rand?.toString() || generateRandomValue().toString()

  const token = (await getToken())?.value

  if (! searchParams?.rand) {
    redirect(baseUrl + '?' + getNewUrlSearchParams({ ...searchParams, rand }))
  }

  let projectsList, projectsFilter, voteStatus, error

  try {
    projectsList = await apiProjectsData(searchParams)
    projectsFilter = await apiProjectsFilter(searchParams)

    if (token) {
      voteStatus = await apiVoteStatus()
    }
  } catch (e: any) {
    error = e.message
  }

  if (! projectsList || ! projectsFilter) {
    return null
  }

  return (
    <>
      <VoteCallback loggedIn={typeof token === 'string'} voteStatus={voteStatus} />

      <main className="page page-projects">
        <div className="projects">
          <SearchArea
            title="Megvalósuló ötletek"
            tipp="Itt láthatod a nyertes ötleteket, vagyis azokat az egyes években legtöbb szavazatot kapott javaslatokat, amelyeket a Főpolgármesteri Hivatal megvalósít. A megvalósulás állapotáról a projektek adatlapján tájékoztatást adunk."
            tipp2=""
            type="project"
            baseUrl={baseUrl}
            searchParams={searchParams}
            filterParams={projectsFilter}
            error={error}
          />

          <div className="idea-pagination">
            <div className="container">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6">
                  {projectsList?._links && projectsList._page_count ? (
                    <PaginationMini links={projectsList._links} pageSize={21} totalItems={projectsList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
                  ): null}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {projectsList._embedded?.projects.map((project, i) => <IdeasWrapper ideaPreLink={baseUrl} key={i} idea={project} />)}
            </div>
          </div>

          <div className="idea-pagination">
            <div className="container">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6">
                  {projectsList?._links && projectsList._page_count ? (
                    <PaginationMini links={projectsList._links} pageSize={21} totalItems={projectsList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
                  ): null}
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

export default Ideas
