import Link from "next/link"
import { ITag } from "@/models/tag.model"

type TagProps = {
  tag: ITag
  href?: string
  active?: boolean
}

export default function Tag({ tag, href = undefined, active = false }: TagProps): JSX.Element|null {
  return (
    <div className={`tag${active? ' tag-active' : ''}`}>
      {href ? <Link href={href}>{tag.name}</Link> : <a>{tag.name}</a>}
    </div>
  )
}
