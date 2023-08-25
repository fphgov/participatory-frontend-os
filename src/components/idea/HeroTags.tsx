import { ITag } from "@/models/tag.model"
import Tag from "@/components/idea/Tag"

type HeroTagsProps = {
  tags: ITag[],
  baseUrl: string
  searchParams: Record<string, string>
}

export default function HeroTags({ tags, baseUrl, searchParams }: HeroTagsProps): JSX.Element|null {
  const getUrl = (tag: string, active: boolean): string => {
    const newSearchParams = { ...searchParams }

    delete newSearchParams['page']

    const params : { [x: string]: string } = { ...newSearchParams, tag }

    if (active) {
      delete params['tag']
    }

    const urlSearchParams = new URLSearchParams(params)

    return baseUrl + '?' + urlSearchParams.toString()
  }

  return (
    <div className="hero-tags">
      <span>Címkék:</span>

      {tags?.map(tag => {
        const active = searchParams?.tag?.toString() === tag.id.toString()

        return (
          <Tag
            key={tag.id}
            tag={tag}
            href={getUrl(tag.id.toString(), active)}
            active={active}
          />
        )
      })}
    </div>
  )
}
