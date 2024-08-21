'use client'

import { createContext, useContext, useState } from "react"

type ModalContextProviderProps = {
  children: React.ReactNode
}

type IDataModal = {
  content: string
}

export type ModalContextContent = {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void
  dataModal: IDataModal
  setDataModal: (dataModal: IDataModal) => void
  scrollModalHard: boolean
  setScrollModalHard: (scrollModalHard: boolean) => void
}

const ModalContext = createContext<ModalContextContent>({} as ModalContextContent)

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<IDataModal>({
    content: ''
  })
  const [scrollModalHard, setScrollModalHard] = useState<boolean>(false)

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, dataModal, setDataModal, scrollModalHard, setScrollModalHard }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
