import Link from "next/link"
import { ITag } from "@/models/tag.model"

type TagProps = {
  tag: ITag,
  href: string,
  active?: boolean
}

export default function Tag({ tag, href, active = false }: TagProps): JSX.Element|null {
  return (
    <div className={`tag ${active? 'tag-active' : null}`}>
      <Link href={href}>{tag.name}</Link>
    </div>
  )
}
