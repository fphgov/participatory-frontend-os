import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight } from "@fortawesome/free-solid-svg-icons"

export default function Pagination({ links, onChange, size }) {
  const pageRegex = new RegExp("page=(\\d+)")

  const paginationShow = size > 1
  const selfPageNum = (links && links.self && pageRegex.test(links.self.href)) ? links.self.href.match(pageRegex)[1] - 0 : false
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? links.prev.href.match(pageRegex)[1] - 0 : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? links.next.href.match(pageRegex)[1] - 0 : false
  const firstPageNum = (links && links.first && pageRegex.test(links.first.href)) ? links.first.href.match(pageRegex)[1] - 0 : false
  const lastPageNum = (links && links.last && pageRegex.test(links.last.href)) ? links.last.href.match(pageRegex)[1] - 0 : false

  const renderPages = (cPage) => {
    if (cPage === selfPageNum || size < cPage || cPage < 1) {
      return null
    }

    return (
      <li>
        <button onClick={() => { onChange(cPage) }} aria-label={`${cPage} oldal`} title={`${cPage} oldal`}>
          {cPage}
        </button>
      </li>
    )
  }

  return (
    <>
      {paginationShow && (
        <nav role="navigation" aria-label="Lapozási navigáció" className="pagination">
          <ul>
            {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
              <li>
                <button onClick={() => { onChange(firstPageNum) }} aria-label="Első oldal" title="Első oldal">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} aria-hidden="true" />
                </button>
              </li>
            )}

            {prevPageNum && (firstPageNum !== prevPageNum) && (
              <li>
                <button onClick={() => { onChange(prevPageNum) }} aria-label={`Előző oldal ${prevPageNum}`} title={`Előző oldal ${prevPageNum}`}>
                  <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
                </button>
              </li>
            )}

            {(firstPageNum && prevPageNum) && (
              <>
                {renderPages(selfPageNum - 3)}
                {renderPages(selfPageNum - 2)}
                {renderPages(selfPageNum - 1)}
              </>
            )}

            {selfPageNum && (
              <li><button aria-label={`Aktuális oldal ${selfPageNum}`} title={`Aktuális oldal ${selfPageNum}`} className="active" aria-current="true">{selfPageNum}</button></li>
            )}

            {(lastPageNum && nextPageNum) && (
              <>
                {renderPages(selfPageNum + 1)}
                {renderPages(selfPageNum + 2)}
                {renderPages(selfPageNum + 3)}
              </>
            )}

            {nextPageNum && (lastPageNum !== nextPageNum) && (
              <li>
                <button onClick={() => { onChange(nextPageNum) }} aria-label={`Következő oldal ${nextPageNum}`} title={`Következő oldal ${nextPageNum}`}>
                  <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                </button>
              </li>
            )}

            {(lastPageNum && nextPageNum) && (lastPageNum !== nextPageNum) && (
              <li>
                <button onClick={() => { onChange(lastPageNum) }} aria-label="Utolsó oldal" title="Utolsó oldal">
                  <FontAwesomeIcon icon={faAngleDoubleRight} aria-hidden="true" />
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
