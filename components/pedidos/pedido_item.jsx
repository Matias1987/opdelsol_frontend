import { Button, Col, Divider, Input, Row } from "antd";
import SearchCodigo from "../SearchCodigo";
import { useState } from "react";

const PedidoItem = ({ callback }) => {
  const [selectedCodigo, setSelectedCodigo] = useState(null);
  const [item, setItem] = useState({
    pedido_idpedido: 5,
    codigo: "",
    codigo_idcodigo: 1042,
    cant_pedida: 1,
    cant_recibida: 45,
    comentarios: "Se recibieron 5 unidades menos por falta de stock.",
    anulado: 0,
  });

  const row_style = {
    padding: "4px",
  };

  const detalle_selected = (_) =>
    selectedCodigo ? (
      <div>
        Selecci&oacute;n:{" "}
        <span
          style={{
            fontWeight: "600",
            border: "1px dotted #eb0000",
            padding: "2px",
            color: "red",
            fontSize: "1.2em",
          }}
        >
          {selectedCodigo.codigo}
        </span>{" "}
      </div>
    ) : (
      <></>
    );

  const onChange = (key, value) => {
    setItem((_item) => {
      const _updated = { ..._item, [key]: value };
      return _updated;
    });
  };

  return (
    <>
      <Row style={row_style}>
        <Col>
          <SearchCodigo
            useRowSelect={true}
            callback={(idcodigo, record) => {
              setSelectedCodigo(record);
            }}
          />
        </Col>
      </Row>
      <Divider />
      <Row style={row_style}>
        <Col>{detalle_selected()}</Col>
      </Row>
      <Row style={row_style}>
        <Col>
          <Input
            addonBefore="Cantidad: "
            value={item.cant_pedida}
            onChange={(e) => {
              onChange("cant_pedida", parseInt(e.target.value ?? "0"));
            }}
            type="number"
            step={1}
            min={0}
          />
        </Col>
      </Row>
      <Row style={{ paddingTop: "32px" }}>
        <Col span={24}>
          <Button
            block
            type="primary"
            disabled={selectedCodigo == null}
            onClick={(_) =>
              callback?.({
                ...item,
                codigo: selectedCodigo.codigo,
                codigo_idcodigo: selectedCodigo.idcodigo,
              })
            }
          >
            Aceptar
          </Button>
        </Col>
      </Row>
    </>
  );
};
export default PedidoItem;
