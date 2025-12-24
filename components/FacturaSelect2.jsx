import { get } from "@/src/urls";
import {
  CloseCircleFilled,
} from "@ant-design/icons";
import { Button, Col, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import ProveedorForm from "./forms/ProveedorForm";
import DetalleFactura from "./forms/deposito/DetalleFactura";
import AgregarFacturaV3 from "./admin/factura/agregarFacturaV3";

const FacturaSelect2 = (props) => {
  const [idProveedor, setIdProveedor] = useState(-1);
  const [proveedores, setProveedores] = useState([]);
  const [idFactura, setIdFactura] = useState(-1);
  const [facturas, setFacturas] = useState([]);
  const [popupFacturaOpen, setPopupFacturaOpen] = useState(false);
  const [popupProvOpen, setPopupProvOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [popupDetalleFacturaOpen, setPopupDetalleFacturaOpen] = useState(false);
  const [nroFactura, setNroFactura] = useState("");

  useEffect(() => {
    if (props.hasOwnProperty("factura") && props.factura !== null) {
      setIdFactura(props.factura.idfactura);
      setNroFactura(props.factura.nro);
    }

    if (proveedores.length < 1) {
      load_proveedores();
    }

    load_facturas();
  }, [idProveedor, reload]);

  const load_proveedores = (_) => {
    fetch(get.lista_proveedores)
      .then((r) => r.json())
      .then((response) => {
        setProveedores([
          ...[{ value: -1, label: "Seleccione Proveedor" }],
          ...response.data.map((row) => ({
            value: row.idproveedor,
            label: row.nombre,
          })),
          ...[{ value: -2, label: "+ Agregar Proveedor" }],
        ]);
      });
  };

  const load_facturas = (_) => {
    fetch(get.lista_facturas + idProveedor)
      .then((r) => r.json())
      .then((response) => {
        setFacturas([
          ...[{ value: -1, label: "Seleccione Factura" }],
          ...response.data.map((row) => ({
            value: row.idfactura,
            label: row.numero,
          })),
          ...[{ value: -2, label: " + Agregar Factura" }],
        ]);
      });
  };

  const _body = idFactura > 0 ? 
    <Row gutter={2}>
      <Col>
        <Button
          type="default"
          size="large"
          onClick={() => {
             setPopupDetalleFacturaOpen(true);
          }}
          style={{ color: "blue" }}
        >
          Factura Nro.: {nroFactura}
        </Button>
      </Col>
      <Col>
        <Button
          danger
          type="default"
          size="large"
          onClick={(_) => {
            setIdFactura(-1);
            props.callback(null);
          }}
        >
          <CloseCircleFilled />
        </Button>
      </Col>
    </Row>
   : <div
      style={{
        padding: "12px",
        border: "1px solid #ffffffff",
        borderRadius: "8px",
        backgroundColor: "#E4E4E4",
      }}
    >
      <Row gutter={16}>
        <Col>
          <b>Factura:</b>
        </Col>
        <Col>
          <Select
            size="small"
            prefix={<span style={{ fontWeight: "bold" }}>Proveedor: </span>}
            
            options={proveedores}
            value={idProveedor}
            onChange={(v) => {
              if (v == -2) {
                setPopupProvOpen(true);
                return;
              }
              setIdFactura(-1);
              setIdProveedor(v);
              props.callback(null);
            }}
            style={{ width: "100%", overflow: "hidden" }}
          />
        </Col>

        {idProveedor < 0 ? (
          <>...</>
        ) : (
          <>
            <Col>
              <Select
                size="small"
                prefix={<span style={{ fontWeight: "bold" }}>Factura: </span>}
                
                options={facturas}
                value={idFactura}
                onChange={(v) => {
                  if (v == -2) {
                    setPopupFacturaOpen(true);
                    return;
                  }

                  let __f = facturas.filter((_f) => +_f.value == +v)[0];
                  setIdFactura(v);

                  props.callback({
                    idfactura: __f.value,
                    nro: __f.label,
                  });

                  setEnabled(false);

                  setNroFactura(__f.label);
                }}
                style={{ width: "100%", overflow: "hidden" }}
                key={idProveedor}
              />
            </Col>
          </>
        )}
      </Row>
</div>

  return <>
      {_body}
      <Modal
        width={"900px"}
        destroyOnClose
        open={popupDetalleFacturaOpen}
        onCancel={() => {
          setPopupDetalleFacturaOpen(false);
        }}
        footer={null}
      >
        <DetalleFactura idFactura={idFactura} />
      </Modal>
      <Modal
        width={"800px"}
        open={popupFacturaOpen}
        onCancel={() => {
          setPopupFacturaOpen(false);
        }}
        title="Agregar Factura"
        footer={null}
        destroyOnClose
      >
        <AgregarFacturaV3
          idproveedor={idProveedor}
          callback={() => {
            setPopupFacturaOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        open={popupProvOpen}
        onCancel={() => {
          setPopupProvOpen(false);
        }}
        title="Agregar Proveedor"
        footer={null}
        destroyOnClose
      >
        <ProveedorForm
          action="ADD"
          callback={() => {
            setPopupProvOpen(false);
            setProveedores([]);
            setReload(!reload);
          }}
        />
      </Modal>
      </>
    
};

export default FacturaSelect2;
