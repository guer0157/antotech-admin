import React, { useState } from "react";
import "../../App.scss";
import "./Filtros.scss";
import "../../data/fields";
import { fields } from "../../data/fields";
import { baseURL } from "../../utils/fetchUtil";

function Filtros(props) {
  const [filter, setfilter] = useState("free-text");
  const [inputValue, setInputValue] = useState("calle");
  const [field, setField] = useState("calle");
  const determineInput = (ev) => {
    let target = ev.currentTarget.value;
    let filtro;
    if (
      target === "calle" ||
      target === "ciudad" ||
      target === "pais" ||
      target === "paqueteria" ||
      target === "nombreCliente" ||
      target === "productos" ||
      target === "verificadoPor" ||
      target === "estado"
    ) {
      filtro = "free-text";
    } else {
      filtro = target;
    }
    setField(target);
    setfilter(filtro);
  };

  const saveInputValue = (ev) => {
    let target = ev.currentTarget.value;
    // if (filter === "fecha") {
    //   let split = target.split("-");
    //   target = `${split[2]}-${split[1]}-${split[0]}`;
    // }
    setInputValue(target);
  };
  const fetchFilterQuery = async () => {
    console.log(`${baseURL}/${field}/${inputValue}`);
    await fetch(`${baseURL}/${filter}/${inputValue}`)
      .then((re) => re.json())
      .then((d) => console.log(d));
    // let guias = await response.json();
    // props.mostrarResultados(guias);
  };
  return (
    <div className="filtros-component">
      <div className="filtro-list">
        <label>Seleccionar Filtro</label>
        <select
          id="fields"
          className="border-shadow-radius select"
          defaultValue="calle"
          onChange={determineInput}
        >
          {fields.map((field, i) => (
            <option key={i} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
      <div className="input-container">
        {filter === "free-text" && (
          <input
            className="border-shadow-radius"
            type="text"
            placeholder="Escribe aqui"
            onChange={saveInputValue}
          />
        )}
        {filter === "codigoPostal" && (
          <input
            placeholder="Escribe aqui"
            className="border-shadow-radius"
            type="number"
            minLength="5"
            maxLength="8"
            onChange={saveInputValue}
          />
        )}
        {filter === "fecha" && (
          <input
            className="border-shadow-radius"
            placeholder="Escribe aqui"
            type="date"
            onChange={saveInputValue}
          />
        )}
        {filter === "fueEnviado" && (
          <input
            className="border-shadow-radius"
            placeholder="Escribe aqui"
            type="checkbox"
            onChange={saveInputValue}
          />
        )}
        {filter === "numero" && (
          <input
            className="border-shadow-radius"
            placeholder="Escribe aqui"
            type="number"
            onChange={saveInputValue}
          />
        )}
        {filter === "numeroGuia" && (
          <input
            className="border-shadow-radius"
            placeholder="Escribe aqui"
            type="number"
            minLength="12"
            onChange={saveInputValue}
          />
        )}
      </div>
      <button className="base-button" onClick={fetchFilterQuery}>
        Buscar
      </button>
    </div>
  );
}

export default Filtros;
