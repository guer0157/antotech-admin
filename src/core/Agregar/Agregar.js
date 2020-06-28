import React, { useState } from "react";
import "../../App.scss";
import "./Agregar.scss";
import { prepareCall } from "../../utils/fetchUtil";
import moment from "moment";

function Agregar(props) {
  const [formState, setformState] = useState({});
  const [error, setError] = useState(null);
  const handleChange = (ev) => {
    const id = ev.currentTarget.id;
    let value = ev.currentTarget.value;
    if (id === "fueEnviado") {
      value = ev.currentTarget.checked;
    } else if (id === "productos") {
      value = ev.currentTarget.value;
    } else if (id === "fecha") {
      let target = moment(ev.currentTarget.value).toISOString().split("T");
      value = target[0] + "T00:00:00.000Z";
    } else {
      value = ev.currentTarget.value;
    }

    const newState = { ...formState };
    newState[id] = value;
    setformState(newState);
  };
  const guardarGuia = async () => {
    await prepareCall("POST", null, JSON.stringify(formState))
      .then((guiaNueva) => props.hideForm(guiaNueva))
      .catch((err) => toggleErrorToast(err));
  };
  const toggleErrorToast = (err) => {
    error === null ? setError(err.message) : setError(null);
  };
  return (
    <div className="agregar-component">
      {error && (
        <div className="toast">
          <div className="close-icon" onClick={toggleErrorToast}>
            X
          </div>
          <div className="error">{error}</div>
        </div>
      )}
      <label>Paqueteria</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="paqueteria"
        onChange={handleChange}
      />
      <label># de Guia</label>
      <input
        className="border-shadow-radius"
        type="number"
        id="numeroGuia"
        onChange={handleChange}
      />
      <label>Nombre</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="nombreCliente"
        onChange={handleChange}
      />
      <label>Calle</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="calle"
        onChange={handleChange}
      />
      <label>Numero de Calle</label>
      <input
        className="border-shadow-radius"
        type="number"
        id="numero"
        onChange={handleChange}
      />
      <label>Unidad/Lote</label>
      <input
        className="border-shadow-radius"
        type="numero"
        id="unidad"
        onChange={handleChange}
      />
      <label>Colonia/Manzana</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="colonia"
        onChange={handleChange}
      />
      <label>Ciudad</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="ciudad"
        onChange={handleChange}
      />
      <label>Estado</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="estado"
        onChange={handleChange}
      />
      <label>Codigo postal</label>
      <input
        className="border-shadow-radius"
        type="number"
        id="codigoPostal"
        onChange={handleChange}
      />
      <label>Pais</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="pais"
        onChange={handleChange}
      />
      <label>Fecha</label>
      <input
        className="border-shadow-radius"
        type="date"
        id="fecha"
        onChange={handleChange}
      />
      <label>Productos</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="productos"
        onChange={handleChange}
      />
      <label>Fue enviado</label>
      <input
        className="checkbox"
        type="checkbox"
        id="fueEnviado"
        onChange={handleChange}
      />
      <label>Verificado por</label>
      <input
        className="border-shadow-radius"
        type="text"
        id="verificadoPor"
        onChange={handleChange}
      />
      <button className="base-button" onClick={guardarGuia}>
        Guardar
      </button>
    </div>
  );
}

export default Agregar;
