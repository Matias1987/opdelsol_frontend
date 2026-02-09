import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import VentaDetallePopup from "../VentaDetalle";
import SucursalSelect from "../SucursalSelect";
import AnularVentasCobradas from "./anularVentasCobradas";
import InformeVentaMinV3 from "@/components/informes/ventas/InformeVentasMinV3";
import { InfoCircleOutlined, InfoOutlined } from "@ant-design/icons";

const ListaVentasDia = ({dia,mes,anio, dateReadOnly, sucursal, sucursalReadOnly}) => {
  const [ventas, setVentas] = useState([]);
  const [idusuarioGraph, setIdUsuarioGraph] = useState(-1);
  const [total, setTotal] = useState(0);
  const [vendedores, setVendedores] = useState([]);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [popupAnularOpen, setPopupAnularOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);

  const [selectedVenta, setSelectedVenta] = useState(null)
  const [filtros, setFiltros] = useState({
    dia: 0,
    mes: 0,
    anio: 0,
    idusuario: -1,
    idsucursal: sucursal ? sucursal : -1,
  });
  const get_tipo = (tipo) => {
    switch (+tipo) {
      case 1:
        return "Vta. Dir.";
      case 2:
        return "Rec. Stock";
      case 3:
        return "L.C. Stock";
      case 4:
        return "Monof. Lab.";
      case 5:
        return "Multif. Lab.";
      case 6:
        return "L.C. Lab.";
    }
  };
  const columns = [
    {render:()=><><Checkbox/></>, width:"30px"},
    { dataIndex: "idventa", title: "Nro.", sorter:(a,b)=> +a.idventa-+b.idventa },
    { dataIndex: "cliente", title: "Cliente", sorter:(a,b)=> (a.cliente||"").localeCompare(b.cliente) },
    { dataIndex: "estado", title: "Estado", sorter:(a,b)=> (a.estado||"").localeCompare(b.estado) },
    { dataIndex: "tipo", title: "Tipo", render:(_,{tipo})=><>{get_tipo(tipo)}</>, sorter:(a,b)=> (a.estado||"").localeCompare(b.estado) },
    { dataIndex: "monto", title: "Monto", sorter:(a,b) => +a.monto-+b.monto, render:(_,{monto})=><div style={{textAlign:"right"}}>{parseFloat(monto).toLocaleString(2)}</div> },
    { dataIndex: "sucursal", title: "Sucursal", sorter:(a,b)=> (a.sucursal||"").localeCompare(b.sucursal) },
    {
      dataIndex: "idventa",
      title: "",
      render: (_, { idventa }) => {
        return (
          <>
            <Button size="small" onClick={_=>{setSelectedVenta(idventa); setPopupDetalleOpen(true);}}><InfoCircleOutlined /></Button>
            <Button size="small" type="link" danger onClick={_=>{ setSelectedVenta(idventa); setPopupAnularOpen(true);}}>Anular</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const today = new Date();
    setFiltros((_f) => ({
      ..._f,
      dia: dia ? dia : today.getDate(),
      mes: mes ? mes : today.getMonth() + 1,
      anio: anio ? anio : today.getFullYear(),
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
        idsucursal: +filtros.idsucursal <0 ? "" : filtros.idsucursal,
        incIngresadas: false,
        incAnuladas: false,
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
            tipo: r.tipo,
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
                disabled={dateReadOnly ? true : false}
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
                disabled={dateReadOnly ? true : false}
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
                disabled={dateReadOnly ? true : false}
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
        <SucursalSelect 
        disabled={sucursalReadOnly ? true : false}
        idsucursal={sucursal ? sucursal : null}
        callback={(idsucursal)=>{
            onChange("idsucursal", idsucursal);
        }} />
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
      <Card size="small">
        <Row>
          <Col span={24}>
            <Table
                pagination={false}
                scroll={{ y: "600px" }}
              title={header}
              rowClassName={(record, index) =>
                +record.idventa === selectedVenta ? "ok-row" : "table-row-light"
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
            <Input value={(total||"0").toLocaleString(2)} readOnly prefix="Total: $  " />
          </Col>
        </Row>
      </Card>
      {/*<Row>
        <Col span={24}>
            <InformeUsuarioGraphVentas idusuario={idusuarioGraph} key={idusuarioGraph} />
        </Col>
    </Row>*/}
    <Modal open={popupAnularOpen} onCancel={_=>setPopupAnularOpen(false)} width="800px" footer={null} destroyOnClose>
        <AnularVentasCobradas idventa={selectedVenta} />
    </Modal>
    <Modal 
    open={popupDetalleOpen} 
    onCancel={_=>{setPopupDetalleOpen(false)}}
    width={"800px"}
    footer={null}
    destroyOnClose
    >
      <InformeVentaMinV3 idventa={selectedVenta} />
    </Modal>
    </>
  );
};

export default ListaVentasDia;
