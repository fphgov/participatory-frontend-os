import Link from 'next/link'
import ArticleCard from '../article/ArticleCard'
import { apiArticlesData } from '@/lib/api-requests'

type NewsFeedProps = {
  title: string
  more: string
}

export default async function NewsFeed({ title, more }: NewsFeedProps): Promise<JSX.Element|null> {
  const getPageData = async () => {
    const categoryIds = [1, 2, 3]

    const data = {
      category: categoryIds,
      limit: 3,
    }

    return apiArticlesData(data)
  }

  const articles = await getPageData()

  return (
    <div className="medium-section news-feed">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-xl-3">
            <div className="news-feed-title">
              <h3>{title}</h3>

              <Link href="/hirek" className="btn btn-primary btn-headline btn-next desktop-only">{more}</Link>
            </div>
          </div>
          <div className="col-lg-12 col-xl-9">
            <div className="posts">
              <div className="row">
                {Array.isArray(articles) && articles.map((article, i) => (
                  <div key={i} className="col-lg-6 col-xl-4">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-only" style={{ textAlign: 'center' }}>
          <Link href="/hirek" className="btn btn-primary">{more}</Link>
        </div>
      </div>
    </div>
  )
}
