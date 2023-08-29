"use client"

import { useModalContext } from '@/context/modal'
import { useEffect } from 'react'

type IdeaVoteTippProps = {
  content: string
}

export default function IdeaVoteTipp({ content }: IdeaVoteTippProps): JSX.Element {
  const { openModal, setOpenModal, setDataModal } = useModalContext()

  useEffect(() => {
    setDataModal({
      content: 'Az online és offline beérkezett szavazatok összesítését követően kategóriánként a legtöbb szavazatot kapott ötletek valósulhatnak meg a rendelkezésre álló keretösszeg erejéig. Egy ötlet akkor valósulhat meg, ha az arra beérkezett szavazatok száma eléri vagy meghaladja az 500 szavazatot.'
    })
  }, [])

  return (
    <div onClick={() => { setOpenModal(true) }}>
      <p className="subinfo">{content}</p>
    </div>
  )
}
