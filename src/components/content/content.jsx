import React, { Component } from "react";
import "./content.css";
import "./navbar.css";
import "@fortawesome/fontawesome-free/css/all.css";
//import { HashRouter as Router, Route } from "react-router-dom";

import Sidebar from "../sidebar/sidebar.jsx";
import Drops from "../drop/drops.jsx";
import { getMaps } from "../../services/fakeMapService";
/* import mapInfo from "../../utils/captureClient"; */
import fs from "fs";

class Content extends Component {
  constructor() {
    super();
  }
  state = {
    maps: getMaps() || []
  };

  componentDidMount() {
    console.log(fs);
  }

  handeMapSelect = selectedMapItem => {
    this.setState({ selectedMapItem: selectedMapItem });
  };

  handleLock = (sidebarItem, unlocked) => {
    const maps = [...this.state.maps];
    const index = maps.indexOf(sidebarItem);
    maps[index].unlocked = !unlocked;
    this.setState(maps);
  };

  render() {
    let { maps, selectedMapItem } = this.state;
    if (selectedMapItem === undefined && maps.length > 0)
      selectedMapItem = maps[0];

    return (
      <div className="container">
        <div className="row">
          <div className="sidebar">
            <Sidebar
              maps={maps}
              onSelected={this.handeMapSelect}
              selectedMapItem={selectedMapItem}
              onLocked={this.handleLock}
            ></Sidebar>
          </div>
          <div className="col">
            <Drops drops={selectedMapItem.drops}></Drops>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
