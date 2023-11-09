'use client'

import { createContext, useContext, useState } from "react"

type IdeaContextProviderProps = {
  children: React.ReactNode
}

interface IData {
  [key: string]: any;
}

export type IdeaContextContent = {
  ideaFormContextData: Record<string, any>
  setIdeaFormContextData: (ideaFormContextData: Record<string, any>) => void
}

const IdeaContext = createContext<IdeaContextContent>({} as IdeaContextContent)

export const IdeaContextProvider = ({ children }: IdeaContextProviderProps) => {
  const [ideaFormContextData, setIdeaFormContextData] = useState<Record<string, any>>({})

  return (
    <IdeaContext.Provider value={{ ideaFormContextData, setIdeaFormContextData }}>
      {children}
    </IdeaContext.Provider>
  )
}

export const useIdeaContext = () => useContext(IdeaContext)
