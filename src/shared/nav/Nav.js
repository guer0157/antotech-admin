import React from "react";
import "../../App.scss";
import "./Nav.scss";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="nav-component">
      <nav>
        <ul>
          <Link to="/">Home</Link>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
