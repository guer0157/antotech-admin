import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.scss";
import "./List.scss";
import Moment from "react-moment";

function List(props) {
  const [id, setid] = useState([]);
  const [guia, setGuia] = useState([]);

  useEffect(() => {
    setid(props.data._id);
    setGuia(props.data);
  }, [props.data._id, props.data.fueEnviado, props.data]);

  return (
    <li className="list-component border-shadow-radius">
      <Link to={`/detalles/${id}`}>
        <div className="list">
          <div>
            <p>Numero de Guia</p>
            <p>{guia.numeroGuia}</p>
          </div>
          <div>
            <p>Cliente</p>
            <p>{guia.nombreCliente}</p>
          </div>
          <div>
            <p>Fecha de envio</p>
            <Moment format="DD/MM/YYYY">{guia.fecha}</Moment>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default List;
