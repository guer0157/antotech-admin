import React, { useEffect, useState } from "react";
import "../../App.scss";
import "./Nav.scss";
import { Link } from "react-router-dom";
function Nav(props) {
  const [user, setUser] = useState(localStorage.getItem("user"));
  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <div className="nav-component">
      <nav className="nav-bar">
        <ul className="link-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <button
            className={`nav-link ${!!user ? "disabled" : ""}`}
            disabled={!!user}
          >
            <Link to={!user ? "Auth" : ""}>
              {!user ? "Portal de Administrador" : `Bienvenid@ ${user}`}
            </Link>
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
