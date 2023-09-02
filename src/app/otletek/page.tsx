import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import PaginationMini from '@/components/common/PaginationMini'
import SearchArea from '@/components/common/SearchArea'
import NewsletterArea from '@/components/home/NesletterArea'
import IdeasWrapper from '@/components/idea/IdeasWrapper'
import { apiIdeasData, apiIdeasFilter } from '@/lib/api-requests'
import { NextPage } from "next"
import { generateRandomValue } from '@/utilities/generateRandomValue'
import { getNewUrlSearchParams } from '@/utilities/getNewUrlSearchParams'

interface IProps {
  searchParams: Record<string, string>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Beküldött ötletek',
    openGraph: {
      title: 'Beküldött ötletek',
    }
  }
}

const Ideas: NextPage<IProps> = async ({ searchParams }) => {
  const baseUrl = "/otletek"
  const rand = searchParams?.rand?.toString() || generateRandomValue().toString()

  if (! searchParams?.rand) {
    redirect(baseUrl + '?' + getNewUrlSearchParams({ ...searchParams, rand }))
  }

  let ideasList, ideasFilter, error

  try {
    ideasList = await apiIdeasData(searchParams)
    ideasFilter = await apiIdeasFilter(searchParams)
  } catch (e: any) {
    error = e.message
  }

  if (! ideasList || ! ideasFilter) {
    return null
  }

  return (
    <>
      <main className="page page-ideas">
        <div className="ideas">
          <SearchArea
            title="Beküldött ötletek"
            tipp="Az ötleteket itt abban a formában láthatod, ahogy azokat az ötletgazdák beadták. A szűrők segítségével tudod szűkíteni a megjelenített listát."
            tipp2=""
            type="idea"
            baseUrl={baseUrl}
            searchParams={searchParams}
            filterParams={ideasFilter}
            error={error}
          />

          <div className="idea-pagination">
            <div className="container">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6">
                  {ideasList?._links && ideasList._page_count ? (
                    <PaginationMini links={ideasList._links} pageSize={21} totalItems={ideasList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
                  ): null}
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              {ideasList._embedded?.ideas.map((idea, i) => <IdeasWrapper ideaPreLink={baseUrl} key={i} idea={idea} />)}
            </div>
          </div>

          <div className="idea-pagination">
            <div className="container">
              <div className="row">
                <div className="col-md-6"></div>

                <div className="col-md-6">
                  {ideasList?._links && ideasList._page_count ? (
                    <PaginationMini links={ideasList._links} pageSize={21} totalItems={ideasList._total_items} searchParams={searchParams} baseUrl={baseUrl} />
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

export default Ideas
