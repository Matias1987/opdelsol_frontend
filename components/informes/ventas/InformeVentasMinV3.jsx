import Anotaciones from "@/components/anotacion/anotaciones"
import ListaCobros from "@/components/forms/caja/ListaCobros"
import { get } from "@/src/urls"
import { Spin } from "antd"

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

const InformeVentaMinV3 = (props) => {
    const [data, setData] = useState(null)
	const [mp, setMP] = useState([])
	const [haber, setHaber] = useState(null)
    const [loading, setLoading] = useState(true)
    const url= get.venta;
    const url_mp = get.get_venta_mp;

    useEffect(()=>{

        setLoading(true)
        fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{

			fetch(url_mp + props.idventa)
			.then(_response=>_response.json())
			.then((_response)=>{

				setMP(_response.data)

				var total_haber=0;

				_response.data.forEach(r=>{
					if(r.modo_pago!='ctacte')
					{
						total_haber += parseFloat(r.monto)
					}
				})

				setData({...response.data[0], total_haber: total_haber})
                setLoading(false)
				
			})	
		})

    },[])

    const productos = () => {
		//alert(data.tipo)
        switch(+data.tipo)
        {
            case 1: return <VentaDirectaItems idventa={data.idventa} /> ;
            case 2: return <RecStockItems idventa={data.idventa} /> ;
            case 6: return <LCLabItems idventa={data.idventa} /> ;
            case 3: return  <LCStockItems idventa={data.idventa} />;
            case 5: return  <MultifLabItems idventa={data.idventa} />;
            case 4: return  <MonofLabItems idventa={data.idventa} />;
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
		data === null ? <Spin /> :
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
											 tipo_venta(data.tipo)
											}
                                            </b>
                                            <br />
										    Vendedor: <b>{data.usuario_nombre}</b>
                                            <br />
										</td>
									</tr>
                                    <tr>
                                        <td>
                                        <FechaEntregaInf data={data} />
                                        </td>
                                        <td>
                                        <b>Montos Totales:</b>
                                        <MontosTotalesInf data={data}/>
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
											<ResponsableInf id={data.cliente_idcliente}/>
											<DestinatarioInf id={data.fk_destinatario} />
											<hr />
											{data.obra_social!="" ? "Obra Social: "+data.obra_social : ""}<br /> {data.medico!="" ? "Medico: " + data.medico : ""} <br />Fecha de Entrega: {data.fecha_entrega_formated + "  " + (data.hora_retiro == "null" ? "-" : data.hora_retiro)}
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
											<ModoPagoInf idventa={data.idventa} />
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
							{data.comentarios}
						</td>
					</tr>
				</tbody>
			</table>
			</div>
			<hr />
			<h3>Lista de Cobros</h3>
			<ListaCobros idventa={data.idventa} readOnly={true} />
			<h3>Anotaciones</h3>
			<Anotaciones idref={data.idventa} tipo={"VENTA"}  />
		</>
    )
}

export default InformeVentaMinV3;