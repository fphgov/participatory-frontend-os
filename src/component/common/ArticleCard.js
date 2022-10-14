import React from "react"
import {
  Link,
} from "react-router-dom"
import { getDateFormat, getHungarianDateFormat } from '../assets/dateFormats'

export default function ArticleCard({ post }) {
  return (
    <article className="post-card">
      <Link className="post-card-image-link" to={`/hirek/${post.slug}`}>
        <div className="post-image">{post.featuredImage ? <img src={`${process.env.REACT_APP_SERVER_FILE}/${post.featuredImage.filename}`} /> : null}</div>
      </Link>

      <div className="post-card-content">
        <Link to={`/hirek/${post.slug}`}>
          <header className="post-full-header">
            <h1 className="post-full-title">{post.title}</h1>
          </header>

          <hr />

          <footer className="post-card-meta">
            <section className="post-full-meta">
              {post.createdAt ? <time className="post-full-meta-date" dateTime={getDateFormat(post.createdAt)}>{getHungarianDateFormat(post.createdAt)}</time> : null}
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
