'use client'

import { createContext, useContext, useState } from "react"

type IdeaContextProviderProps = {
  children: React.ReactNode
}

export type IdeaContextContent = {
  ideaFormContextData: Record<string, any>
  updateIdeaFormContextData: (newData: Record<string, any>) => void
}

const IdeaContext = createContext<IdeaContextContent>({} as IdeaContextContent)

export const IdeaContextProvider = ({ children }: IdeaContextProviderProps) => {
  const [ideaFormContextData, setIdeaFormContextData] = useState<Record<string, any>>({
    'fullName': '',
    'birthYear': '',
    'postalCode': '',
    'location': '',
    'locationDescription': '',
    'locationDistricts': [],
    'cost': false,
    'title': '',
    'description': '',
    'solution': '',
    'phone': '',
    'rule_1': false,
    'rule_2': false,
    'rule_3': false,
    'rule_4': false,
    'medias': [],
  })

  const updateIdeaFormContextData = (newData: Record<string, any>): void => {
    setIdeaFormContextData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <IdeaContext.Provider value={{ ideaFormContextData, updateIdeaFormContextData }}>
      {children}
    </IdeaContext.Provider>
  )
}

export const useIdeaContext = () => useContext(IdeaContext)
