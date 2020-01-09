import * as React from "react";
import "./content.css";
import "./navbar.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Sidebar from "../sidebar/sidebar";
import Drops from "../drop/drops";
import { getMaps } from "../../services/fakeMapService";
import { IItem } from "../../interfaces/mysql/item.interface";
import { createAll } from "../../services/sqlLite/createTables.service";

export interface IContentProps {}

export interface IContentState {
  maps: IItem[];
  selectedMapItem: IItem;
}

export default class Content extends React.Component<
  IContentProps,
  IContentState
> {
  constructor(props: IContentProps) {
    super(props);

    let maps = getMaps();

    this.state = {
      maps: maps || [],
      selectedMapItem: maps[0]
    };
    createAll();
  }

  handeMapSelect = (selectedMapItem: IItem) => {
    this.setState({ selectedMapItem: selectedMapItem });
  };

  handleLock = (sidebarItem: IItem, unlocked: boolean) => {
    const maps = [...this.state.maps];
    const index = maps.indexOf(sidebarItem);
    maps[index].unlocked = !unlocked;
    this.setState({ maps });
  };

  public render() {
    const { maps, selectedMapItem } = this.state;

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

// class Content extends React.Component {

//   constructor(props) {
//     super(props);
//     if (this.isElectron()) {
//       let iohook = window.require("iohook");
//       iohook.on("keyup", event => {
//         if (event.keycode === 15) {
//           console.log("tab pressed!");
//         }
//       });

//       // Register and start hook
//       iohook.start();
//     }
//   }
//   state = {
//     maps: getMaps() || []
//   };

//   componentDidMount() {}

//   handeMapSelect = selectedMapItem => {
//     this.setState({ selectedMapItem: selectedMapItem });
//   };

//   handleLock = (sidebarItem, unlocked) => {
//     const maps = [...this.state.maps];
//     const index = maps.indexOf(sidebarItem);
//     maps[index].unlocked = !unlocked;
//     this.setState(maps);
//   };

//   render() {
//     let { maps, selectedMapItem } = this.state;
//     if (selectedMapItem === undefined && maps.length > 0)
//       selectedMapItem = maps[0];

//     return (
//       <div className="container">
//         <div className="row">
//           <div className="sidebar">
//             <Sidebar
//               maps={maps}
//               onSelected={this.handeMapSelect}
//               selectedMapItem={selectedMapItem}
//               onLocked={this.handleLock}
//             ></Sidebar>
//           </div>
//           <div className="col">
//             <Drops drops={selectedMapItem.drops}></Drops>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   isElectron() {
//     return window && window.process && window.process.type;
//   }
// }

// export default Content;
