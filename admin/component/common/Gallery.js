import React, { useState } from "react"
import Lightbox from "react-image-lightbox"

export default function Gallery({ items, showThumbnails = true }) {
  const [ photoIndex, setPhotoIndex ] = useState(0)
  const [ isOpen, setIsOpen ] = useState(false)

  const onThumbnail = (index) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  if (items && items.length === 0) {
    return null
  }

  return (
    <div className="gallery-thumbnail-wrapper">
      {showThumbnails && items.map((item, index) => (
        <div
          className="gallery-thumbnail-block"
          key={index} tabIndex="0"
          aria-label="Miniatűr előnézeti kép"
          onClick={() => onThumbnail(index)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onThumbnail(index)
            }
          }}>
          <img className="gallery-thumbnail-image" src={item} />
        </div>
      ))}

      {
        isOpen && <Lightbox
          mainSrc={items[photoIndex]}
          nextSrc={items[(photoIndex + 1) % items.length]}
          prevSrc={items[(photoIndex + items.length - 1) % items.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + items.length - 1) % items.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % items.length)}
        />
      }
    </div>
  )
}
