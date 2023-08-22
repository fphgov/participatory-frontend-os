import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import HeroPage from "@/components/common/HeroPage"
import { apiPageData } from '@/lib/api-requests'

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await apiPageData(params.slug)

  return {
    title: pageData.title,
  }
}

export default async function SimplePage({ params }: Props) {
  let pageData, error

  try {
    pageData = await apiPageData(params.slug)
  } catch (e: any) {
    error = e.message
  }

  if (!pageData) {
    return notFound()
  }

  return (
    <main className="page page-page">
      <div className="page-profile-single-section">

        <HeroPage title={pageData.title} />

        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error ? <Error message={error} /> : null}

                <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
