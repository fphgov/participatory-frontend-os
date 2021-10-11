import React, { createRef, useState, useEffect } from 'react'

export default function DragAndDrop({ children, onHandleDrop }) {
  const dropRef = createRef()
  const [ drag, setDrag ] = useState(false)
  const [ dragCounter, setDragCounter ] = useState(0)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = "move"
  }

  const handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter + 1)

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }
  }

  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter - 1)

    if (dragCounter === 0) {
      setDrag(false)
    }
  }

  const handleDrop = (e) => {
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

  const clear = (e) => {
    // console.log("törlés", e.dataTransfer.items)

    if (e.dataTransfer.items) {
      e.dataTransfer.items.clear()
    }

    if (e.dataTransfer) {
      e.dataTransfer.clearData()
    }
  }

  useEffect(() => {
    dropRef.current.addEventListener('dragenter', handleDragIn)
    dropRef.current.addEventListener('dragleave', handleDragOut)
    dropRef.current.addEventListener('dragover', handleDrag)
    dropRef.current.addEventListener('drop', handleDrop)

    return () => {
      if (dropRef.current) {
        dropRef.current.removeEventListener('dragenter', handleDragIn)
        dropRef.current.removeEventListener('dragleave', handleDragOut)
        dropRef.current.removeEventListener('dragover', handleDrag)
        dropRef.current.removeEventListener('drop', handleDrop)
      }
    }
  }, [])

  return (
    <div className={`drag-area ${drag ? 'drag-active': ''}`} ref={dropRef}>
      {children}
    </div>
  )
}
