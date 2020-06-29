import React, { useState } from "react";
import "../../App.scss";
import "./Auth.scss";
import { headers, authURL } from "../../utils/fetchUtil";

function Auth() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [formState, setformState] = useState({});
  const mostrarFormularioDeRegistro = (ev) => {
    ev.preventDefault();
    setIsNewUser(!isNewUser);
  };
  const handleChange = (ev) => {
    const id = ev.currentTarget.id;
    let value = ev.currentTarget.value;
    const newState = { ...formState };
    newState[id] = value;
    setformState(newState);
  };
  const registerUser = (ev) => {
    ev.preventDefault();
    let body = JSON.stringify(formState);
    let options = {
      method: "POST",
      body: body,
      mode: "cors",
      headers: headers,
    };
    fetch(`${authURL}/register`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        sendToAuth(data);
      })
      .catch((error) => console.log("error", error));
    setformState({});
  };

  const sendToAuth = (data) => {
    if (data && data.type === "click") data.preventDefault();
    const sanitizeFormStateForLogIn = { ...formState };
    delete sanitizeFormStateForLogIn.name;
    let body = JSON.stringify(sanitizeFormStateForLogIn);
    let options = {
      method: "POST",
      body: body,
      mode: "cors",
      headers: headers,
    };
    fetch(`${authURL}/login`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("user", data.user);
        localStorage.setItem("x-auth-token", data.token);
      })
      .then(() => window.location.replace("/"))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="auth-component">
      <form className="field-container border-shadow-radius">
        {isNewUser && (
          <div className="field-spacer">
            <label>Nombre de usuario </label>
            <input
              id="name"
              type="text"
              className="border-shadow-radius"
              onChange={handleChange}
            />
          </div>
        )}
        <div className="field-spacer">
          <label>Email</label>
          <input
            id="email"
            type="email"
            autoComplete="current-email"
            className="border-shadow-radius"
            onChange={handleChange}
          />
        </div>
        <div className="field-spacer">
          <label>Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="border-shadow-radius"
            onChange={handleChange}
          />
        </div>
        <button
          className="base-button"
          onClick={!isNewUser ? sendToAuth : registerUser}
        >
          {!isNewUser ? "Iniciar Sesion" : "Registrame"}
        </button>
        <br />
        o
        <br />
        <button
          className="option-toggle-button"
          onClick={mostrarFormularioDeRegistro}
        >
          {isNewUser ? "Iniciar Sesion" : "Registrame"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
