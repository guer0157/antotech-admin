import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";
import moment from "moment";
import { prepareCall, baseURL } from "../../utils/fetchUtil";
import Filtros from "../filtros-container/Filtros";

function ListContainer() {
  //useEfect with empty array [] = ComponentDIdMount;
  const toggleShowForm = (showToast) => {
    setShowForm(!showForm);
    if (!!showToast.type) {
      console.log(showToast);
    } else {
      setShowToast(true);
      let agregarGuias = [...guias];
      agregarGuias.push(showToast);
      guardarGuias(agregarGuias);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const [guias, guardarGuias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const toggleShowFiltros = () => {
    setshowFiltros(!showFiltros);
  };
  const fetchItems = async () => {
    let guiasResponse = await prepareCall("GET", null, null);
    // guiasResponse.map((guia) => moment(guia.fecha).format("MMM Do YYYY"));
    guardarGuias(guiasResponse);
  };
  const mostrarResultados = () => {};
  return (
    <div className="list-container-component">
      {showToast && (
        <div className="toast">
          <p>La guia ha sido guardada</p>
        </div>
      )}
      <button
        className={"base-button " + (showForm ? "danger" : "")}
        onClick={toggleShowForm}
      >
        {showForm ? "Cancelar" : "Agregar"}
      </button>
      <button className="base-button filtro" onClick={toggleShowFiltros}>
        Filtros
      </button>
      {showFiltros && <Filtros mostrarResultados={mostrarResultados} />}
      {showForm && <Agregar hideForm={toggleShowForm} />}
      <ul className="list-container">
        {guias.map((guia) => (
          <List key={guia._id} data={guia}></List>
        ))}
      </ul>
    </div>
  );
}

export default ListContainer;
