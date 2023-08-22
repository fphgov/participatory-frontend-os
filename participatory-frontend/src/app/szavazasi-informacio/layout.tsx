import HeroPage from "@/components/common/HeroPage"
import NewsletterArea from '@/components/home/NesletterArea'
import Details from '@/components/common/Details'
import CategoryIcon from '@/components/idea/CategoryIcon'
import VoteInfoSection from "@/components/home/VoteInfoSection"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="page page-idea-info">
      <div className="page-profile-single-section">

        <HeroPage title="Hogyan tudsz szavazatot leadni?">
          <VoteInfoSection />

          <Link href="/szavazas-inditas" className="btn btn-primary btn-headline btn-next">Tovább a szavazásra</Link>
        </HeroPage>

        {children}

        <div id="tematikus-kategoriak" className="light-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>Tematikus kategóriák</h2>
                <p>Ebben az öt kategóriában tudsz szavazni.</p>

                <Link href="/szavazas" className="btn btn-primary btn-headline btn-next">Tovább a szavazásra</Link>
              </div>

              <div className="col-md-8">
                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Helyi - kis" />Helyi kis ötletek</div>} startOpen={true}>
                  <p>Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége nem haladja meg az 50 millió forintot.</p>
                </Details>

                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Helyi - nagy" />Helyi nagy ötletek</div>}>
                  <p>Olyan ötletek, amelyeket jellemzően egy, esetenként több konkrét helyszínre javasolt beadójuk, és megvalósításuk költsége nem haladja meg az 50 millió forintot.</p>
                </Details>

                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Zöld Budapest" />Zöld Budapest</div>}>
                  <p><b>Zöldebb utcák, üdébb parkok, mindenki számára elérhető, környezettudatos megoldások. Budapest reagál a klímaváltozásra.</b></p>
                  <p>A Zöld Budapest kategória azt képviseli, hogy a Fővárosi Önkormányzat szerepet vállal abban, hogy városunk zöldebbé váljon és segíti a budapestieket, hogy környezettudatosan éljenek, közlekedjenek. Közös célunk, hogy a főváros alkalmazkodjon a 21. század egyik legnagyobb kihívásához, a klímaváltozáshoz.</p>
                </Details>

                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Esélyteremtő Budapest" />Esélyteremtő Budapest</div>}>
                  <p><b>A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel.</b></p>
                  <p>Az Esélyteremtő Budapest kategóriába benyújtott ötletek révén az önkormányzat csökkenti a társadalmi különbségeket, segíti a hátrányos helyzetű közösségek életét. Ide soroljuk az akadálymentes közlekedést megkönnyítő, illetve az idősek, fogyatékosok, rászorulók, vagy más társadalmi hátrányt elszenvedők gondjait orvosló ötleteket.</p>
                </Details>

                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Nyitott Budapest" />Nyitott Budapest</div>}>
                  <p><b>Egy nyitott város a szívügyed? Együttműködések, kísérleti megoldások, digitális fejlesztések, közösségépítő ötletek.</b></p>
                  <p>A Nyitott Budapest kategória célja a kísérletezés és az együttműködés fejlesztése a város közösségeiben, illetve a budapestiek és a főváros, valamint intézményei között. Ennek megvalósítása érdekében keresünk praktikus, kísérleti megoldásokat, mindenki által könnyen elérhető digitális fejlesztéseket és közösségépítő ötleteket.</p>
                </Details>
              </div>
            </div>
          </div>
        </div>

        <NewsletterArea />
      </div>
    </main>
  )
}
