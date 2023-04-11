import * as React from "react";

const { Spin } = require("antd")
const { useEffect, useState} = require("react")
const urls = require("../../src/urls");

const InformeEnvio = (props, ref) =>{

    const [content, setContent] = useState(null)
    const [itemsContent, setItemsContent] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        //load data from envio
        fetch(urls.get.detalle_envio+props.idenvio)
        .then(response=>response.json())
        .then((response)=>{
            
            setContent(
                {
                    fecha: response.data.fecha,
                    usuario: response.data.usuario,
                    cantidad: response.data.cantidad,
                    monto_total: 0,
                    sucursal: response.data.sucursal,
                    id: response.data.idenvio
                }
            )
            //now load data from items
            fetch(urls.get.lista_envio_stock+props.idenvio)
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

    const Content =  () => {
        return (<>
                <div style={{padding: "4em"}}>
                    <div style={{textAlign:"center"}}>
                        <h2><u>Resumen Env&iacute;o</u></h2>
                    </div>
                    <table style={{width:"100%"}}>
                        <tbody>
                            <tr>
                                <td><h4>Optica Del Sol</h4></td>
                                <td>Fecha: <b>00/00/0000</b></td>
                            </tr>
                            <tr>
                                <td>Nro. Envio: &nbsp; <b>{content.id}</b></td>
                                <td>Sucursal: &nbsp; <b>{content.sucursal}</b></td>
                            </tr>
                            <tr>
                                <td>Cantidad: &nbsp; <b>{content.cantidad}</b></td>
                                <td>Usuario: &nbsp; <b>{content.usuario}</b></td>
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
                                <th>
                                    Precio
                                </th>
                                <th>
                                    Total
                                </th>
                            </tr>
                        </thead>
                        {
                            itemsContent.map(r=>(
                                <tr>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{r.codigo}</td>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{r.cantidad}</td>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{0}</td>
                                    <td style={{border:"1px solid",textAlign:"center"}}>{0}</td>
                                </tr>
                            ))
                        }
                    </table>
                    <br />
                </div>
                </>
            )

    }

    return (
        loading ? null : <Content />
    )

}

export default InformeEnvio;

