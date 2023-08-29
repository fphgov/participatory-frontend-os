"use client"

import { useModalContext } from '@/context/modal'
import React from 'react';
import { useEffect } from 'react'

const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default function Modal(): JSX.Element {
  const { openModal, setOpenModal, dataModal } = useModalContext()

  const closeModal = () => {
    setOpenModal(false)
  }

  const ref = useOutsideClick(closeModal);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [openModal])

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
