import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Error from '@/components/common/Error'
import { apiArticleData } from '@/lib/api-requests'
import { getHungarianDateFormat } from '@/utilities/dateFormats'
import SidebarCard from '@/components/article/SidebarCard'
import ShareBox from '@/components/common/ShareBox'
import Image from 'next/image'

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await apiArticleData(params.slug)

  return {
    title: pageData.title,
  }
}

export default async function SimplePage({ params }: Props) {
  let pageData, error

  try {
    pageData = await apiArticleData(params.slug)
  } catch (e: any) {
    error = e.message
  }

  if (!pageData) {
    return notFound()
  }

  return (
    <main className="page page-post">
      <div className="page-post-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              {error ? <Error message={error} /> : null}

              <h1>{pageData.title}</h1>

              {pageData.createdAt ? <span className="time">{getHungarianDateFormat(pageData.createdAt)}</span> : null}<span>• {pageData.category.name}</span>
              {pageData.featuredImage ? <div className="featured-image"><Image src={`${process.env.NEXT_PUBLIC_FILES_PATH}/${pageData.featuredImage.filename}`} alt=" " /></div> : null}
              {pageData.description ? <div className="description" dangerouslySetInnerHTML={{ __html: pageData.description }} /> : null}
              {pageData.content ? <div dangerouslySetInnerHTML={{ __html: pageData.content }} /> : null}

              <ShareBox />
            </div>

            <div className="col-md-12 col-lg-4">
              <SidebarCard>
                <div className="light section-newsletter">
                  <h2>Iratkozz fel hírlevelünkre!</h2>

                  <p>Ne maradj le a közösségi költségvetéssel kapcsolatos legfontosabb hírekről és eseményekről, iratkozz fel hírlevelünkre!</p>

                  <a className="btn btn-primary" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Feliratkozás</a>
                </div>
              </SidebarCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
