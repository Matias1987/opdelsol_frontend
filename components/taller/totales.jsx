import { useState } from "react";

const ContadoresEstadoTaller = (props) => {
  const [data, setData] = useState({
    total: 0,
    lab: 0,
    calibrado: 0,
    pedido: 0,
  });
  return (
    <>
      <span>Laboratorio:&nbsp;</span> <span style={{color:"red", fontWeight:"600"}}>{data.lab}</span>&nbsp;&nbsp; 
      <span>Calibrado:&nbsp;</span> <span style={{color:"red", fontWeight:"600"}}>{data.calibrado}</span>&nbsp;&nbsp; 
      <span>Pedido:&nbsp;</span> <span style={{color:"red", fontWeight:"600"}}>{data.pedido}</span>&nbsp;&nbsp; 
      <span>Total:&nbsp;</span><span style={{color:"red", fontWeight:"600"}}>{data.total}</span>
    </>
  );
};

export default ContadoresEstadoTaller