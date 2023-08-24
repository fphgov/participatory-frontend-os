import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { ListLinks } from "@/lib/types"
import Link from "next/link"

type PaginationProps = {
  baseUrl: string
  links: ListLinks
  size: number
  searchParams: Record<string, string>
}

export default function Pagination({ baseUrl, links, size, searchParams }: PaginationProps): JSX.Element|null {
  const pageRegex = new RegExp("page=(\\d+)")

  const paginationShow = size > 1
  const selfPageNum: number = (links && links.self && pageRegex.test(links.self.href)) ? parseInt(links.self.href.match(pageRegex)?.[1] || '') : 1
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? parseInt(links.prev.href.match(pageRegex)?.[1] || '') : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? parseInt(links.next.href.match(pageRegex)?.[1] || '') : false
  const firstPageNum = (links && links.first && pageRegex.test(links.first.href)) ? parseInt(links.first.href.match(pageRegex)?.[1] || '') : false
  const lastPageNum = (links && links.last && pageRegex.test(links.last.href)) ? parseInt(links.last.href.match(pageRegex)?.[1] || '') : false

  const renderPages = (cPage: number) => {
    if (cPage === selfPageNum || size < cPage || cPage < 1) {
      return null
    }

    return (
      <li>
        <Link href={getUrl(cPage)} aria-label={`${cPage} oldal`} title={`${cPage} oldal`}>
          {cPage}
        </Link>
      </li>
    )
  }

  const getUrl = (pageNumber: string|number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('page', pageNumber.toString())

    return baseUrl + '?' + newSearchParams
  }

  return (
    <>
      {paginationShow && (
        <nav role="navigation" aria-label="Lapozási navigáció" className="pagination">
          <ul>
            {(firstPageNum && prevPageNum) && (firstPageNum !== prevPageNum) && (
              <li>
                <Link href={getUrl(firstPageNum)} aria-label="Első oldal" title="Első oldal">
                  <FontAwesomeIcon icon={faAngleDoubleLeft} aria-hidden="true" />
                </Link>
              </li>
            )}

            {prevPageNum && (firstPageNum !== prevPageNum) && (
              <li>
                <Link href={getUrl(prevPageNum)} aria-label={`Előző oldal ${prevPageNum}`} title={`Előző oldal ${prevPageNum}`}>
                  <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
                </Link>
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
              <li>
                <button aria-label={`Aktuális oldal ${selfPageNum}`} title={`Aktuális oldal ${selfPageNum}`} className="active" aria-current="true">
                  {selfPageNum}
                </button>
              </li>
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
                <Link href={getUrl(nextPageNum)} aria-label={`Következő oldal ${nextPageNum}`} title={`Következő oldal ${nextPageNum}`}>
                  <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                </Link>
              </li>
            )}

            {(lastPageNum && nextPageNum) && (lastPageNum !== nextPageNum) && (
              <li>
                <Link href={getUrl(lastPageNum)} aria-label="Utolsó oldal" title="Utolsó oldal">
                  <FontAwesomeIcon icon={faAngleDoubleRight} aria-hidden="true" />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  )
}
