import React, { createRef, useState, useEffect } from 'react'

export default function DragAndDrop({ children, onHandleDrop }) {
  const dropRef = createRef()
  const [ drag, setDrag ] = useState(false)
  const [ dragCounter, setDragCounter ] = useState(0)

  const handleDrag = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    e.dataTransfer.dropEffect = "move"
  })

  const handleDragIn = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter + 1)

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDrag(true)
    }

    return false;
  })

  const handleDragOut = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    setDragCounter(dragCounter - 1)

    if (dragCounter === 0) {
      setDrag(false)
    }

    return false;
  })

  const handleDrop = React.useCallback((e) => {
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

    return false;
  })

  const clear = React.useCallback((e) => {
    if (e.dataTransfer.items) {
      e.dataTransfer.items.clear()
    }

    if (e.dataTransfer) {
      e.dataTransfer.clearData()
    }

    return false;
  })

  useEffect(() => {
    const element = dropRef.current;

    element.addEventListener('dragenter', handleDragIn)
    element.addEventListener('dragleave', handleDragOut)
    element.addEventListener('dragover', handleDrag)
    element.addEventListener('drop', handleDrop)

    return () => {
      element.removeEventListener('dragenter', handleDragIn)
      element.removeEventListener('dragleave', handleDragOut)
      element.removeEventListener('dragover', handleDrag)
      element.removeEventListener('drop', handleDrop)
    }
  }, [])

  return (
    <div className={`drag-area ${drag ? 'drag-active': ''}`} ref={dropRef}>
      {children}
    </div>
  )
}
