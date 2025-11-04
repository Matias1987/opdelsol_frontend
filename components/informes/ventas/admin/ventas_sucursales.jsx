import ListaVentasSucursalPeriodo from "@/components/admin/ListaVentasSucursalPeriodo";
import { post_method } from "@/src/helpers/post_helper";
import { currency_format } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { InfoCircleOutlined } from "@ant-design/icons";

import { Table, Button, Modal, Card } from "antd";
import { useEffect, useState } from "react";
import FiltrosInforme from "./FiltrosInforme";

const VentasSucursales = (props) => {
  const [filtros, setFiltros] = useState({
    mes: 1,
    anio: 2023,
    fkcliente: "-1",
    fksucursal: "-1",
  });
  const [actualizar, setActualizar] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [filtrosListaVtas, setFiltrosListaVtas] = useState({
    fksucursal: -1,
    fkvendedor: -1,
  });

  const onDetalleLisaVentasClick = (fksucursal, fkvendedor) => {
    setFiltrosListaVtas((f) => ({
      ...f,
      fksucursal: fksucursal,
      fkvendedor: fkvendedor,
    }));
    setPopupDetalleOpen(true);
  };

  const [dataSourceSucursal, setDatasourceSucursal] = useState([]);
  const money_style = {
    textAlign: "right",
  };
  const columns_s = [
    {
      width: "40px",
      title: "",
      render: (_, { idsucursal }) => {
        return (
          <>
            <Button
              type="link"
              size="small"
              onClick={() => {
                onDetalleLisaVentasClick(idsucursal, -1);
              }}
            >
              <InfoCircleOutlined />
            </Button>
          </>
        );
      },
    },
    { width: "100px", dataIndex: "sucursal", title: "sucursal" },
    {
      width: "100px",
      dataIndex: "efectivo",
      title: <div style={{ textAlign: "right" }}>efectivo</div>,
      render: (_, { efectivo }) => (
        <div style={money_style}>{currency_format(efectivo)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "tarjeta",
      title: <div style={{ textAlign: "right" }}>tarjeta</div>,
      render: (_, { tarjeta }) => (
        <div style={money_style}>{currency_format(tarjeta)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "cheque",
      title: <div style={{ textAlign: "right" }}>cheque</div>,
      render: (_, { cheque }) => (
        <div style={money_style}>{currency_format(cheque)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "ctacte",
      title: <div style={{ textAlign: "right" }}>ctacte</div>,
      render: (_, { ctacte }) => (
        <div style={money_style}>{currency_format(ctacte)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mutual",
      title: <div style={{ textAlign: "right" }}>mutual</div>,
      render: (_, { mutual }) => (
        <div style={money_style}>{currency_format(mutual)}</div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mp",
      title: <div style={{ textAlign: "right" }}>mp</div>,
      render: (_, { mp }) => (
        <div style={money_style}>{currency_format(mp)}</div>
      ),
    },
    {
      fixed: "right",
      width: "120px",
      dataIndex: "total",
      title: <div style={{ textAlign: "right" }}>total</div>,
      render: (_, { total }) => (
        <div style={{ ...money_style, fontWeight: "bold" }}>
          {currency_format(total)}
        </div>
      ),
    },
  ];

  const load = (_) => {
    post_method(post.totales_venta_sucursal, filtros, (response) => {
      setDatasourceSucursal(
        response.data.map((r) => ({
          sucursal: r.sucursal,
          idsucursal: r.sucursal_idsucursal,
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

  useEffect(() => {
    load();
  }, [actualizar]);

  return (
    <>
    
      <Card title={`Ventas por sucursal del período ${filtros.mes}/${filtros.anio}`}>
        <FiltrosInforme callback={(newFilters) => { setFiltros(newFilters); setActualizar(!actualizar); }} />

        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          scroll={{ y: "400px" }}
          style={{ width: "100%" }}
          pagination={false}
          columns={columns_s}
          dataSource={dataSourceSucursal}
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
                  <Table.Summary.Cell colSpan={2}>TOTALES:</Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalEfvo)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalTarjetas)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalCheques)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalCtaCte)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalMutual)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(totalMP)}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align={"right"}>
                    <b>{currency_format(total)}</b>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </Card>

      <Modal
        width={"95%"}
        footer={null}
        open={popupDetalleOpen}
        destroyOnClose
        onCancel={() => {
          setPopupDetalleOpen(false);
        }}
      >
        <ListaVentasSucursalPeriodo
          callback={() => {
            setPopupDetalleOpen(false);
          }}
          fkusuario={filtrosListaVtas.fkvendedor}
          mes={filtros.mes}
          anio={filtros.anio}
          fksucursal={filtrosListaVtas.fksucursal}
        />
      </Modal>
    </>
  );
};

export default VentasSucursales;
