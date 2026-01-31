import {
  AlertOutlined,
  CheckOutlined,
  SaveFilled,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Input, Modal, Radio, Row } from "antd";
import { useState } from "react";

const TestGridCreation = () => {
  const [data, setData] = useState([]);
  const [esf_from, setEsfFrom] = useState(0);
  const [esf_to, setEsfTo] = useState(0);
  const [cil_from, setCilFrom] = useState(0);
  const [cil_to, setCilTo] = useState(0);
  const [cols, setCols] = useState([]);
  const [tipo_grilla, setTipoGrilla] = useState("positivo");
  const [selected_cell, setSelectedCell] = useState(null);
  const [modal_visible, setModalVisible] = useState(false);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(true);
  const [cellsEdited, setCellsEdited] = useState(false);
  const [fkCodigo, setFkCodigo] = useState(null);
  const [fkSucursal, setFkSucursal] = useState(null);
  //#region styles
  const diagonal_cell = {
    background: "linear-gradient(to top right, #fff 49%, #ccc 50%, #fff 51%)",
    overflow: "hidden",
    fontSize: "8px",
    border: "1px solid #dbdbdb",
    textAlign: "center",
  };

  const td_style = {
    border: "1px solid #dbdbdb",
    padding: "6px 12px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#bcfbff",
    fontWeight: "400",
  };
  const td_style_editing = {
    border: "1px solid #dbdbdb",
    padding: "6px 12px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#faecac",
  };

  const th_style = {
    border: "1px solid #dbdbdb",
    padding: "6px 12px",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    color: "darkblue",
  };

  const table_style = {
    borderCollapse: "collapse",
  };
  //#endregion

  const on_save = () => {
    const dataToSave = {
      fk_codigo: fkCodigo,
      fk_sucursal: fkSucursal,
      cells: data.map((d) => ({
        esf: d.esf,
        cil: d.cil,
        cantidad: d.cantidad,
      })),
      tipo_grilla: tipo_grilla,
    };
    console.log("Saving grid data:", dataToSave);
    //save to db.... TO DO
  };

  const edit_quantity = (esf, cil, quantity) => {
    setCellsEdited(true);
    const cell = data.find((d) => d.esf == esf && d.cil == cil);
    if (cell) {
      const new_data = data.map((d) => {
        if (d.esf == esf && d.cil == cil) {
          return { ...d, cantidad: quantity };
        }
        return d;
      });
      setData(new_data);
    }
  };

  const set_cell_editing = (esf, cil) => {
    const new_data = data.map((d) => {
      if (d.esf == esf && d.cil == cil) {
        return { ...d, editing: true };
      }
      return { ...d, editing: false };
    });
    setData(new_data);
  };

  const prepare = () => {
    if (cellsEdited) {
      const confirm = window.confirm(
        "Hay celdas editadas. Si continua se perderan los cambios. Desea continuar?",
      );
      if (!confirm) {
        return;
      }
    }
    setBtnAplicarEnabled(false);
    setCellsEdited(false);
    const cells_data = [];
    const _cols = [];
    for (let i = esf_from; i <= esf_to; i += 0.25) {
      for (let j = cil_from; j <= cil_to; j += 0.25) {
        cells_data.push({
          esf: i,
          cil: j,
          cantidad: 0,
          editing: false,
        });
        if (i == 0) {
          _cols.push(j.toFixed(2));
        }
      }
    }

    setData(cells_data);
    setCols(_cols);
  };

  const get_grid = () => (
    <>
      <table style={table_style}>
        <thead>
          <tr>
            <th style={diagonal_cell}>
              ESF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CIL
            </th>
            {cols.map((c) => (
              <th style={th_style}>{"-" + c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(new Set(data.map((d) => d.esf))).map((esf_value) => {
            return (
              <tr>
                <td style={td_style}>
                  <b>
                    {(tipo_grilla == "positivo" ? "+" : "-") +
                      esf_value.toFixed(2)}
                  </b>
                </td>
                {cols.map((col) => (
                  <td
                    style={
                      data.filter((d) => d.esf == esf_value && d.cil == col)[0]
                        ?.editing
                        ? td_style_editing
                        : td_style
                    }
                    onClick={() => {
                      setSelectedCell({ esf: esf_value, cil: col });
                      set_cell_editing(esf_value, col);
                      setModalVisible(true);
                    }}
                  >
                    {data
                      .filter((d) => d.esf == esf_value && d.cil == col)
                      .map((d) => d.cantidad)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <div
        style={{
          border: "1px solid #dbdbdb",
          boxShadow: "4px 6px 8px #f0f0f0",
          padding: "18px",
          marginBottom: "16px",
          borderRadius: "16px",
          maxWidth: "600px",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col
            style={{
              paddingTop: "6px",
              fontWeight: "600",
              color: "darkblue",
              fontSize: "1.1em",
            }}
          >
            Esf:{" "}
          </Col>
          <Col>
            <Input
              style={{ width: "200px" }}
              disabled={!btnAplicarEnabled}
              prefix="Desde: "
              value={esf_from}
              onChange={(e) => setEsfFrom(parseFloat(e.target.value))}
            />{" "}
          </Col>
          <Col>
            <Input
              style={{ width: "200px" }}
              disabled={!btnAplicarEnabled}
              prefix="Hasta: "
              value={esf_to}
              onChange={(e) => setEsfTo(parseFloat(e.target.value))}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col
            style={{
              paddingTop: "6px",
              fontWeight: "600",
              color: "darkblue",
              fontSize: "1.1em",
            }}
          >
            Cil:{" "}
          </Col>
          <Col>
            <Input
              style={{ width: "200px" }}
              disabled={!btnAplicarEnabled}
              prefix="Desde: -"
              value={cil_from}
              onChange={(e) => setCilFrom(parseFloat(e.target.value))}
            />{" "}
          </Col>
          <Col>
            <Input
              style={{ width: "200px" }}
              disabled={!btnAplicarEnabled}
              prefix="Hasta: -"
              value={cil_to}
              onChange={(e) => setCilTo(parseFloat(e.target.value))}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ paddingTop: "8px" }}>
          <Col span="24">
            <Radio.Group
              disabled={!btnAplicarEnabled}
              onChange={(e) => {
                setTipoGrilla(e.target.value);
              }}
              value={tipo_grilla}
            >
              <Radio value="positivo">Positivo</Radio>
              <Radio value="negativo">Negativo</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ paddingTop: "8px" }}>
          <Col span="24">
            {" "}
            <Checkbox disabled={!btnAplicarEnabled}>L/R</Checkbox>{" "}
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ paddingTop: "8px" }}>
          <Col>
            <Button
              disabled={!btnAplicarEnabled}
              type="primary"
              onClick={prepare}
            >
              Aplicar
            </Button>
          </Col>

          {btnAplicarEnabled ? (
            <></>
          ) : (
            <Col>
              <Button
                danger
                onClick={(_) => {
                  setBtnAplicarEnabled(true);
                }}
              >
                <UnlockOutlined />
              </Button>
            </Col>
          )}
        </Row>
      </div>
      <Row>
        <Col span="24">{get_grid()}</Col>
      </Row>
      <Divider />
      <Row style={{ paddingTop: "16px" }}>
        <Col span="24" style={{ textAlign: "left" }}>
          <Button size="large" type="primary" onClick={on_save}>
            <SaveFilled /> Guardar grilla
          </Button>
        </Col>
      </Row>

      <Modal
        destroyOnClose
        footer={null}
        open={modal_visible}
        onCancel={() => setModalVisible(false)}
        width={"400px"}
      >
        <Row style={{ padding: "8px" }}>
          <Col>
            Editando celda: Esf {selected_cell?.esf} / Cil {selected_cell?.cil}
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ padding: "8px" }}>
          <Col>
            <Input
              prefix="Cantidad: "
              type="number"
              onChange={(e) => {
                const int_value = parseInt(e.target.value);
                if (isNaN(int_value)) {
                  return;
                }
                edit_quantity(selected_cell.esf, selected_cell.cil, int_value);
              }}
            />
          </Col>

          <Col>
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <CheckOutlined />
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default TestGridCreation;
