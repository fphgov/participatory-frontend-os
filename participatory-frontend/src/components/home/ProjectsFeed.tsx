import Link from 'next/link'
import { apiProjectsData } from '@/lib/api-requests'
import { generateRandomValue } from '@/utilities/generateRandomValue'
import IdeaCard from '@/components/idea/IdeaCard'

type ProjectsFeedProps = {
  title: string
  more: string
}

export default async function ProjectsFeed({ title, more }: ProjectsFeedProps): Promise<JSX.Element|null> {
  const getPageData = () => {
    const data = {
      status: 'under_construction',
      limit: 3,
      rand: generateRandomValue(),
    }

    return apiProjectsData(data)
  }

  const ideasResponse = await getPageData()

  return (
    <div className="light-section win-feed">
      <div className="container">
        <div className="row flex-center">
          <div className="col-md-3">
            <h2>{title}</h2>
          </div>

          <div className="col-md-9" style={{ textAlign: 'right' }}>
            <Link href="/projektek" className="btn post-more desktop-only">{more}</Link>
          </div>
        </div>

        <div className="row">
          {Array.isArray(ideasResponse?._embedded?.projects) && ideasResponse._embedded.projects.map((project, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <IdeaCard idea={project} ideaPreLink={'/projektek'} />
            </div>
          ))}
        </div>

        <div className="mobile-only" style={{ textAlign: 'center' }}>
          <Link href="/projektek" className="btn post-more">{more}</Link>
        </div>

      </div>
    </div>
  )
}
