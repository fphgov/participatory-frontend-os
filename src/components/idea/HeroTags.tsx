"use client"

import {ITag} from "@/models/tag.model"
import {addUniqParam} from "@/utilities/urlParams"
import {useModalHardContext} from "@/context/modalHard";
import {useEffect, useState} from "react";

type HeroTagsProps = {
  tags: ITag[],
  baseUrl: string
  searchParams: Record<string, string>
}

export default function HeroTags({ tags, baseUrl, searchParams }: HeroTagsProps): JSX.Element|null {
  const { setOpenModalHard, setDataModalHard } = useModalHardContext()
  const [ activeTags, setActiveTags ] = useState(searchParams?.tag?.split(',') ?? [])
  const [loaded, setLoaded] = useState(false)

  const filter = (active: boolean, tag: ITag): void => {
    if (active) {
      setActiveTags(activeTags.filter(value => value !== tag.id.toString()));
    } else {
      setActiveTags([...activeTags, tag.id.toString()])
    }

    console.log(activeTags.join(','))
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

    window.location.href = baseUrl + '?' + urlSearchParams.toString()
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
                  active = true;
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
  };

  useEffect(() => {
      if (loaded) {
        handleOpenModal()
      }
  }, [activeTags, loaded])

  let title = (
    <>
      <span>Találatok szűrése</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V16C11 15.7167 11.0958 15.4792 11.2875 15.2875C11.4792 15.0958 11.7167 15 12 15C12.2833 15 12.5208 15.0958 12.7125 15.2875C12.9042 15.4792 13 15.7167 13 16V17H20C20.2833 17 20.5208 17.0958 20.7125 17.2875C20.9042 17.4792 21 17.7167 21 18C21 18.2833 20.9042 18.5208 20.7125 18.7125C20.5208 18.9042 20.2833 19 20 19H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21ZM4 19C3.71667 19 3.47917 18.9042 3.2875 18.7125C3.09583 18.5208 3 18.2833 3 18C3 17.7167 3.09583 17.4792 3.2875 17.2875C3.47917 17.0958 3.71667 17 4 17H8C8.28333 17 8.52083 17.0958 8.7125 17.2875C8.90417 17.4792 9 17.7167 9 18C9 18.2833 8.90417 18.5208 8.7125 18.7125C8.52083 18.9042 8.28333 19 8 19H4ZM8 15C7.71667 15 7.47917 14.9042 7.2875 14.7125C7.09583 14.5208 7 14.2833 7 14V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H7V10C7 9.71667 7.09583 9.47917 7.2875 9.2875C7.47917 9.09583 7.71667 9 8 9C8.28333 9 8.52083 9.09583 8.7125 9.2875C8.90417 9.47917 9 9.71667 9 10V14C9 14.2833 8.90417 14.5208 8.7125 14.7125C8.52083 14.9042 8.28333 15 8 15ZM12 13C11.7167 13 11.4792 12.9042 11.2875 12.7125C11.0958 12.5208 11 12.2833 11 12C11 11.7167 11.0958 11.4792 11.2875 11.2875C11.4792 11.0958 11.7167 11 12 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H12ZM16 9C15.7167 9 15.4792 8.90417 15.2875 8.7125C15.0958 8.52083 15 8.28333 15 8V4C15 3.71667 15.0958 3.47917 15.2875 3.2875C15.4792 3.09583 15.7167 3 16 3C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4V5H20C20.2833 5 20.5208 5.09583 20.7125 5.2875C20.9042 5.47917 21 5.71667 21 6C21 6.28333 20.9042 6.52083 20.7125 6.7125C20.5208 6.90417 20.2833 7 20 7H17V8C17 8.28333 16.9042 8.52083 16.7125 8.7125C16.5208 8.90417 16.2833 9 16 9ZM4 7C3.71667 7 3.47917 6.90417 3.2875 6.7125C3.09583 6.52083 3 6.28333 3 6C3 5.71667 3.09583 5.47917 3.2875 5.2875C3.47917 5.09583 3.71667 5 4 5H12C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6C13 6.28333 12.9042 6.52083 12.7125 6.7125C12.5208 6.90417 12.2833 7 12 7H4Z" fill="#12326E"/>
      </svg>
    </>
  )
  if (activeTags.length) {
    title = (
      <>
        <span>Kiválasztott címkék</span>
         <b>{activeTags.length}</b>
      </>
    )
  }

  return (
    <div className="hero-tags">
      <span onClick={handleOpenModal}>
        {title}
      </span>
    </div>
  )
}
