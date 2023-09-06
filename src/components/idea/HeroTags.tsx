"use client"

import { ITag } from "@/models/tag.model"
import Tag from "@/components/idea/Tag"
import { addUniqParam } from "@/utilities/urlParams"

type HeroTagsProps = {
  tags: ITag[],
  baseUrl: string
  searchParams: Record<string, string>
}

export default function HeroTags({ tags, baseUrl, searchParams }: HeroTagsProps): JSX.Element|null {
  const changeTagFilter = (tag: string): void => {
    const newSearchParams = { ...searchParams }

    delete newSearchParams['page']

    const urlSearchParams = new URLSearchParams({
      ...newSearchParams,
      tag: addUniqParam(searchParams, 'tag', tag)
    })

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
  }

  return (
    <div className="hero-tags">
      <span>Címkék:</span>

      {tags?.map(tag => {
        const active = searchParams?.tag?.split(',')?.includes(tag.id.toString())

        return (
          <div key={tag.id} onClick={() => { changeTagFilter(tag.id.toString()) }}>
            <Tag tag={tag} active={active} />
          </div>
        )
      })}
    </div>
  )
}
