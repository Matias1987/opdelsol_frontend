import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import CodigosDeBarraEnvio from "@/components/informes/CodigosDeBarra";
import InformeEnvio from "@/components/informes/InformeEnvio";

const { Table, Button } = require("antd");
const { useEffect, useState } = require("react");
const urls = require("../../../../src/urls")
const ListaEnvios = (props) => {
    const [data,setData] = useState([])

    const columns = [
        {title: 'Nro.', dataIndex: 'idenvio', key: 'idenvio'},
        {title: 'Fecha', dataIndex: 'fecha', key: 'fecha'},
        {title: 'Sucursal', dataIndex: 'sucursal_idsucursal', key: 'sucursal_idsucursal'},
        {title: 'Cantidad', dataIndex: 'cantidad_total', key: 'cantidad_total'},
        {
            title: 'Acciones', dataIndex: 'idenvio', key: 'idenvio',
            render: 
                (_,{idenvio})=>{
                    return (<>
                        <CustomModal openButtonText="Detalle Envio" title="Detalle Envio" onOk={()=>{}}>
                            <PrinterWrapper>
                                <InformeEnvio idenvio={idenvio}/>
                            </PrinterWrapper>
                        </CustomModal>
                         &nbsp;
                        <CustomModal openButtonText="Imprimir Codigos Envio" title="Imprimir Codigos Envio" onOk={()=>{}}>
                            <PrinterWrapper>
                                <CodigosDeBarraEnvio idenvio={idenvio}/>
                            </PrinterWrapper>
                        </CustomModal>
                         &nbsp;
                        <Button  size="small" type="primary"  onClick={()=>{}}>Editar</Button>
                    </>    )                
                }
            
        }
    ]
    useEffect(()=>{
        fetch(urls.get.lista_envios)
        .then(response=>response.json())
        .then((response)=>{
            //parse
            let _data = response.data.map((e)=>({
                idenvio:e.idenvio,
                sucursal_idsucursal: e.sucursal_idsucursal,
                cantidad_total: e.cantidad_total,
                fecha: e.fecha,
            }))

            setData(_data);
        })
    },[])

    return(
        <>
        <h1>Envios</h1>
        <Table
            columns={columns}
            dataSource={data}
        />
        </>
    )
}

export default ListaEnvios;