import * as React from "react";
import { IDrop } from "../../interfaces/mysql/drop.interface";

interface IDropProps {
  drop: IDrop;
}

function addPercentage(str: string) {
  let number = parseFloat(str);
  if (number > 0) {
    return "+" + number + "%";
  } else {
    return number + "%";
  }
}

const Drop: React.FunctionComponent<IDropProps> = props => {
  const {
    itemClass,
    name,
    icon,
    stackSize,
    artFilename,
    sparklineTotalChange,
    chaosValue,
    exaltedValue
  } = props.drop;
  return (
    <tr>
      <td>
        <div>
          <span className="d-flex justify-content-start" title={name}>
            <span className="icon">
              <img src={icon} alt="" />
            </span>
            <span>{name}</span>
          </span>
        </div>
      </td>
      <td>{stackSize}</td>
      <td>{"explicitmodifiersDOM"}</td>
      <td>
        {exaltedValue >= 1 ? (
          <span style={{ float: "left" }}>
            {exaltedValue}
            <span style={{ opacity: "0.5", margin: "0px 0.25rem" }}>{"x"}</span>
            <img src={require("../../images/currency_ex.png")} alt="" />
          </span>
        ) : null}
        <span style={{ float: "right" }}>
          {chaosValue}
          <span style={{ opacity: "0.5", margin: "0px 0.25rem" }}>{"x"}</span>
          <img src={require("../../images/currency_chaos.png")} alt="" />
        </span>
      </td>
      <td className={sparklineTotalChange >= 0 ? "positive-nr" : "negative-nr"}>
        {addPercentage(sparklineTotalChange.toString())}
      </td>
    </tr>
  );
};

export default Drop;
