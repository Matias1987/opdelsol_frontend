import { Spin }  from "antd"

const ClienteDetalleCobro = ({dataCliente}) =>{

    return dataCliente == null ? (
      <Spin />
    ) : (
      <>
        <b>Cliente:&nbsp;{dataCliente.nombre} </b> &nbsp;&nbsp; DNI:{" "}
        <b>{dataCliente.dni}</b>&nbsp; Tel&eacute;fono: {dataCliente.telefono1}
        &nbsp; Direcci&oacute;n: {dataCliente.direccion}&nbsp;
      </>
    )
}

export default ClienteDetalleCobro;