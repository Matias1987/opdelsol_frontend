import CustomModal from "@/components/CustomModal";
import PrinterWrapper from "@/components/PrinterWrapper";
import InformeX from "@/components/informes/caja/InformeX";
import { Table } from "antd";
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
        {title: "Nro.", dataIndex: "idcobro"},
        {title: "Fecha", dataIndex: "fecha"},
        {title: "Cliente", dataIndex: "cliente"},
        {title: "Tipo", dataIndex: "tipo"},
        {title: "Monto", dataIndex: "monto"},
        {title: "Acciones", dataIndex: "idcobro", hidden:false, render: (_,{idcobro})=>{
            return <>
            <CustomModal openButtonText="Imprimir">
                <PrinterWrapper>
                    <InformeX idcobro={idcobro} />
                </PrinterWrapper>
            </CustomModal>
            </>
        }},

    ]

    const add = (obj,value,key) => typeof value === 'undefined' ? obj : {...obj, [key]:value}
    

    useEffect(()=>{

        var params = {idsucursal: globals.obtenerSucursal()}
        params = add(params, filtros.idcliente, 'idcliente')
        params = add(params, filtros.iddestinatario, 'iddestinatario')
        params = add(params, props?.idventa, 'idventa')

        alert(JSON.stringify(params))

        //get list
        post_method(post.obtener_lista_cobros,params,(response)=>{
            setDataSource(response.data)
        })
    },[])

    return <>
        <FiltroCobros callback={f=>{setFiltros(_f=>f); setReload(!reload)}} />
        {JSON.stringify(filtros)}
        <Table dataSource={dataSource} columns={columns} />
    </>
}

export default ListaCobros;