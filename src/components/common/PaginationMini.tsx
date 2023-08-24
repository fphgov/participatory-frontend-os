import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { ListLinks } from "@/lib/types"
import Link from "next/link"

type PaginationMiniProps = {
  baseUrl: string
  links: ListLinks
  size: number
  pageSize: number
  totalItems: number
  searchParams: Record<string, string>
}

export default function PaginationMini({ baseUrl, links, size, pageSize, totalItems, searchParams }: PaginationMiniProps): JSX.Element|null {
  const pageRegex = new RegExp("page=(\\d+)")

  const paginationShow = size > 1
  const selfPageNum: number = (links && links.self && pageRegex.test(links.self.href)) ? links.self.href.match(pageRegex)[1] - 0 : 1
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? links.prev.href.match(pageRegex)[1] - 0 : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? links.next.href.match(pageRegex)[1] - 0 : false

  let length = 0

  if (totalItems % pageSize === 0) {
    length = pageSize
  } else if (totalItems / pageSize < 1) {
    length = totalItems
  } else if (totalItems - (selfPageNum - 1) * pageSize < pageSize) {
    length = totalItems % pageSize
  } else {
    length = pageSize
  }

  const from = totalItems ? (selfPageNum - 1) * pageSize + 1 : 0
  const to = totalItems ? from + length - 1 : 0

  const getUrl = (pageNumber: string|number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('page', pageNumber.toString())

    return baseUrl + '?' + newSearchParams
  }

  return (
    <div className="pagination-mini-wrapper">
      {paginationShow ? (
        <>
          <span>{from}-{to}, összesen: {totalItems}</span>
          <nav role="navigation" aria-label="Lapozási navigáció" className="pagination pagination-mini">
            <ul>
              <li>
                {prevPageNum && (prevPageNum) ? (
                  <Link href={getUrl(prevPageNum)} aria-label={`Előző oldal ${prevPageNum}`} title={`Előző oldal ${prevPageNum}`}>
                    <FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" />
                  </Link>
                ) : <button><FontAwesomeIcon icon={faAngleLeft} aria-hidden="true" /></button>}
              </li>

              <li>
                {nextPageNum && (nextPageNum) ? (
                  <Link href={getUrl(nextPageNum)} aria-label={`Következő oldal ${nextPageNum}`} title={`Következő oldal ${nextPageNum}`}>
                    <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                  </Link>
                ) : <button><FontAwesomeIcon icon={faAngleRight} aria-hidden="true" /></button>}
              </li>
            </ul>
          </nav>
        </>
      ): null}
    </div>
  )
}
