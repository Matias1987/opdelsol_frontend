
import { get } from "@/src/urls";
import ExportToCSV from "../ExportToCSV";

import { useEffect, useState } from "react";


const InformeEnvio = (props, ref) =>{

    const [content, setContent] = useState(null)
    const [itemsContent, setItemsContent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        //alert(urls.get.detalle_envio+props.idenvio)
        //load data from envio
        fetch(get.detalle_envio+props.idenvio)
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify( response))
            setContent(
                {
                    fecha: response.data[0].fecha,
                    //usuario: response.data[0].usuario,
                    cantidad: response.data[0].cantidad_total,
                    monto_total: 0,
                    sucursal: response.data[0].sucursal,
                    sucursal_origen: response.data[0].sucursal_origen,
                    id: response.data[0].idenvio,

                }
            )
            //now load data from items
            fetch(get.lista_envio_stock+props.idenvio)
            .then(_response=>_response.json())
            .then((_response)=>{

                setItemsContent(
                    _response.data.map((e)=>({
                    key: e.idenvio_has_stock,
                    codigo: e.codigo,
                    cantidad: e.cantidad
                    })))
                setLoading(false)

            })
        })
    },[])

    const contenido =  () => {
        return (<div style={{backgroundColor:"white"}}>
                {
                    typeof props.exportEnabled === 'undefined' ? <></> : <ExportToCSV parseFnt={ ()=>{
                    let str = `Fecha:, ${content.fecha}, Nro.:,${content.id},\r\nOrig.:,${content.sucursal_origen},Dest.:,${content.sucursal},\r\nCant. Total:,${content.cantidad},,,\r\n,,,,\r\n `

                    itemsContent.forEach(i=>{str+=`"${i.codigo}",${i.cantidad},,,\r\n`})

                    return str;
                }} />
                }
                <div style={{padding: "4em"}}>
                    <div style={{textAlign:"center"}}>
                        <h2 style={{all:"initial"}}><u>Resumen Env&iacute;o</u></h2>
                    </div>
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td><h4>Optica Del Sol</h4></td>
                                <td>Fecha: <b>{content.fecha}</b></td>
                            </tr>
                            <tr>
                                <td>Nro. Envio: &nbsp; <b>{content.id}</b></td>
                                <td style={{fontSize:"1.2em"}}>Sucursal Destino: &nbsp; <b>{content.sucursal}</b></td>
                                <td style={{fontSize:".7em"}}>Sucursal Origen: &nbsp; {content.sucursal_origen}</td>
                            </tr>
                            <tr>
                                <td>Cantidad: &nbsp; <b>{content.cantidad}</b></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                    <br />
                    <table style={{border:"1px solid", width: "100%"}}>
                        <thead>
                            <tr>
                                <th>
                                    C&oacute;digo
                                </th>
                                <th>
                                    Cantidad
                                </th>
                                {/*<th>
                                    Precio
                                </th>
                                <th>
                                    Total
        </th>*/}
                            </tr>
                        </thead>
                        <tbody>
                        {
                            itemsContent.map(r=>(
                                <tr>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{r.codigo}</td>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{r.cantidad}</td>
                                    {/*<td style={{border:"1px solid",textAlign:"center"}}>{0}</td>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{0}</td>*/}
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <br />
                </div>
                </div>
            )

    }

    return (
        loading ? null : contenido()
    )

}

export default InformeEnvio;

