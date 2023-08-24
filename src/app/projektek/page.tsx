import Pagination from '@/components/common/Pagination';
import SearchArea from '@/components/common/SearchArea';
import NewsletterArea from '@/components/home/NesletterArea';
import IdeasWrapper from '@/components/idea/IdeasWrapper';
import { apiProjectsData, apiProjectsFilter } from '@/lib/api-requests'
import { NextPage } from "next";

interface IProps {
  searchParams: Record<string, string>
}

const Ideas: NextPage<IProps> = async ({ searchParams }) => {
  const baseUrl = "/projektek"

  let projectsList, projectsFilter, error

  try {
    projectsList = await apiProjectsData(searchParams)
    projectsFilter = await apiProjectsFilter(searchParams)
  } catch (e: any) {
    error = e.message
  }

  if (! projectsList || ! projectsFilter) {
    return null
  }

  return (
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

        <div className="container">
          <div className="search-result mt-3">
            {projectsList._total_items} találat
          </div>
        </div>

        <div className="container">
          <div className="row">
            {projectsList._embedded?.projects.map((project, i) => <IdeasWrapper ideaPreLink={baseUrl} key={i} idea={project} />)}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Pagination links={projectsList._links} size={projectsList._page_count} searchParams={searchParams} baseUrl={baseUrl} />
            </div>
          </div>
        </div>
      </div>

      <NewsletterArea />
    </main>
  )
}

export default Ideas
