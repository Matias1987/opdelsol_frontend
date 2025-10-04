import CustomModal from "@/components/CustomModal";
import { Button, Col, Input, Modal, Row, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { AlertOutlined, CheckCircleFilled, CloseOutlined, EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";
import { get } from "@/src/urls";
import ClienteFormV2 from "../ClienteFormV2";

const SelectCliente = (props) =>{
    const {minVersion, callback} = props
    const [idCliente, setIdCliente] = useState(-1);
    const [loadingDetalles, setLoadingDetalles] = useState(true);
    const [clientes, setClientes] = useState(null);
    const [clienteData, setClienteData] = useState(null);
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)
    const [popupAddOpen, setPopupAddOpen] = useState(false)
    const onSearch = (value) => {

        if((value||"").trim().length < 3) return;

        const params = encodeURIComponent(value);
        //alert(value)
        setLoading(true)
        fetch(get.buscar_cliente+params)
        .then(response=>response.json())
        .then((response)=>{
            setClientes(
            response.data.map(r=>(
                {
                    dni: r.dni,
                    idcliente: r.idcliente,
                    apellido: r.apellido,
                    nombre: r.nombre,
                    direccion: r.direccion,
                    bloqueado: r.bloqueado,
                }
            )))
            setLoading(false)
        })
        .catch((err)=>{console.log(err)})
    } 

    const upload_cliente_details = (id) => {
        setLoadingDetalles(true);

        setIdCliente(_id=>{
            props?.callback?.(id)
            return id
        });
        

        fetch(get.cliente_por_id+id)
        .then(response=>response.json())
        .then((response)=>{
           
            setClienteData({
                nombre: response.data[0].nombre_completo,
               
                dni: response.data[0].dni,

                telefono1: response.data[0].telefono1,

                direccion: response.data[0].direccion,

            })

            setLoadingDetalles(false);

        })
        .catch(err=>{console.log(err)})
    }

    useEffect(()=>{
        setLoading(true)
        fetch(get.lista_clientes)
        .then(response=>response.json())
        .then((response)=>{
            
            setClientes(
                response.data.map(r=>(
                    {
                        dni: r.dni,
                        idcliente: r.idcliente,
                        apellido: r.apellido,
                        nombre: r.nombre,
                        direccion: r.direccion,
                        telefono1: r.telefono1,
                        bloqueado: r.bloqueado,
                    }
                ))
            )
            setLoading(false)
        })
        .catch((err)=>{console.log(err)})
    },[reload])


    const columns = [
        {dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        {dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        {dataIndex: 'dni', title: 'DNI', key: 'dni'},
        {dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
/*        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente, bloqueado})=>(
            <>
                <Button disabled={bloqueado==1} onClick={()=>{upload_cliente_details(idcliente)}}>{bloqueado?<span style={{color:"red"}}><CloseOutlined />Bloqueado</span>:<><CheckCircleFilled />&nbsp;&nbsp;Seleccionar</>}</Button>
            </>
        )},*/
    ]
    const show_details = _ => (
        loadingDetalles ? <Spin /> :
        <>
        {typeof props.destinatario === 'undefined'? "Nombre" : "Nombre"}: <>
            <b>{clienteData.nombre} </b> 
        {   typeof props.destinatario === 'undefined' ? 
            <>
                &nbsp;&nbsp;  DNI: <b>{clienteData.dni}</b>&nbsp;
                { typeof minVersion === 'undefined' ? <>
                    Tel&eacute;fono: {clienteData.telefono1}&nbsp;
                    Direcci&oacute;n: {clienteData.direccion}&nbsp;
                    </> : <></>
                }
            </>
            :
            <></>
        }
        </>
        <Button type="ghost" style={{color:"red"}} onClick={()=>{
            props?.callback?.(null)
            setIdCliente(-1)
            }}><CloseOutlined /></Button>
        </>
    )

    const onOpenPopup = () => {

    }

    return (
        idCliente==-1 ? 
        <>
        <CustomModal 
        size="small"
        onOpen={onOpenPopup} 
        openButtonText={ typeof props.openButtonText === 'undefined' ? (typeof props.destinatario !== 'undefined' ? 'Seleccionar Destinatario' : "Seleccione Cliente") : props.openButtonText } 
        title="Seleccionar Cliente" >
        
        <Row>
            <Col span={24} >
                <Table 
                onRow={(record, index) => ({
                    onClick: (e) => {
                        if(+record.bloqueado==1) {
                            alert("Cliente bloqueado");
                            return
                        };

                        upload_cliente_details(record.idcliente);
                        setClienteData(record);
                    },
                })}
                title={_=><Row gutter={"16"}><Col><span style={{fontWeight:"bold"}}>Clientes</span> </Col>
                <Col>
                    <Button onClick={_=>{setPopupAddOpen(true)}}><PlusOutlined /> Agregar</Button>
                </Col>
                <Col>
                        <Input.Search allowClear size="small" prefix="Buscar: "  style={{width:"400px"}} onSearch={onSearch} />
                </Col>
                <Col>
                    <Button size="small" style={{color:"red"}} onClick={()=>{setReload(!reload)}}type="text"><ReloadOutlined /></Button>
                </Col>
                </Row>}
                size="small"
                scroll={{y:"500px"}}
                loading={loading}
                rowClassName={(record, index) =>  record.bloqueado ?  'error-row' : index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                columns={columns} 
                dataSource={clientes}  />
            </Col>
        </Row>
        </CustomModal>
        <Modal
        open={popupAddOpen}
        onCancel={_=>{setPopupAddOpen(false)}}
        title="Agregar Cliente"
        destroyOnClose
        width={"900px"}
        footer={null}
        >
            <ClienteFormV2 callback={(id)=>{
                setReload(!reload)
                upload_cliente_details(id) 
            }} />
        </Modal>
        
        </>
        : show_details() )
}

export default SelectCliente;