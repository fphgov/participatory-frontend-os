import React, { useEffect, useState } from 'react'
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation
} from "react-router-dom"
import NewsletterArea from '../common/NewsletterArea'
import Details from '../common/Details'
import HeroPage from '../common/HeroPage'
import CategoryIcon from '../common/CategoryIcon'
import ScrollTo from "../common/ScrollTo"
import IconLamp from '../../img/icon-lamp.svg'
import IconAllow from '../../img/icon-allow.svg'
import IconAccept from '../../img/icon-accept.svg'

const Conditions = () => <>
  <p><b>ALAPELV:</b></p>

  <p>Az ötletek legyenek közérdekűek. Egyéni érdekeket támogató ötleteket nem fogadunk be.</p>

  <p><b>MIRE KÖLTHETŐ?</b></p>

  <p>A közösségi költségvetésből egyaránt megvalósíthatóak beruházások, (pl.: építés, ültetés, informatikai fejlesztések)  szolgáltatások (pl.: közösségi programok, szociális segítségnyújtás is ide tartozik), valamint az új beruházások üzemeltetése. A közösségi költségvetésből legfeljebb 5 évig biztosítható a működés.</p>

  <p><b>HATÁSKÖR / JOGSZABÁLYOK:</b></p>

  <p>A közösségi költségvetésben javasolt projekteknek a Fővárosi Önkormányzat vagy a kerületi önkormányzatok hatáskörébe kell tartozniuk. Kerületekhez tartozó projektek esetében a megvalósítás az adott kerület hozzájárulásához kötött. Az egyeztetéseket a Fővárosi Önkormányzat intézi. A projekteknek meg kell felelniük a mindenkori jogszabályoknak.</p>

  <p><b>HELYSZÍNEK:</b></p>

  <p>Helyszínek szempontjából két kategóriában várjuk az ötleteket:</p>

  <p><b>Egész Budapest ötletek:</b> Egész Budapestre vonatkozó ötletek azok, amelyek a város vagy az itt lakók nagyobb részét érintik, de nem kötődnek konkrét helyszínekhez, vagy sok helyszínes mikrófejlesztések.</p>

  <p><b>Helyi ötletek:</b> Helyi ötletek kategóriában olyan ötletek indulhatnak, amelyek jellemzően egy, kivételes esetben több konkrét helyszínen valósíthatóak meg. A Helyi ötleteken belül vannak Kis és Nagy ötletek.</p>
</>
const Amount = () => <>
  <p>Összesen 1 milliárd forint felhasználásáról döntünk közösen. Az összeghatárok az alábbiak szerint vannak megállapítva:</p>

  <ul>
    <li>Helyi kis ötletek: 1-50 millió Ft / min. 8 nyertes lesz, 400 millió Ft-ból.</li>
    <li>Helyi nagy ötletek: 51-120 millió Ft / min. 2 nyertes lesz, 240 millió Ft-ból.</li>
    <li>Egész Budapest ötletek: 1-120 millió Ft / min. 3 nyertes lesz, 360 millió Ft-ból.</li>
  </ul>
</>
const WhatNo = () => <>
  <ul>
    <li><i>Karbantartás, javítás</i> - Ezt a pénzt nem célunk elromlott dolgok megjavítására költeni, inkább új funkciók, új dolgok létrehozására fordítanánk.</li>
    <li><i>Állami vagy magántulajdon</i> - Az ötlet nem eshet a központi kormányzat hatáskörébe, területére (ilyen például az iskolák többsége, vagy a MÁV), illetve nem érinthet magántulajdonban lévő területet (például társasház, magáncég tulajdona).</li>
    <li><i>Szabályozás vagy újra-szabályozás</i> - Nem áll módunkban olyan ötletet elfogadni, amely valamilyen tevékenységnek vagy szolgáltatásnak a szabályozására, újraszabályozására irányul. A forgalomszabályozási feladatot is tartalmazó ötletek közül nem tudjuk befogadni azokat, amelyek révén nem jön létre új funkció.</li>
    <li><i>Folyamatban lévő fejlesztés</i> - Már folyamatban, illetve előkészítés alatt lévő fejlesztést érintő ötlet nem adható be, csak ha kimondottan illeszkedik a meglévő tervekhez.</li>
    <li><i>Tervezés, tanulmányírás</i> - A közösségi költségvetésből fejlesztések finanszírozhatóak, tanulmány-, stratégiaírás önmagában nem.</li>
    <li><i>Saját termék</i> - A közösségi költségvetés nem alkalmas arra, hogy saját termékünket, műtárgyunkat vagy szolgáltatásunkat eladjuk a városnak.</li>
    <li><i>Szobor</i> - A főváros szoborkoncepciója nem támogatja az egyéni kezdeményezések alapján való szoborállítást.</li>
    <li><i>Kirekesztő tartalom</i> - Ne adj be kirekesztő tartalmat megfogalmazó ötletet se!</li>
  </ul>

  <p>A benyújtott és nyertes ötleteket a hivatal fogja megvalósítani, a kivitelezésben az ötletgazda csak a társadalmi egyeztetés egyik szereplőjeként vesz részt. Ha mégis partnert von be az önkormányzat a megvalósításba, akkor azt pályázat útján választja ki.</p>
</>
const Entitled = () => <>
  <ul>
    <li>Budapesten élő vagy dolgozó, tanuló személyek <i>(Bejelentett lakóhely/tartózkodási hely nem szükséges.)</i></li>
    <li>Elmúltak 16 évesek</li>
    <li>Regisztráltak az otlet.budapest.hu oldalon.</li>
  </ul>

  <p>Ötletet a fenti feltételeknek megfelelő külföldiek is küldhetnek.</p>

  <p><b>Több ötleted is van?</b></p>

  <p>Valamennyit beadhatod, de kérjük, hogy külön ötletként küldd be őket!</p>
</>
const How = () => <>
  <p><b>Az ötleteket 2022. december 31-ig várjuk.</b> Ötletet az interneten, az otlet.budapest.hu felületén keresztül lehet beadni. A beküldés folyamata egyszerű, de segítséget is kérhetsz hozzá a Főpolgármesteri Hivatal ügyfélszolgálati irodájában <i>(Bp., V. Bárczy István utca 1-3.)</i>.</p>
</>
const Happening = () => <>
  <p>Ötleted és a regisztrációnál megadott neved a beküldés után, rövid ellenőrzést követően mindenki számára láthatóvá válik a honlapon a beküldött ötletek között <i>(erről e-mailen kapsz jelzést, de ez még nem jelenti azt, hogy az ötletedet véglegesen megvalósíthatónak ítélte a Főváros)</i>.</p>

  <p>A beküldési időszak után a közösségi költségvetés az alábbi lépések mentén fog tovább haladni:</p>

  <ul>
    <li>2023. január-március: szakmai jóváhagyás.</li>
    <li>2023. tavasz: ötletek fejlesztése.</li>
    <li>2023. nyár: szavazási időszak.</li>
    <li>2023. ősztől: projektek kivitelezése.</li>
  </ul>
</>

export default function IdeaInfo() {
  let location = useLocation()
  let { path } = useRouteMatch()

  const [scrollTo, setScrollTo] = useState(false)

  useEffect(() => {
    if (scrollTo !== false) {
      setScrollTo(false)
    }
  }, [scrollTo])

  useEffect(() => {
    document.body.classList.add('page-idea-info')

    return () => {
      document.body.classList.remove('page-idea-info')
    }
  }, [])

  return (
    <div className="page-idea-info-section">
      <HeroPage title="Hogyan tudsz ötletet beküldeni?">

      {scrollTo && document.querySelector(scrollTo) ? <ScrollTo element={document.querySelector(scrollTo).offsetTop} /> : null}

        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
            <div className="info-box-wrapper">
              <div className="info-box">
                <div className="info-box-icon">
                  <img src={IconLamp} alt="Lamp" aria-hidden={true} />
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
                  <img src={IconAllow} alt="Allow" aria-hidden={true} />
                </div>
                <div className="info-box-title">
                  Találj ki egy ötletet!
                </div>
                <div className="info-box-content">
                  A beküldés előtt készítsd elő az ötlete(i)det.
                </div>
              </div>

              <div className="info-box">
                <div className="info-box-icon">
                  <img src={IconAccept} alt="Accept" aria-hidden={true} />
                </div>
                <div className="info-box-title">
                  Informálódj a beküldésről!
                </div>
                <div className="info-box-content">
                  Nyomj a lenti "Beküldöm az ötletem" gombra, lépj be a fiókodba és töltsd ki az űrlapot.
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>

        <button type="button" className="btn btn-primary btn-headline btn-next" onClick={() => {setScrollTo('#tematikus-kategoriak')}}>Szeretnék ötletelni!</button>
      </HeroPage>

      <div id="tematikus-kategoriak" className="light-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Tematikus kategóriák</h2>
              <p>Ebben a három kategóriában várjuk az ötleteket.</p>

              <button type="button" className="btn btn-primary btn-headline btn-next" onClick={() => {setScrollTo('#fontos-tudnivalok')}}>Fontos tudnivalók</button>
            </div>

            <div className="col-md-8">
              <Details className="section-more" summary={() => <div><CategoryIcon color="blue" size={24} name="Zöld Budapest" />Zöld Budapest</div>} startOpen={true}>
                <p><b>Zöldebb utcák, üdébb parkok, mindenki számára elérhető, környezettudatos megoldások. Budapest reagál a klímaváltozásra.</b></p>
                <p>A Zöld Budapest kategória azt képviseli, hogy a Fővárosi Önkormányzat szerepet vállal abban, hogy városunk zöldebbé váljon és segíti a budapestieket, hogy környezettudatosan éljenek, közlekedjenek. Közös célunk, hogy a főváros alkalmazkodjon a 21. század egyik legnagyobb kihívásához, a klímaváltozáshoz.</p>
              </Details>

              <Details className="section-more" summary={() => <div><CategoryIcon color="blue" size={24} name="Esélyteremtő Budapest" />Esélyteremtő Budapest</div>}>
                <p><b>A cél a társadalmi különbségek csökkentése, hátrányos helyzetű közösségek életét támogató ötletekkel.</b></p>
                <p>Az Esélyteremtő Budapest kategóriába benyújtott ötletek révén az önkormányzat csökkenti a társadalmi különbségeket, segíti a hátrányos helyzetű közösségek életét. Ide soroljuk az akadálymentes közlekedést megkönnyítő, illetve az idősek, fogyatékosok, rászorulók, vagy más társadalmi hátrányt elszenvedők gondjait orvosló ötleteket.</p>
              </Details>

              <Details className="section-more" summary={() => <div><CategoryIcon color="blue" size={24} name="Nyitott Budapest" />Nyitott Budapest</div>}>
                <p><b>Egy nyitott város a szívügyed? Együttműködések, kísérleti megoldások, digitális fejlesztések, közösségépítő ötletek.</b></p>
                <p>A Nyitott Budapest kategória célja a kísérletezés és az együttműködés fejlesztése a város közösségeiben, illetve a budapestiek és a főváros, valamint intézményei között. Ennek megvalósítása érdekében keresünk praktikus, kísérleti megoldásokat, mindenki által könnyen elérhető digitális fejlesztéseket és közösségépítő ötleteket.</p>
              </Details>

              <p>Vannak ötletek, amelyek esetleg több kategória céljaihoz is illeszkednek. Ezeknek a besorolásáról a Főpolgármesteri Hivatal dönt.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="fontos-tudnivalok" className="information-section">
        <div className="information-section-bg">
          <div className="information-section-bg-left"></div>
          <div className="information-section-bg-right"></div>
        </div>

        <div className="desktop-only">
          <div className="container">
            <div className="row">
              <div className="col-md-4 information-section-left">
                <h2>Fontos tudnivalók az ötlet leadásához</h2>

                <ul className="side-menu">
                  <li className={location.pathname === `${path}` ? 'active' : ''}><Link to={`${path}`}>Milyen feltételeknek kell megfelelni?</Link></li>
                  <li className={location.pathname === `${path}/osszeg` ? 'active' : ''}><Link to={`${path}/osszeg`}>Mekkora összeg áll rendelkezésre?</Link></li>
                  <li className={location.pathname === `${path}/mit-ne` ? 'active' : ''}><Link to={`${path}/mit-ne`}>Milyen ötletet NE adjunk be?</Link></li>
                  <li className={location.pathname === `${path}/jogosultak` ? 'active' : ''}><Link to={`${path}/jogosultak`}>Kik adhatnak be ötleteket?</Link></li>
                  <li className={location.pathname === `${path}/hogyan` ? 'active' : ''}><Link to={`${path}/hogyan`}>Hogyan lehet ötletet beadni?</Link></li>
                  <li className={location.pathname === `${path}/mi-tortenik` ? 'active' : ''}><Link to={`${path}/mi-tortenik`}>Mi történik az ötlet beadása után?</Link></li>
                </ul>

                <Link className="btn btn-primary btn-headline btn-next" to="/bekuldes">Beküldöm az ötletem</Link>
              </div>

              <div className="col-md-8 information-section-right">
                <div className="information-section-content">
                  <Switch>
                    <Route path={`${path}`} exact component={Conditions} />
                    <Route path={`${path}/osszeg`} component={Amount} />
                    <Route path={`${path}/mit-ne`} component={WhatNo} />
                    <Route path={`${path}/jogosultak`} component={Entitled} />
                    <Route path={`${path}/hogyan`} component={How} />
                    <Route path={`${path}/mi-tortenik`} component={Happening} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-only">
          <div className="container">
            <div className="row">
              <div className="col-md-4 information-section-left">
                <h2>Fontos tudnivalók az ötlet leadásához</h2>

                <Details className="section-more" summary="Milyen feltételeknek kell megfelelni?">
                  <Conditions />
                </Details>

                <Details className="section-more" summary="Mekkora összeg áll rendelkezésre?">
                  <Amount />
                </Details>

                <Details className="section-more" summary="Milyen ötletet NE adjunk be?">
                  <WhatNo />
                </Details>

                <Details className="section-more" summary="Kik adhatnak be ötleteket?">
                  <Entitled />
                </Details>

                <Details className="section-more" summary="Hogyan lehet ötletet beadni?">
                  <How />
                </Details>

                <Details className="section-more" summary="Hogyan lehet ötletet beadni?">
                  <Happening />
                </Details>
              </div>
            </div>
          </div>

          <div className="send-idea">
            <Link className="btn btn-primary btn-headline btn-next" to="/bekuldes">Beküldöm az ötletem</Link>
          </div>
        </div>
      </div>

      <NewsletterArea />
    </div>
  )
}
