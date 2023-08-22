import React from "react"
import Image from 'next/image'

type InfoZigZagProps = {
  id:  string
  children: React.ReactNode
  image: string
  imageAlt: string
  bgColor?: string
  orient?: 'left'|'right'
}

export default function InfoZigZag({ id, children, image, imageAlt, bgColor = '', orient = 'left' }: InfoZigZagProps): JSX.Element {
  return (
    <div id={id} className={`info-zig-zag info-zig-zag-bg-${bgColor}`}>
      <div className="info-zig-zag-content">
        <div className="container">
          <div className="row flex-center">
            <div className={`col-md-12 col-lg-6 ${orient == 'right' ? 'order-lg-1' : ''}`}>
              { children }
            </div>

            <div className={`col-md-12 col-lg-6`}>
              <Image
                src={image}
                width={240}
                height={140}
                alt={imageAlt}
                aria-hidden={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
