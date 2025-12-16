import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Modal, Row, Table } from "antd";
import VentaDetallePopup from "../VentaDetalle";
import InformeVentaMinV3 from "../informes/ventas/InformeVentasMinV3";
import { formatFloat } from "@/src/helpers/formatters";

const { useState, useEffect } = require("react");

const ListaVentasSucursalPeriodo = (props) => {
  const [ventas, setVentas] = useState([]);
  const [totales, setTotales] = useState({ cant_total: 0, monto_total: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [popupOpen, setPopupOpen] = useState(false);

  const columns = [
    { dataIndex: "idventa", title: "Nro.", sorter:(a,b)=>+a.idventa-+b.idventa, },
    {
      dataIndex: "fecha_retiro_f",
      title: "Fecha Retiro",
      sorter: (a, b) => {
        // Convert date strings to Date objects and return the difference in timestamps
        return new Date(a.fecha_retiro_f1) - new Date(b.fecha_retiro_f1);
      },
    },
    { dataIndex: "cliente", title: "Cliente", sorter: (a, b) => a.cliente.localeCompare(b.name), },
    { dataIndex: "vendedor", title: "Vendedor", sorter: (a, b) => a.vendedor.localeCompare(b.name), },
    { dataIndex: "monto", title: "Monto" , sorter:(a,b)=>+a.monto-+b.monto, render:(_,record)=><div style={{textAlign:"right"}}>{formatFloat(record.monto)}</div>},
    {
      render: (_, { idventa }) => (
        <>
          <Button
            onClick={() => {
              setSelectedId(idventa);
              setPopupOpen(true);
            }}
          >
            <InfoCircleFilled />
          </Button>
        </>
      ),
    },
  ];

  const load = () => {
    post_method(
      post.obtener_lista_ventas_sucursal_periodo,
      {
        mes: props.mes,
        anio: props.anio,
        fksucursal: props.fksucursal,
        fkusuario: props.fkusuario,
      },
      (response) => {
        let _monto_total = 0;

        response.data.forEach((r) => {
          _monto_total += parseFloat(r.monto);
        });

        setTotales((t) => ({
          ...t,
          cant_total: response.data.length,
          monto_total: _monto_total,
        }));
       
        setVentas(response.data);
      }
    );
  };

  const _style = {
    width: "100%",
    border: "1px solid black",
  };

  useEffect(() => {
    load();
  }, []);

  const html_totales = (_) => (
    <span style={{ fontWeight: "bold" }}>
      Cant Total: {totales.cant_total} Monto total: ${ formatFloat(totales.monto_total)}
    </span>
  );

  const html_table = (_) =>
    ventas.length < 1 ? (
      <></>
    ) : (
      <>
        <table style={_style}>
          <thead>
            <th>Nro.</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Monto</th>
          </thead>
          <tbody>
            {ventas.map((r) => (
              <tr>
                <td>{r.idventa}</td>
                <td>{r.fecha_retiro_f}</td>
                <td>{r.cliente}</td>
                <td>{r.vendedor}</td>
                <td style={{ textAlign: "right" }}>$&nbsp;{r.monto}</td>
                <td>
                  <Button>
                    <InfoCircleFilled />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );

  return (
    <>
      <Row>
        <Col span={24}>
          Ventas Periodo: {props.mes} / {props.anio}
        </Col>
      </Row>
      <Row>
        <Col span={24}>{html_totales()}</Col>
      </Row>
      <Row>
        <Table dataSource={ventas} columns={columns} scroll={{ y: "800px" }} />
      </Row>
      <Row>
        <Col span={24}>{html_totales()}</Col>
      </Row>
      <Modal
        destroyOnClose
        width={"90%"}
        open={popupOpen}
        onCancel={() => {
          setPopupOpen(false);
        }}
      >
        <InformeVentaMinV3 idventa={selectedId} />
      </Modal>
    </>
  );
};

export default ListaVentasSucursalPeriodo;
