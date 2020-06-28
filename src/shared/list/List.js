import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.scss";
import "./List.scss";
import { prepareCall } from "../../utils/fetchUtil";
import Moment from "react-moment";

function List(props) {
  const [id, setid] = useState([]);
  const [guia, setGuia] = useState([]);
  const [checked, setchecked] = useState();
  const marcarComoEnviado = async (ev) => {
    setchecked(ev.currentTarget.checked);
    let data = JSON.stringify({
      fueEnviado: ev.currentTarget.checked,
    });
    await prepareCall("PUT", [id], data);
  };
  const deleteItem = async (ev) => {
    const id = ev.currentTarget.id;
    // eslint-disable-next-line no-restricted-globals
    let confirmo = confirm("Esta seguro que quieres borrar esta guia?");
    if (!confirmo) return;
    // let data = JSON.stringify({ archivado: true });
    // await prepareCall("PUT", [id], data)
    await prepareCall("DELETE", [id], null)
      .then(() => props.reloadGuias(props.id, "delete"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setid(props.data._id);
    setGuia(props.data);
    setchecked(props.data.fueEnviado);
  }, [props.data._id, props.data.fueEnviado, props.data]);

  return (
    <li className="list-component border-shadow-radius">
      <Link to={`/detalles/${guia._id}`}>
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
      {/* <div className="list-item-separator">
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
          <div className="direccion-spacer">
            <p className="direccion-title">Calle</p>
            <p>{guia.calle}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Numero</p>
            <p>{guia.numero}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Unidad</p>
            <p>{guia.unidad}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Ciudad</p>
            <p>{guia.ciudad}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Colonia</p>
            <p>{guia.colonia}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Estado</p>
            <p>{guia.estado}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Pais</p>
            <p>{guia.pais}</p>
          </div>
          <div className="direccion-spacer">
            <p className="direccion-title">Codigo Postal</p>
            <p>{guia.codigoPostal}</p>
          </div>
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
            value={checked}
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
      <div className="list-item-separator eliminar">
        <button className="data-item" id={guia._id} onClick={deleteItem}>
          Archivar
        </button>
      </div> */}
    </li>
  );
}

export default List;
