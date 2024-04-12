import CustomModal from "@/components/CustomModal";
import { Button, Col, Input, Row, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { AlertOutlined, CheckCircleFilled, CloseOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import ClienteForm from "../ClienteForm";
import { get } from "@/src/urls";
import ClienteFormV2 from "../ClienteFormV2";

const SelectCliente = (props) =>{
    const [idCliente, setIdCliente] = useState(-1);
    const [loadingDetalles, setLoadingDetalles] = useState(true);
    const [clientes, setClientes] = useState(null);
    const [clienteData, setClienteData] = useState(null);
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSearch = (value) => {
        
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
        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente, bloqueado})=>(
            <>
                <Button disabled={bloqueado==1} onClick={()=>{upload_cliente_details(idcliente)}}>{bloqueado?<span style={{color:"red"}}><CloseOutlined />Bloqueado</span>:<><CheckCircleFilled />&nbsp;&nbsp;Seleccionar</>}</Button>
            </>
        )},
    ]
    const show_details = _ => (
        loadingDetalles ? <Spin /> :
        <>
        {typeof props.destinatario === 'undefined'? "Cliente" : "Destinatario"}: <>
            <b>{clienteData.nombre} </b> 
        {   typeof props.destinatario === 'undefined' ? 
            <>
                &nbsp;&nbsp;  DNI: <b>{clienteData.dni}</b>&nbsp;
                Tel&eacute;fono: {clienteData.telefono1}&nbsp;
                Direcci&oacute;n: {clienteData.direccion}&nbsp;
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
        <CustomModal onOpen={onOpenPopup} openButtonText={ typeof props.openButtonText === 'undefined' ? (typeof props.destinatario !== 'undefined' ? 'Seleccionar Destinatario' : "Seleccione Cliente") : props.openButtonText } title="" >
        {typeof props.destinatario !== 'undefined' ? 'Buscar Destinatario' : "Buscar Cliente" }
        <Row>
            <Col span={24}>
                <Input.Search onSearch={onSearch} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <ClienteFormV2 destinatario={props.destinatario} callback={(id)=>{
                        //alert(id); 
                        setReload(!reload)
                        upload_cliente_details(id) 
                        }}/>
            </Col>
            <Col span={12}>
                <Button block style={{color:"red"}} onClick={()=>{setReload(!reload)}}><ReloadOutlined /> Recargar</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                loading={loading}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                columns={columns} 
                dataSource={clientes}  />
            </Col>
        </Row>
        </CustomModal>
        
        </>
        : show_details() )
}

export default SelectCliente;