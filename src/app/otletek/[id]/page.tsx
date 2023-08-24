import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import { apiIdeaData } from '@/lib/api-requests'
import HeroPage from '@/components/common/HeroPage'
import IdeaWrapper from '@/components/idea/IdeaWrapper'
import Link from 'next/link'
import NewsletterArea from '@/components/home/NesletterArea'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await apiIdeaData(params.id)

  return {
    title: pageData?.title,
  }
}

export default async function SimplePage({ params }: Props) {
  let pageData, error

  try {
    pageData = await apiIdeaData(params.id)
  } catch (e: any) {
    error = e.message
  }

  if (!pageData) {
    return notFound()
  }

  return (
    <main className="page page-idea">
      <div className="prop">
        <HeroPage title={pageData.title} link={<Link className="link-back" href="/otletek">Vissza</Link>} />

        <div className="container">
          {error ? <Error message={error} /> : null}
          {pageData ? <IdeaWrapper idea={pageData} /> : null}
        </div>
      </div>

      <NewsletterArea />
    </main>
  )
}
