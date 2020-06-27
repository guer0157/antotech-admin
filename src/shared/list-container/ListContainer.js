/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";
import { prepareCall } from "../../utils/fetchUtil";
import Filtros from "../filtros-container/Filtros";

function ListContainer() {
  //useEfect with empty array [] = ComponentDIdMount;
  const toggleShowForm = (showToast) => {
    setShowForm(!showForm);
    if (!!showToast.type) {
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

  const [guias, guardarGuias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const toggleShowFiltros = () => {
    if (showFiltros) {
      fetchItems();
    }
    setshowFiltros(!showFiltros);
  };
  const fetchItems = async (data, method) => {
    switch (method) {
      case "filter":
        guardarGuias(data);
        break;
      case "delete":
        let nuevasGuias = [...guias];
        nuevasGuias.splice(data, 1);
        guardarGuias(nuevasGuias);
        break;
      default:
        let guiasResponse = await prepareCall("GET", null, null);
        guardarGuias(guiasResponse);
        break;
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
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
        {showFiltros ? "Cerrar" : "Filtros"}
      </button>
      {showFiltros && <Filtros mostrarResultados={fetchItems} />}
      {showForm && <Agregar hideForm={toggleShowForm} />}
      <ul className="list-container">
        {guias.map((guia, index) => (
          <List
            key={guia._id}
            id={index}
            data={guia}
            reloadGuias={fetchItems}
          ></List>
        ))}
      </ul>
    </div>
  );
}

export default ListContainer;
