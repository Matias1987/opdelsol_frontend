//import TotalesVentasDiaEmpleado from "@/components/admin/dashboard_components/totales_ventas_dia_empleado";
//import Egreso from "@/components/caja_master/egreso";
//import EdicionVentas from "@/components/edicion_ventas/EdicionVentas";
//import TestGridCreation from "@/components/etc/testGridCreation";
import NuevoDescuento from "@/components/cliente/descuentos/nuevoDescuento";
import TestGridCreation from "@/components/etc/testGridCreation";
import TrabajoMultiple from "@/components/forms/trabajo_multiple/venta_multiple";
//import TrabajoRecetaStock from "@/components/forms/ventas/trabajo/trab_receta_stock";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Card, Col, Divider, Row, Space, Switch, Table } from "antd";
import { useState } from "react";
//import QRAccess from "@/components/qr_access/QRAccess";

export default function test() {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const columns = [
    {
      hidden: false,
      title: "Nro.",
      dataIndex: "idventa",
      key: "idventa",
    },
    {
      hidden: false,
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },

    { width: "100px", hidden: false, title: "Fecha", dataIndex: "fecha" },

    {
      width: "110px",
      hidden: false,
      title: "Vendedor",
      dataIndex: "vendedor",
      key: "vendedor",
    },
  ];

  const data = [
  {
    "idventa": 69768,
    "cliente": "-, CONSUMIDOR FINAL",
    "vendedor": "colon",
    "estado": "PENDIENTE",
    "tipo": "7",
    "monto": "0",
    "fecha": "15-05-26",
    "fecha_retiro": "14-m-26",
    "sucursal_idsucursal": 15,
    "cliente_idcliente": 1,
    "en_laboratorio": 1,
    "sucursal": "DIST",
    "estado_taller": null,
    "isParent": 1,
    "key": 0,
    "children": [
      {
        "idventa": 69768,
        "cliente": "-, CONSUMIDOR FINAL",
        "vendedor": "colon",
        "estado": "PENDIENTE",
        "tipo": "7",
        "monto": "0",
        "fecha": "15-05-26",
        "fecha_retiro": "14-m-26",
        "sucursal_idsucursal": 15,
        "cliente_idcliente": 1,
        "en_laboratorio": 1,
        "sucursal": "DIST",
        "estado_taller": null,
        "isParent": 0,
        "key": 1
      }
    ]
  },
  {
    "idventa": 69767,
    "cliente": "-, CONSUMIDOR FINAL",
    "vendedor": "colon",
    "estado": "PENDIENTE",
    "tipo": "7",
    "monto": "0",
    "fecha": "15-05-26",
    "fecha_retiro": "14-m-26",
    "sucursal_idsucursal": 15,
    "cliente_idcliente": 1,
    "en_laboratorio": 1,
    "sucursal": "DIST",
    "estado_taller": null,
    "isParent": 1,
    "key": 2,
    "children": [
      {
        "idventa": 69767,
        "cliente": "-, CONSUMIDOR FINAL",
        "vendedor": "colon",
        "estado": "PENDIENTE",
        "tipo": "7",
        "monto": "0",
        "fecha": "15-05-26",
        "fecha_retiro": "14-m-26",
        "sucursal_idsucursal": 15,
        "cliente_idcliente": 1,
        "en_laboratorio": 1,
        "sucursal": "DIST",
        "estado_taller": null,
        "isParent": 0,
        "key": 3
      }
    ]
  },
  {
    "idventa": 69766,
    "cliente": "-, CONSUMIDOR FINAL",
    "vendedor": "colon",
    "estado": "PENDIENTE",
    "tipo": "7",
    "monto": "0",
    "fecha": "15-05-26",
    "fecha_retiro": "14-m-26",
    "sucursal_idsucursal": 15,
    "cliente_idcliente": 1,
    "en_laboratorio": 1,
    "sucursal": "DIST",
    "estado_taller": null,
    "isParent": 1,
    "key": 4,
    "children": [
      {
        "idventa": 69766,
        "cliente": "-, CONSUMIDOR FINAL",
        "vendedor": "colon",
        "estado": "PENDIENTE",
        "tipo": "7",
        "monto": "0",
        "fecha": "15-05-26",
        "fecha_retiro": "14-m-26",
        "sucursal_idsucursal": 15,
        "cliente_idcliente": 1,
        "en_laboratorio": 1,
        "sucursal": "DIST",
        "estado_taller": null,
        "isParent": 0,
        "key": 5
      }
    ]
  }
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
  return (
    <div>
      {/*<Egreso aCajaMaster={true} callback={()=>alert("Callback desde egreso")} />
       <QRAccess />
       <TestGridCreation />
        <TrabajoRecetaStock />
      <EdicionVentas idventa={69677} />
       <TotalesVentasDiaEmpleado />
       
       <ListadoVentasTM />

              <TrabajoMultiple />

      
  <NuevoDescuento />
        <DetalleVentaTM />
  <TestGridCreation />
        <TrabajoMultiple />
     */}

      <Card>

      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Row>

                <Col span={24} >
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
      </Col></Row>
      </Card>
    </div>
  );
}

test.PageLayout = LayoutAdmin;
