"use client"

import { useState } from "react"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
import Image from 'next/image'

export type GalleryProps = {
  items: string[]|undefined
  showThumbnails: boolean
}

export default function Gallery({ items, showThumbnails = true }: GalleryProps) {
  const [ photoIndex, setPhotoIndex ] = useState(0)
  const [ isOpen, setIsOpen ] = useState(false)

  const onThumbnail = (index: number) => {
    setPhotoIndex(index)
    setIsOpen(true)
  }

  if (typeof items === 'undefined' || items && items.length === 0) {
    return null
  }

  return (
    <div className="gallery-thumbnail-wrapper">
      {showThumbnails && items.map((item, index) => (
        <div
          className="gallery-thumbnail-block"
          key={index}
          tabIndex={0}
          aria-label="Miniatűr előnézeti kép"
          onClick={() => onThumbnail(index)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onThumbnail(index)
            }
          }}>
          <Image className="gallery-thumbnail-image" src={item} alt=" " width={119} height={89} />
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
