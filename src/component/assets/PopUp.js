import React from 'react'

const PopUp = function ({ url, title, children }) {
  const open = () => {
    window.open(url, "pop", "width=600, height=400, scrollbars=no")
  }

  return (
    <a onClick={open} title={title}>
      {children}
    </a>
  )
}

export default PopUp
