"use client"

import { useModalContext } from '@/context/modal'

export default function IdeaRelationTipp(): JSX.Element {
  const { setOpenModal, setDataModal } = useModalContext()

  const content = { full: "Mik ezek a számok? Szükség esetén a beadott ötletek tartalmát kicsit módosítjuk annak érdekében, hogy megvalósítható legyen, illetve a nagyon hasonló ötleteket összevonjuk. Az ötletgazdák szabadon megfogalmazva adják be javaslataikat. Fontos azonban, hogy a szavazók végül rövid, könnyen áttekinthető és érthető ötleteket lássanak. Az azonosító számokra kattintva az eredetileg beadott ötletek találhatóak." }

  function handleOpenModal() {
    setDataModal({
      content: content?.full || ''
    })

    setOpenModal(true)
  }

  return (
    <>
      <div className="subinfo-icon" onClick={() => { handleOpenModal() }} />
    </>
  )
}
