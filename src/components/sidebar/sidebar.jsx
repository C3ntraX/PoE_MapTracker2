import React, { Component } from "react";
import SidebarItem from "./sidebarItem";
import "./sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <td className="col-name">{"Name"}</td>
            <td className="text col-tier">{"T"}</td>
            <td className="text col-count">{"C"}</td>
            <td
              className="text col-unlocked"
              title={"Is the map unlocked in atlas?"}
            >
              <i style={{ color: "white" }} className="fas fa-lock-open"></i>
            </td>

            <td
              className="text col-unlockable"
              title={"Is the map unlocked in atlas?"}
            >
              <i style={{ color: "white" }} className="fas fa-lock"></i>
            </td>
          </tr>
        </thead>
        <tbody>
          {this.props.maps.map(map => (
            <SidebarItem
              key={map.mapTier + "_" + map.name}
              map={map}
              onSelected={this.props.onSelected}
              selectedMapItem={this.props.selectedMapItem === map}
              onLocked={this.props.onLocked}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Sidebar;
