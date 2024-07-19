import React from "react"
import Image from 'next/image'

export type VoteInfoSectionProps = {
  title?: string
  hasContainerClass?: boolean
}

export default function VoteInfoSection({ title, hasContainerClass = false }: VoteInfoSectionProps): JSX.Element {
  const content = (
    <div className="row">
      <div className="col-lg-1"></div>
      <div className="col-lg-10">
        {title ? <h3>{title}</h3> : null}

        <div className="info-box-wrapper">
          <div className="info-box">
            <div className="info-box-icon">
              <Image
                src="/images/icon-dots.svg"
                width={60}
                height={60}
                alt="Dots"
                aria-hidden={true}
              />
            </div>
            <div className="info-box-title">
              Válassz kategóriát, majd ötletet
            </div>
            <div className="info-box-content">
              5 kategóriában szavazhatsz az ötletekre.
            </div>
          </div>

          <div className="info-box">
            <div className="info-box-icon">
              <Image
                src="/images/icon-accept.svg"
                width={60}
                height={60}
                alt="Accept"
                aria-hidden={true}
              />
            </div>
            <div className="info-box-title">
              Add le a szavazatod
            </div>
            <div className="info-box-content">
              Minden kategóriában 3 ötletre szavazhatsz.
            </div>
          </div>

          <div className="info-box">
            <div className="info-box-icon">
              <Image
                src="/images/icon-profile.svg"
                width={60}
                height={60}
                alt="Profile"
                aria-hidden={true}
              />
            </div>
            <div className="info-box-title">
              Lépj be vagy regisztrálj
            </div>
            <div className="info-box-content">
              Ahhoz, hogy érvényesen szavazhass, be kell lépned a fiókodba.
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-1"></div>
    </div>
  )

  if (! hasContainerClass) {
    return content
  }

  return (
    <div className="info-section">
      <div className="container">
        {content}
      </div>
    </div>
  )
}
