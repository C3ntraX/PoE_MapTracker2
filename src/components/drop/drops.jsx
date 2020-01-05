import React, { Component } from "react";
import Drop from "./drop";

import "./effects.css";
import "./drops.css";

class Drops extends Component {
  render() {
    return (
      <table className="table table-dark table-hover table-bordered table-striped image-resize">
        <thead>
          <tr>
            <th>{"Item"}</th>
            <th>{"Stack Size"}</th>
            <th>{"Effects"}</th>
            <th>{"PoE Ninja Value"}</th>
            <th>{"Last 7 days"}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.drops.map(drop => {
            return <Drop key={drop.itemClass + "_" + drop.name} drop={drop} />;
          })}
        </tbody>
      </table>
    );
  }
}

export default Drops;
