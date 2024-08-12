import { ListLinks } from "@/lib/types"
import Link from "next/link"

type PaginationMiniProps = {
  baseUrl: string
  links: ListLinks
  pageSize: number
  totalItems: number
  searchParams: Record<string, string>
}

export default function PaginationMini({ baseUrl, links, pageSize, totalItems, searchParams }: PaginationMiniProps): JSX.Element|null {
  const pageRegex = new RegExp("page=(\\d+)")

  const selfPageNum: number = (links && links.self && pageRegex.test(links.self.href)) ? parseInt(links.self.href.match(pageRegex)?.[1] || '') : 1
  const prevPageNum = (links && links.prev && pageRegex.test(links.prev.href)) ? parseInt(links.prev.href.match(pageRegex)?.[1] || '') : false
  const nextPageNum = (links && links.next && pageRegex.test(links.next.href)) ? parseInt(links.next.href.match(pageRegex)?.[1] || '') : false

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
      <>
        <div className="pagination-mini-label">{from}-{to} <span>elem</span>, összesen: {totalItems}</div>

        <nav role="navigation" aria-label="Lapozási navigáció" className="pagination pagination-mini">
          <ul>
            <li>
              {prevPageNum && (prevPageNum) ? (
                <Link href={getUrl(prevPageNum)} aria-label={`Előző oldal ${prevPageNum}`} title={`Előző oldal ${prevPageNum}`} prefetch={false}>
                  <div className="icon-arrow icon-arrow-left active" aria-hidden="true"></div>
                </Link>
              ) : <button><div className="icon-arrow icon-arrow-left" aria-hidden="true"></div></button>}
            </li>

            <li>
              {nextPageNum && (nextPageNum) ? (
                <Link href={getUrl(nextPageNum)} aria-label={`Következő oldal ${nextPageNum}`} title={`Következő oldal ${nextPageNum}`} prefetch={false}>
                  <div className="icon-arrow icon-arrow-right active" aria-hidden="true"></div>
                </Link>
              ) : <button><div className="icon-arrow icon-arrow-right" aria-hidden="true"></div></button>}
            </li>
          </ul>
        </nav>
      </>
    </div>
  )
}
