import VentaDetallePopup from "@/components/VentaDetalle";
import { post_method } from "@/src/helpers/post_helper";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

/**
 * 
 * @param idmedico 
 * @param mes 
 * @param anio 
 * @returns 
 */
const VentasMedicos = (props) => {
    const [open, setOpen] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [idmedico, setIdMedico] = useState(-1)
    const [periodo, setPeriodo] = useState({
        mes: 0,
        anio: 0,
    })
    const columns = [
        {dataIndex: "idventa",  title: "Nro. Op."},
        {dataIndex: "cliente",  title: "Cliente"},
        {dataIndex: "dni",  title: "DNI"},
        {dataIndex: "tipo",  title: "Detalle"},
        {dataIndex: "monto",  title: "Monto"},
        {title: "", render:(_,{idventa})=>(<>
            <VentaDetallePopup idventa={idventa} />
        </>)},
    ]

    useEffect(()=>{
        setIdMedico(props.idmedico)
        setPeriodo({
            mes: props.mes,
            anio: props.anio,
        })
    })

    const init = () => {
        post_method("",
        {
            mes: periodo.mes, 
            anio: periodo.anio, 
            idmedico: idmedico
        },(response)=>{
            setDataSource(
                response.data.map(r=>({
                    idventa: r.idventa,
                    cliente: r.cliente,
                    dni: r.dni,
                    tipo: r.tipo,
                    monto: r.monto_total,
                }))
            )
        })
    }
    return <>
        <Button onClick={()=>{setOpen(true); init()}}><InfoCircleFilled /></Button>
        <Modal open={open} onCancel={()=>{setOpen(false)}}>
            <Row>
                <Col span={24}>
                    <h4>Lista de Ventas del M&eacute;dico: {props?.nombre_medico||""}</h4>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={dataSource} />
                </Col>
            </Row>
        </Modal>
    </>
}

export default VentasMedicos;