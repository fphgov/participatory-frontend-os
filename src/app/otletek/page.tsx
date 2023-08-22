import Pagination from '@/components/common/Pagination';
import SearchArea from '@/components/common/SearchArea';
import IdeasWrapper from '@/components/idea/IdeasWrapper';
import { apiIdeasData, apiIdeasFilter } from '@/lib/api-requests'
import { NextPage } from "next";

interface IProps {
  searchParams: Record<string, string>
}

const Ideas: NextPage<IProps> = async ({ searchParams }) => {
  const baseUrl = "/otletek"

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

        <div className="container">
          <div className="search-result mt-3">
            {ideasList._total_items} találat
          </div>
        </div>

        <div className="container">
          <div className="row">
            {ideasList._embedded?.ideas.map((idea, i) => <IdeasWrapper ideaPreLink={baseUrl} key={i} idea={idea} />)}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Pagination links={ideasList._links} size={ideasList._page_count} searchParams={searchParams} baseUrl={baseUrl} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Ideas
