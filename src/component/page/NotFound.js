import React from "react";

export default class NotFound extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="page-not-found-section">
        <div className="container">
          <p>404 - Az oldal nem található</p>
        </div>
      </div>
    )
  }
}
