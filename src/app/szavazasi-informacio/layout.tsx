import HeroPage from "@/components/common/HeroPage"
import Details from '@/components/common/Details'
import CategoryIcon from '@/components/idea/CategoryIcon'
import VoteInfoSection from "@/components/home/VoteInfoSection"
import Link from "next/link"
import NewsletterArea from "@/components/home/NesletterArea"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="page page-idea-info">
        <div className="page-profile-single-section">

          <HeroPage title="Hogyan tudsz szavazatot leadni?">
            <VoteInfoSection />

            <Link href="/szavazas-inditasa" className="btn btn-primary btn-headline btn-next">Tovább a szavazásra</Link>
          </HeroPage>

          {children}

          <div id="tematikus-kategoriak" className="light-section">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h2>Tematikus kategóriák</h2>
                  <p>Ebben az öt kategóriában tudsz szavazni.</p>

                  <Link href="/szavazas-inditasa" className="btn btn-primary btn-headline btn-next">Tovább a szavazásra</Link>
                </div>

                <div className="col-md-8">
                  <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Helyi - kis ötlet" />Helyi kis ötletek</div>} startOpen={true}>
                    <p>Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége nem haladja meg az 50 millió forintot.</p>
                  </Details>

                  <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Helyi - nagy ötlet" />Helyi nagy ötletek</div>}>
                    <p>Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége 51 és 120 millió forint közé esik.</p>
                  </Details>

                  <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Zöld Budapest" />Zöld Budapest</div>}>
                    <p>Zöldebb utcák, üdébb parkok, mindenki számára elérhető, környezettudatos megoldások. Budapest reagál a klímaváltozásra.</p>
                  </Details>

                  <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Esélyteremtő Budapest" />Esélyteremtő Budapest</div>}>
                    <p>A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel.</p>
                  </Details>

                  <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Nyitott Budapest" />Nyitott Budapest</div>}>
                    <p>Egy nyitott város a szívügyed? Együttműködések, kísérleti megoldások, digitális fejlesztések, közösségépítő ötletek.</p>
                  </Details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewsletterArea />
    </>
  )
}
