import { get } from "@/src/urls";

import { Table, Spin } from "antd";
import { useEffect, useState } from "react";
/**
 * 
 * @param idFactura
 * 
 */
const DetalleFactura = (props) => {

    const [dataFactura, setDataFactura] = useState([]);
    const [dataElementos, setDataElementos] = useState([]);
    const [detallesLoading, setDetallesLoading] = useState(true);
    const [elementosLoading, setElementosLoading] = useState(true);

    const fetchUrlDetalles = get.detalle_factura;
    const fetchUrlElementos = get.elementos_factura;

    
    const open = _ => {
        if(typeof props.idFactura === 'undefined'){
            alert("couldn't find id factura")
            return;
        }
        if(props.idFactura == null){
            alert("couldn't find id factura")
            return;
        }
        setElementosLoading(true)
        setDetallesLoading(true)
        //load data factura:
        
        fetch(fetchUrlDetalles + props.idFactura)
        .then(response=>response.json())
        .then((response)=>{
            setDataFactura(
                response.data.map(
                    r=>(
                        {
                            fecha: r.fecha,
                            numero: r.numero,
                            proveedor: r.proveedor,
                            cantidad_total: r.cantidad,
                            monto_total: r.monto,
                            es_remito: r.es_remito,
                        }
                    )
                )
            )
            setDetallesLoading(false)
        });

        fetch(fetchUrlElementos+  props.idFactura)
        .then(response=>response.json())
        .then((response)=>{
            setDataElementos(
                response.data.map(
                    r=>(
                        {
                            codigo: r.codigo,
                            cantidad: r.cantidad,
                            precio: r.costo,
                        }
                    )
                )

            );

            setElementosLoading(false);
        })
    }

    useEffect(()=>{
        if(props.idFactura>0)
        {
            open()
        }
    },[props.idFactura]);

    const detalles = _ =>(
        <>
        Proveedor: {dataFactura[0].proveedor}<br />
        Nro.: {dataFactura[0].numero}<br />
        Fecha: {dataFactura[0].fecha}<br />
        Cantidad Total: {dataFactura[0].cantidad_total}<br />
        Monto Total: {dataFactura[0].monto_total}<br />
        </>
    )

    const elementos = _ =>(
        <>
        <h4>Lista de Productos</h4>
        <Table
        scroll={{y:"450px"}}
        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
        dataSource={dataElementos}
        loading={elementosLoading}
        columns={[
            {title: 'Codigo', dataIndex: 'codigo', key: 'codigo'},
            {title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad'},
            {title: 'Precio', dataIndex: 'precio', key: 'precio'},
        ]}
        />
        </>
    )

    return (
        <>
        <h3>{detallesLoading ? "..." : +dataFactura[0].es_remito != 1 ? "Detalle Factura" : "Detalle Remito" }</h3>
        {detallesLoading ? <Spin /> :detalles()}
        {elementosLoading ? <Spin /> : elementos()}
        </>
    )
}

export default DetalleFactura;