import React from "react";
import {
  Link,
} from "react-router-dom";

export default class Hero extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    return (
      <div className="hero-wrapper">
        <div className="hero dark">
          <div className="container">
            <h3>Október 26-ig várjuk a javaslatokat,<br /> hogy együtt jobbá tegyük Budapestet!</h3>

            <div className="hero-btn-wrapper">
              <Link to="/javaslat" className="btn btn-primary">Javaslat beküldése</Link>
            </div>

            <div className="hero-links-wrapper">
              <div className="hero-link-elem">
                <a href="#" className="light">Tovább információ</a>
              </div>
              <div className="hero-link-elem">
                <a href="#" className="light">Kapmány ütemterv</a>
              </div>
            </div>

            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
