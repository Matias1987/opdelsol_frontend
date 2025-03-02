import CustomModal from "@/components/CustomModal";
import { Button, Col, Input, Modal, Row, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

import { get } from "@/src/urls";
import FichaCliente from "@/components/FichaCliente";
import LayoutCaja from "@/components/layout/layout_caja";
import DetalleCliente from "@/components/DetalleCliente";
import ClienteFormV2 from "./forms/ClienteFormV2";
import ListaPagares from "./forms/caja/ListaPagares";

export default function ListaClientes(props){
    const [clientes, setClientes] = useState(null);
    const [searchVal , setSearchVal] = useState("")
    const [loading, setLoading] = useState(false)
    const onSearch = (value) => {
        if((value||"").trim().length<1)
        {
            return;
        }
        setLoading(true)
        const params = encodeURIComponent(value);
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
    
    const refresh = () => {
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
    }

    useEffect(()=>{
        refresh()
    },[])

    const columns = [
        { width:"200px", dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        { width:"200px", dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        { width:"200px", dataIndex: 'dni', title: 'DNI', key: 'dni'},
        { width:"200px", dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
        { width:"200px", dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente})=>(
            <>
            {
                typeof props.ficha !== 'undefined' ?
                    <FichaCliente idcliente={idcliente} key={idcliente}/>
                    :
                <></>
                
            }
            <CustomModal title="Detalle Cliente" openButtonText={"Detalle"}>
                <DetalleCliente idcliente={idcliente} />
            </CustomModal>
            <CustomModal title="Pagares" openButtonText={"Pagares"}>
                <ListaPagares idcliente={idcliente} />
            </CustomModal>
            
            </>
        )},
    ]

    const row_style = {
        padding:"6px"
    }

    return <>
    <h2>Lista de Clientes</h2>
    <Row style={row_style}>
        <Col span={24}>
            <Input.Search prefix={<span style={{backgroundColor:"#DBE3E6"}}>Buscar por Nombre o DNI:&nbsp;&nbsp;&nbsp;</span>}   allowClear onSearch={onSearch} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} />
        </Col>
        
    </Row>
    <Row style={row_style}>
        <Col span={12}>
                <ClienteFormV2 callback={(id)=>{refresh()}}/>
        </Col>
        <Col span={12}>&nbsp;&nbsp;&nbsp;
            <Button size="small" type="text" onClick={(e)=>{setSearchVal(s=>{
            refresh()
            return ""
            })}}><ReloadOutlined />Recargar
            </Button>
        </Col>
        
    </Row>
    <Row style={row_style}>
        <Col span={24}>
            <Table 
            size="small"
            bordered
            scroll={{y:"350px"}}
            loading={loading}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            columns={columns} 
            dataSource={clientes} />
        </Col>
    </Row>
    {/*<Modal width={"80%"} open={modalFichaOpen} footer={null}  onCancel={()=>{setModalFichaOpen(false)}}>
        <FichaCliente idcliente={curCliente} open={modalFichaOpen} key={curCliente} />
    </Modal>*/}
    

    

    
    
    </>
}

ListaClientes.PageLayout = LayoutCaja;  