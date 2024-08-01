import { CloseCircleTwoTone, PlusCircleFilled, SaveFilled } from "@ant-design/icons";
import { Button, Col, DatePicker, FloatButton, Input, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import PercepcionesForm from "./percepcionesForm";
import RetencionesForm from "./retencionesForm";
import IVAForm from "./ivaForm";
import { get } from "@/src/urls";

const AgregarFacturaV2 = (props) => {
    
    const [factura, setFactura] = useState({
        conceptosNoGravados:0,
        impuestosInternos:0,
        total:0,
        iva:[],
        percepciones:[],
        retenciones:[],
        fkproveedor:-1,
        nro:"",
        fecha:"",
        tipo:"A",
        puntoVenta:"",
    })

    const [reload, setReload] = useState(false)

    const [ivaRows, setIvaRows] = useState([])
    const [percepcionRows, setPercepcionRows] = useState([])
    const [retencionRows, setRetencionRows] = useState([])
    const [localIdx, setLocalIdx] = useState(0)

    const [popupRetencionesOpen, setPopupRetencionesOpen] = useState(false)
    const [popupPercepcionesOpen, setPopupPercepcionesOpen] = useState(false)
    const [popupIVAopen, setPopupIVAOpen] = useState(false)
    const [proveedores, setProveedores] = useState([])
    const columnsIVA = [
        {title:"Tipo", dataIndex:"tipo"},
        {title:"Monto", dataIndex:"monto",},
        {title:"localid", dataIndex:"id"},
        {render:(_,{id})=><><Button onClick={()=>{
            setIvaRows(_=>ivaRows.filter(i=>i.id!=id))
        }}><CloseCircleTwoTone /></Button></>}

    ]
    const columnsPercepcionRows = [
        {title:"Monto", dataIndex:"monto",},
        {title:"localid", dataIndex:"id"},
        {render:(_,{id})=><><Button onClick={()=>{
            setPercepcionRows(_=>percepcionRows.filter(i=>i.id!=id))
        }}><CloseCircleTwoTone /></Button></>}

    ]
    const columnsRetencionRows = [
        {title:"Monto", dataIndex:"monto",},
        {title:"Detalle", dataIndex:"tipo",},
        {title:"localid", dataIndex:"id"},
        {render:(_,{id})=><><Button onClick={()=>{
            setRetencionRows(_=>retencionRows.filter(i=>i.id!=id))
        }}><CloseCircleTwoTone /></Button></>}

    ]

    useEffect(()=>{
        fetch(get.lista_proveedores)
        .then(r=>r.json())
        .then((response)=>{
            setProveedores(response.data.map(r=>({value:r.idproveedor, label:r.nombre})))
        })
    },[reload])

    const onProveedorChange = (v)=> {
    setFactura(f=>({...f,fkproveedor:v}))        
    }

    const onConceptosNoGravadosChange = (v)=>{
        setFactura(f=>({...f,conceptosNoGravados:v}))
    }

    const onImpuestosInternosChange = (v) =>{
        setFactura(f=>({...f,impuestosInternos:v}))
    }

    const onNroChange = (v) => {
        setFactura(f=>({...f,nro:v}))
    }

    const onTipoChange = (v) => {
        setFactura(f=>({...f,tipo:v}))
    }

    const onPuntoVentaChange = (v) => {
        setFactura(f=>({...f,puntoVenta:v}))
    }

    const onSave = () => {
        const data = {
            ...factura,
            iva:ivaRows,
            percepciones: percepcionRows,
            retenciones: retencionRows,
        }

        alert(JSON.stringify(data))
    }


    const tablaIVA = () => <Table pagination={false} title={() => <>IVA <Button onClick={()=>{setPopupIVAOpen(true)}}><PlusCircleFilled /></Button></>} columns={columnsIVA} dataSource={ivaRows} scroll={{y:"150px"}} />
    const tablaPercepcion = () => <Table  pagination={false} title={() => <>Percepciones <Button onClick={()=>{setPopupPercepcionesOpen(true)}}><PlusCircleFilled /></Button></>}  columns={columnsPercepcionRows} dataSource={percepcionRows} scroll={{y:"150px"}} />
    const tablaRetencion = () => <Table  pagination={false} title={() => <>Retenciones <Button onClick={()=>{setPopupRetencionesOpen(true)}}><PlusCircleFilled /></Button></>}  columns={columnsRetencionRows} dataSource={retencionRows} scroll={{y:"150px"}} />
    const _rows_style = {setPopupRetencionesOpen:"1em"}
    return <>
    <FloatButton shape="square" icon={<SaveFilled />} onClick={onSave} />
    <Row style={_rows_style}>
        <Col span={3}>
            Proveedor
        </Col>
        <Col span={9}>
            <Select  
            style={{width:"300px"}} 
            options={proveedores} 
            onChange={(v)=>{onProveedorChange(v)}}
            value={factura.fkproveedor}
            />
        </Col>
        <Col span={12}>
            <Input prefix="Nro.:" onChange={e=>{onNroChange(e.target.value)}} value={factura.nro} />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={2}>
            Fecha:
        </Col>
        <Col span={10}>
            <DatePicker />
        </Col>
        <Col span={2}>
            Periodo:
        </Col>
        <Col span={10}>
            <DatePicker />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={2}>
            Tipo de Comprobante:
        </Col>
        <Col span={10}>
            <Select options={[
                {label:"A", value:"A"},
                {label:"B", value:"B"},
                {label:"C", value:"C"},
                {label:"ND", value:"ND"},
                {label:"NC", value:"NC"},
                ]} style={{width:"100px"}} 

                onChange={(v)=>{onTipoChange(v)}}

                value={factura.tipo}

                />
        </Col>

       
        <Col span={10}>
            <Input prefix="Punto de Venta:  " value={factura.puntoVenta} onChange={(e)=>{onPuntoVentaChange(e.target.value)}} />
        </Col>

    </Row>
    <Row>
       
    </Row>
    <Row style={_rows_style}>
        <Col span={24} style={{padding:"3px", backgroundColor:"lightblue"}}>
            {tablaIVA()}
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={12} style={{padding:"3px", backgroundColor:"lightcoral"}}>
            {tablaPercepcion()}
        </Col>
   
        <Col span={12} style={{padding:"3px", backgroundColor:"lightgreen"}}>
            {tablaRetencion()}
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Conceptos no Gravados: " value={factura.conceptosNoGravados} onChange={(e)=>{onConceptosNoGravadosChange(e.target.value)}} />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Impuestos Internos: " value={factura.impuestosInternos} />
        </Col>
    </Row>
    <Row style={_rows_style}>
        <Col span={24}>
            <Input prefix="Monto Total: " readOnly value={factura.total} />
        </Col>
    </Row>
    <Modal 
    width={"80%"}
    title="Agregar Percepcion" 
    open={popupPercepcionesOpen} 
    footer={null} 
    onCancel={()=>{setPopupPercepcionesOpen(false)}}
        >
        <PercepcionesForm callback={(n)=>{ 
            setPercepcionRows(p=>[...p,{...n, id:localIdx}]); 
            setLocalIdx(localIdx+1); 
            setPopupPercepcionesOpen(false)
            setReload(!reload)
        }
        }

            />
    </Modal>
    <Modal 
    width={"80%"}
    title="Agregar Retencion" 
    open={popupRetencionesOpen} 
    footer={null} 
    onCancel={()=>{setPopupRetencionesOpen(false)}}
        >
        <RetencionesForm callback={(n)=>{ 
            setRetencionRows(r=>[...r,{...n, id:localIdx}]); 
            setLocalIdx(localIdx+1);
            setPopupRetencionesOpen(false) 
            setReload(!reload)
        }
        }
            />
    </Modal>
    <Modal 
    width={"80%"}
    title="Agregar IVA" 
    open={popupIVAopen} 
    footer={null} 
    onCancel={()=>{setPopupIVAOpen(false)}}
        >
        <IVAForm callback={(n)=>{ 
            setIvaRows(i=>[...i,{...n, id:localIdx}]); 
            setLocalIdx(localIdx+1); 
            setPopupIVAOpen(false)
            setReload(!reload)
        }
        }
            />
    </Modal>
    </>
}

export default AgregarFacturaV2;