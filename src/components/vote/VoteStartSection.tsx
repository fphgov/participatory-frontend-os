import React from "react"
import CategoryCard from "@/components/idea/CategoryCard"

type VoteStartSectionProps = {
  title: string
  votedList?: string[]
  isContinue?: boolean
}

export default function VoteStartSection({ title, votedList = [], isContinue = false }: VoteStartSectionProps): JSX.Element {
  const categories = [
    { code: 'LOCAL-SMALL', name: 'Helyi kis ötlet', description: 'Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége nem haladja meg az 50 millió forintot.' },
    { code: 'LOCAL-BIG', name: 'Helyi nagy ötlet', description: 'Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége 51 és 120 millió forint közé esik.' },
    { code: 'CARE', name: 'Esélyteremtő Budapest', description: 'A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel.' },
    { code: 'OPEN', name: 'Nyitott Budapest', description: 'Egy nyitott város a szívügyed? Együttműködések, kísérleti megoldások, digitális fejlesztések, közösségépítő ötletek.' },
    { code: 'GREEN', name: 'Zöld Budapest', description: 'Zöldebb utcák, üdébb parkok, mindenki számára elérhető, környezettudatos megoldások. Budapest reagál a klímaváltozásra.' },
  ]

  return (
    <div className={`vote-start-section${isContinue ? ' vote-continue-section' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <h3>{title}</h3>
          </div>
        </div>

        <div className="row">
          <div className="offset-lg-2 col-lg-8">
            <div className="row">
              {categories.map(category => (
                <div key={category.code} className="col-md-6">
                  <CategoryCard themeName={category.name} href={`/szavazas?theme=${category.code}`} description={category.description} voted={votedList.includes(category.code)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
