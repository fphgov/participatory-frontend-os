import React from "react";

export default class Impressum extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="impressum">
        <div className="container">
          <h1>Impresszum</h1>

          <p>
            A Budapest Portál tulajdonosa: Budapest Főváros Önkormányzata<br />
            Felelős kiadó: Szervezési és Informatikai Főosztály
          </p>
        </div>
      </div>
    )
  }
}
