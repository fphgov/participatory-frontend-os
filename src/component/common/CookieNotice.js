import React from "react"
import loadG from './loadG.js'
import docCookies from '../lib/docCookies.js'

export default function CookieNotice() {
  const cookieName = 'cookie-notice'
  const [ accepted, setAccepted ] = React.useState(false)
  const [ open, setOpen ] = React.useState(true)

  React.useEffect(() => {
    const cookieValue = docCookies.getItem(cookieName)

    if (cookieValue) {
      setOpen(false)
      setAccepted(cookieValue == "true")

      if (accepted) {
        loadTags()
      }
    }
  }, [])

  function loadTags() {
    if (!window.dataLayer) {
      loadG(() => {
        window.dataLayer = window.dataLayer || [];

        function gtag() { dataLayer.push(arguments); }

        gtag('js', new Date());
        gtag('config', process.env.GA_ID);

        setOpen(false)
      })
    }
  }

  function handlerAccept(e) {
    e.preventDefault()

    setAccepted(true)
    docCookies.setItem(cookieName, true)

    if (accepted) {
      loadTags()
    }
  }

  function handlerRefuse(e) {
    e.preventDefault()

    setOpen(false)
    docCookies.setItem(cookieName, false)
  }

  return (
    <div className="cookie-notice cookie-notice-visible" style={{ display: open ? 'block' : 'none' }}>
      <div className="cookie-notice-container">
        <div className="cookie-notice-text">Kedves Látogató! Tájékoztatjuk, hogy a honlap felhasználói élmény fokozásának érdekében sütiket alkalmazunk. A honlapunk használatával ön a tájékoztatásunkat tudomásul veszi.</div>
        <div className="cookie-notice-buttons">
          <a className="cookie-notice-accept" onClick={handlerAccept}>Elfogadom</a>
          <a className="cookie-notice-refuse" onClick={handlerRefuse}>Elutasítom</a>

          <a href="https://budapest.hu/Lapok/2018/adatkezelesi-tajekoztato.aspx" target="_blank" rel="noopener" className="cookie-notice-info">Adatvédelmi</a>
        </div>
      </div>
    </div>
  )
}
