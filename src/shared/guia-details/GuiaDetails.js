/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../../App.scss";
import "./GuiaDetails.scss";
import { prepareCall } from "../../utils/fetchUtil";
import Moment from "react-moment";

function GuiaDetails({ match }) {
  const [id, setid] = useState([]);
  const [guia, setGuia] = useState(null);
  const [checked, setchecked] = useState();
  const history = useHistory();
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
    await prepareCall("DELETE", [id], null)
      .then(() => history.push("/"))
      .catch((error) => console.log(error));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchItem = async () => {
    let respose = await prepareCall("GET", [id]);
    let guia = await respose[0];
    console.log(guia);
    setGuia(guia);
  };
  useEffect(() => {
    fetchItem();
    setid(match.params.id);
    // setGuia(props.data);
    // setchecked(props.data.fueEnviado);
  }, [match.params.id]);

  return (
    <li className="list-component border-shadow-radius">
      {!!guia && (
        <div className="list-container">
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
              <div className="direccion-spacer calle">
                <p className="direccion-title">Calle</p>
                <p>{guia.calle}</p>
              </div>
              <div className="direccion-spacer numero">
                <p className="direccion-title">Numero</p>
                <p>{guia.numero}</p>
              </div>
              <div className="direccion-spacer unidad">
                <p className="direccion-title">Unidad</p>
                <p>{guia.unidad}</p>
              </div>
              <div className="direccion-spacer ciudad">
                <p className="direccion-title">Ciudad</p>
                <p>{guia.ciudad}</p>
              </div>
              <div className="direccion-spacer colonia">
                <p className="direccion-title">Colonia</p>
                <p>{guia.colonia}</p>
              </div>
              <div className="direccion-spacer estado">
                <p className="direccion-title">Estado</p>
                <p>{guia.estado}</p>
              </div>
              <div className="direccion-spacer pais">
                <p className="direccion-title">Pais</p>
                <p>{guia.pais}</p>
              </div>
              <div className="direccion-spacer codigo-postal">
                <p className="direccion-title">Codigo Postal</p>
                <p>{guia.codigoPostal}</p>
              </div>
            </div>
          </div>
          <div className="list-item-separator enviado-fecha">
            <div>
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
            <div>
              <div className="titulo">
                <p className="titulo-texto">Fecha</p>
              </div>
              <div className="data-item">
                <p>
                  <Moment format="DD/MM/YYYY">{guia.fecha}</Moment>
                </p>
              </div>
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
          </div>
        </div>
      )}
    </li>
  );
}
export default GuiaDetails;
