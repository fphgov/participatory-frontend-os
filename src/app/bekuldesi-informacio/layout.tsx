import HeroPage from "@/components/common/HeroPage"
import ScrollButton from '@/components/common/ScrollButton'
import Image from 'next/image'
import Details from '@/components/common/Details'
import CategoryIcon from '@/components/idea/CategoryIcon'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="page page-idea-info">
      <div className="page-profile-single-section">

        <HeroPage title="Hogyan tudsz ötletet beküldeni?">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <div className="info-box-wrapper">
                <div className="info-box">
                  <div className="info-box-icon">
                    <Image
                      src="/images/icon-lamp.svg"
                      width={60}
                      height={60}
                      alt="Lamp"
                      aria-hidden={true}
                    />
                  </div>
                  <div className="info-box-title">
                    Informálódj a beküldésről!
                  </div>
                  <div className="info-box-content">
                    Olvasd el ezen az oldalon a beküldési folyamattal kapcsolatos részleteket.
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-box-icon">
                    <Image
                      src="/images/icon-allow.svg"
                      width={60}
                      height={60}
                      alt="Allow"
                      aria-hidden={true}
                    />
                  </div>
                  <div className="info-box-title">
                    Találj ki egy ötletet!
                  </div>
                  <div className="info-box-content">
                    A beküldés előtt készítsd elő az ötleted.
                  </div>
                </div>

                <div className="info-box">
                  <div className="info-box-icon">
                    <Image
                      src="/images/icon-accept.svg"
                      width={60}
                      height={60}
                      alt="Accept"
                      aria-hidden={true}
                    />
                  </div>
                  <div className="info-box-title">
                    Küldd be az ötleted!
                  </div>
                  <div className="info-box-content">
                    Nyomj a lenti &quot;Beküldöm az ötletem&quot; gombra, lépj be a fiókodba és töltsd ki az űrlapot.
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>

          <ScrollButton to="#tematikus-kategoriak" className="btn btn-primary btn-headline btn-next">
            Szeretnék ötletelni!
          </ScrollButton>
        </HeroPage>

        <div id="tematikus-kategoriak" className="light-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2>Tematikus kategóriák</h2>
                <p>Ebben a három kategóriában várjuk az ötleteket.</p>

                <ScrollButton to="#fontos-tudnivalok" className="btn btn-primary btn-headline btn-next">
                  Fontos tudnivalók
                </ScrollButton>
              </div>

              <div className="col-md-8">
                <Details className="section-more" summary={<div><CategoryIcon color="blue" size={24} name="Zöld Budapest" />Zöld Budapest</div>} startOpen={true}>
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

                <p>Vannak ötletek, amelyek esetleg több kategória céljaihoz is illeszkednek. Ezeknek a besorolásáról a Főpolgármesteri Hivatal dönt.</p>
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  )
}
