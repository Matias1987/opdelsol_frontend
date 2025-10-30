import ExportToExcel from "@/components/etc/ExportToExcel";
import DetalleStock from "@/components/forms/deposito/detalle/DetalleStock";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import SucursalSelect from "@/components/SucursalSelect";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Checkbox, Col, Row, Table, Card, Input, Modal } from "antd";

import { useState } from "react";

const StockSucursal = (_) => {
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [selectedIdCodigo, setSelectedIdCodigo] = useState(null);
  const columns = [
    { render: (_, obj) => <div style={{fontStyle:"italic", fontSize:".9em", color:"darkblue"}}>{obj.familia}</div>, width: "150px", title: "Familia" },
    { render: (_, obj) => <div style={{fontStyle:"italic", fontSize:".9em", color:"darkblue"}}>{obj.subfamilia}</div>, width: "150px", title: "SubFamilia" },
    { render: (_, obj) => <div style={{fontStyle:"italic", fontSize:".9em", color:"darkblue"}}>{obj.grupo}</div>, width: "150px", title: "Grupo" },
    { render: (_, obj) => <div style={{fontStyle:"italic", fontSize:".9em", color:"darkblue"}}>{obj.subgrupo}</div>, width: "150px", title: "SubGrupo" },
    { render: (_, obj) => <>{obj.codigo}</>, width: "250px", title: "Código" },
    { render: (_, obj) => <>{obj.descripcion}</>, width: "250px", title: "Descripción" },
    { render: (_, obj) => <>{obj.tags}</>, width: "250px", title: "Etiquetas" },
    { render: (_, obj) => <div style={{textAlign:"right"}}>$&nbsp;{ (parseFloat(obj.precio_codigo).toLocaleString(2))}</div>, width: "250px", title: <div style={{textAlign:"right"}}>Precio</div> },
    {
      render: (_, obj) => (
        <div style={{ textAlign: "right" }}>{obj.cantidad}</div>
      ),
      width: "250px",
      title: <div style={{ textAlign: "right" }}>Cantidad</div>,
    },
  ];
  const [dataSource, setDataSource] = useState([]);

  const [idsucursal, setIdSucursal] = useState(-1);

  const [sucursalLabel, setSucursalLabel] = useState("-");

  const [total, setTotal] = useState(0);

  const [ocultar0, setOcultar0] = useState(true);

  const [loading, setLoading] = useState(false);

  const procesar_filtros = (data) => {
    var __filtros = {};

    data.forEach((t) => {
      __filtros[t.tipo] = t.valor;
    });

    return {
      sucursal: idsucursal,
      codigo:
        typeof __filtros["codigo"] === "undefined" ? "" : __filtros["codigo"],

      descripcion:
        typeof __filtros["detalles"] === "undefined"
          ? ""
          : __filtros["detalles"],
      idsubgrupo:
        typeof __filtros["subgrupo"] === "undefined"
          ? "-1"
          : __filtros["subgrupo"],
      idgrupo:
        typeof __filtros["grupo"] === "undefined" ? "-1" : __filtros["grupo"],
      idsubfamilia:
        typeof __filtros["subfamilia"] === "undefined"
          ? "-1"
          : __filtros["subfamilia"],
      idfamilia:
        typeof __filtros["familia"] === "undefined"
          ? "-1"
          : __filtros["familia"],
    };
  };

  const load = (data) => {
    const data1 = procesar_filtros(data);

    setLoading(true);

    post_method(post.informe_stock_totales, data1, (response) => {
      setDataSource(
        response.data.map((row) => ({
          key: row.idcodigo,
          codigo: row.codigo,
          descripcion: row.descripcion,
          ruta: `${row.familia}/${row.subfamilia}/${row.grupo}/${row.subgrupo}`,
          cantidad: row.cantidad,
          idcodigo: row.idcodigo,
          familia: row.familia,
          subfamilia: row.subfamilia,
          grupo: row.grupo,
          subgrupo: row.subgrupo,
          precio_codigo: parseFloat(row.precio_codigo).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
          tags: row.tags,
        }))
      );
      let _total = 0;
      response.data.forEach((r) => {
        _total += +r.cantidad;
      });
      setTotal(_total);
      setLoading(false);
    });
  };

  const callback_filtros = (f) => {
    /*if(+idsucursal==-1){
            alert("Seleccione una sucursal")
            return
        }*/

    let data = [];

    const _check = (o, f1, f2) =>
      +o[f1] != -1 ? { tipo: f2, valor: o[f1] } : null;
    const _check_arr = (o, f1, f2) =>
      +o[f1].length > 0 ? { tipo: f2, valor: o[f1] } : null;

    const _add = (v, a) => (v ? [...a, ...[v]] : a);

    data = _add(_check(f, "idfamilia", "familia"), data);
    data = _add(_check(f, "idsubfamilia", "subfamilia"), data);
    data = _add(_check(f, "idgrupo", "grupo"), data);
    data = _add(_check(f, "idsubgrupo", "subgrupo"), data);
    data = _add(_check(f, "codigo", "codigo"), data);
    data = _add(_check_arr(f, "etiquetas", "etiquetas"), data);

    load(data);
  };

  const callback_sucursal = (s, label) => {
    setIdSucursal(s);
    setSucursalLabel(label);
    setDataSource([]);
    setTotal(0);
    setOcultar0(true);
  };

  return (
    <>
      <Card title="Cantidades Totales por Sucursal" size="small">
        <Row>
          <Col span={24}>
            <SucursalSelect callback={callback_sucursal} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FiltroCodigos callback={callback_filtros} key={idsucursal} hideTags={true} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Table
              onRow={(row, index) => {
                return {
                  onClick: (e) => {
                    setSelectedIdCodigo(row.idcodigo)
                    setPopupDetalleOpen(true)
                  },
                };
              }}
              loading={loading}
              size="small"
              pagination={false}
              scroll={{ y: "500px" }}
              columns={columns}
              dataSource={
                ocultar0
                  ? dataSource.filter((d) => +d.cantidad > 0)
                  : dataSource
              }
              title={() => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ margin: 0, fontWeight: "600" }}>
                      Listado
                    </span>
                    <div>
                      <Checkbox
                        checked={ocultar0}
                        onChange={(e) => setOcultar0(e.target.checked)}
                      >
                        Ocultar Cantidad 0
                      </Checkbox>
                      &nbsp;&nbsp;
                      <ExportToExcel
                        data={dataSource
                          .filter((d) => +d.cantidad > 0)
                          .map((d) => ({ ...d, sucursal: "" }))}
                        columns={[
                          {
                            header: "Sucursal: " + sucursalLabel,
                            key: "sucursal",
                            width: 30,
                          },
                          { header: "Familia", key: "familia", width: 30 },
                          { header: "Subfamilia", key: "subfamilia", width: 30 },
                          { header: "Grupo", key: "grupo", width: 30 },
                          { header: "Subgrupo", key: "subgrupo", width: 30 },
                          { header: "Código", key: "codigo", width: 30 },
                          { header: "Descripción", key: "descripcion", width: 40 },
                          { header: "Etiquetas", key: "tags", width: 30 },
                          { header: "Cantidad", key: "cantidad", width: 15 },
                          { header: "Precio", key: "precio_codigo", width: 15 },
                        ]}
                        fileName={"Stock_Sucursal_" + sucursalLabel}
                      />
                    </div>
                  </div>
                </>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              prefix="Total: "
              readOnly
              value={total}
              style={{ fontWeight: "700", color: "blue" }}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        destroyOnClose
        open={popupDetalleOpen}
        footer={null}
        onCancel={() => {
          setPopupDetalleOpen(false);
        }}
        width={"80%"}
      >
        <DetalleStock
          idcodigo={selectedIdCodigo}
          idsucursal={idsucursal}
          callback={() => {
            setPopupDetalleOpen(false);
            //alert("disparado desde popup")
            setValueChanged(!valueChanged);
          }}
        />
      </Modal>
    </>
  );
};

export default StockSucursal;
