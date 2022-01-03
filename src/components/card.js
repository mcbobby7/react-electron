import * as React from "react";
import "./styles.css";

function Header(props) {
  return <div className="card">{props.children}</div>;
}

export default Header;
