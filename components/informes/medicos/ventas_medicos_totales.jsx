import PrinterWrapper from "@/components/PrinterWrapper";
import { post_method } from "@/src/helpers/post_helper";
import { parse_int_string } from "@/src/helpers/string_helper";
import { get, post } from "@/src/urls";
import { Button, Card, Col, Divider, Input, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import VentasMedicos from "./ventas_medicos";
import ExportToCSV from "@/components/ExportToCSV";
import Modal from "antd/es/modal/Modal";

const ListaVentasMedicosTotales = (props) => {
  const [dataSource, setDataSource] = useState([]);

  const [mes, setMes] = useState(1);
  const [anio, setAnio] = useState(1);
  const [nombre, setNombre] = useState("");
  const [idsucursal, setIdSucursal] = useState(-1);
  const [nombreSucursal, setNombreSucursal] = useState(-1);
  const [sucursales, setSucursales] = useState([]);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [popupVentasMedicoOpen, setPopupVentasMedicoOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const title_style_money = { fontWeight: "bold", textAlign: "right" };
  const columns = [
    { width: "120px", dataIndex: "medico", title: "medico", fixed: "left" },
    {
      width: "100px",
      dataIndex: "efectivo",
      title: <div style={title_style_money}>efectivo</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.efectivo).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "tarjeta",
      title: <div style={title_style_money}>tarjeta</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.tarjeta).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "cheque",
      title: <div style={title_style_money}>cheque</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.cheque).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "ctacte",
      title: <div style={title_style_money}>ctacte</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.ctacte).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mutual",
      title: <div style={title_style_money}>mutual</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.mutual).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "mercadopago",
      title: <div style={title_style_money}>mercadopago</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.mercadopago).toLocaleString(2)}
        </div>
      ),
    },
    {
      width: "100px",
      dataIndex: "transferencia",
      title: <div style={title_style_money}>transferencia</div>,
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>
          {parseFloat(obj.transferencia).toLocaleString(2)}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const d = new Date();
    setMes(d.getMonth() + 1);
    setAnio(d.getFullYear());
    /* get sucursales */
    fetch(get.sucursales)
      .then((r) => r.json())
      .then((r) => {
        if (((r || null)?.data || null) != null) {
          setSucursales([
            ...[{ label: "-", value: -1 }],
            ...r.data.map((s) => ({ label: s.nombre, value: s.idsucursal })),
          ]);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const init_totales = () => {
    //alert(post.totales_ventas_medicos)
    post_method(
      post.totales_ventas_medicos,
      {
        mes: mes,
        anio: anio,
        nombre: nombre,
        idsucursal: idsucursal,
      },
      (response) => {
        //alert(JSON.stringify(response))
        if (response != null) {
          setDataSource(
            response.data.map((r) => ({
              medico: r.medico,
              idmedico: r.medico_idmedico,
              efectivo: r.efectivo,
              tarjeta: r.tarjeta,
              cheque: r.cheque,
              ctacte: r.ctacte,
              mutual: r.mutual,
              mercadopago: r.mercadopago,
              transferencia: r.transferencia,
            }))
          );
        }
      }
    );
  };

  const row_style = { marginTop: "10px", marginBottom: "10px" };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col>
          <h3>Ventas por M&eacute;dicos</h3>
        </Col>
      </Row>
      <Row style={row_style} gutter={[16, 16]}>
        <Col>
          <b>Peri&oacute;do:</b>
        </Col>
        <Col>
          <Input
            style={{ width: "150px" }}
            type="number"
            min={1}
            max={12}
            value={mes}
            onChange={(e) => {
              setMes(parse_int_string(e.target.value));
            }}
            prefix="Mes: "
          />
        </Col>
        <Col>
          <Input
            style={{ width: "150px" }}
            type="number"
            min={2023}
            value={anio}
            onChange={(e) => {
              setAnio(parse_int_string(e.target.value));
            }}
            prefix="Año: "
          />
        </Col>
        <Col>
          <Input
            style={{ width: "200px" }}
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
            prefix="Nombre: "
          />
        </Col>
        <Col>
          <Select
            prefix={
              <span style={{ fontWeight: "bold", overflow: "hidden" }}>
                Sucursal:&nbsp;
              </span>
            }
            style={{ width: "230px", overflow: "hidden" }}
            options={sucursales}
            placeholder="Seleccione sucursal"
            onChange={(v) => {
              setIdSucursal(v);
              let n = "";
              sucursales.forEach((s) => {
                if (s.value == v) {
                  n = s.label;
                }
              });

              setNombreSucursal(n);
            }}
          />
        </Col>
        <Col>
          <Button onClick={init_totales} type="primary">
            Aplicar
          </Button>
        </Col>
      </Row>
      <Row style={row_style}>
        <Col span={24}>
          <Card
            style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
            size="small"
            title={
              <>
                Totales ventas M&eacute;dicos periodo {mes}-{anio}
              </>
            }
            extra={
              <>
                <Input
                  allowClear
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Buscar médico"
                />
              </>
            }
          >
            <Row>
              <Col span={24}>
                <Table
                  size="small"
                  scroll={{ y: "450px" }}
                  columns={columns}
                  dataSource={dataSource.filter((r) =>
                    r.medico.toLowerCase().includes(searchValue.toLowerCase())
                  )}
                  pagination={false}
                  onRow={(record, index) => ({
                    onClick: (event) => {
                      setSelectedMedico(record);
                      setPopupVentasMedicoOpen(true);
                    },
                  })}
                />
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <ExportToCSV
                  fileName={`ventas_medicos_${mes}-${anio}`}
                  parseFnt={() => {
                    let str = "";
                    str += `MES:,${mes}, ANIO:,${anio}, ,,,\r\n`;
                    str += `SUCURSAL:,${nombreSucursal}, ,, ,,,\r\n`;
                    str +=
                      "MEDICO, EFECTIVO, TARJETA,  CHEQUE, CTACTE, MUTUAL, MERCADOPAGO,TRANSFERENCIA,\r\n";
                    dataSource.forEach((r) => {
                      str += `${r.medico},${r.efectivo},${r.tarjeta},${r.cheque},${r.ctacte},${r.mutual},${r.mercadopago},${r.transferencia},\r\n`;
                    });
                    return str;
                  }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Modal
        width={"90%"}
        destroyOnClose
        title="Ventas por Médico"
        open={popupVentasMedicoOpen}
        onCancel={() => {
          setSelectedMedico(null);
          setPopupVentasMedicoOpen(false);
        }}
        footer={null}
      >
        {selectedMedico && (
          <VentasMedicos
            nombre_medico={selectedMedico.medico}
            mes={mes}
            anio={anio}
            idmedico={selectedMedico.idmedico}
            idsucursal={idsucursal}
          />
        )}
      </Modal>
    </>
  );
};

export default ListaVentasMedicosTotales;
