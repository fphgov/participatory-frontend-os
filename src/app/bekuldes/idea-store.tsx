'use client'

import { createContext, useContext, useState } from "react"

type IdeaContextProviderProps = {
  children: React.ReactNode
}

export type IdeaContextContent = {
  ideaFormContextData: Record<string, any>
  setIdeaFormContextData: (ideaFormContextData: Record<string, any>) => void
}

const IdeaContext = createContext<IdeaContextContent>({} as IdeaContextContent)

export const IdeaContextProvider = ({ children }: IdeaContextProviderProps) => {
  const [ideaFormContextData, setIdeaFormContextData] = useState<Record<string, any>>({
    'location': '',
    'locationDescription': '',
    'locationDistrict': '',
    'cost': false,
    'title': '',
    'description': '',
    'solution': '',
    'phone':  { iso2: 'hu', dialCode: '36', phone: '' },
    'rule_1': false,
    'rule_2': false,
    'rule_3': false,
    'medias': [],
  })

  return (
    <IdeaContext.Provider value={{ ideaFormContextData, setIdeaFormContextData }}>
      {children}
    </IdeaContext.Provider>
  )
}

export const useIdeaContext = () => useContext(IdeaContext)
