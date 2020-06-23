import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";

function ListContainer() {
  //useEfect with empty array [] = ComponentDIdMount;
  const toggleShowForm = (showToast) => {
    setShowForm(!showForm);
    if (showToast === true) {
      setShowToast(true);
    }
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const [guias, guardarGuias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fetchItems = async () => {
    const call = await fetch("https://guiasapi.czarware.tech/api/guias");
    const body = await call.json();
    console.log(body);
    guardarGuias(body);
  };
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
