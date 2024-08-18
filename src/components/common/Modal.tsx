"use client"

import { useModalContext } from '@/context/modal'
import { useEffect, useRef } from 'react'

export default function Modal(): JSX.Element {
  const { openModal, setOpenModal, dataModal, scrollModalHard } = useModalContext()

  const ref = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [openModal])

  useEffect(() => {
    if (scrollModalHard) {
      const element = ref.current

      if (element) {
        element.scrollTop = 0
      }
    }
  }, [scrollModalHard])

  if (! openModal) {
    return <></>
  }

  return (
    <>
      <div className="modal-background" />

      <div className="modal-wrapper">
        <div className="modal-inner" ref={ref}>
          <button type="button" className="modal-button-close" aria-label="Bezárás" onClick={() => { closeModal() }} />

          <div className="modal-content">{dataModal.content}</div>
        </div>
      </div>
    </>
  )
}
