import React from "react";
import { secToMin } from "../utils/sec-to-min";

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{secToMin(props.mainTime)}</div>;
}
