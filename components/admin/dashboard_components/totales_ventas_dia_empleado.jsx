import { Table } from "antd";
import { useState } from "react"

const TotalesVentasDiaEmpleado = props =>{
    const [sucursalesData, setSucursalesData] = useState([]);
    const columns = [
        {title:"Vendedor"},
        {title:"Monto"},
    ];

    const header = title => <>{title}</>

    const sucursal_content = data =><>
        <Table title={header("sucursal")} />
    </>
    return <>
        {
            sucursalesData.map(sdata=>sucursal_content(sdata))
        }
    </>
}
/*
SELECT v.sucursal_idsucursal, v.usuario_idusuario, COUNT(*) AS 'qtty', SUM(v.monto_total) AS 'monto' 
FROM venta v 
WHERE v.estado<>'ANULADO' AND v.estado<>'INGRESADO' AND DATE(v.fecha)=DATE(NOW())
GROUP BY v.sucursal_idsucursal, v.usuario_idusuario; */