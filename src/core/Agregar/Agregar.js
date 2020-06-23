import React, { useState } from "react";
import "../../App.scss";
import "./Agregar.scss";
import { prepareCall } from "../../utils/fetchUtil";

function Agregar(props) {
  const [formState, setformState] = useState({});
  const handleChange = (ev) => {
    const id = ev.currentTarget.id;
    let value = ev.currentTarget.value;
    if (id === "fueEnviado") {
      value = ev.currentTarget.checked;
    } else if (id === "productos") {
      JSON.stringify([ev.currentTarget.value]);
      // productos.push(ev.currentTarget.value);
    } else {
      value = ev.currentTarget.value;
    }

    const newState = { ...formState };
    newState[id] = value;
    setformState(newState);
  };
  const guardarGuia = async () => {
    let guardarGuiaNueva = await prepareCall(
      "POST",
      null,
      JSON.stringify(formState)
    ).catch((err) => console.log(err));
    if (!!guardarGuiaNueva) {
      props.hideForm(true);
    }
  };
  return (
    <div className="agregar-component">
      <label>Paqueteria</label>
      <input type="text" id="paqueteria" onChange={handleChange} />
      <label># de Guia</label>
      <input type="number" id="numeroGuia" onChange={handleChange} />
      <label>Nombre</label>
      <input type="text" id="nombreCliente" onChange={handleChange} />
      <label>Calle</label>
      <input type="text" id="calle" onChange={handleChange} />
      <label>Numero/Unidad/Lt</label>
      <input type="number" id="numero" onChange={handleChange} />
      <label>Ciudad</label>
      <input type="text" id="ciudad" onChange={handleChange} />
      <label>Estado</label>
      <input type="text" id="estado" onChange={handleChange} />
      <label>Pais</label>
      <input type="text" id="pais" onChange={handleChange} />
      <label>Fecha</label>
      <input type="date" id="fecha" onChange={handleChange} />
      <label>Productos</label>
      <input type="text" id="productos" onChange={handleChange} />
      <label>Codigo postal</label>
      <input type="number" id="codigoPostal" onChange={handleChange} />
      <label>Fue enviado</label>
      <input type="checkbox" id="fueEnviado" onChange={handleChange} />
      <label>Verificado por</label>
      <input type="text" id="verificadoPor" onChange={handleChange} />
      <button className="base-button" onClick={guardarGuia}>
        Guardar
      </button>
    </div>
  );
}

export default Agregar;
