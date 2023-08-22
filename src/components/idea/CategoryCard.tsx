import Link from "next/link"
import CategoryIcon from "./CategoryIcon"

type CategoryCardProps = {
  themeName: string
  href: string
  description: string
}

export default function CategoryCard({ themeName, href, description }: CategoryCardProps): JSX.Element {
  return (
    <div className="prop-wrapper">
      <div className={`prop-inner`}>
        <div className="prop-content-wrapper">
          <div className="prop-content">
            <div className="prop-category">
              <div className="prop-theme"><CategoryIcon name={themeName} color="blue" size={36} />{themeName}</div>
            </div>

            <div className="prop-description">{description}</div>
          </div>

          <hr />

          <footer className="post-card-meta">
            <div className="post-more-wrapper">
              <Link href={href} className="btn post-more">Megnézem az ötleteket</Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
