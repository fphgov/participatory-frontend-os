import React, { ReactNode } from "react"

export type HeroPageProps = {
  title: string;
  content?: string;
  link?: ReactNode|undefined;
  children?: ReactNode|undefined;
}

export default function HeroPage({ title, content, link = null, children }: HeroPageProps): JSX.Element {
  return (
    <div className="hero-page">
      <div className="container">
        <div className="row">
          <div className="offset-lg-1 offset-md-1 col-lg-10 col-md-10">
            {link}

            <h1>{title}</h1>

            {content ? <p>{content}</p> : <>{children}</>}
          </div>
        </div>
      </div>
    </div>
  )
}
