import HeroPage from "@/components/common/HeroPage"
import Image from 'next/image'
import Link from "next/link"
import Details from '@/components/common/Details'
import { generateRandomValue } from "../../utilities/generateRandomValue"
import AppyPlan from "./apply-plan"
import BannerArea from "@/components/home/BannerArea"

export default function Layout() {
  const rand = generateRandomValue().toString()

  return (
    <>
      <main className="page page-idea-info">
        <div className="page-info-single-section">

          <HeroPage title="Mire figyelj az ötleted beadásakor?">
            <p><b>Figyelmesen olvasd át, hogy milyen ötleteket tudunk elfogadni!</b> Azt szeretnénk, hogy úgy ötletelj, hogy energiád és munkád később hasznosulni tudjon!</p>
          </HeroPage>

          <div id="megvalosithato-otlet" className="light-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Az ötleted legyen megvalósítható 120 millió forintból!</h4>
                  <p>Biztosan nem lehet 120 millió forintból új aluljárót építeni vagy meghosszabbítani egy villamosvonalat, nem lehet új járműveket venni a közösségi közlekedés számára, nem lehet minden játszótérre kérni valamit. Viszonyítási alapként böngéssz a <Link href={`/projektek?rand=${rand}`}>korábbi nyertes</Link> ötletek között.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>Az ötletek megvalósítási költségét a hivatal fogja megbecsülni</div>}>
                    <p>Ettől függetlenül jó, ha tudod, hogy egy automata üzemű közvécé telepítése mintegy 60 millió forint, de akár egyetlen fa elültetése is több tízmillióba kerülhet, ha burkolatot kell hozzá feltörni, ki kell alakítani olyan talajszerkezetet, amelyben a fa hosszú ideig tud fejlődni, esetleg közműveket kell kiváltani.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Ne legyen túl bonyolult, összetett az ötleted!</div>}>
                    <p>Ha túl sok fejlesztést írsz bele egy ötletbe, még ha azonos helyszínre szól is, nagyobb az esély, hogy nem fog beleférni a keretbe.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Gondolj az üzemeltetési költségre is!</div>}>
                    <p>A maximum 120 millió forintnak elégnek kell lennie 5 évi fenntartásra (ha rövidebb életű projekt, akkor a projekt egészére).</p>
                  </Details>
                </div>
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_megvalosithato-otlet.svg`} width={570} height={345} alt="Az ötleted legyen megvalósítható 120 millió forintból!" aria-hidden={true} />
                </div>
              </div>
            </div>
          </div>

          <div id="valami-uj" className="light-section info-zig-zag-bg-yellow">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Az ötleted alapján jöjjön létre valami új!</h4>
                  <p>Olyan ötletet adj, ami valamit hozzátesz a városhoz, ami eddig nem volt. Ez lehet fizikai beavatkozás, például építés, ültetés, de akár valamilyen szolgáltatás vagy online fejlesztés is.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_valami-uj.svg`} width={570} height={345} alt="Az ötleted alapján jöjjön létre valami új!" aria-hidden={true} />
                </div>
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>Felújításra, karbantartásra ne tegyél javaslatot!</div>}>
                    <p>A közösségi költségvetés keretösszege nem fordítható karbantartási, fenntartási vagy köztisztasági feladatokra. Nem elromlott dolgok megjavítása a cél, hanem új funkciók, új dolgok létrehozása.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Ne szabályozásra vonatkozzon az ötlet!</div>}>
                    <p>Kizárólag valamely tevékenység szabályozására nem lehet ötletet beadni (például bírságolás, forgalomszabályozás, közösségi közlekedés hálózati kérdései). A forgalomszabályozási javaslatot tartalmazó ötletek közül csak azok lehetnek megvalósíthatók, amelyek révén új funkció jön létre (például sétálóutca, iskolautca, zebra).</p>
                  </Details>

                  <Details className="section-more" summary={<div>Ha fel akarod hívni a figyelmet valamire, azt is valamilyen fejlesztésen keresztül tedd</div>}>
                    <p>Szemléletformáló kampány helyett javasolj olyan kisebb fejlesztést, amivel gazdagodik a város, ami létrehoz valami újat, és ezen keresztül világít rá egy problémára, hiányra.</p>
                  </Details>
                </div>
              </div>
            </div>
          </div>

          <div id="megvalositas-helyszine" className="light-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Az ötletedet önkormányzati tulajdonú helyszínen tudjuk megvalósítani</h4>
                  <p>A helyszín lehet a Főváros vagy valamelyik kerület tulajdona, tehát sok olyan terület, amelyre általában közterületként gondolunk. Állami és magántulajdonon (beleértve magáncégek tulajdonát) a szabályok szerint nem végezhető fejlesztés.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>Ne tervezz a HÉV, vasút, iskolák vagy kórházak területére, mert ezek az állam tulajdonában, kezelésében vannak!</div>}>
                    <p>Mivel a HÉV, a vasút, az iskolák és a kórházak területe nem fővárosi vagy kerületi tulajdonban van, nem tudjuk garantálni, hogy a tulajdonos hozzájárul az ötlet megvalósításához.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Nem fejleszthetünk magántulajdont a Főváros forrásából</div>}>
                    <p>Társasházak, magáncégek tulajdonában lévő területekre vagy építményekre, épületekre nem vonatkozhatnak a javaslatok.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Valószínűleg nem lesz jó a helyszín, ha ott már zajlik egy fejlesztés</div>}>
                    <p>Vannak olyan fővárosi helyszínek, amelyek fejlesztésére hamarosan sor kerül, esetleg már rendelkezésre állnak tervek és a megvalósítás forrásai. Ilyen esetben valószínűleg nem tudjuk befogadni az ötletet, vagy csak akkor, ha összhangban van a tervekkel.</p>
                  </Details>
                </div>
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_megvalositas-helyszine.svg`} width={570} height={345} alt="Az ötletedet önkormányzati tulajdonú helyszínen tudjuk megvalósítani" aria-hidden={true} />
                </div>
              </div>
            </div>
          </div>

          <div id="fovarosi-feladat" className="light-section info-zig-zag-bg-blue">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Legyen fővárosi feladat</h4>
                  <p>A Főváros alapvetően olyan tevékenységeket végezhet, amelyeket jogszabályok a feladatkörébe utalnak, de nem végezhet olyan feladatot, amely más – például az állam – hatáskörébe tartozik.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_fovarosi-feladat.svg`} width={570} height={345} alt="Legyen fővárosi feladat" aria-hidden={true} />
                </div>
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>Az iskolai oktatás, oktatásügy állami feladat</div>}>
                    <p>A korhatár leszállításával is bátorítjuk, hogy középiskolások is részt vegyenek a közösségi költségvetésben, ugyanakkor az oktatásügy állami feladat, így a budapesti iskolákban nem tudunk fejlesztéseket megvalósítani.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Az egészségügy sem fővárosi feladat</div>}>
                    <p>Az államhoz és a kerületekhez van rendelve az egészségügy, a Főváros azzal közvetlenül nem foglalkozik.</p>
                  </Details>

                  <Details className="section-more" summary={<div>A hulladékkezelés állami feladat, de a hulladékképződést megelőzhetjük.</div>}>
                    <p>A hulladék kezelése már nem fővárosi feladat, az ötlet azonban vonatkozhat tárgyak újrahasználására vagy javítására, ezzel megakadályozva, hogy hulladékká váljanak.</p>
                  </Details>
                </div>
              </div>
            </div>
          </div>

          <div id="muveszet" className="light-section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Művészet az utcán</h4>
                  <p>Olyan projekteket várunk, ahol a városlakók élhetik ki a kreativitásukat, vagy ahol az ötlet előre nem határozza meg, hogy milyen konkrét művészeti alkotás készül.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>Ne kérj konkrét szobrot vagy emlékművet!</div>}>
                    <p>Nagyon sok embernek van ötlete újabb köztéri szobrokra, vagy arra, hogy mely személyeknek vagy eseményeknek kellene még emléket állítani. A Főváros azonban fontosnak tartja, hogy tervszerűen, a “<a href="https://budapest.hu/Documents/kultura/budapest%20fovaros%20kozteri%20muveszeti%20koncepcioja.pdf">szoborstratégia</a>” alapján végezzen ilyen fejlesztéseket. A közösségi költségvetésben ezért állandó jellegű konkrét művészeti alkotások, szobrok állítására tett javaslatokat nem tudunk támogatni.</p>
                  </Details>

                  <Details className="section-more" summary={<div>Ne akard saját műalkotásodat, művészeti tevékenységedet finanszírozni!</div>}>
                    <p>A közösségi költségvetés nyertes ötleteit a Főváros valósítja meg. Ha a beszerzés szabályait betartva be is von külső megvalósítót, az ötletgazda ugyanolyan esélyekkel indul, mint bárki más.</p>
                  </Details>
                </div>
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_muveszet.svg`} width={570} height={345} alt="Művészet az utcán" aria-hidden={true} />
                </div>
              </div>
            </div>
          </div>

          <div id="eselyek" className="light-section info-zig-zag-bg-yellow">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4>Új lépéssel bővült a közösségi költségvetés folyamata!</h4>
                  <p>
                    Az ötletbeadást követően február 6-21. között egy előszűréssel egészül ki a közösségi költségvetés folyamata.
                    A közösségi költségvetés szabályainak megfelelt ötleteket lakossági támogatásra bocsátjuk.
                    A 300 legtöbb támogatást szerzett ötlet kerül majd a szakmai értékelők elé.
                    Erre azért van szükség, hogy a szavazólapra kevesebb,
                    könnyebben befogadható mennyiségű ötlet kerüljön, valamint
                    hogy a Hivatal lépést tudjon tartani az egyre népszerűbbé váló programmal,
                    tekintettel a véges kapacitásokra.
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 justify-self-end p-5">
                  <Image src={`/images/pic_eselyek.svg`} width={570} height={345} alt="Milyen ötleteknek van esélye a szavazáson?" aria-hidden={true} />
                </div>
                <div className="col-md-6">
                  <Details className="section-more" summary={<div>A helyszín sokat számít.</div>}>
                    <p>
                      A helyszín alapvetően meghatározza, hogy hány embert érint a javaslat.
                      Minél több ember érintett, annál nagyobb eséllyel nyerhet az ötleted.
                    </p>
                  </Details>

                  <Details className="section-more" summary={<div>Gondold végig, hány ember számára lehet érdekes az ötleted!</div>}>
                    <p>
                      Ötleted könnyebben kaphat támogatást, ha annak témája sokakat megmozgat.
                    </p>
                  </Details>
                </div>
              </div>
            </div>
          </div>

          <AppyPlan />
        </div>
      </main>

      <div className="container">
        <BannerArea />
      </div>
    </>
  )
}
