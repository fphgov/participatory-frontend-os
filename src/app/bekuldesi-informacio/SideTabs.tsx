import Details from '@/components/common/Details'
import Link from 'next/link'
import { Amount, Conditions, Entitled, Happening, How, WhatNo } from '@/app/bekuldesi-informacio/content'

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
              <h2>Fontos tudnivalók az ötlet leadásához</h2>

              <ul className="side-menu">
                <li className={contentName === "" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio">Milyen feltételeknek kell megfelelni?</Link>
                </li>
                <li className={contentName === "osszeg" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio/osszeg">Mekkora összeg áll rendelkezésre?</Link>
                </li>
                <li className={contentName === "mit-ne" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio/mit-ne">Milyen ötletet NE adjunk be?</Link>
                </li>
                <li className={contentName === "jogosultak" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio/jogosultak">Kik adhatnak be ötleteket?</Link>
                </li>
                <li className={contentName === "hogyan" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio/hogyan">Hogyan lehet ötletet beadni?</Link>
                </li>
                <li className={contentName === "mi-tortenik" ? 'active' : ''}>
                  <Link href="/bekuldesi-informacio/mi-tortenik">Mi történik az ötlet beadása után?</Link>
                </li>
              </ul>

              <Link className="btn btn-primary btn-headline btn-next" href="/bekuldes">Beküldöm az ötletem</Link>
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

              <Details className="section-more" summary="Mi történik az ötlet beadása után?">
                <Happening />
              </Details>
            </div>
          </div>
        </div>

        <div className="send-idea">
          <Link className="btn btn-primary btn-headline btn-next" href="/bekuldes">Beküldöm az ötletem</Link>
        </div>
      </div>
    </div>
  )
}
