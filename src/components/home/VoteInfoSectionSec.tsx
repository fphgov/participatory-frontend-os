import React from "react"
import Link from "next/link"

export type VoteInfoSectionSecProps = {
  title?: string
  hasContainerClass?: boolean
}

export default function VoteInfoSectionSec({ title, hasContainerClass = false }: VoteInfoSectionSecProps): JSX.Element {
  const content = (
    <div className="row">
      <div className="col-12">
        {title ? <h2>{title}</h2> : null}

        <div className="info-box-wrapper">
          <div className="info-box">
            <div className="info-box-num">1</div>

            <div className="info-box-text">
              <div className="info-box-title">
                Válassz kategóriát, majd ötletet
              </div>
              <div className="info-box-content">
                5 kategóriában szavazhatsz az ötletekre.
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="info-box-num">2</div>

            <div className="info-box-text">
              <div className="info-box-title">
                Add le a szavazatod
              </div>
              <div className="info-box-content">
                Minden kategóriában 3 szavazatod van.
              </div>
            </div>
          </div>

          <div className="info-box">
            <div className="info-box-num">3</div>

            <div className="info-box-text">
              <div className="info-box-title">
                Lépj be vagy regisztrálj
              </div>
              <div className="info-box-content">
                Elég egy e-mail címet megadnod a szavazáshoz.
              </div>
            </div>
          </div>
        </div>

        <div className="info-box-more">
          <Link className="btn btn-primary btn-headline btn-next" href="/szavazas-inditasa">Elindítom a szavazást</Link>
          <Link className="link-info" href="/tudnivalok-a-szavazasrol">Szavazás feltételei</Link>
        </div>

      </div>
    </div>
  )

  if (! hasContainerClass) {
    return content
  }

  return (
    <div className="info-section-sec-wrapper row">
      <div className="info-section-sec-content offset-1 col-10">
        <div className="info-section-sec">
          <div className="container">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}
