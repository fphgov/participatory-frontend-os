import React from "react"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer(): JSX.Element {
  return (
    <footer>
      <div className="dark-section">
        <div className="container">
          <div className="line-one">
            <div className="logo-wrapper">
              <Image
                src="/images/category-open-text.svg"
                width={90}
                height={41}
                alt="logo"
                className="logo"
              />
            </div>

            <ul>
              <li className="nav"><Link href="/otletek?rand=6540673" prefetch={false}>Beküldött ötletek</Link></li>
              <li className="nav"><Link href="/projektek?rand=6540673" prefetch={false}>Megvalósuló ötletek</Link></li>
              <li className="nav"><button type="button" aria-label="Sütikezelés" data-cc="c-settings">Sütikezelés</button></li>
              <li className="nav"><a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/sutitajekoztato.pdf`} target="_blank" rel="noopener noreferrer">Sütitájékoztató</a></li>
              <li className="nav"><a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatkezelesi_tajekoztato.pdf`} target="_blank" rel="noopener noreferrer">Adatkezelési tájékoztató</a></li>
              <li className="nav"><Link href="/oldal/dokumentumok" prefetch={false}>Dokumentumok</Link></li>
              <li className="nav"><Link href="/oldal/kapcsolat" prefetch={false}>Kapcsolat</Link></li>
              <li className="nav"><a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/participatory-budgeting-in-budapest.pdf`} target="_blank" rel="noopener noreferrer">Information in English</a></li>
            </ul>
          </div>

          <hr />

          <div className="line-two">
            <div className="logo-secondary-wrapper">
              <a href="https://budapest.hu" target="_blank" title="Kövess minket Facebookon" rel="noopener noreferrer">
                <Image
                  src="/images/bp_logo_white.svg"
                  width={201}
                  height={40}
                  alt="logo"
                  className="logo"
                  />
              </a>

              <div className="sharing sharing-mobile">
                <a href="https://www.facebook.com/budapestmindenkie" target="_blank" title="Kövess minket Facebookon" rel="noopener noreferrer">
                <Image
                  src="/images/social-fb.svg"
                  width={36}
                  height={36}
                  alt="Facebook logo"
                  className="logo"
                  aria-hidden={true}
                />
                </a>
              </div>
            </div>

            <div className="copyright-wrapper">
              <div className="copyright">© 2024 Budapest Főváros Önkormányzata. Minden jog fenntartva</div>

              <div className="sharing sharing-desktop">
                <a href="https://www.facebook.com/budapestmindenkie" target="_blank" title="Kövess minket Facebookon" rel="noopener noreferrer">
                <Image
                  src="/images/social-fb.svg"
                  width={36}
                  height={36}
                  alt="Facebook logo"
                  className="logo"
                  aria-hidden={true}
                />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
