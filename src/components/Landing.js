import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-inner dark-overlay">
          <div className="buttons">
            <Link to="strategy" className="btn btn-primary">
              Strategy
            </Link>
            <Link to="alliance" className="btn">
              Alliance Selection
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
