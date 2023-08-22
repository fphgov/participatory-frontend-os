import Details from '@/components/common/Details'
import Link from 'next/link'
import { HowIsItDescided, WhoAndHow, Community, Happening, Realization, Who, Mastermind } from '@/app/szavazasi-informacio/content'

type SideTabs = {
  contentName: string
  children: React.ReactNode
}

export default function SideTabs({ contentName, children }: SideTabs) {
  return (
    <div id="fontos-tudnivalok" className="information-section">
      <div className="information-section-bg">
        <div className="information-section-bg-left"></div>
        <div className="information-section-bg-right"></div>
      </div>

      <div className="desktop-only">
        <div className="container">
          <div className="row">
            <div className="col-md-4 information-section-left">
              <h2>Fontos tudnivalók a szavazás menetével kapcsolatban</h2>

              <ul className="side-menu">
                <li className={contentName === "" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio">Kik és hogyan szavazhatnak?</Link>
                </li>
                <li className={contentName === "hogyan-dol-el" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/hogyan-dol-el">Hogyan dől el, hogy mely ötletek valósulnak meg?</Link>
                </li>
                <li className={contentName === "ki-valositja-meg" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/ki-valositja-meg">Ki valósítja meg az ötleteket?</Link>
                </li>
                <li className={contentName === "otletgazdak-szerepe" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/otletgazdak-szerepe">Az ötletgazdának mi a szerepe a megvalósításban?</Link>
                </li>
                <li className={contentName === "megvalositas" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/megvalositas">A helyi közösségnek, érintetteknek van-e beleszólása a projekt megvalósításába?</Link>
                </li>
                <li className={contentName === "mikor" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/mikor">Mikor valósulnak meg a nyertes ötletek?</Link>
                </li>
                <li className={contentName === "mit-tehetnek-az-otletgazdak" ? 'active' : ''}>
                  <Link href="/szavazasi-informacio/mit-tehetnek-az-otletgazdak">Mit tehetnek az ötletgazdák, hogy sokan szavazzanak az ötletükre?</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-8 information-section-right">
              <div className="information-section-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-only">
        <div className="container">
          <div className="row">
            <div className="col-md-4 information-section-left">
              <h2>Fontos tudnivalók a szavazás menetével kapcsolatban</h2>

              <Details className="section-more" summary="Kik és hogyan szavazhatnak?">
                <WhoAndHow />
              </Details>

              <Details className="section-more" summary="Hogyan dől el, hogy mely ötletek valósulnak meg?">
                <HowIsItDescided />
              </Details>

              <Details className="section-more" summary="Ki valósítja meg az ötleteket?">
                <Who />
              </Details>

              <Details className="section-more" summary="Az ötletgazdának mi a szerepe a megvalósításban?">
                <Mastermind />
              </Details>

              <Details className="section-more" summary="A helyi közösségnek, érintetteknek van-e beleszólása a projekt megvalósításába?">
                <Community />
              </Details>

              <Details className="section-more" summary="Mikor valósulnak meg a nyertes ötletek?">
                <Realization />
              </Details>

              <Details className="section-more" summary="Mit tehetnek az ötletgazdák, hogy sokan szavazzanak az ötletükre?">
                <Happening />
              </Details>
            </div>
          </div>
        </div>

        <div className="send-idea">
          <Link href="/szavazas" className="btn btn-primary btn-headline btn-next">Tovább a szavazásra</Link>
        </div>
      </div>
    </div>
  )
}
