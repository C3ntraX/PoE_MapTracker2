import * as React from "react";
import { IItem } from "../../interfaces/mysql/item.interface";

interface ISidebarItemProps {
  map: IItem;
  isSelectedMapItem: boolean;
  onSelected: (selectedMapItem: IItem) => void;
  onLocked: (sidebarItem: IItem, unlocked: boolean) => void;
}

const SidebarItem: React.FunctionComponent<ISidebarItemProps> = props => {
  const { map, isSelectedMapItem, onSelected, onLocked } = props;
  const { name, icon, mapTier, count, unlocked, unlockable } = map;
  return (
    <tr
      key={name}
      className={isSelectedMapItem ? "active" : ""}
      onClick={() => onSelected(map)}
    >
      <td className="col-name" style={{ whiteSpace: "nowrap" }}>
        <img src={icon} alt="" />
        <span style={{ overflow: "hidden" }}>{name}</span>
      </td>
      <td className="text col-tier" title={"Map Tier"}>
        {mapTier}
      </td>
      <td className="text col-count" title={"Number of the same maps"}>
        {count}
      </td>
      <td
        className="text col-unlocked"
        title={"Is the map unlocked in atlas?"}
        onClick={() => onLocked(map, unlocked)}
      >
        {unlocked ? (
          <i style={{ color: "green" }} className="fas fa-check"></i>
        ) : (
          <i style={{ color: "red" }} className="fas fa-times"></i>
        )}
      </td>
      <td
        className="text col-unlockable"
        title={"Unlockable maps - linked, same Tier"}
      >
        {unlockable}
      </td>
    </tr>
  );
};

export default SidebarItem;

// class SidebarItem<Props> extends Component {
//   render() {
//     const { map, selectedMapItem, onSelected, onLocked } : Props;
//     const { name, icon, mapTier, count, unlocked, unlockable } = map;
//     return (
//       <tr
//         key={name}
//         className={selectedMapItem ? "active" : null}
//         onClick={() => onSelected(map)}
//       >
//         <td className="col-name" style={{ whiteSpace: "nowrap" }}>
//           <img src={icon} alt="" />
//           <span style={{ overflow: "hidden" }}>{name}</span>
//         </td>
//         <td className="text col-tier" title={"Map Tier"}>
//           {mapTier}
//         </td>
//         <td className="text col-count" title={"Number of the same maps"}>
//           {count}
//         </td>
//         <td
//           className="text col-unlocked"
//           title={"Is the map unlocked in atlas?"}
//           onClick={() => onLocked(map, unlocked)}
//         >
//           {unlocked ? (
//             <i style={{ color: "green" }} className="fas fa-check"></i>
//           ) : (
//             <i style={{ color: "red" }} className="fas fa-times"></i>
//           )}
//         </td>
//         <td
//           className="text col-unlockable"
//           title={"Unlockable maps - linked, same Tier"}
//         >
//           {unlockable}
//         </td>
//       </tr>
//     );
//   }
// }

// export default SidebarItem;
