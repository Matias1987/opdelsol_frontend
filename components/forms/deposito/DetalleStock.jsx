import CustomModal from "@/components/CustomModal";
import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Col, Divider, Row, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import StockCodigosSucursales from "./StockCodigoSucursales";


const DetalleStock = (props) => {
    
    const [loadingDetalles, setLoadingDetalles] = useState(true)
    

    
    const [dataDetalles, setDataDetalles] = useState(null)
    
    const [descripcionSubgrupo, setDescripcionSubgrupo] = useState(null)

    
    const url_detalle_stock = get.detalle_stock;//:idsucursal/:idcodigo
    
    const idsucursal = globals.obtenerSucursal();
    const [reload,setReload] = useState(false);


    //get stock sucursales
    useEffect(()=>{

        if(typeof props.idcodigo === 'undefined') {
            alert("codigo no establecido");
            return;
        }

        //get detalles
        fetch(url_detalle_stock + idsucursal + "/" + props.idcodigo)
        .then(response=>response.json())
        .then((response)=>{
            setDataDetalles(
                response.data[0]
            )
            setLoadingDetalles(false)

            if(response.data.length>0){
                //alert(get.descripcion_cat_subgrupo+response.data[0].idsubgrupo)
                fetch(get.descripcion_cat_subgrupo+response.data[0].idsubgrupo)
                .then(__r=>__r.json())
                .then(_resp=>{
                    //alert(JSON.stringify(_resp))
                    if((_resp.data||[]).length>0)
                    {
                        setDescripcionSubgrupo(r=>({
                            titulo: _resp.data[0].titulo,
                            descripcion: _resp.data[0].descripcion,
                        }))
                    }
                })
            }
            
                

        });

        


        
    },[reload])
    

    const Detalle = _ => (
        loadingDetalles ? <Spin /> : 
        <>
            <table border={"0"} style={{width:"100%"}} >
                <tbody>
                    <tr>
                        <td>C&oacute;digo:</td>
                        <td><i style={{ fontSize:".75em"}}>{dataDetalles.ruta}</i>&nbsp;<b>{dataDetalles.codigo}</b></td>
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
                        {/*<td style={{width:"30%"}}>Multiplicador: <b>{dataDetalles.multiplicador}</b></td>*/}
                        <td style={{width:"30%"}}>Modo Precio:&nbsp;&nbsp;{dataDetalles.modo_precio==1?<Tag>Subgrupo</Tag>:(dataDetalles.modo_precio==2? <Tag>Propio</Tag>:<Tag>Multiplicador</Tag>)}</td>
                        <td style={{width:"auto"}}><i>Precio:&nbsp;
                        
                        {dataDetalles.precio}</i>

                        {/*&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ fontSize: "1.10em"}}>Redondeo:&nbsp;
                        <b>${ 
                            Math.round(parseFloat(dataDetalles.costo) * parseFloat(dataDetalles.multiplicador) * (1/error_margin)) * error_margin
                        }</b></span>*/}</td>
                        
                    </tr>
                    {/*
                    <tr>
                        <td>G&eacute;nero: <Tag color="purple">{dataDetalles.genero}</Tag></td>
                        <td>Edad: <Tag color="blue">{dataDetalles.edad}</Tag></td>
                    </tr>
                    */}
                </tbody>
            </table>
        </>
    )



    const descripcionSG = _ => (descripcionSubgrupo==null ? <></>:<><i>Detalle Subgrupo:</i><br />{descripcionSubgrupo.descripcion}</>)

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
                <>
                <Row>
                    <Col span={24}>
                        {Detalle()}
                    </Col>
                </Row>
                
                <Divider />
                <Row>
                    <Col span={24}>
                        {descripcionSG()}
                        <Divider />
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <StockCodigosSucursales idcodigo={props.idcodigo} />
                    </Col>
                </Row>
                </>
                
            </CustomModal>
        </>
    )
}

export default DetalleStock;