import React from "react";
import "./DashboardTitle.css";

import DateContainer from "./DateContainer";

export default function DashboardTitle(props) {
  return (
    <div className="title-wrapper" data-aos="fade-right">
      <h3>Welcome back, {props.name}</h3>
      <DateContainer />
    </div>
  );
}
