import Pagination from '@/components/common/Pagination';
import SearchArea from '@/components/common/SearchArea';
import IdeasWrapper from '@/components/idea/IdeasWrapper';
import { apiPlansData, apiPlansFilter } from '@/lib/api-requests'
import { NextPage } from "next";

interface IProps {
  searchParams: Record<string, string>
}

const Ideas: NextPage<IProps> = async ({ searchParams }) => {
  const baseUrl = "/tervek"

  let plansList, plansFilter, error

  try {
    plansList = await apiPlansData(searchParams)
    plansFilter = await apiPlansFilter(searchParams)
  } catch (e: any) {
    error = e.message
  }

  if (! plansList || ! plansFilter) {
    return null
  }

  return (
    <main className="page page-projects">
      <div className="projects">
        <SearchArea
          title="Feldolgozott ötletek"
          tipp="Itt láthatók az eredetileg beadott és szakmai jóváhagyást kapott ötletek átdolgozásával, újrafogalmazásával, adott esetben összevonásával létrehozott végleges ötletek, amelyek a szavazólapra kerülhetnek."
          tipp2=""
          type="plan"
          baseUrl={baseUrl}
          searchParams={searchParams}
          filterParams={plansFilter}
          error={error}
        />

        <div className="container">
          <div className="search-result mt-3">
            {plansList._total_items} találat
          </div>
        </div>

        <div className="container">
          <div className="row">
            {plansList._embedded?.projects.map((project, i) => <IdeasWrapper ideaPreLink='/projektek' key={i} idea={project} />)}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Pagination links={plansList._links} size={plansList._page_count} searchParams={searchParams} baseUrl={baseUrl} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Ideas
