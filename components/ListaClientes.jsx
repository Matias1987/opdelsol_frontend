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
        {dataIndex: 'apellido', title: 'Apellido', key: 'apellido'},
        {dataIndex: 'nombre', title: 'Nombre', key: 'nombre'},
        {dataIndex: 'dni', title: 'DNI', key: 'dni'},
        {dataIndex: 'direccion', title: 'Direccion', key: 'direccion'},
        {dataIndex: 'idcliente', title: '', key: 'acciones', render: (_,{idcliente})=>(
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

    return <>
    <h3>Lista de Clientes</h3>
    <Row>
        <Col span={24}>
            <Input.Search onSearch={onSearch} value={searchVal} onChange={(e)=>{setSearchVal(e.target.value)}} />
        </Col>
        
    </Row>
    <Row>
        <Col span={12}>
                <ClienteFormV2 callback={(id)=>{refresh()}}/>
        </Col>
        <Col span={12}>
            <Button size="small" danger onClick={(e)=>{setSearchVal(s=>{
            refresh()
            return ""
            })}}><ReloadOutlined />Recargar
            </Button>
        </Col>
        
    </Row>
    <Row>
        <Col span={24}>
            <Table 
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