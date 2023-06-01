import { get } from "@/src/urls";

const { Table, Spin } = require("antd");
const { useEffect, useState } = require("react")

const DetalleFactura = (props) => {
    const [dataFactura, setDataFactura] = useState([]);
    const [dataElementos, setDataElementos] = useState([]);
    const [detallesLoading, setDetallesLoading] = useState(true);
    const [elementosLoading, setElementosLoading] = useState(true);

    const fetchUrlDetalles = get.detalle_factura;
    const fetchUrlElementos = get.elementos_factura;

    useEffect(()=>{
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
    },[]);

    const Detalles = _ =>(
        <>
        Proveedor: {dataFactura[0].proveedor}<br />
        Nro.: {dataFactura[0].numero}<br />
        Fecha: {dataFactura[0].fecha}<br />
        Cantidad Total: {dataFactura[0].cantidad_total}<br />
        Monto Total: {dataFactura[0].monto_total}<br />
        </>
    )

    const Elementos = _ =>(
        <>
        <h4>Lista de Productos</h4>
        <Table
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
        <h3>Detalles Factura</h3>
        {detallesLoading ? <Spin /> : <Detalles />}
        {elementosLoading ? <Spin /> : <Elementos />}
        </>
    )
}

export default DetalleFactura;