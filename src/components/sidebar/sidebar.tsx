import * as React from "react";
import SidebarItem from "./sidebarItem";
import "./sidebar.css";
import { IItem } from "../../interfaces/mysql/item.interface";

interface ISidebarProps {
  maps: IItem[];
  onSelected: (selectedMapItem: IItem) => void;
  selectedMapItem: IItem;
  onLocked: (sidebarItem: IItem, unlocked: boolean) => void;
}

const Sidebar: React.FunctionComponent<ISidebarProps> = props => {
  const { maps, onSelected, selectedMapItem, onLocked } = props;
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
        {maps.map(map => (
          <SidebarItem
            key={map.mapTier + "_" + map.name}
            map={map}
            onSelected={onSelected}
            isSelectedMapItem={selectedMapItem === map}
            onLocked={onLocked}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Sidebar;
