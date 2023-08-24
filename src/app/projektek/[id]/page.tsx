import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import { apiProjectData } from '@/lib/api-requests'
import HeroPage from '@/components/common/HeroPage'
import Link from 'next/link'
import ProjectWrapper from '@/components/idea/ProjectWrapper'
import NewsletterArea from '@/components/home/NesletterArea'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await apiProjectData(params.id)

  return {
    title: pageData?.title,
  }
}

export default async function SimplePage({ params }: Props) {
  let pageData, error

  try {
    pageData = await apiProjectData(params.id)
  } catch (e: any) {
    error = e.message
  }

  if (!pageData) {
    return notFound()
  }

  return (
    <main className="page page-idea">
      <div className="prop">
        <HeroPage title={pageData.title} link={<Link className="link-back" href="/projektek">Vissza</Link>} />

        <div className="container">
          {error ? <Error message={error} /> : null}

          <ProjectWrapper
            project={pageData}
            onClickVote={undefined}
            disableVoteButton={true}
            voteable={true}
            onTipClick={undefined}
          />
        </div>
      </div>

      <NewsletterArea />
    </main>
  )
}
