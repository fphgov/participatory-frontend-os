import ArticleCard from '@/components/article/ArticleCard'
import HeroPage from '@/components/common/HeroPage'
import { apiArticlesData } from '@/lib/api-requests'
import Error from '@/components/common/Error'
import Tabs from '@/components/article/Tabs'
import { NextPage } from "next"
import BannerArea from '@/components/home/BannerArea'

interface IProps {
  searchParams: Record<string, string>
}

const Articles: NextPage<IProps> = async ({ searchParams }) => {
  const currentTab = parseInt(searchParams?.cat) || 0

  const getPageData = async () => {
    const categoryIds = ["1", "2", "3"]

    const data = {
      category: categoryIds.includes(currentTab.toString()) ? currentTab : categoryIds
    }

    return apiArticlesData(data)
  }

  let articles, error

  try {
    articles = await getPageData()
  } catch (e: any) {
    error = e.message
  }

  return (
    <>
      <main className="page page-posts">
        <div className="page-posts-section">

          <HeroPage title="Hírek, rendezvények" content="A közösség költségvetéssel kapcsolatos legfrissebb hírek és tudnivalók." />

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {(typeof error === 'string' && error !== '') ? <Error message={error} /> : null}

                <Tabs currentTab={currentTab} />

                <div className="posts">
                  <div className="row">
                    {Array.isArray(articles) && articles.map((article, i) => (
                      <div key={i} className="col-lg-3 col-md-6 col-sm-6 col-12 article-wrapper">
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}

export default Articles
