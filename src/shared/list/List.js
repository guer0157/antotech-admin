import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./List.scss";
import { Link } from "react-router-dom";
import { prepareCall } from "../../utils/fetchUtil";
import Moment from "react-moment";

function List(props) {
  const [id, setid] = useState([]);
  //   const [guia, setGuia] = useState([]);
  const [checked, setchecked] = useState();
  const marcarComoEnviado = async (ev) => {
    setchecked(ev.currentTarget.checked);
    console.log(id, "IDDDD", ev.currentTarget.checked, checked);
    let p = await prepareCall("PUT", [id], {
      fueEnviado: ev.currentTarget.checked,
    });
    console.log(p);
  };

  useEffect(() => {
    setid(props.data._id);
    // setGuia(props.data);
    setchecked(props.data.fueEnviado);
  }, [props.data._id, props.data.fueEnviado]);
  const guia = props.data;
  return (
    <li className="list-component border-shadow-radius">
      <div className="list-item-separator">
        <div className="titulo">
          <p className="titulo-texto">Paqueteria</p>
        </div>
        <div className="data-item">
          <p>{guia.paqueteria}</p>
          <p>{guia.numeroGuia}</p>
        </div>
      </div>
      <div className="list-item-separator">
        <div className="titulo">
          <p className="titulo-texto">Nombre</p>
        </div>
        <div className="data-item">
          <p>{guia.nombreCliente}</p>
        </div>
      </div>
      <div className="list-item-separator direccion">
        <div className="titulo">
          <p className="titulo-texto">Direccion</p>
        </div>
        <div className="data-item">
          <p>{guia.calle + ","}</p>
          <p>{guia.numero + ","}</p>
          <p>{guia.ciudad + ","}</p>
          <p>{guia.estado + ","}</p>
          <p>{guia.pais + "."}</p>
          <p>{guia.codigoPostal}</p>
        </div>
      </div>
      <div className=" list-item-separator enviado">
        <div className="titulo">
          <p className="titulo-texto">Ya se envio?</p>
        </div>
        <div className="data-item">
          <input
            name="fueEnviado"
            type="checkbox"
            checked={checked}
            onChange={marcarComoEnviado}
          />
        </div>
      </div>
      <div className=" list-item-separator fecha">
        <div className="titulo">
          <p className="titulo-texto">Fecha</p>
        </div>
        <div className="data-item">
          <p>
            <Moment format="DD/MM/YYYY">{guia.fecha}</Moment>
          </p>
        </div>
      </div>
      <div className=" list-item-separator productos">
        <div className="titulo">
          <p className="titulo-texto">Productos</p>
        </div>
        <div className="data-item">
          <p>{guia.productos}</p>
        </div>
      </div>
      <div className="list-item-separator verificado">
        <div className="titulo">
          <p className="titulo-texto">Quien verifico?</p>
        </div>
        <div className="data-item">
          <p>{guia.verificadoPor}</p>
        </div>
      </div>
      <div className="list-item-separator">
        <div className="data-item link">
          <Link to={`/detalles/${guia._id}`}>Mas detalles</Link>
        </div>
      </div>
    </li>
  );
}

export default List;
