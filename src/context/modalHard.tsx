'use client'

import React, { createContext, useContext, useState } from "react"

type ModalHardContextProviderProps = {
  children: React.ReactNode
}

type IDataModalHard = {
  title: string
  content: string | React.ReactNode
  showCancelButton: boolean
}

export type ModalHardContextContent = {
  openModalHard: boolean
  setOpenModalHard: (openModalHard: boolean) => void
  dataModalHard: IDataModalHard
  setDataModalHard: (dataModalHard: IDataModalHard) => void
  scrollModalHard: boolean
  setScrollModalHard: (scrollModalHard: boolean) => void
}

const ModalHardContext = createContext<ModalHardContextContent>({} as ModalHardContextContent)

export const ModalHardContextProvider = ({ children }: ModalHardContextProviderProps) => {
  const [openModalHard, setOpenModalHard] = useState<boolean>(false)
  const [dataModalHard, setDataModalHard] = useState<IDataModalHard>({
    title: '',
    content: '',
    showCancelButton: true
  })
  const [scrollModalHard, setScrollModalHard] = useState<boolean>(false)

  return (
    <ModalHardContext.Provider value={{ openModalHard, setOpenModalHard, dataModalHard, setDataModalHard, scrollModalHard, setScrollModalHard }}>
      {children}
    </ModalHardContext.Provider>
  )
}

export const useModalHardContext = () => useContext(ModalHardContext)
