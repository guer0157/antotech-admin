import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./ListContainer.scss";
import List from "../../shared/list/List";
import Agregar from "../../core/Agregar/Agregar";
import moment from 'moment';
import { prepareCall } from "../../utils/fetchUtil";

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
  const fetchItems = async () => {
      let guiasResponse = await prepareCall("GET", null, null);
     let sortedGuias=guiasResponse.sort((a, b)=>{
         const aFecha=moment(a.fecha).format("DD-MM-YYYY");
        const bFecha=moment(b.fecha).format("DD-MM-YYYY");
         return aFecha<bFecha?1:aFecha>bFecha?-1:0;
});
    guardarGuias(sortedGuias);
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
