import HeroPage from '@/components/common/HeroPage'
import CategoryCard from '@/components/idea/CategoryCard'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Szavazás indítása',
  }
}

export default async function VoteStartPage() {
  return (
    <main className="page page-vote-start">
      <div className="page-vote-start-section">
        <HeroPage title="Szavazás" content="Itt találod azokat az ötleteket, amikre szavazhatsz. Öt kategória van, minden kategóriában egy szavazatot adhatsz le." />

        <div className="vote-start-section">
          <div className="container">
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <h3>Válassz egy kategóriát és szavazz a kedvenc ötletedre!</h3>
              </div>
            </div>

            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <div className="row">
                  <div className="col-md-6">
                    <CategoryCard themeName="Helyi kis ötlet" href="/szavazas?theme=LOCAL-SMALL" description="Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége nem haladja meg az 50 millió forintot." />
                  </div>

                  <div className="col-md-6">
                    <CategoryCard themeName="Helyi nagy ötlet" href="/szavazas?theme=LOCAL-BIG" description="Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége 51 és 120 millió forint közé esik." />
                  </div>

                  <div className="col-md-6">
                    <CategoryCard themeName="Esélyteremtő Budapest" href="/szavazas?theme=CARE" description="A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel." />
                  </div>

                  <div className="col-md-6">
                    <CategoryCard themeName="Nyitott Budapest" href="/szavazas?theme=OPEN" description="Egy nyitott város a szívügyed? Együttműködések, kísérleti megoldások, digitális fejlesztések, közösségépítő ötletek." />
                  </div>

                  <div className="col-md-6">
                    <CategoryCard themeName="Zöld Budapest" href="/szavazas?theme=GREEN" description="Zöldebb utcák, üdébb parkok, mindenki számára elérhető, környezettudatos megoldások. Budapest reagál a klímaváltozásra." />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
