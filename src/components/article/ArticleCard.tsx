import { IArticle } from '@/models/article.model'
import { getDateFormat, getHungarianDateFormat } from '@/utilities/dateFormats'
import Link from 'next/link'
import Image from 'next/image'

type ArticleCardProps = {
  article: IArticle
}

export default function ArticleCard({ article }: ArticleCardProps): JSX.Element|null {
  return (
    <article className="post-card">
      <Link className="post-card-image-link" href={`/hirek/${article.slug}`}>
        <div className="post-image">{article.featuredImage ? <Image src={`${process.env.NEXT_PUBLIC_FILES_PATH}/${article.featuredImage.filename}`} alt=" " width={300} height={300} /> : null}</div>
      </Link>

      <div className="post-card-content">
        <Link href={`/hirek/${article.slug}`}>
          <header className="post-full-header">
            <h1 className="post-full-title">{article.title}</h1>
          </header>

          <hr />

          <footer className="post-card-meta">
            <section className="post-full-meta">
              {article.createdAt ? <time className="post-full-meta-date" dateTime={getDateFormat(article.createdAt)}>{getHungarianDateFormat(article.createdAt)}</time> : null}
            </section>

            <div className="post-more-wrapper">
              <div className="post-more">Tovább</div>
            </div>
          </footer>
        </Link>
      </div>
    </article>
  )
}
