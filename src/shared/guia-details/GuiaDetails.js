import React, { useEffect } from "react";
import "../../App.scss";
import "./GuiaDetails.scss";

function GuiaDetails({ match }) {
  useEffect(() => {
    const fetchItem = async () => {
      const call = await fetch(
        `https://guiasapi.czarware.tech/api/guias/${match.params.id}`
      );
      const body = await call.json();
    };
    fetchItem();
  }, [match.params.id]);
  //   const [guia, guardarGuias] = useState([]);

  return (
    <li className="guia-details-component">
      <p>Hi</p>
    </li>
  );
}

export default GuiaDetails;
