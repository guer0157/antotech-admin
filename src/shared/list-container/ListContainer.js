import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";

function ListContainer() {
  //useEfect with empty array [] = ComponentDIdMount;
  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  useEffect(() => {
    fetchItems();
  }, []);
  const [guias, guardarGuias] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const fetchItems = async () => {
    const call = await fetch("https://guiasapi.czarware.tech/api/guias");
    const body = await call.json();
    console.log(body);
    guardarGuias(body);
  };
  return (
    <div className="list-container-component">
      <button className="base-button" onClick={toggleShowForm}>
        {showForm ? "Cancelar" : "Agregar"}
      </button>
      {showForm && <Agregar />}
      <ul className="list-container">
        {guias.map((guia) => (
          <List key={guia._id} data={guia}></List>
        ))}
      </ul>
    </div>
  );
}

export default ListContainer;
