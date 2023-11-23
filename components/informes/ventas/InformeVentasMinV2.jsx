import { get } from "@/src/urls"
import { Spin, Tag } from "antd"
import Barcode from "react-barcode"

const { useState, useEffect } = require("react")
const { default: VentaDirectaItems } = require("./VentaDirectaItems")
const { default: RecStockItems } = require("./RecStockItems")
const { default: LCLabItems } = require("./LCLabItems")
const { default: LCStockItems } = require("./LCStockItems")
const { default: MultifLabItems } = require("./MultifLabItems")
const { default: MonofLabItems } = require("./MonofLabItems")
const { default: FechaEntregaInf } = require("./common/FechaRetiroInf")
const { default: MontosTotalesInf } = require("./common/MontosTotales")
const { default: ModoPagoInf } = require("./common/ModoPago")
const { default: DestinatarioInf } = require("./common/Destinatario")
const { default: ResponsableInf } = require("./common/Responsable")
const { default: DataSucursalInf } = require("./common/DataSucursalInf")

const InformeVentaMinV2 = (props) => {

    const productos = () => {
		//alert(data.tipo)
        switch(+props.data.tipo)
        {
            case 1: return <VentaDirectaItems idventa={props.data.idventa} /> ;
            case 2: return <RecStockItems idventa={props.data.idventa} /> ;
            case 6: return <LCLabItems idventa={props.data.idventa} /> ;
            case 3: return  <LCStockItems idventa={props.data.idventa} />;
            case 5: return  <MultifLabItems idventa={props.data.idventa} />;
            case 4: return  <MonofLabItems idventa={props.data.idventa} />;
        }
    }
	const tipo_venta = (tipo) => {
		switch(+tipo)
		{
			case 1: return "VENTA DIRECTA"; 
			case 2: return "RECETA STOCK"; 
			case 3: return "LENTES DE CONTACTO STOCK"; 
			case 4: return "MONOFOCALES LABORATORIO"; 
			case 5: return "MULTIFOCALES LABORATORIO"; 
			case 6: return "LENTES DE CONTACTO LABORATORIO"; 
		}
	}
    return (
		props.data === null ? <Spin /> :
        <>
			<div style={{width: '90%', paddingLeft: '12px', paddingRight: '12px', paddingTop: '20px', }}> 
			<table style={{height: '78px', width:'96%', border:'1', cellspacing:'0', cellpadding:'0', fontSize:"1em", padding:"0"}}>
				<tbody>
					<tr>
						<td>
							<table style={{height: '21px', width:'100%', border:'1', cellspacing:'0', cellpadding:'0',}}>
								<tbody>
									<tr>
										<td width='250px' colSpan={2}>
                                            <b>{
											 tipo_venta(props.data.tipo)
											}
                                            </b>
                                            <br />
										    Vendedor: <b>{props.data.usuario_nombre}</b>
                                            <br />
										</td>
									</tr>
                                    <tr>
                                        <td>
                                        <FechaEntregaInf data={props.data} />
                                        </td>
                                        <td>
                                        <b>Montos Totales:</b>
                                        <MontosTotalesInf data={props.data}/>
                                        </td>
                                    </tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							<table style={{height: '21px', width:'100%'}} >
								<tbody>
									<tr>
										<td>
											<ResponsableInf id={props.data.cliente_idcliente}/>
											<DestinatarioInf id={props.data.fk_destinatario} />
											<hr />
											{props.data.obra_social!="" ? "Obra Social: "+props.data.obra_social : ""}<br /> {props.data.medico!="" ? "Medico: " + props.data.medico : ""} <br />Fecha de Entrega: {props.data.fecha_entrega_formated + "  " + (props.data.hora_retiro == "null" ? "-" : props.data.hora_retiro)}
										</td>
										<td width='250px'>
										
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr >
						<td style={{textAlign: 'center', padding:"0"}}>
						{
							//<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
						}
						</td>
					</tr>
					<tr>
						<td>
							{productos()}
						</td>
					</tr>
					<tr>
						<td>
							<table width='100%' border='0' cellspacing='0' cellpadding='0'>
								<tbody>
									<tr>
										<td>
											<ModoPagoInf idventa={props.data.idventa} />
										</td>
										<td>&nbsp;&nbsp;</td>
										<td width='250px'>
											
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
					<tr>
						<td>
							{props.data.comentarios}
						</td>
					</tr>
				</tbody>
			</table>
			</div>
		</>
    )
}

export default InformeVentaMinV2;