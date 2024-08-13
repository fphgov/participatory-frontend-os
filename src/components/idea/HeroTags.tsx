"use client"

import {ITag} from "@/models/tag.model"
import {useModalHardContext} from "@/context/modalHard"
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"

type HeroTagsProps = {
  tags: ITag[],
  baseUrl: string
  searchParams: Record<string, string>
}

export default function HeroTags({ tags, baseUrl, searchParams }: HeroTagsProps): JSX.Element|null {
  const { setOpenModalHard, setDataModalHard } = useModalHardContext()
  const [ activeTags, setActiveTags ] = useState(searchParams?.tag?.split(',') ?? [])
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

  const filter = (active: boolean, tag: ITag): void => {
    if (active) {
      setActiveTags(activeTags.filter(value => value !== tag.id.toString()))
    } else {
      setActiveTags([...activeTags, tag.id.toString()])
    }
  }

  const cancel = (): void => {
    setLoaded(false)
    setOpenModalHard(false)
  }

  function handleOpenModal() {
    setDataModalHard({
      title: 'Találatok szűrése címke alapján:',
      content: getModalContent(),
      showCancelButton: false
    })

    setLoaded(true)
    setOpenModalHard(true)
  }

  const changeTagFilter = (): void => {
    const tags = activeTags.join(',')

    const urlSearchParams = new URLSearchParams({
      ...searchParams,
      tag: tags
    })

    if (!tags) {
      urlSearchParams.delete('tag')
    }

    setLoaded(false)
    setOpenModalHard(false)

    router.replace(`${baseUrl}?${urlSearchParams.toString()}`)
  }

  const getModalContent = () => {
    return (
      <div className="hero-tags-filter">
        <div className="hero-tags">
          {tags?.map(tag => {
            let active: boolean = false
            if (activeTags.length) {
              {activeTags?.map(activeTag => {
                if (activeTag === tag.id.toString()) {
                  active = true
                }
              })}
            }

            return (
              <div
                key={tag.id}
                onClick={() => filter(active, tag)}
              >
                <div className={`tag${active ? ' tag-active' : ''}`}>
                  <a>{tag.name}</a>
                </div>
              </div>
            )
          })}
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-primary btn-headline"
            onClick={() => changeTagFilter()}
          >
            Szűrés
          </button>

          <button
            type="button"
            className="btn btn-primary-solid btn-solid-underline btn-solid-padding"
            onClick={() => cancel()}
          >
            Mégse
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (loaded) {
      handleOpenModal()
    }
  }, [activeTags, loaded])


  const title = activeTags.length ? <><span>Kiválasztott címkék</span><b>{activeTags.length}</b></> : <div className="btn-filter btn-filter-control">Találatok szűrése</div>

  return (
    <div className="hero-tags" onClick={handleOpenModal}>
      <span onClick={handleOpenModal}>
        {title}
      </span>
    </div>
  )
}
