import { post } from "@/src/urls";
import { InfoCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";
import PopupDetalleBusqueda from "./DetalleBusqueda";
import { post_method } from "@/src/helpers/post_helper";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";

const PopupResultadoBusqueda = (props) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [idcodigo, setIdCodigo] = useState(-1)
    const [codigo, setCodigo] = useState(-1)
    const [openDetalle, setOpenDetalle] = useState(false)
    const [busqueda, setBusqueda] = useState(null)
    const [reload, setReload] = useState(false)
    const columns = [
        {dataIndex:"codigo", title:"Codigo"},
        {dataIndex:"precio", title:"Precio"},
        {render:(_,obj)=><><Button onClick={()=>{setCodigo(obj.codigo); setOpenDetalle(true);}}><InfoCircleTwoTone /> Detalle</Button>  </>}
    ]

    useEffect(()=>{
        if(props.open)
        {
            
            setDataSource([])
            if(busqueda==null)
            {
                const _id = regex_get_id_if_match(props.busqueda);

                if(_id>-1){

                    setCodigo(props.busqueda);

                    setOpenDetalle(true);

                    return
                    
                }
                setBusqueda(props.busqueda)
            }
            load()
        }
        
    },[reload, props.open])

    const load = () => {
        setLoading(true)
        
        post_method(post.obtener_codigos_filtro,
            {        
                idfamilia:"-1",
                idsubfamilia:"-1",
                idgrupo:"-1",
                idsubgrupo:"-1",
                codigo: busqueda==null? props.busqueda : busqueda
            },r=>{
                setLoading(false)
                setDataSource(_=>
                    r.data.map(c=>({
                        idcodigo: c.idcodigo,
                        codigo: c.codigo,
                        precio: c.precio_codigo,
                    }))
                )
            })
    }

    

    return <>
        <Modal footer={null} open={props.open} destroyOnClose  onCancel={()=>{setBusqueda(null); props.callback();}} width={"60%"}>
            <Row>
                <Col span={24}>
                    <h3>Resultado B&uacute;squeda</h3>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Input style={{width:"100%"}} value={busqueda} 
                    onChange={(e)=>{
                        setBusqueda(e.target.value);
                  
                        }} 
                    onKeyUp={(e)=>{
                        if(e.key === "Enter")
                        {
                            setReload(!reload)
                        }
                    }}
                    suffix={<><Button type="primary" onClick={()=>{
                        setReload(!reload)
                    }}><SearchOutlined /></Button></>}
                        />
                                
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={dataSource} scroll={{y:"600px"}}   loading={loading} />
                </Col>
            </Row>
            
        </Modal>
        <PopupDetalleBusqueda open={openDetalle} busqueda={codigo} callback={()=>{setOpenDetalle(false); setBusqueda(null); props?.callback?.()}} />
    </>
}

export default PopupResultadoBusqueda;