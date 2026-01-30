import ExportToExcel2 from "@/components/etc/ExportToExcel2";
import ExportToCSV from "@/components/ExportToCSV";
import { post_method } from "@/src/helpers/post_helper";
import { currency_format } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Table, Button, Card, Select, Row, Col } from "antd";
import { useEffect, useState } from "react";
import FiltrosInforme from "./FiltrosInforme";
import { formatFloat } from "@/src/helpers/formatters";

const VentasVendedor = (props) => {
  // const { filtros, actualizar } = props;
  const [dataSource, setDatasource] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    mes: 1,
    anio: 2023,
    fkcliente: "-1",
    fksucursal: "-1",
    fkvendedor: "-1",
    nombreSucursal: "",
  });
  const [actualizar, setActualizar] = useState(false);

  const columns = [
    {
      width: "40px",
      title: "",
      render: (_, { idusuario }) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              onClick={() => {
                onDetalleLisaVentasClick(filtros.fksucursal, idusuario);
              }}
            >
              <InfoCircleOutlined />
            </Button>
          </>
        );
      },
    },
    { width: "100px", dataIndex: "usuario", title: "usuario", sorter: (a, b) => a.usuario.localeCompare(b.usuario), },
    {
      width: "100px",
      dataIndex: "efectivo",
      title: <div style={{ textAlign: "right" }}>efectivo</div>,
      render: (_, { efectivo }) => (
        <div style={money_style}>{formatFloat(efectivo)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "tarjeta",
      title: <div style={{ textAlign: "right" }}>tarjeta</div>,
      render: (_, { tarjeta }) => (
        <div style={money_style}>{formatFloat(tarjeta)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "cheque",
      title: <div style={{ textAlign: "right" }}>cheque</div>,
      render: (_, { cheque }) => (
        <div style={money_style}>{formatFloat(cheque)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "ctacte",
      title: <div style={{ textAlign: "right" }}>ctacte</div>,
      render: (_, { ctacte }) => (
        <div style={money_style}>{formatFloat(ctacte)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mutual",
      title: <div style={{ textAlign: "right" }}>mutual</div>,
      render: (_, { mutual }) => (
        <div style={money_style}>{formatFloat(mutual)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mp",
      title: <div style={{ textAlign: "right" }}>mp</div>,
      render: (_, { mp }) => (
        <div style={money_style}>{formatFloat(mp)}</div>
      ),
    },
    {
      fixed: "right",
      width: "120px",
      dataIndex: "total",
      title: <div style={{ textAlign: "right" }}>total</div>,
      render: (_, { total }) => (
        <div style={{ ...money_style, fontWeight: "bold" }}>
          {formatFloat  (total)}
        </div>
      ),
    },
  ];

  const money_style = {
    textAlign: "right",
  };

  useEffect(() => {
    load();
  }, [actualizar]);

  const load = (_) => {
    fetch(get.lista_usuarios)
      .then((r) => r.json())
      .then((response) => {
        const resp = response?.data || [];
        setUsuarios(resp.map((r) => ({ label: r.nombre, value: r.idusuario })));
      });
    //alert(JSON.stringify(filtros));
    post_method(post.totales_venta_vendedor, filtros, (response) => {
      setDatasource(
        response.data.map((r) => ({
          usuario: r.usuario,
          idusuario: r.usuario_idusuario,
          efectivo: r.efectivo,
          tarjeta: r.tarjeta,
          cheque: r.cheque,
          ctacte: r.ctacte,
          mutual: r.mutual,
          mp: r.mp,
          total: r.total,
        }))
      );
    });
  };

  return (
    <>
      <Card
        size="small"
      >
        <>
          <Row gutter={16}>
            <Col>
              <Select
                style={{ width: "300px" }}
                options={usuarios}
                prefix="Vendedor:"
                onChange={(v) =>
                  setFiltros((_fl) => ({ ..._fl, fkvendedor: v }))
                }
              />
            </Col>
            <Col>
              <FiltrosInforme
                callback={(_filtros) => {
                  setFiltros(_f=>({..._f,..._filtros}));
                  setActualizar(!actualizar);
                }}
              />
            </Col>
          </Row>

          <Table
            size="small"
            title={(_) => (
              <>{ dataSource.length<1 ? "" : `Ventas vendedores del período ${filtros.mes}/${filtros.anio}`}</>
            )}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            scroll={{ y: "400px" }}
            style={{ width: "100%" }}
            pagination={false}
            columns={columns}
            dataSource={dataSource}
            summary={(data) => {
              var totalEfvo = 0;
              var total = 0;
              var totalCheques = 0;
              var totalTarjetas = 0;
              var totalMutual = 0;
              var totalCtaCte = 0;
              var totalMP = 0;
              data.forEach((r) => {
                totalEfvo += parseFloat(r.efectivo);
                totalCheques += parseFloat(r.cheque);
                totalTarjetas += parseFloat(r.tarjeta);
                totalMutual += parseFloat(r.mutual);
                totalCtaCte += parseFloat(r.ctacte);
                totalMP += parseFloat(r.mp);
                total += parseFloat(r.total);
              });

              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2}>
                      TOTALES:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalEfvo)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalTarjetas)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalCheques)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalCtaCte)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalMutual)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(totalMP)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align={"right"}>
                      <b>{formatFloat(total)}</b>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />

          <ExportToCSV
            fileName={`ventas_vendedores__${filtros.mes}-${filtros.anio}`}
            parseFnt={() => {
              let s = filtros.nombreSucursal;
              let str = "";
              str += `MES:,${filtros.mes}, ANIO:,${filtros.anio}, ,,,\r\n`;
              str += `SUCURSAL:,${s || ""},,,,,,\r\n`;
              str +=
                "usuario, efectivo, tarjeta,  cheque, ctacte, mutual, mp , total\r\n";
              dataSource.forEach((r) => {
                str += `${r.usuario},${r.efectivo},${r.tarjeta},${r.cheque},${r.ctacte},${r.mutual},${r.mp},${r.total}\r\n`;
              });
              return str;
            }}
          />
        </>
      </Card>
    </>
  );
};

export default VentasVendedor;
