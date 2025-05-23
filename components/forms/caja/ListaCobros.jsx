import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import { Button, Card, Col, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import FiltroCobros from "./FiltroCobros";
import globals from "@/src/globals";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
/**
 * 
 * @param idventa
 * @returns 
 */
const ListaCobros = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtros, setFiltros] = useState({})
    const [reload, setReload] = useState(true)
    const columns = [
        {width:"90px", title: "Nro.", dataIndex: "idcobro", render:(_,{anulado,idcobro})=>(<>{anulado==1?<Tag color="red">Anulado</Tag>:<></>}{idcobro}</>)},
        {width:"100px", title: "Fecha", dataIndex: "fecha_formated"},
        {width:"150px", title: "Cliente", dataIndex: "cliente_nombre"},
        {width:"150px", title: "Tipo", dataIndex: "tipo"},
        {width:"150px", title: "Monto", dataIndex: "monto"},
        {width:"100px", title: "Sucursal", dataIndex: "sucursal"},
        {width:"100px", title: "Acciones", dataIndex: "idcobro", hidden:false, render: (_,{idcobro})=>{
            return <>
            <CustomModal openButtonText="Imprimir">
                <PrinterWrapper>
                    <InformeX idcobro={idcobro} />
                </PrinterWrapper>
            </CustomModal>
            {
                typeof props?.anular!=='undefined' ? <Button danger>Anular</Button> : <></>
            }
            
            </>
        }},

    ]

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}
    

    useEffect(()=>{
      
        load()
       
    },[reload])

    const load=_=>{
        var params = {};//{idsucursal: globals.obtenerSucursal()}
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.iddestinatario, 'iddestinatario')
        params = add(params, props?.idventa, 'idventa')
        //params = add(params, props?.idsucursal, 'idsucursal')
        params = add(params, filtros?.idcobro, 'idcobro')
        params = add(params, filtros?.fecha, 'fecha')
        setLoading(true)
        //get list
        post_method(post.obtener_lista_cobros,params,(response)=>{
            
            setDataSource(response.data)
            setLoading(false)
        })
    }

    return <>
     <Card title="Lista de Cobros" size="small" style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)"}}>
        {(props.readOnly||false) ? <></> :   
       
        <Row>
            <Col span={24}>
                <FiltroCobros callback={f=>{setFiltros(_f=>f); setReload(!reload)}} />
            </Col>
        </Row>
        
        }
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                scroll={{y:"450px"}}
                loading={loading} 
                pagination={true} 
                dataSource={dataSource} 
                columns={columns} 
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                />
            </Col>
        </Row>
        </Card>
    </>
}

export default ListaCobros;