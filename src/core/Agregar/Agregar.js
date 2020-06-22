import React, { useState } from "react";
import "../../App.scss";
import "./Agregar.scss";
import { prepareCall, baseURL } from "../../utils/fetchUtil";

function Agregar() {
  const [formState, setformState] = useState({});
  const handleChange = (ev) => {
    const id = ev.currentTarget.id;
    let value = ev.currentTarget.value;
    if (id === "fueEnviado") {
      value = ev.currentTarget.checked;
    } else {
      value = ev.currentTarget.value;
    }

    const newState = { ...formState };
    newState[id] = value;
    setformState(newState);
  };
  const guardarGuia = async () => {
    // console.log(formState);
    // prepareCall("POST", null, formState);
    console.log(formState);
    let body = JSON.stringify(formState);
    let opt = {
      method: "POST",
      body: body,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    fetch(baseURL, opt)
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="agregar-component">
      <label> paqueteria</label>
      <input type="text" id="paqueteria" onChange={handleChange} />
      <label>numeroGuia</label>
      <input type="number" id="numeroGuia" onChange={handleChange} />
      <label> nombreCliente</label>
      <input type="text" id="nombreCliente" onChange={handleChange} />
      <label>calle</label>
      <input type="text" id="calle" onChange={handleChange} />
      <label>calleNumero</label>
      <input type="number" id="numero" onChange={handleChange} />
      <label>ciudad</label>
      <input type="text" id="ciudad" onChange={handleChange} />
      <label> estado</label>
      <input type="text" id="estado" onChange={handleChange} />
      <label>pais</label>
      <input type="text" id="pais" onChange={handleChange} />
      <label>codigoPostal</label>
      <input type="number" id="codigoPostal" onChange={handleChange} />
      <label> fueEnviado</label>
      <input type="checkbox" id="fueEnviado" onChange={handleChange} />
      <label>verificadoPor</label>
      <input type="text" id="verificadoPor" onChange={handleChange} />
      <button className="base-button" onClick={guardarGuia}>
        Guardar
      </button>
    </div>
  );
}

export default Agregar;
