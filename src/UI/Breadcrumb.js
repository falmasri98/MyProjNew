import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ prev, current }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={`/${prev}`}>{prev}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
