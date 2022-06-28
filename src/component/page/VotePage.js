import React, { useEffect, useState, useContext } from 'react'
import {
  Link,
} from "react-router-dom"
import API from '../assets/axios'
import VoteFlow from '../common/VoteFlow'
import StoreContext from '../../StoreContext'

export default function VotePage() {
  const context = useContext(StoreContext)

  const [ isStarted, setIsStarted ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ error, setError ] = useState('')
  const [ isClosed, setIsClosed ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      setIsLoggedIn(true)
    }

    getVoteableStatus()
  }, [])

  const getVoteableStatus = () => {
    context.set('loading', true)

    API.get(
      process.env.REACT_APP_API_REQ_PHASE_CHECK
    ).then(response => {
      if (response.data && response.data.data && response.data.data.code) {
        setIsClosed(response.data.data.code !== 'VOTE')
      }
    }).catch(error => {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError('Váratlan hiba történt, kérünk próbáld később')
      }
    }).finally(() => {
      context.set('loading', false)
    })
  }

  const Error = ({ message }) => {
    return (
      <div className="error-message">
        {message}
      </div>
    )
  }

  if (isStarted) {
    return <VoteFlow />
  }

  return (
    <div className="page-page-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {error && !isClosed ? <Error message={error} /> : null}

            {isClosed ? <>
              <h3>A szavazás jelenleg zárva tart!</h3>

              <p>A közösségi költségvetés 2022-es szavazási időszaka július 1-től augusztus 31-ig tart, ebben az időszakban van lehetőség online szavazásra is.</p>
            </> : <>
              <h2>Üdvözlünk a 2021/22-es közösségi költségvetés szavazófelületén!</h2>

              {!isLoggedIn ? <>
                <p>A szavazáshoz <Link to={'/bejelentkezes'}>be kell jelentkezned</Link>, vagy <Link to={'/regisztracio'}>létre kell hoznod</Link> egy felhasználói fiókot. Ezt a szavazás végén is megteheted.</p>
              </> : null}

                <p>Ha szeretnéd megismerni a közösségi költségvetés szavazásának menetét, akkor kattints a Bővebben a szavazásról gombra!</p>

              <details>
                <summary>Bővebben a szavazásról</summary>
                <h3>Hogyan kell szavazni az internetes felületen a fővárosi közösségi költségvetés ötleteire?</h3>

                <p>A közösségi költségvetés ötleteit három kategórián belül lehetett beadni: Zöld Budapest, Esélyteremtő Budapest, Nyitott Budapest.</p>

                <p>Mind a három kategóriában kell szavaznod, ezért mindhárom kategóriának külön szavazóoldalt hoztunk létre, melyeken sorban haladva bejelölheted a neked tetsző ötleteket. Amíg nem véglegesíted a szavazataidat, visszaléphetsz és módosíthatsz rajtuk. A Szavazok gombra való kattintás után viszont szavazataid véglegessé válnak, azokon utólag nem módosíthatsz.</p>

                <p><b>A szavazás menete:</b></p>

                <ol>
                  <li>Kattints az Elkezdem a szavazást gombra!</li>
                  <li>Elsőként a Zöld Budapest kategória szavazólistás ötleteinek oldalára jutsz, ahol először a kis projektek, utána a nagy projektek listáját látod. Mindkét listából jelölj ki egy-egy ötletet, amelyre szavazni szeretnél.</li>
                  <li>Kattints az oldal alján lévő Tovább gombra!</li>
                  <li>A következő oldalon az Esélyteremtő Budapest kategória ötleteit látod, itt szintén jelölj be egy kis és egy nagy ötletet, majd kattints a Tovább gombra!</li>
                  <li>A következő oldalon a Nyitott Budapest kategória ötleteit látod, itt is jelölj be egy kis és egy nagy ötletet, majd kattints a Tovább gombra!</li>
                  <li>Ezután az összesítő oldalra érsz, ahol azokat az ötleteket látod, melyeket előzőleg kijelöltél. Ha változtatni szeretnél, másik ötletre szavaznál, kattints arra az ötletre, amelyet le szeretnél cserélni, így automatikusan annak a kategóriának az oldalára jutsz, ahol az ötlet listázva van. Itt jelöld ki az új ötletet, amire szavazni szeretnél és kattints a Tovább gombra.</li>
                </ol>

                <p>Ha biztos vagy abban, hogy a neked legjobban tetsző ötleteket jelölted ki, kattints a "Szavazok" gombra! Szavazatodon ezután már nincs módod változtatni.</p>

                <p>Készen állsz?</p>
              </details>

              <div className="button-wrapper vote-button">
                <button className="btn btn-primary" onClick={() => { setIsStarted(true) }}>Elkezdem a szavazást</button>
              </div>
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}
