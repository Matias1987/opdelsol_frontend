import CodeGrid from "@/components/etc/CodeGrid";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Card, Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import LayoutVentas from "@/components/layout/layout_ventas";
import TagsLote from "@/components/etiquetas/TagsLote";
import DetalleStock from "@/components/forms/deposito/detalle/DetalleStock";
import CodeGridHTML from "@/components/etc/CodeGridHTML";
import SideMenuListaStock from "@/components/deposito/lista_stock_sidemenu";
import ExportToCSV from "@/components/ExportToCSV";
import GridBifocales from "@/components/etc/GridBifocales";
import GridMonof from "@/components/etc/GridMonof";
import StockTable from "@/components/deposito/lista_stock_table";

export default function ListaStockV3() {
  const [usuarioDep, setUsuarioDep] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueChanged, setValueChanged] = useState(false);
  const idsucursal = globals.obtenerSucursal();
  const [idsubgrupo, setIdSubgrupo] = useState(-1);
  const [listId, setListId] = useState(0);
  const [popupTagsOpen, setPopupTagsOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [popupEditarStockIndvOpen, setPopupEditarStockIndvOpen] =
    useState(false);
  const [popupEditarCodigoIndvOpen, setPopupEditarCodigoIndvOpen] =
    useState(false);
  const [selectedIdCodigo, setSelectedIdCodigo] = useState(-1);
  const [open, setOpen] = useState(false);
  const [menuFolded, setMenuFolded] = useState(false);

  const [filtros, setFiltros] = useState(null);

  const [gridEnabled, setGridEnabled] = useState(false);

  const [codesChanged, setCodesChanged] = useState(false);

  const regexp_bif = /^([A-Z_]+)(_)(\-|\+[0-9\.]+)(_)(L|R)(_ADD_)([0-9\.]+)/;
  const regexp_monof = /^([A-Z_0-9\.]+)(_)([0-9\.]+)($)/;
  const regexp_terminados = /ESF(\-|\+)([0-9\.]+)CIL(\-|\+)([0-9\.]+).*$/;

  const get_grid = () => {
    if (data.length < 1) {
      return (
        <span
          style={{ fontWeight: "500", fontSize: "0.9em", color: "darkgray" }}
        >
          <i>Sin registros</i>
        </span>
      );
    }

    if (gridEnabled) {
      const demo_code = data[0].codigo;

      if (regexp_terminados.test(demo_code)) {
        return (
          <CodeGridHTML
            reload={valueChanged}
            idsubgrupo={idsubgrupo}
            idsucursal={idsucursal}
            onCellClick={(key, idcodigo) => {
              switch (+key) {
                case 1:
                  setSelectedIdCodigo(idcodigo);
                  setPopupDetalleOpen(true);
                  break;
                case 2:
                  setSelectedIdCodigo(idcodigo);
                  setPopupEditarStockIndvOpen(true);
                  break;
              }
            }}
          />
        );
      }

      if (regexp_bif.test(demo_code)) {
        return (
          <GridBifocales
            codigosSrc={data}
            onMenuOptionSelected={onMenuOptionSelected}
            key={codesChanged}
          />
        );
      }

      if (regexp_monof.test(demo_code)) {
        return (
          <GridMonof
            codigosSrc={data}
            onMenuOptionSelected={onMenuOptionSelected}
            key={codesChanged}
          />
        );
      }
    }

    return (
      <StockTable
        data={data}
        loading={loading}
        onMenuOptionSelected={onMenuOptionSelected}
        onItemCBChecked={onItemCBChecked}
      />
    );
  };

  const onMenuOptionSelected = (key, idcodigo) => {
    switch (+key) {
      case 1:
        setSelectedIdCodigo(idcodigo);
        setPopupDetalleOpen(true);
        break;
      case 2:
        setSelectedIdCodigo(idcodigo);
        setPopupEditarStockIndvOpen(true);
        break;
      case 3:
        setSelectedIdCodigo(idcodigo);
        setPopupEditarCodigoIndvOpen(true);
        break;
    }
  };

  const onItemCBChecked = (e, idcodigo) => {
    setData((_data) =>
      _data.map((d) =>
        d.idcodigo == idcodigo ? { ...d, checked: e.target.checked } : d
      )
    );
  };

  const cambiar_estados_codigos = (activo) => {
    post_method(
      get.cambiar_estado_codigo_activo,
      {
        activo: activo,
        codigos: data.filter((d) => d.checked).map((c) => c.idcodigo),
      },
      (response) => {
        //alert("disparado desde cambiar_estados_codigos")
        setValueChanged(!valueChanged);
      }
    );
  };

  const procesar_filtros = (data) => {
    var __filtros = {};

    data.filtros.forEach((t) => {
      __filtros[t.tipo] = t.valor;
      if (t.tipo == "subgrupo") {
        setIdSubgrupo(t.valor);
      }
    });

    let _sucursal = globals.obtenerSucursal();

    return {
      sucursal: _sucursal,
      codigo_contenga_a:
        typeof __filtros["codigo_contenga_a"] === "undefined"
          ? ""
          : __filtros["codigo_contenga_a"],
      grupo_contenga_a:
        typeof __filtros["grupo_contenga_a"] === "undefined"
          ? ""
          : __filtros["grupo_contenga_a"],
      codigo_igual_a:
        typeof __filtros["codigo_igual_a"] === "undefined"
          ? ""
          : __filtros["codigo_igual_a"],
      precio_mayor_a:
        typeof __filtros["precio_mayor_a"] === "undefined"
          ? ""
          : __filtros["precio_mayor_a"],
      precio_menor_a:
        typeof __filtros["precio_menor_a"] === "undefined"
          ? ""
          : __filtros["precio_menor_a"],
      precio_igual_a:
        typeof __filtros["precio_igual_a"] === "undefined"
          ? ""
          : __filtros["precio_igual_a"],
      cantidad_igual_a:
        typeof __filtros["cantidad_igual_a"] === "undefined"
          ? ""
          : __filtros["cantidad_igual_a"],
      cantidad_mayor_a:
        typeof __filtros["cantidad_mayor_a"] === "undefined"
          ? ""
          : __filtros["cantidad_mayor_a"],
      cantidad_menor_a:
        typeof __filtros["cantidad_menor_a"] === "undefined"
          ? ""
          : __filtros["cantidad_menor_a"],
      descripcion:
        typeof __filtros["detalles"] === "undefined"
          ? ""
          : __filtros["detalles"],
      subgrupo:
        typeof __filtros["subgrupo"] === "undefined"
          ? ""
          : __filtros["subgrupo"],
      grupo:
        typeof __filtros["grupo"] === "undefined" ? "" : __filtros["grupo"],
      subfamilia:
        typeof __filtros["subfamilia"] === "undefined"
          ? ""
          : __filtros["subfamilia"],
      familia:
        typeof __filtros["familia"] === "undefined" ? "" : __filtros["familia"],
      order: "",
      etiquetas: data.tags || "",
    };
  };

  useEffect(() => {
    setUsuarioDep(globals.esUsuarioDeposito());
    load(filtros);
  }, [valueChanged]);

  const load = (filtro_data) => {
    if (!filtro_data) {
      return;
    }
    if ((filtro_data?.filtros || []).length < 1) {
      return;
    }
    setLoading(true);
    const data = procesar_filtros(filtro_data);
    post_method(post.search.filtro_stock, data, (response) => {
      //alert(JSON.stringify(response));
      if (response.data.length < 1) {
        alert("No se encontraron codigos con los filtros seleccionados.");
      } else {
        setData(
          response.data.map((row) => ({
            key: row.idcodigo,
            codigo: row.codigo,
            ruta: row.ruta,
            cantidad: row.cantidad,
            idcodigo: row.idcodigo,
            precio: row.precio,
            descripcion: row.descripcion,
            checked: false,
            familia: row.familia,
            subfamilia: row.subfamilia,
            grupo: row.grupo,
            subgrupo: row.subgrupo,
            modo_precio: row.modo_precio,
            idsubgrupo: row.idsubgrupo,
            etiquetas: row.etiquetas,
            activo: row.activo,
          }))
        );
      }

      setLoading(false);
      setListId(listId + 1);
      setCodesChanged(!codesChanged);
    });
  };

  return (
    <>
      <Card
        size="small"
        title="Stock"
        style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
      >
        <Row>
          <Col style={{ padding: "16px", width: menuFolded ? "100px" : "25%" }}>
            <SideMenuListaStock
              loading={loading}
              onMenuUnfoldedClick={(_) => {
                setMenuFolded(false);
              }}
              onMenuFoldedClick={(_) => {
                setMenuFolded(true);
              }}
              callback={(data) => {
                //alert(JSON.stringify(data));
                if (data.filtros.length > 0) {
                  setGridEnabled(false);
                  if (data.filtros[0].tipo == "subgrupo") {
                    setGridEnabled(true);
                  }
                }

                setFiltros(data);
                //alert("disparado desde el boton de la barra del costado")
                setValueChanged(!valueChanged);
              }}
              folded={menuFolded}
            />
          </Col>
          <Col
            style={{ width: menuFolded ? "100%" : "75%", padding: "6px" }}
            key={data}
          >
            {get_grid()}
          </Col>
        </Row>
      </Card>
      {/** region modales */}
      <Modal
        footer={null}
        width={"80%"}
        title="Editar Etiquetas"
        open={popupTagsOpen}
        destroyOnClose
        onCancel={() => {
          setPopupTagsOpen(false);
        }}
      >
        <TagsLote
          codigos={data
            .filter((d) => d.checked)
            .map((c) => ({ codigo: c.codigo, idcodigo: c.idcodigo }))}
          callback={() => {
            setPopupTagsOpen(false);
            //alert("disparado desde popup")
            setValueChanged(!valueChanged);
          }}
        />
      </Modal>
      {/** DETALLE POPUP */}
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
      {/** EDITAR STOCK INDV. */}
      <Modal
        destroyOnClose
        open={popupEditarStockIndvOpen}
        footer={null}
        onCancel={() => {
          setPopupEditarStockIndvOpen(false);
          //alert("disparado desde popup")
          setValueChanged(!valueChanged);
        }}
        width={"900px"}
      >
        <EditarStockIndiv
          idcodigo={selectedIdCodigo}
          idsucursal={globals.obtenerSucursal()}
          callback={() => {
            setPopupEditarStockIndvOpen(false);
            //alert("disparado desde popup")
            setValueChanged(!valueChanged);
          }}
        />
      </Modal>
      <Modal
        width={"80%"}
        footer={null}
        destroyOnClose
        open={popupEditarCodigoIndvOpen}
        onCancel={(_) => {
          setPopupEditarCodigoIndvOpen(false);
        }}
      >
        <EditarCodigoIndiv
          idcodigo={selectedIdCodigo}
          buttonText={<>Editar C&oacute;digo</>}
          callback={() => {
            //alert("disparado desde popup")
            setValueChanged(!valueChanged);
            setPopupEditarCodigoIndvOpen(false);
          }}
        />
      </Modal>
      <Modal
        footer={null}
        width={"1100px"}
        open={open}
        key={idsubgrupo}
        destroyOnClose={true}
        onCancel={() => {
          setOpen(false);
          //alert("disparado desde popup")
          setValueChanged(!valueChanged);
        }}
      >
        <CodeGrid
          idsubgrupo={idsubgrupo}
          width={640}
          height={480}
          idsucursal={globals.obtenerSucursal()}
        />
      </Modal>
    </>
  );
}

ListaStockV3.PageLayout = globals.esUsuarioDepositoMin()
  ? LayoutVentas
  : MyLayout;
