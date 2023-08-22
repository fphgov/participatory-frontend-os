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
                width={140}
                height={64}
                alt="logo"
                className="logo"
              />
            </div>

            <div className="sharing">
              <a href="https://www.facebook.com/budapestmindenkie" title="Kövess minket Facebookon" rel="noopener noreferrer">
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
            <div className="copyright">© 2023 Budapest Főváros Önkormányzata | Minden jog fenntartva</div>

            <ul>
              <li className="nav"><a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/adatvedelmi_tajekozato.pdf`} target="_blank" rel="noopener noreferrer">Adatvédelmi tájékoztató</a></li>
              <li className="nav"><Link href="/oldal/dokumentumok">Dokumentumok</Link></li>
              <li className="nav"><Link href="/oldal/kapcsolat">Kapcsolat</Link></li>
              <li className="nav"><a href={`${process.env.NEXT_PUBLIC_FILES_PATH}/participatory-budgeting-in-budapest.pdf`} target="_blank" rel="noopener noreferrer">Information in English</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
