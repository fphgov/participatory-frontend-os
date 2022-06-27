import React, { useEffect, useState } from 'react'
import {
  Link,
} from "react-router-dom"
import VoteFlow from '../common/VoteFlow'

export default function VotePage() {
  const [ isStarted, setIsStarted ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      setIsLoggedIn(true)
    }
  }, [])

  if (isStarted) {
    return <VoteFlow />
  }

  return (
    <div className="page-page-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Üdvözlünk a 2021/22-es közösségi költségvetés szavazófelületén</h2>

            {!isLoggedIn ? <>
              <p>A szavazáshoz <Link to={'/bejelentkezes'}>be kell jelentkezned</Link>, vagy <Link to={'/regisztracio'}>létre kell hoznod</Link> egy felhasználói fiókot. Ezt a szavazás végén is megteheted.</p>
            </> : null}

            <p>Ha szeretnéd megismerni a közösségi költségvetés szavazásának menetét, akkor a Bővebben a szavazásról gombot ajánljuk neked!</p>

            <details>
              <summary>Bővebben a szavazásról</summary>
              <h3>Hogyan kell szavazni az internetes felületen a fővárosi közösségi költségvetés ötleteire?</h3>

              <p>A közösségi költségvetés ötleteit három kategórián belül lehetett beadni.</p>

              <p>Zöld Budapest, Esélyteremtő Budapest, Nyitott Budapest. Mind a három kategóriában kell szavaznod, ezért mindhárom kategóriának külön szavazóoldalt hoztunk létre melyeken sorban haladva bejelölheted a neked tetsző ötleteket. Amíg nem véglegesíted a szavazataidat, visszaléphetsz és módosíthatsz rajtuk. A SZAVAZOK gombra való kattintás után viszont szavazataid véglegessé válnak, azokon utólag nem módosíthatsz.</p>

              <p><b>A szavazás menete:</b></p>

              <ol>
                <li>Kattints az ELKEZDEM A SZAVAZÁST gombra!</li>
                <li>Elsőként a Zöld Budapest kategóriában szavazólistás ötletek oldalára jutsz, ahol először a kis projektek, utána a nagy projektek listáját látod. Mindkét listából jelölj ki egy-egy ötletet, amelyekre szavazni szeretnél.</li>
                <li>Kattints az oldal alján lévő Tovább gombra!</li>
                <li>A következő oldalon az Esélyteremtő Budapest kategória ötleteit látod, itt szintén jelölj be egy kis és egy nagy ötletet, majd kattints a Tovább gombra!</li>
                <li>A következő oldalon a Nyitott Budapest kategória ötleteit látod, itt is jelölj be egy kis és egy nagy ötletet, majd kattints a Tovább gombra!</li>
                <li>Ezután az összesítő oldalra érsz, ahol azokat az ötleteket látod, melyeket előzőleg kijelöltél. Ha változtatni szeretnél, másik ötletre szavaznál, kattints arra az ötletre, amelyet le szeretnél cserélni, így automatikusan annak a kategóriának az oldalára jutsz, ahol az ötlet listázva van. Itt jelöld ki az új ötletet, amire szavazni szeretnél és kattints a tovább gombra.</li>
              </ol>

              <p>Ha biztos vagy abban, hogy a neked legjobban tetsző ötleteket jelölted ki, kattints a Leadom a szavazatom gombra! Szavazatodon ezután már nincs módod változtatni.</p>

              <p>Készen állsz?</p>
            </details>

            <div className="button-wrapper vote-button">
              <button className="btn btn-primary" onClick={() => { setIsStarted(true) }}>Elkezdem a szavazást</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}