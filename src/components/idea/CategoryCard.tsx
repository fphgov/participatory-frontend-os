import Link from "next/link"
import CategoryIcon from "./CategoryIcon"

type CategoryCardProps = {
  themeName: string
  href: string
  info?: string
  description: string
  voted?: boolean
}

export default function CategoryCard({ themeName, href, info, description, voted = false }: CategoryCardProps): JSX.Element {
  return (
    <div className={`prop-wrapper${voted ? ' prop-wrapper-voted' : ''}`}>
      <div className="prop-inner">
        <div className="prop-content-wrapper">
          <div className="prop-content">
            <div className="prop-category">
              <div className="prop-theme"><CategoryIcon name={themeName} color="blue" size={24} />{themeName}</div>
            </div>

            <div className="prop-description">{description}</div>
          </div>

          {voted ? <div className="card-voted-text">Ebben a kategóriában már szavaztál!</div> : null}

          <footer className="post-card-meta">
            <div className="post-more-wrapper">
              <Link href={href} className={`btn post-more ${voted ? 'post-more-outline' : ''}`}>Megnézem az ötleteket</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
