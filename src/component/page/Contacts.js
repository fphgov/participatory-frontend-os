import React from "react";

export default class Contacts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page-contacts-section">
        <div className="container">
          <h1>Elérhetőségek</h1>

          <p><strong>Budapest Főváros Önkormányzata</strong></p>

          <p>
            <b>
            A Központi Ügyfélszolgálati Irodán (V. kerület, Bárczy István utca 1-3.)<br />
            hétfőn és szerdán 8.00 óra és 18.00 óra,<br />
            kedden és csütörtökön 8.00 óra és 16 óra 30 perc között,<br />
            pénteken pedig 8.00 óra és 14.00 óra között várjuk az ügyfeleket.
            </b>
          </p>

          <p>telefon: +36 1 327 1208, +36 1 327 1209</p>
        </div>
      </div>
    )
  }
}
