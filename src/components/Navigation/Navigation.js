import React from "react";
import { NavBar, SideNav } from "../";

export default props => (
  <nav>
    <NavBar activeCategory={props.category} />
    <SideNav activeCategory={props.category} />
  </nav>
);
