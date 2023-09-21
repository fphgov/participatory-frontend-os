"use client"

import { useModalContext } from '@/context/modal'
import { ICampaignTheme } from '@/models/campaignTheme.model'

type IdeaVoteTippProps = {
  theme: ICampaignTheme|undefined
}

export default function IdeaVoteTipp({ theme }: IdeaVoteTippProps): JSX.Element {
  const { setOpenModal, setDataModal } = useModalContext()

  const contents = [
    { code: 'LOCAL-SMALL', tipp: "Az ötlet megvalósítása 500 szavazat felett lehetséges.", full: "Az online és offline beérkezett szavazatok összesítését követően kategóriánként a legtöbb szavazatot kapott ötletek valósulhatnak meg a rendelkezésre álló keretösszeg erejéig. Egy ötlet akkor valósulhat meg, ha az arra beérkezett szavazatok száma eléri vagy meghaladja az 500 szavazatot." },
    { code: 'LOCAL-BIG', tipp: "Az ötlet megvalósítása 1000 szavazat felett lehetséges.", full: "Az online és offline beérkezett szavazatok összesítését követően kategóriánként a legtöbb szavazatot kapott ötletek valósulhatnak meg a rendelkezésre álló keretösszeg erejéig. Egy ötlet akkor valósulhat meg, ha az arra beérkezett szavazatok száma eléri vagy meghaladja az 1000 szavazatot." },
  ]

  const content = contents.find(c => c.code === theme?.code) || contents[1]

  function handleOpenModal() {
    setDataModal({
      content: content?.full || ''
    })

    setOpenModal(true)
  }

  return (
    <div className="subinfo-wrapper">
      <p className="subinfo">
        {content?.tipp}
      </p>
      <div className="subinfo-icon" onClick={() => { handleOpenModal() }} />
    </div>
  )
}
