import { Button, Card, Checkbox, Col, DatePicker, Input, Row, Select, Table } from "antd";
import SucursalSelect from "../SucursalSelect";
import { useState } from "react";
import SelectVendedor from "../usuario/vendedor/SelectVendedor";
import ExportToExcel2 from "../etc/ExportToExcel2";

const VentasFiltrosAdmin = (props) => {
  const [filtrarPorMonto, setFiltrarPorMonto] = useState(false);
  const [filtrarPorVendedor, setFiltrarPorVendedor] = useState(false);
  const [filtrarPorEstado, setFiltrarPorEstado] = useState(false);
  const columns = [
    { title: "ID Venta", dataIndex: "idventa", key: "idventa" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Vendedor", dataIndex: "vendedor", key: "vendedor", sorter: (a, b) => a.vendedor.localeCompare(b.vendedor) },
    { title: "Tipo", dataIndex: "tipo", key: "tipo", sorter: (a, b) => a.tipo.localeCompare(b.tipo) },
    { title: "Cliente", dataIndex: "cliente", key: "cliente", sorter: (a, b) => a.cliente.localeCompare(b.cliente) },
    { title: "Monto", dataIndex: "monto", key: "monto", sorter: (a, b) => a.monto - b.monto },
  ];
  const [ventas, setVentas] = useState([]);
  
  const load = () => {
    //fetch ventas with filters
  };
  
  return (
    <>
      <Card title="Filtrar Ventas">
        <Row gutter={16}>
          <Col>
            <DatePicker.RangePicker prefix="Periódo" />
          </Col>
          </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col>
            <SucursalSelect addNullOption={true} callback={() => {}} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: "10px" }}>
          <Col style={{ paddingTop: "6px" }}>
            <Checkbox
              checked={filtrarPorMonto}
              onChange={(e) => setFiltrarPorMonto(e.target.checked)}
            >
              Filtrar por Monto
            </Checkbox>
          </Col>
          <Col>
            <Select
              disabled={!filtrarPorMonto}
              value={0}
              options={[
                { label: "Igual a", value: 0 },
                { label: "Menor a", value: 1 },
                { label: "Mayor a", value: 2 },
              ]}
              style={{ width: "300px" }}
            />
          </Col>
          <Col>
            <Input
              disabled={!filtrarPorMonto}
              style={{ width: "300px" }}
              prefix="Monto"
            />
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col style={{ paddingTop: "6px" }}>
            <Checkbox
              checked={filtrarPorEstado}
              onChange={(e) => setFiltrarPorEstado(e.target.checked)}
            >
              Filtrar por Estado
            </Checkbox>
          </Col>
          <Col>
            <Select
              style={{ width: "300px" }}
              disabled={!filtrarPorEstado}
              prefix="Estado:"
              options={[
                { value: "INGRESADO", label: "INGRESADO" },
                { value: "PENDIENTE", label: "PENDIENTE" },
                { value: "TERMINADO", label: "TERMINADO" },
                { value: "ENTREGADO", label: "ENTREGADO" },
                { value: "ANULADO", label: "ANULADO" },
              ]}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col style={{ paddingTop: "12px" }}>
            <Checkbox
              checked={filtrarPorVendedor}
              onChange={(e) => setFiltrarPorVendedor(e.target.checked)}
            >
              Filtrar por Vendedor
            </Checkbox>
          </Col>
          <Col>{filtrarPorVendedor && <SelectVendedor />}</Col>
        </Row>
        <Row style={{paddingTop:"20px"}}>
            <Col><Button type="primary">Aplicar Filtros</Button></Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
              <Col span={24}>
                <Table title={_=><div style={{display:"flex", justifyContent:"space-between"}}><div>Resultado</div>  <div style={{backgroundColor:"red"}}><ExportToExcel2 /></div></div>} dataSource={ventas} columns={columns} />
              </Col>
        </Row>
      </Card>
    </>
  );
};

export default VentasFiltrosAdmin;
