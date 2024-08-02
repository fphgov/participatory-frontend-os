"use client"

import { useModalHardContext } from '@/context/modalHard'
import { useEffect, useRef } from 'react'

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  return ref
}

export default function ModalHard(): JSX.Element {
  const { openModalHard, setOpenModalHard, dataModalHard } = useModalHardContext()

  const closeModal = () => {
    setOpenModalHard(false)
  }

  const ref = useOutsideClick(closeModal)

  useEffect(() => {
    if (openModalHard) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [openModalHard])

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

          <button type="button" className="btn btn-secondary" onClick={() => { closeModal() }}>Rendben</button>
        </div>
      </div>
    </>
  )
}
