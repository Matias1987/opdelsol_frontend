import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import InformeUsuarioGraphVentas from "./InformeUsuarioGraphVentas";

const ListaVentasDia = (props) => {
  const [ventas, setVentas] = useState([]);
  const [idusuarioGraph, setIdUsuarioGraph] = useState(-1);
  const [total, setTotal] = useState(0);
  const [vendedores, setVendedores] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [filtros, setFiltros] = useState({
    dia: 0,
    mes: 0,
    anio: 0,
    idusuario: -1,
  });
  const columns = [
    { dataIndex: "idventa", title: "Nro." },
    { dataIndex: "cliente", title: "Cliente" },
    { dataIndex: "estado", title: "Estado" },
    { dataIndex: "monto", title: "Monto", render:(_,{monto})=><div style={{textAlign:"right"}}>{parseFloat(monto).toLocaleString(2)}</div> },
    { dataIndex: "sucursal", title: "Sucursal" },
    {
      dataIndex: "idventa",
      title: "",
      render: (_, { idventa }) => {
        return (
          <>
            <VentaDetallePopup idventa={idventa} />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const today = new Date();
    setFiltros((_f) => ({
      ..._f,
      dia: today.getDate(),
      mes: today.getMonth() + 1,
      anio: today.getFullYear(),
    }));
    //get lista vendedores
    fetch(get.lista_usuarios)
      .then((r) => r.json())
      .then((response) => {
        const resp = response?.data || [];
        setVendedores([
          ...[{ label: "Todos", value: "-1" }],
          ...resp.map((r) => ({ label: r.nombre, value: r.idusuario })),
        ]);
      });
  }, []);

  const load = () => {
    post_method(
      post.venta_estado_sucursal,
      {
        idusuario: filtros.idusuario,
        fecha: `${filtros.anio}-${filtros.mes}-${filtros.dia}`,
      },
      (response) => {
        const resp = response?.data || [];
        setVentas(
          resp.map((r) => ({
            idventa: r.idventa,
            cliente: r.cliente,
            monto: r.monto,
            estado: r.estado,
            sucursal: r.sucursal,
          }))
        );
        let t = 0;
        resp.forEach((r) => {
          t += parseFloat(r.monto);
        });
        setTotal(t);
      }
    );
  };

  const onChange = (idx, value) => {
    setButtonEnabled(true);
    setFiltros((_f) => ({ ..._f, [idx]: value }));
  };

  const aplicarFiltros = (_) => {
    setButtonEnabled(false);
    setIdUsuarioGraph(filtros.idusuario);
    load();
  };

  const header = _ => (
    <>
      <Row gutter={16}>
        <Col>
          <Select
            prefix={<span>Vendedor:&nbsp;</span>}
            onChange={(v) => {
                setVentas([]);
              onChange("idusuario", v);
            }}
            options={vendedores}
            placeholder="Seleccione vendedor"
            style={{ width: "300px" }}
          />
        </Col>

        <Col>Fecha:</Col>
        <Col>
          <Space direction="vertical" size="middle">
            <Space.Compact size="middle">
              <Input
                value={filtros.dia}
                min={1}
                max={31}
                addonBefore={"Día"}
                onChange={(e) => {
                  onChange("dia", e.target.value);
                }}
                type="number"
              />
              <Input
                value={filtros.mes}
                min={1}
                max={12}
                addonBefore={"Mes"}
                onChange={(e) => {
                  onChange("mes", e.target.value);
                }}
                type="number"
              />
              <Input
                value={filtros.anio}
                min={2013}
                addonBefore={"Año"}
                onChange={(e) => {
                  onChange("anio", e.target.value);
                }}
                type="number"
              />
            </Space.Compact>
          </Space>
        </Col>
        <Col>
          <Button type="primary" onClick={aplicarFiltros} disabled={!buttonEnabled}>
            Aplicar Filtros
          </Button>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Card title={<>Lista de Ventas por D&iacute;a</>} size="small">
        <Row>
          <Col span={24}>
            <Table
                pagination={false}
                scroll={{ y: "600px" }}
              title={header}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              dataSource={ventas}
              columns={columns}
              size="small"
              bordered
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input value={ventas.length} readOnly prefix="Cantidad:   " />
            <Input value={total} readOnly prefix="Total: $  " />
          </Col>
        </Row>
      </Card>
      {/*<Row>
        <Col span={24}>
            <InformeUsuarioGraphVentas idusuario={idusuarioGraph} key={idusuarioGraph} />
        </Col>
    </Row>*/}
    </>
  );
};

export default ListaVentasDia;
