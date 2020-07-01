/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";
import { prepareCall } from "../../utils/fetchUtil";
import Filtros from "../filtros-container/Filtros";

function ListContainer(props) {
  //useEfect with empty array [] = ComponentDIdMount;
  const [guias, guardarGuias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showFiltros, setshowFiltros] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const history = useHistory();
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
        let guiasResponse = await prepareCall("GET", null, null).catch(
          (err) => {
            setShowToast(!showToast);
            setTimeout(() => {
              history.push("Auth");
            }, 3000);
            return;
          }
        );
        let response = await guiasResponse;
        if (!!response) {
          setisLoggedIn(true);
          console.log("believe", response);
          guardarGuias(response);
        }
        break;
    }
  };
  useEffect(() => {
    fetchItems();
  }, [props.location]);
  return (
    <div className="list-container-component">
      {((!isLoggedIn && showToast) || (isLoggedIn && showToast)) && (
        <div className="toast">
          <p>
            {!isLoggedIn
              ? "Para ver las guias necesitas iniciar sesion en el portal de adminitrador. Seras redirigido en unos segundos"
              : "La guia ha sido guardada"}
          </p>
        </div>
      )}
      {!!guias && (
        <div>
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
      )}
    </div>
  );
}

export default ListContainer;
