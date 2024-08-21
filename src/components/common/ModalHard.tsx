"use client"

import { useModalHardContext } from '@/context/modalHard'
import { useEffect, useRef } from 'react'

export default function ModalHard(): JSX.Element {
  const { openModalHard, setOpenModalHard, dataModalHard, scrollModalHard } = useModalHardContext()

  const ref = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setOpenModalHard(false)
  }

  useEffect(() => {
    if (openModalHard) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [openModalHard])

  useEffect(() => {
    if (scrollModalHard) {
      const element = ref.current

      if (element) {
        element.scrollTop = 0
      }
    }
  }, [scrollModalHard])

  if (! openModalHard) {
    return <></>
  }

  return (
    <>
      <div className="modal-hard-background" />

      <div className="modal-hard-wrapper">
        <div className="modal-inner" ref={ref}>
          <div className="modal-title">{dataModalHard.title}</div>
          <div className="modal-content">{dataModalHard.content}</div>

          {dataModalHard.showCancelButton ? <button type="button" className="btn btn-secondary" onClick={() => { closeModal() }}>Rendben</button> : null}
        </div>
      </div>
    </>
  )
}
