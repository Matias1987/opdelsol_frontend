import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeEnvio from "@/components/informes/InformeEnvio";
import { get } from "@/src/urls";
import { Spin } from "antd";
import { useEffect, useState } from "react"

const EnviosCodigos = (props) => {
    const [dataEnvios, setDataEnvios] = useState(null)
    const [loadingEnvios, setLoadingEnvios] = useState(true)
    const url_envios = get.obtener_envios_codigo;//idcodigo

    useEffect(()=>{

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
                        sucursal: r.sucursal,
                        
                    }
                ))
            )
            setLoadingEnvios(false)
        });

    },[])
    return loadingEnvios ? <Spin /> : 
    <div style={{height: "210px", overflowY:"scroll", padding:".1em", margin:"1em", }}>
        <table  border={"0"} style={{width:"100%"}}>
            <thead>
                <tr>
                    <th colSpan={2}>Envios</th>

                </tr>
                <tr>
                    <th>Nro. Env&iacute;o&nbsp;&nbsp;&nbsp;</th>
                    <th>Cantidad</th>
                    <th>Sucursal</th>
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
                            <td style={{textAlign:"center"}}>{r.sucursal}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
}

export default EnviosCodigos