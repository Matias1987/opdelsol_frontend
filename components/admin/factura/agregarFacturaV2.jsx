import {
  CloseCircleTwoTone,
  PlusCircleFilled,
  PlusOutlined,
  SaveFilled,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  FloatButton,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import PercepcionesForm from "./percepcionesForm";
import RetencionesForm from "./retencionesForm";
import IVAForm from "./ivaForm";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import AgregarProductoFactura from "./agregarProductoFactura";

const AgregarFacturaV2 = (props) => {
  const [factura, setFactura] = useState({
    conceptosNoGravados: 0,
    impuestosInternos: 0,
    total: 0,
    iva: [],
    percepciones: [],
    retenciones: [],
    fkproveedor: "-1",
    nro: "",
    fecha: "",
    periodo: "",
    tipo: "A",
    puntoVenta: "",
    cant_productos: 0,
  });
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const [ivaRows, setIvaRows] = useState([]);
  const [percepcionRows, setPercepcionRows] = useState([]);
  const [retencionRows, setRetencionRows] = useState([]);
  const [localIdx, setLocalIdx] = useState(0);

  const [popupRetencionesOpen, setPopupRetencionesOpen] = useState(false);
  const [popupPercepcionesOpen, setPopupPercepcionesOpen] = useState(false);
  const [popupIVAopen, setPopupIVAOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSelectEnabled, setProveedorSelectEnabled] = useState(true);
  const [esRemito, setEsRemito] = useState(false);

  const columnsIVA = [
    { title: "Tipo", dataIndex: "tipo" },
    { title: "Monto", dataIndex: "monto" },
    /*{title:"localid", dataIndex:"id"},*/
    {
      render: (_, { id }) => (
        <>
          <Button
            onClick={() => {
              let _rows = ivaRows.filter((i) => i.id != id);

              let _total = calcularTotal(
                factura,
                _rows,
                percepcionRows,
                retencionRows
              );

              setFactura((f) => ({ ...f, total: _total }));

              setIvaRows((_) => _rows);
            }}
          >
            <CloseCircleTwoTone />
          </Button>
        </>
      ),
    },
  ];
  const columnsPercepcionRows = [
    { title: "Monto", dataIndex: "monto" },
    /*{title:"localid", dataIndex:"id"},*/
    {
      render: (_, { id }) => (
        <>
          <Button
            onClick={() => {
              let _rows = percepcionRows.filter((i) => i.id != id);

              let _total = calcularTotal(
                factura,
                ivaRows,
                _rows,
                retencionRows
              );

              setFactura((f) => ({ ...f, total: _total }));

              setPercepcionRows((_) => _rows);
            }}
          >
            <CloseCircleTwoTone />
          </Button>
        </>
      ),
    },
  ];
  const columnsRetencionRows = [
    { title: "Monto", dataIndex: "monto" },
    { title: "Detalle", dataIndex: "tipo" },
    /* {title:"localid", dataIndex:"id"},*/
    {
      render: (_, { id }) => (
        <>
          <Button
            onClick={() => {
              let _rows = retencionRows.filter((i) => i.id != id);

              let _total = calcularTotal(
                factura,
                ivaRows,
                percepcionRows,
                _rows
              );

              setFactura((f) => ({ ...f, total: _total }));

              setRetencionRows((_) => _rows);
            }}
          >
            <CloseCircleTwoTone />
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if ("undefined" !== typeof props.idproveedor) {
      setProveedorSelectEnabled(false);
      setFactura((_f) => ({ ..._f, fkproveedor: props.idproveedor }));
    }
    if ("undefined" !== typeof props.esremito) {
      setEsRemito(props.esremito);
    }

    fetch(get.lista_proveedores)
      .then((r) => r.json())
      .then((response) => {
        setProveedores([
          ...[{ value: "-1", label: "Seleccione..." }],
          ...response.data.map((r) => ({
            value: r.idproveedor,
            label: r.nombre,
          })),
        ]);
      });
  }, [reload]);

  const onProveedorChange = (v) => {
    setFactura((f) => ({ ...f, fkproveedor: v }));
  };

  const onConceptosNoGravadosChange = (v) => {
    let temp = { ...factura, conceptosNoGravados: v };

    let total = calcularTotal(temp, ivaRows, percepcionRows, retencionRows);

    setFactura((f) => ({ ...f, conceptosNoGravados: v, total: total }));
  };

  const onImpuestosInternosChange = (v) => {
    let temp = { ...factura, impuestosInternos: v };

    let total = calcularTotal(temp, ivaRows, percepcionRows, retencionRows);

    setFactura((f) => ({ ...f, impuestosInternos: v, total: total }));
  };

  const onNroChange = (v) => {
    setFactura((f) => ({ ...f, nro: v }));
  };

  const onTipoChange = (v) => {
    setFactura((f) => ({ ...f, tipo: v }));
  };

  const onPuntoVentaChange = (v) => {
    setFactura((f) => ({ ...f, puntoVenta: v }));
  };

  const onSave = () => {
    if (factura.fecha == "") {
      alert("Fecha no seleccionada");
      return;
    }
    if (factura.nro == "") {
      alert("Número no cargado");
      return;
    }

    const data = {
      ...factura,
      iva: ivaRows,
      percepciones: percepcionRows,
      retenciones: retencionRows,
      esremito: esRemito ? 1 : 0,
    };
    //console.log(JSON.stringify(data))
    //alert(JSON.stringify(data))
    post_method(post.insert.factura, data, (resp) => {
      alert("Hecho.");
      props?.callback?.();
    });
  };

  const onChange = (idx, value) => {
    setFactura((f) => ({ ...f, [idx]: value }));
  };

  const calcularTotal = (
    _factura,
    _ivarows,
    _percepcionesrows,
    _retencionesrows
  ) => {
    let totalIVA = 0;
    let totalPercepciones = 0;
    let totalRetenciones = 0;

    _ivarows.forEach((i) => {
      totalIVA += parseFloat(i.monto);
    });
    _percepcionesrows.forEach((i) => {
      totalPercepciones += parseFloat(i.monto);
    });
    _retencionesrows.forEach((i) => {
      totalRetenciones += parseFloat(i.monto);
    });

    return (
      parseFloat(_factura.conceptosNoGravados) +
      parseFloat(_factura.impuestosInternos) +
      parseFloat(totalIVA) +
      parseFloat(totalPercepciones) +
      parseFloat(totalRetenciones)
    );
  };

  const tablaIVA = () => (
    <Table
      size="small"
      locale={{ emptyText: " " }}
      pagination={false}
      title={() => (
        <div style={{ fontSize: ".8em" }}>
          IVA{" "}
          <Button
            size="small"
            style={{ fontSize: ".8em", color: "blue" }}
            onClick={() => {
              setPopupIVAOpen(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </div>
      )}
      columns={columnsIVA}
      dataSource={ivaRows}
      scroll={{ y: "150px" }}
    />
  );
  const tablaPercepcion = () => (
    <Table
      size="small"
      locale={{ emptyText: " " }}
      pagination={false}
      title={() => (
        <div style={{ fontSize: ".8em" }}>
          Percepciones{" "}
          <Button
            size="small"
            style={{ fontSize: ".8em", color: "blue" }}
            onClick={() => {
              setPopupPercepcionesOpen(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </div>
      )}
      columns={columnsPercepcionRows}
      dataSource={percepcionRows}
      scroll={{ y: "150px" }}
    />
  );
  const tablaRetencion = () => (
    <Table
      size="small"
      locale={{ emptyText: " " }}
      pagination={false}
      title={() => (
        <div style={{ fontSize: ".8em" }}>
          Retenciones{" "}
          <Button
            size="small"
            style={{ fontSize: ".8em", color: "blue" }}
            onClick={() => {
              setPopupRetencionesOpen(true);
            }}
          >
            <PlusOutlined />
          </Button>
        </div>
      )}
      columns={columnsRetencionRows}
      dataSource={retencionRows}
      scroll={{ y: "150px" }}
    />
  );
  const _rows_style = { padding: "12px" };
  return (
    <>
      {/*<FloatButton shape="square" icon={<SaveFilled />} onClick={onSave}/>*/}
      <Row style={_rows_style} gutter={[24, 18]}>
        <Col>
          <Select
            prefix="Proveedor:  "
            disabled={!proveedorSelectEnabled}
            style={{ width: "300px" }}
            options={proveedores}
            onChange={(v) => {
              onProveedorChange(v);
            }}
            value={factura.fkproveedor}
          />
        </Col>

        <Col>
          <DatePicker
            prefix="Fecha: "
            format={"DD-MM-YYYY"}
            onChange={(value) => {
              const _fecha = value ? value.format("YYYY-MM-DD") : "";
              onChange("fecha", _fecha);
            }}
          />
        </Col>
        <Col>
          <Input
            prefix="Nro.:"
            onChange={(e) => {
              onNroChange(e.target.value);
            }}
            value={factura.nro}
          />
        </Col>
        {esRemito ? (
          <></>
        ) : (
          <>
            <Col>
              <Select
                prefix="Tipo: "
                options={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "ND", value: "ND" },
                  { label: "NC", value: "NC" },
                ]}
                style={{ width: "100px" }}
                onChange={(v) => {
                  onTipoChange(v);
                }}
                value={factura.tipo}
              />
            </Col>

            <Col>
              <Input
                maxLength={12}
                prefix="Punto de Venta:  "
                value={factura.puntoVenta}
                onChange={(e) => {
                  onPuntoVentaChange(e.target.value);
                }}
              />
            </Col>
          </>
        )}
      </Row>

      {esRemito ? (
        <></>
      ) : (
        <>
          <Row style={_rows_style}>
            <Col span={8} style={{ padding: "2px" }}>
              {tablaIVA()}
            </Col>
            <Col span={8} style={{ padding: "2px" }}>
              {tablaPercepcion()}
            </Col>

            <Col span={8} style={{ padding: "2px" }}>
              {tablaRetencion()}
            </Col>
          </Row>
          <Row style={_rows_style} gutter={[24, 18]}>
            <Col>
              <Input
                style={{ width: "320px" }}
                type="number"
                prefix="Conceptos no Gravados: "
                value={parseFloat(factura.conceptosNoGravados || "0")}
                onChange={(e) => {
                  onConceptosNoGravadosChange(e.target.value || "0");
                }}
                allowClear
              />
            </Col>

            <Col>
              <Input
                style={{ width: "300px" }}
                type="number"
                prefix="Impuestos Internos: "
                value={parseFloat(factura.impuestosInternos || "0")}
                onChange={(e) => {
                  onImpuestosInternosChange(e.target.value || "0");
                }}
                allowClear
              />
            </Col>
          </Row>
        </>
      )}

      <Row style={_rows_style} gutter={[24, 18]}>
        <Col>
          <Input
            style={{ width: "300px" }}
            prefix="Monto Total: "
            readOnly={!esRemito}
            value={parseFloat(factura.total || "0")}
            onChange={(e) => {
              setFactura((f) => ({
                ...f,
                total: parseFloat(e.target.value || "0"),
              }));
            }}
          />
        </Col>

        <Col>
          <Input
            style={{ width: "300px" }}
            prefix="Cant. Productos: "
            value={parseInt(factura.cant_productos || "0")}
            onChange={(e) =>
              setFactura((f) => ({
                ...f,
                cant_productos: parseInt(e.target.value || "0"),
              }))
            }
          />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24} style={{ fontSize: ".7em", color: "gray" }}>
          {/*<AgregarProductoFactura /> */}
        </Col>
      </Row>
      <Divider />
      <Row style={{ display: "flex", justifyContent: "end" }}>
        <Col>
          <Button
            size="large"
            block
            type="primary"
            onClick={onSave}
            style={{ borderRadius: "16px" }}
          >
            Guardar
          </Button>
        </Col>
      </Row>
      
      <Modal
        destroyOnClose
        width={"400px"}
        title="Agregar Percepcion"
        open={popupPercepcionesOpen}
        footer={null}
        onCancel={() => {
          setPopupPercepcionesOpen(false);
        }}
      >
        <PercepcionesForm
          callback={(n) => {
            let _rows = [...percepcionRows, { ...n, id: localIdx }];

            let total = calcularTotal(factura, ivaRows, _rows, retencionRows);
            setFactura((f) => ({ ...f, total: total }));

            setPercepcionRows(_rows);
            setLocalIdx(localIdx + 1);
            setPopupPercepcionesOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        width={"400px"}
        title="Agregar Retencion"
        open={popupRetencionesOpen}
        footer={null}
        onCancel={() => {
          setPopupRetencionesOpen(false);
        }}
      >
        <RetencionesForm
          callback={(n) => {
            let _rows = [...retencionRows, { ...n, id: localIdx }];

            let total = calcularTotal(factura, ivaRows, percepcionRows, _rows);
            setFactura((f) => ({ ...f, total: total }));

            setRetencionRows(_rows);
            setLocalIdx(localIdx + 1);
            setPopupRetencionesOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        width={"350px"}
        title="Agregar IVA"
        open={popupIVAopen}
        footer={null}
        onCancel={() => {
          setPopupIVAOpen(false);
        }}
      >
        <IVAForm
          callback={(n) => {
            let _rows = [...ivaRows, { ...n, id: localIdx }];

            let total = calcularTotal(
              factura,
              _rows,
              percepcionRows,
              retencionRows
            );
            setFactura((f) => ({ ...f, total: total }));

            setIvaRows(_rows);
            setLocalIdx(localIdx + 1);
            setPopupIVAOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
    </>
  );
};

export default AgregarFacturaV2;
