import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

export default function Pagination({ links, onChange, size }) {
  const pageRegex = new RegExp("page=(\\d+)")

  const paginationShow = size > 1
  const selfPageNum = (links && links.self && pageRegex.test(links.self.href)) ? links.self.href.match(pageRegex)[1] : false
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? links.prev.href.match(pageRegex)[1] : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? links.next.href.match(pageRegex)[1] : false
  const firstPageNum = (links && links.first && pageRegex.test(links.first.href)) ? links.first.href.match(pageRegex)[1] : false
  const lastPageNum = (links && links.last && pageRegex.test(links.last.href)) ? links.last.href.match(pageRegex)[1] : false

  return (
    <>
      {paginationShow && (
        <nav role="navigation" aria-label="Lapozási navigáció" className="pagination">
          <ul>
            {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
              <li><button onClick={() => { onChange(firstPageNum) }} aria-label="Első oldal" title="Első oldal"><FontAwesomeIcon icon={faAngleDoubleLeft} aria-hidden="true" /></button></li>
            )}

            {prevPageNum && (
              <li><button onClick={() => { onChange(prevPageNum) }} aria-label={`Előző oldal ${prevPageNum}`} title={`Előző oldal ${prevPageNum}`}>{prevPageNum}</button></li>
            )}

            {selfPageNum && (
              <li><button aria-label={`Aktuális oldal ${selfPageNum}`} title={`Aktuális oldal ${selfPageNum}`} className="active" aria-current="true">{selfPageNum}</button></li>
            )}

            {nextPageNum && (
              <li><button onClick={() => { onChange(nextPageNum) }} aria-label={`Következő oldal ${nextPageNum}`} title={`Következő oldal ${nextPageNum}`}>{nextPageNum}</button></li>
            )}

            {(lastPageNum && nextPageNum) && (lastPageNum !== nextPageNum) && (
              <li><button onClick={() => { onChange(lastPageNum) }} aria-label="Utolsó oldal" title="Utolsó oldal"><FontAwesomeIcon icon={faAngleDoubleRight} aria-hidden="true" /></button></li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
