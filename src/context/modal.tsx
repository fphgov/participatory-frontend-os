'use client'

import { createContext, useContext, useState } from "react"

const ModalContext = createContext({})

type ModalContextProviderProps = {
  children: React.ReactNode
}

type ModalData = {
  content: string
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<ModalData>({
    content: ''
  })

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal, dataModal, setDataModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
