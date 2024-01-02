import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import VentaDetallePopup from "@/components/VentaDetalle";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

/**
 * 
 * @param idmedico 
 * @param mes 
 * @param anio 
 */
const VentasMedicos = (props) => {
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [idmedico, setIdMedico] = useState(-1)
    const [total, setTotal] = useState(0)
    const [periodo, setPeriodo] = useState({
        mes: 0,
        anio: 0,
    })
    const columns = [
        {dataIndex: "idventa",  title: "Nro. Op."},
        {dataIndex: "sucursal",  title: "Sucursal"},
        {dataIndex: "cliente",  title: "Cliente"},
        {dataIndex: "dni",  title: "DNI"},
        {dataIndex: "tipo",  title: "Detalle", render:(_,{tipo})=>{
            switch(tipo.toString())
            {
                case globals.tiposVenta.DIRECTA: return "VENTA DIRECTA";
                case globals.tiposVenta.LCLAB: return "L.C. Lab.";
                case globals.tiposVenta.LCSTOCK: return "L.C. Stock";
                case globals.tiposVenta.MONOFLAB: return "Monof. Lab.";
                case globals.tiposVenta.MULTILAB: return "Multif. Lab.";
                case globals.tiposVenta.RECSTOCK: return "Rec. Stock";
                case 7: return "";
            }
        }},
        {dataIndex: "monto",  title: "Monto"},
        {title: "", render:(_,{idventa})=>(<>
            <VentaDetallePopup idventa={idventa} />
        </>)},
    ]

    useEffect(()=>{
        //const d = new Date()
        setIdMedico(props.idmedico)
        /*setPeriodo({
            mes: d.getMonth()+1,
            anio: d.getFullYear(),
        })*/
    },[])

    const init = () => {
        setPeriodo({
            mes: props.mes,
            anio: props.anio,
        })
        /*alert(JSON.stringify({
            mes: periodo.mes, 
            anio: periodo.anio, 
            idmedico: idmedico
        }))*/
        post_method(post.lista_ventas_medico,
        {
            mes: props.mes, 
            anio: props.anio, 
            idmedico: props.idmedico
        },(response)=>{
            
            var _total = 0;
            response.data.forEach(r=>{
                _total+=parseFloat(r.monto_total)
            })
            setTotal(_total)

            setDataSource(
                response.data.map(r=>({
                    idventa: r.idventa,
                    cliente: r.cliente,
                    dni: r.dni,
                    tipo: r.tipo,
                    monto: r.monto_total,
                    sucursal: r.sucursal,
                }))
            )
        })
    }
    const gtipe = ( v ) => 
    {
        switch(v)
            {
                case globals.tiposVenta.DIRECTA: return "VENTA DIRECTA";
                case globals.tiposVenta.LCLAB: return "L.C. Lab.";
                case globals.tiposVenta.LCSTOCK: return "L.C. Stock";
                case globals.tiposVenta.MONOFLAB: return "Monof. Lab.";
                case globals.tiposVenta.MULTILAB: return "Multif. Lab.";
                case globals.tiposVenta.RECSTOCK: return "Rec. Stock";
                case 7: return "";
            }
    }
    return <>
        <Button onClick={()=>{setOpen(true); init()}}><InfoCircleFilled /></Button>
        <Modal width={"90%"} open={open} onCancel={()=>{setOpen(false)}}>
            <Row>
                <Col span={24}>
                    <CustomModal openButtonText="CSV">
                        <Input.TextArea value={
                            JSON.stringify(
                                dataSource.map(r=>({
                                    Nro_Op: r.idventa,
                                    sucursal: r.sucursal,
                                    cliente: r.cliente,
                                    dni: r.dni,
                                    tipo: gtipe(r.tipo.toString()),
                                    monto: r.monto

                                }))

                            )
                        }/>
                    </CustomModal>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <PrinterWrapper>
                    <b>Lista de Ventas del M&eacute;dico: {props?.nombre_medico||""}</b>
                    <Table pagination={false} columns={columns} dataSource={dataSource} />
                    <Divider />
                    <b>Cant. Total: {dataSource.length}  |   Monto Total: $ {total}</b>
                    </PrinterWrapper>
                </Col>
            </Row>
        </Modal>
    </>
}

export default VentasMedicos;