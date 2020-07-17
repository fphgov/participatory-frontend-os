import React from "react";
import {
  Link,
} from "react-router-dom";

export default class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    )
  }
}