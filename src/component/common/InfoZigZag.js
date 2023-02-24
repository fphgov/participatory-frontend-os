import React from "react"

export default function InfoZigZag({ id, children, image, imageAlt, bgColor, orient = 'left' }) {
  return (
    <div id={id} className={`info-zig-zag info-zig-zag-bg-${bgColor}`}>
      <div className="info-zig-zag-content">
        <div className="container">
          <div className="row flex-center">
            <div className={`col-md-12 col-lg-6 ${orient == 'right' ? 'order-lg-1' : ''}`}>
              { children }
            </div>

            <div className={`col-md-12 col-lg-6`}>
              { <img src={image} alt={imageAlt} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
