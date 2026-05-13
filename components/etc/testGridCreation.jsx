import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import Papa from "papaparse";
import {
  AlertOutlined,
  CheckOutlined,
  ReloadOutlined,
  SaveFilled,
  UnlockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import SucursalSelect from "../SucursalSelect";

const TestGridCreation = () => {
  const [dataNeg, setDataNeg] = useState([]);
  const [dataPos, setDataPos] = useState([]);

  const [impCSVModo, setImpCSVModo] = useState("neg");
  const [impCSVinvertirESF, setImpCSVinvertirESF] = useState(false);

  const [esf_from_neg, setEsfFromNeg] = useState(0);
  const [esf_to_neg, setEsfToNeg] = useState(2);
  const [esf_from_pos, setEsfFromPos] = useState(0);
  const [esf_to_pos, setEsfToPos] = useState(2);
  const [cil_from, setCilFrom] = useState(0);
  const [cil_to, setCilTo] = useState(2);
  const [cols, setCols] = useState([]);
  //const [tipo_grilla, setTipoGrilla] = useState("positivo");
  const [selected_cell, setSelectedCell] = useState(null);
  const [modal_visible, setModalVisible] = useState(false);
  const [btnAplicarEnabled, setBtnAplicarEnabled] = useState(true);
  const [cellsEdited, setCellsEdited] = useState(false);
  const [fkCodigo, setFkCodigo] = useState("-1"); //useState(58451);
  const [fkSucursal, setFkSucursal] = useState(6);
  const [nuevaGrillaEnabled, setNuevaGrillaEnabled] = useState(false)

  const [cellsWithQuantity, setCellsWithQuantity] = useState([]);

  const [codigosCristales, setCodigosCristales] = useState(null);

  const [selectedCodigoLabel, setSelectedCodigoLabel] = useState("");

  const [update, setUpdate] = useState(false)
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
    backgroundColor: "#feffce",
    //fontWeight: "400",
    color: "#000000",
    fontWeight: "600",
    fontSize:"1.3em",
  };
  const td_style_pending_save = {
    border: "2px dotted #dbdbdb",
    padding: "6px 12px",
    textAlign: "center",
    cursor: "pointer",
    //fontWeight: "600",
    color: "darkblue ",
    //backgroundColor: "#ff0101",
     backgroundColor: "#feffce",
     //color: "darkblue",
  };

  const td_style_with_quantity = {
    border: "2px dotted #dbdbdb",
    padding: "6px 12px",
    textAlign: "center",
    cursor: "pointer",
    //backgroundColor: "#008011",
     backgroundColor: "#feffce",
    fontWeight: "600",
    color: "#000000",
    fontSize:"1.3em",
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

  const addCellWithQuantity = (esf, cil, tempArray) => {
    const strVal = `${parseFloat(esf)}${+cil}`;
    return !tempArray.find((c) => c === strVal)
      ? [...tempArray, strVal]
      : tempArray;
  };

  const cellsWithQuantityContains = (esf, cil) =>
    cellsWithQuantity.find((c) => c === `${+esf}-${+cil}`);

  const on_save = () => {
    const dataToSave = {
      fk_codigo: fkCodigo,
      fk_sucursal: fkSucursal,
      cells_neg: dataNeg.map((d) => ({
        esf: `${parseFloat(d.esf).toFixed(2)}`,
        cil: `${parseFloat(d.cil).toFixed(2)}`,
        cantidad: d.cantidad,
      })),
      cells_pos: dataPos.map((d) => ({
        esf: `${parseFloat(d.esf).toFixed(2)}`,
        cil: `${parseFloat(d.cil).toFixed(2)}`,
        cantidad: d.cantidad,
      })),
      tipo_grilla: "",
    };
    //alert(JSON.stringify(dataToSave))
    //save to db.... TO DO
    post_method(
      post.insert.insert_stock_cristal_grid,
      dataToSave,
      (response) => {
        alert("Datos Guardados");
        load(fkCodigo);
      },
    );
  };

  const edit_quantity = (esf, cil, quantity) => {
    //alert(JSON.stringify({esf,cil}))
    if (parseFloat(esf) < 0) {
      const new_data = dataNeg.map((d) => {
        if (
          Math.abs(parseFloat(d.esf)) == Math.abs(parseFloat(esf)) &&
          d.cil == cil
        ) {
          return { ...d, cantidad: quantity, pares: parseFloat(quantity)/2 };
        }
        return d;
      });
      setDataNeg(new_data);
    } else {
      const new_data = dataPos.map((d) => {
        if (d.esf == esf && d.cil == cil) {
          return { ...d, cantidad: quantity, pares: parseFloat(quantity)/2 };
        }
        return d;
      });
      setDataPos(new_data);
    }

    setCellsEdited(true);
  };

  const set_cell_editing = (esf, cil, tipo_grilla) => {
    if (tipo_grilla == "negativo") {
      const new_data = dataNeg.map((d) => {
        if (
          parseFloat(d.esf).toFixed(2).toString() == esf &&
          parseFloat(d.cil).toFixed(2).toString() == cil
        ) {
          return { ...d, pendingSave: true };
        }
        return { ...d };
      });
      setDataNeg(new_data);
    } else {
      const new_data = dataPos.map((d) => {
        if (d.esf == esf && d.cil == cil) {
          return { ...d, pendingSave: true };
        }
        return { ...d };
      });
      setDataPos(new_data);
    }
  };

  const get_qtty_from_array = (src, _esf, _cil) => {
    const record = src.find(
      (r) =>
        Math.abs(parseFloat(r.esf)) === _esf &&
        Math.abs(parseFloat(r.cil)) === _cil,
    );
    if (!record) {
      return -1;
    }

    return record.cantidad;
  };

  const prepare = (
    p_esf_from,
    p_esf_to,
    p_cil_from,
    p_cil_to,
    source = null,
    gridType = "N",
  ) => {
    setBtnAplicarEnabled(false);
    setCellsEdited(false);
    const cells_data = [];
    const _cols = [];

    for (let i = p_esf_from; i <= p_esf_to; i += 0.25) {
      for (let j = p_cil_from; j <= p_cil_to; j += 0.25) {
        cells_data.push({
          esf: (gridType == "N" ? "-" : "") + i,
          cil: j,
          cantidad: source ? get_qtty_from_array(source, i, j) : 0,
          pares: parseFloat(source ? get_qtty_from_array(source, i, j) : 0) / 2,
          pendingSave: false,
        });
        if (i == p_esf_from) {
          _cols.push(j.toFixed(2));
        }
      }
    }

    if (gridType == "N") {
      setDataNeg(cells_data);
    } else {
      setDataPos(cells_data);
    }

    setCols(_cols);

    //alert(JSON.stringify(cells_data));
  };

  const get_grid = (src, tipo_grilla) => (
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
          {Array.from(new Set(src.map((d) => d.esf))).map((esf_value) => {
            return (
              <tr>
                <th style={th_style}>
                  <b>
                    {(tipo_grilla == "positivo" ? "+" : "") +
                      parseFloat(esf_value).toFixed(2)}
                  </b>
                </th>
                {cols.map((col) => (
                  <td
                    style={
                      src.filter((d) => d.esf == esf_value && d.cil == col)[0]
                        ?.pendingSave
                        ? td_style_pending_save
                        : cellsWithQuantityContains(esf_value, col)
                          ? td_style_with_quantity
                          : td_style
                    }
                    onClick={() => {
                      //const _esf = tipo_grilla == "negativo" ? -esf_value : esf_value;
                      //alert(JSON.stringify({ esf: esf_value, cil: col }));
                      setSelectedCell({
                        esf: esf_value,
                        cil: col,
                        tipo_grilla: tipo_grilla,
                      });
                      set_cell_editing(esf_value, col, tipo_grilla);
                      setModalVisible(true);
                    }}
                  >
                    {src
                      .filter((d) => d.esf == esf_value && d.cil == col)
                      .map((d) => d.pares.toFixed(2))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );

  const get_range = (loadedData) => {
    const result = [];

    const get_val = (strv) => Math.abs(parseFloat(strv));
    //console.log(JSON.stringify(loadedData))

    ["p", "n"].forEach((idx) => {
      let sub_arr =
        idx == "p"
          ? loadedData.filter((d) => parseFloat(d.esf) >= 0)
          : loadedData.filter((d) => parseFloat(d.esf) < 0);

      let min_esf = 9999;
      let max_esf = -9999;
      let min_cil = 9999;
      let max_cil = -9999;

      sub_arr.forEach((row) => {
        min_esf = get_val(row.esf) < min_esf ? get_val(row.esf) : min_esf;
        max_esf = get_val(row.esf) > max_esf ? get_val(row.esf) : max_esf;

        min_cil = get_val(row.cil) < min_cil ? get_val(row.cil) : min_cil;
        max_cil = get_val(row.cil) > max_cil ? get_val(row.cil) : max_cil;
      });

      result.push({ min_esf, max_esf, min_cil, max_cil });
    });

    return result;
  };

  const prepareArrayWithQuantities = (src) => {
    let _cellsWithQuantity = [];

    src.forEach((c) => {
      if (c.cantidad > 0) {
        _cellsWithQuantity = addCellWithQuantity(
          c.esf,
          c.cil,
          _cellsWithQuantity,
        );
      }
    });
    //alert(JSON.stringify(_cellsWithQuantity));
    setCellsWithQuantity(_cellsWithQuantity);
  };

  const load = (_fkCodigo) => {
    post_method(
      post.obtener_grilla_cristales,
      { fkCodigo: _fkCodigo, fkSucursal },
      (response) => {
        if (!response) {
          alert("Response is null");
          return;
        }
        if (!response.data) {
          alert("Response data is null");
          return;
        }
        if (response.data.length < 1) {
          alert("Sin Datos.");
          setNuevaGrillaEnabled(true);
          setDataNeg([]);
          setDataPos([]);
          return;
        }

        const theData = response.data;

        const rango = get_range(theData);

        setCilFrom(rango[0].min_cil);
        setCilTo(rango[0].max_cil);

        setEsfFromNeg(rango[1].min_esf);
        setEsfToNeg(rango[1].max_esf);

        setEsfFromPos(rango[0].min_esf);
        setEsfToPos(rango[0].max_esf);

        prepare(
          rango[1].min_esf,
          rango[1].max_esf,
          rango[1].min_cil,
          rango[1].max_cil,
          theData.filter((r) => parseFloat(r.esf) < 0),
          "N",
        );
        prepare(
          rango[0].min_esf,
          rango[0].max_esf,
          rango[0].min_cil,
          rango[0].max_cil,
          theData.filter((r) => parseFloat(r.esf) >= 0),
          "P",
        );

        prepareArrayWithQuantities(theData);
      },
    );
  };

  const load_codigos_cristales = () => {
    fetch(get.obtener_codigos_cristales)
      .then((r) => r.json())
      .then((response) => {
        setCodigosCristales(_=>{
          let t = [{label:"-", value:"-1"}];
          t = [...t,...response.data.map((row) => ({
            label: row.codigo,
            value: row.idcodigo,
          }))];
          //alert(JSON.stringify(t))
          return t; 
        });
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const nueva_grilla = () => (
    <>
      <div
        style={{
          border: "1px solid #dbdbdb",
          boxShadow: "4px 6px 8px #f0f0f0",
          marginBottom: "16px",
          borderRadius: "16px",
          maxWidth: "600px",
        }}
      >
        <Row>
          <Col style={{ paddingLeft: "16px" }}>
            <h3>Nueva Grilla</h3>
          </Col>
        </Row>
        <div
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "16px",
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
              Esf - :{" "}
            </Col>
            <Col>
              <Input
                style={{ width: "200px" }}
                disabled={!btnAplicarEnabled}
                prefix="Desde: "
                value={esf_from_neg}
                onChange={(e) => setEsfFromNeg((e.target.value))}
              />{" "}
            </Col>
            <Col>
              <Input
                style={{ width: "200px" }}
                disabled={!btnAplicarEnabled}
                prefix="Hasta: "
                value={esf_to_neg}
                onChange={(e) => setEsfToNeg((e.target.value))}
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
              Esf + :{" "}
            </Col>
            <Col>
              <Input
                style={{ width: "200px" }}
                disabled={!btnAplicarEnabled}
                prefix="Desde: "
                value={esf_from_pos}
                onChange={(e) => setEsfFromPos((e.target.value))}
              />{" "}
            </Col>
            <Col>
              <Input
                style={{ width: "200px" }}
                disabled={!btnAplicarEnabled}
                prefix="Hasta: "
                value={esf_to_pos}
                onChange={(e) => setEsfToPos((e.target.value))}
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
                onChange={(e) => setCilFrom((e.target.value))}
              />{" "}
            </Col>
            <Col>
              <Input
                style={{ width: "200px" }}
                disabled={!btnAplicarEnabled}
                prefix="Hasta: -"
                value={cil_to}
                onChange={(e) => setCilTo((e.target.value))}
              />
            </Col>
          </Row>
          {/*<Row gutter={[16, 16]} style={{ paddingTop: "8px" }}>
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
        </Row>*/}
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
                onClick={(_) => {
                  prepare(esf_from_neg, esf_to_neg, cil_from, cil_to);
                  prepare(
                    esf_from_pos,
                    esf_to_pos,
                    cil_from,
                    cil_to,
                    null,
                    "P",
                  );
                }}
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
      </div>
    </>
  );

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: false, // use first row as column headers
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        /*const cols = Object.keys(parsedData[0] || {}).map((key) => ({
          title: key,
          dataIndex: key,
          key,
        }));*/
        const data = impCSVModo == "neg" ?  [...dataNeg] : [...dataPos];
        let idx = 0;
        if(impCSVinvertirESF)
        {
          for(let i=parsedData.length-1;i>-1;i--)
          {
            const row = parsedData[i];
            row.forEach(cell=>{
              data[idx].cantidad = cell;
              data[idx].pares = parseFloat(cell)/2;
              idx++;
            });
          }
        }
        else
        {
          parsedData.forEach(row=>{
            row.forEach(cell=>{
              data[idx].cantidad = cell;
              data[idx].pares = parseFloat(cell)/2;
              idx++;
            });
          });
        }
        
        if( impCSVModo == "neg")
        {
          setDataNeg(data);
        }
        else{
          setDataPos(data);
        }
        //alert(JSON.stringify(data));
      },
    });
    return false; // prevent default upload behavior
  };

  useEffect(() => {
    load_codigos_cristales();
  }, [update]);

  return (
    <>
    <Row  style={{ padding: "8px" }}>
      <Col span={24}>
      <SucursalSelect callback={v=>{
        setFkSucursal(v);
        setDataNeg([]);
        setDataPos([]);
        setFkCodigo("-1");
      }}
      />
      </Col>
    </Row>
      <Row gutter={[16, 16]} style={{ padding: "8px" }}>
        <Col style={{ paddingTop: "6px" }}>Seleccion Tipo Cristal:</Col>
        <Col>
          <Select
            value={fkCodigo}
            placeholder="Seleccione un código de cristal"
            style={{ width: "400px" }}
            options={codigosCristales}
            onChange={(v) => {
              setFkCodigo(v);
              setSelectedCodigoLabel(
                codigosCristales.find((c) => c.value == v)?.label || "",
              );
              load(v);
            }}
          />
        </Col>
      </Row>

      { nuevaGrillaEnabled ? nueva_grilla() : <></>}
      <Card
        size="small"
        title={"Grilla de Cristales " + selectedCodigoLabel}
        style={{ width: "100%" }}
        extra={<><Button onClick={_=>{load(fkCodigo)}}><ReloadOutlined /></Button></>}
      >
        <Row>
          <Col span="24">{get_grid(dataNeg || [], "negativo")}</Col>
        </Row>
        <Divider />
        <Row>
          <Col span="24">{get_grid(dataPos || [], "positivo")}</Col>
        </Row>
      </Card>
      <Divider />
      <Row style={{ paddingTop: "16px" }}>
        <Col span="24" style={{ textAlign: "left" }}>
          <Button size="large" type="primary" onClick={on_save}>
            <SaveFilled /> Guardar grilla
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row style={{border:"1px solid #bebebe", padding:"8px", borderRadius:"8px"}}>
        <Col span={6}>
            <Checkbox checked={impCSVinvertirESF} onChange={_=>{setImpCSVinvertirESF(!impCSVinvertirESF)}} >Invertir orden ESF</Checkbox>
        </Col>
        <Col span={6}>
            <Select 
            prefix="Modo: "
            style={{width:"300px"}} options={[
              {value:"neg", label:"Negativo"},
              {value:"pos", label:"Positivo"},
            ]}
            value={impCSVModo}
            onChange={v=>{setImpCSVModo(v)}}
            />
        </Col>
        <Col span={24}>
                  <Upload beforeUpload={handleFileUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Cargar CSV</Button>
      </Upload>
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
                edit_quantity(
                  selected_cell.esf,
                  selected_cell.cil,
                  int_value,
                  selected_cell.tipo_grilla,
                );
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
