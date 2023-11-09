'use client'

import React, { createRef, useState, useEffect, RefObject } from 'react'

type DragAndDropaProps = {
  children: React.ReactNode
  onHandleDrop: (files: FileList) => void
  onChangeDrag: (drag: boolean | ((prevState: boolean) => boolean)) => void
  onOverlayClick: () => void
}

export default function DragAndDrop({ children, onHandleDrop, onChangeDrag, onOverlayClick }: DragAndDropaProps) {
  const dropRef = createRef<HTMLDivElement>()
  const [ drag, setDrag ] = useState(false)
  const [ dragCounter, setDragCounter ] = useState(0)

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = "move"
  }

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter + 1)

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }
  }

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter - 1)

    if (dragCounter === 0) {
      setDrag(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    setDrag(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (typeof onHandleDrop === 'function') {
        onHandleDrop(e.dataTransfer.files)
      }
    }

    clear(e)
    setDragCounter(0)
  }

  const clear = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items) {
      e.dataTransfer.items.clear()
    }

    if (e.dataTransfer) {
      e.dataTransfer.clearData()
    }
  }

  useEffect(() => {
    onChangeDrag(drag)
  }, [drag])

  useEffect(() => {
    if (dropRef.current) {
      dropRef.current.addEventListener('dragenter', handleDragIn as unknown as EventListener)
      dropRef.current.addEventListener('dragleave', handleDragOut as unknown as EventListener)
      dropRef.current.addEventListener('dragover', handleDrag as unknown as EventListener)
      dropRef.current.addEventListener('drop', handleDrop as unknown as EventListener)
    }

    return () => {
      if (dropRef.current) {
        dropRef.current.removeEventListener('dragenter', handleDragIn as unknown as EventListener)
        dropRef.current.removeEventListener('dragleave', handleDragOut as unknown as EventListener)
        dropRef.current.removeEventListener('dragover', handleDrag as unknown as EventListener)
        dropRef.current.removeEventListener('drop', handleDrop as unknown as EventListener)
      }
    }
  }, [])

  return (
    <div className={`drag-area ${drag ? 'drag-active': ''}`} ref={dropRef}>
      <div className="drag-area-overlay" onClick={() => { onOverlayClick() }}></div>
      {children}
    </div>
  )
}
