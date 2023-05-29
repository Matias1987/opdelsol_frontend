import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeEnvio from "@/components/informes/InformeEnvio";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Divider, Spin } from "antd";

const { useEffect, useState } = require("react")

const DetalleStock = (props) => {
    const [loadingSucursales, setLoadingSucursales] = useState(true)
    const [loadingDetalles, setLoadingDetalles] = useState(true)
    const [loadingEnvios, setLoadingEnvios] = useState(true)

    const [dataSucursales, setDataSucursales] = useState(null)
    const [dataDetalles, setDataDetalles] = useState(null)
    const [dataEnvios, setDataEnvios] = useState(null)

    const url_stock_sucursales = get.stock_codigo_sucursales;//idcodigo
    const url_detalle_stock = get.detalle_stock;//:idsucursal/:idcodigo
    const url_envios = get.obtener_envios_codigo;//idcodigo
    const idsucursal = globals.obtenerSucursal();
    const [reload,setReload] = useState(false);

    var error_margin = 100;

    

    //get stock sucursales
    useEffect(()=>{

        if(typeof props.idcodigo === 'undefined') {
            alert("codigo no establecido");
            return;
        }

        fetch(url_stock_sucursales + props.idcodigo )
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setDataSucursales(
                response.data.map(r=>(
                    {
                        sucursal: r.sucursal,
                        cantidad: r.cantidad,
                    }
                ))
            )

            setLoadingSucursales(false)

        });
        //get detalles
        fetch(url_detalle_stock + idsucursal + "/" + props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            setDataDetalles(
                response.data[0]
            )
            setLoadingDetalles(false)
        });

        //get envios
        //alert(url_envios + props.idcodigo)
        fetch(url_envios + props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            
            setDataEnvios(
                response.data.map(r=>(
                    {
                        nro_envio: r.nroenvio,
                        cantidad: r.cantidad,
                        
                    }
                ))
            )
            setLoadingEnvios(false)
        });
    },[reload])
    
    const Envios = _ => (
        loadingEnvios ? <Spin /> : 
        <div style={{height: "210px", overflowY:"scroll", padding:".1em", margin:"1em", backgroundColor:"#E1EEFF"}}>
            <table  border={"0"} style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th colSpan={2}>Envios</th>

                    </tr>
                    <tr>
                        <th>Nro. Env&iacute;o&nbsp;&nbsp;&nbsp;</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataEnvios.map(r=>(
                            <tr>
                                <td style={{textAlign:"center"}}>
                                    <CustomModal openButtonText={"#"+r.nro_envio} title="Detalle Envio" onOk={()=>{}}>
                                        <PrinterWrapper>
                                            <InformeEnvio idenvio={r.nro_envio}/>
                                        </PrinterWrapper>
                                    </CustomModal>
                                </td>
                                <td style={{textAlign:"center"}}>{r.cantidad}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )



    const Detalle = _ => (
        loadingDetalles ? <Spin /> : 
        <>
            <table border={"0"}  >
                <tbody>
                    <tr>
                        <td>C&oacute;digo:</td>
                        <td><h1>{dataDetalles.codigo}</h1></td>
                    </tr>
                    <tr>
                        <td>Descripci&oacute;n:</td>
                        <td><b><i>{dataDetalles.descripcion}</i></b></td>
                    </tr>
                    <tr>
                        <td>Cantidad:</td>
                        <td><b>{dataDetalles.cantidad}</b></td>
                    </tr>
                    <tr>
                        <td style={{width:"30%"}}>Costo: <b>${dataDetalles.costo}</b></td>
                        <td style={{width:"30%"}}>Multiplicador: <b>{dataDetalles.multiplicador}</b></td>
                        <td style={{width:"auto"}}><i>Precio:&nbsp;
                        
                        {parseFloat(dataDetalles.costo) * parseFloat(dataDetalles.multiplicador)}</i>

                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"darkblue", fontSize: "1.10em"}}>Redondeo:&nbsp;
                        <b>${ 
                            Math.round(parseFloat(dataDetalles.costo) * parseFloat(dataDetalles.multiplicador) * (1/error_margin)) * error_margin
                        }</b></span></td>
                        
                    </tr>
                    <tr>
                        <td>G&eacute;nero:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Edad:</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )

    const CantidadSucursales = _ => (
        
            loadingSucursales ? <Spin /> : 
            <>
            <h4>Stock Sucursales</h4>
            <div  style={{display:"flex", flexDirection:"row", justifyContent:"left", flexWrap: "wrap"}}>
                {dataSucursales.map(r=>
                    <div style={{padding:".5em", backgroundColor:"lightblue", margin:".2em"}}>
                        <span style={{color:"red"}}>{r.sucursal}: <b>{r.cantidad}</b></span>
                    </div>
                )}
            </div>
            </>
        
    )

    return (
        <>
        <CustomModal
            openButtonText={"Detalles"}
            title={"Detalles"}
            onOk={()=>{}}
            onCancel={()=>{}}
            onOpen={
                ()=>{
                    setReload(!reload)
                }
            }
            >
                <Detalle />
                <Divider />
                <CantidadSucursales />
                <Divider />
                <Envios />
            </CustomModal>
        </>
    )
}

export default DetalleStock;