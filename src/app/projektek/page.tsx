import PaginationMini from '@/components/common/PaginationMini';
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
    <>
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

      <NewsletterArea />
    </>
  )
}

export default Ideas
