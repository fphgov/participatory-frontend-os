import React from "react"
import Newsletter from '../../img/hirlevel.png'

export default function NesletterArea() {
  return (
    <div className="light-section newsletter">
      <div className="container">
        <div className="row flex-center">
          <div className="col-md-5">
            <img src={Newsletter} alt="Értesüljön egy helyen a fővárosi ügyekről promóciós kép" aria-hidden={true} />
          </div>
          <div className="col-md-7">
            <h2>Ne maradj le a közösségi költségvetéssel kapcsolatos legfontosabb hírekről és eseményekről, iratkozz fel hírlevelünkre!</h2>

            <p>A hírlevelet körülbelül havonta egyszer küldjük ki, abban kizárólag a közösségi költségvetéssel kapcsolatban adunk információt, tájékoztatást, és a jövőben bármikor leiratkozhatsz róla.</p>

            <a className="btn btn-primary btn-next" href="https://hirlevel.budapest.hu/subscribe.php?cid=aSQV5beZ_" target="_blank" rel="noopener noreferrer">Feliratkozás</a>
          </div>
        </div>
      </div>
    </div>
  )
}
