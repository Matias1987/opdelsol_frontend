import { get } from "@/src/urls";
import {
  BackwardOutlined,
  EditOutlined,
  FileOutlined,
  FolderFilled,
  FolderOutlined,
  FolderTwoTone,
  FolderViewOutlined,
  GroupOutlined,
  InfoOutlined,
  PlusOutlined,
  ScheduleOutlined,
  SearchOutlined,
  ToolFilled,
  ToolOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Dropdown, Input, Modal, Row } from "antd";
import { cloneElement, useEffect, useState } from "react";
import FamiliaForm from "../forms/FamiliaForm";
import SubFamiliaForm from "../forms/SubFamiliaForm";
import GrupoForm from "../forms/GrupoForm";
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3";

const IconViewSubgrupoSelector = ({
  callback,
  idInicial,
  tipoInicial,
  modoDistribuidora,
  onEditarClick,
  onDetalleClick,
  onInhabilitarClick,
  incCodigos,
}) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [parent, setParent] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [addFOpen, setAddFOpen] = useState(false);
  const [addSFOpen, setAddSFOpen] = useState(false);
  const [addGOpen, setAddGOpen] = useState(false);
  const [addSGOpen, setAddSGOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [filtroStr, setFiltroStr] = useState("");
  const regexp_bif = /(_)(L|R)(_ADD_)/;
  const regexp_monof = /^([A-Z_0-9\.]+)(_)([0-9\.]+)($)/;
  const regexp_terminados = /ESF(\-|\+)([0-9\.]+)CIL(\-|\+)([0-9\.]+).*$/;

  const cmItems = [
    {
      label: "Editar",
      key: "edit",
    },
    {
      label: "Detalle",
      key: "info",
    },
    {
      type: "divider", // Adds a separation line
    },
    {
      label: "Desactivar",
      key: "delete",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }, item) => {
    //alert(JSON.stringify({key, id: item.id, tipo: item.tipo}))
    switch (key) {
      case "edit":
        onEditarClick?.(item.id, item.tipo);
        break;
      case "info":
        onDetalleClick?.(item.id, item.tipo);
        break;
      case "delete":
        onInhabilitarClick?.(item.id, item.tipo);
        break;
    }
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case "codigo":
        return (
          <>
            <FileOutlined
              className="disable-select"
              style={{ fontSize: "24px", color: "#0787ff" }}
            />{" "}
          </>
        );
      case "trabajo":
        return (
          <>
            <ToolOutlined
              className="disable-select"
              style={{ fontSize: "48px", color: "#0787ff" }}
            />
          </>
        );
      default:
        return (
          <FolderFilled
            className="disable-select"
            style={{ fontSize: "48px", color: "#FFD04F" }} //#ff9307
          />
        );
    }
  };

  const clearElements = () => {
    setItems([]);
    setSelectedItem(null);
  };

  const load = (url, callback) => {
    setLoading(true);
    clearElements();
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setLoading(false);
        callback(r.data);
      });
  };

  const onParentChange = (element) => {
    if (element && element?.hasChildren === false) {
      return;
    }
    setFiltroStr("");

    if (null === element || true === element?.isRoot) {
      setParent(null);
    } else {
      setParent(element);
    }

    if (null === element) {
      callback?.(null);
      return load(get.lista_familia, (rows) => {
        setItems(
          rows.map((row) => ({
            parent: { ...element, isRoot: true },
            nombre: row.nombre_corto,
            id: row.idfamilia,
            tipo: "familia",
            hasChildren: true,
          })),
        );
      });
    }
    if ("familia" === element.tipo) {
      callback?.(null);
      return load(get.optionsforfamilia + element.id, (rows) => {
        setItems(
          rows.map((row) => ({
            parent: element,
            nombre: row.label,
            id: row.value,
            tipo: "subfamilia",
            hasChildren: true,
          })),
        );
      });
    }
    if ("subfamilia" === element.tipo) {
      callback?.(null);
      return load(get.optionsforsubfamilia + element.id, (rows) => {
        setItems(
          rows.map((row) => ({
            parent: element,
            nombre: row.label,
            id: row.value,
            tipo: "grupo",
            hasChildren: true,
          })),
        );
      });
    }
    if ("grupo" === element.tipo) {
      callback?.(null);
      if (!modoDistribuidora) {
        return load(get.optionsforgrupo + element.id, (rows) => {
          setItems(
            rows.map((row) => ({
              parent: element,
              nombre: row.label,
              id: row.value,
              tipo: "subgrupo",
              hasChildren: false,
            })),
          );
        });
      } else {
        return load(get.subgrupo_por_grupo_v2 + element.id, (rows) => {
          setItems(
            rows.map((row) => ({
              parent: element,
              nombre: row.nombre_corto,
              id: row.idsubgrupo,
              tipo: +row.es_disenio == 1 ? "trabajo" : "subgrupo",
              hasChildren: +row.es_disenio != 1,
            })),
          );
        });
      }
    }
    if ("subgrupo" === element.tipo) {
      setItems([]);
      callback?.(element.id);
      if (incCodigos) {
        return load(get.codigosOptSubgrupo + element.id, (rows) => {
          setItems(
            rows.map((row) => ({
              parent: element,
              nombre: row.label,
              id: row.value,
              tipo: "codigo",
            })),
          );
        });
      }
      /*
      
      */
    }
  };

  useEffect(() => {
    let _parent = null;
    if (idInicial) {
      _parent = {
        isRoot: true,
        tipo: tipoInicial,
        id: idInicial,
        nombre: "DISTRIBUIDORA",
      };
    }
    onParentChange(_parent);
  }, [reload]);

  const getPath = (element) => {
    let p = "";
    let cur = element;
    while (null !== cur) {
      p = cur.nombre + " / " + p;
      cur = cur?.parent || null;
    }

    return p;
  };

  const getGridIcons = () => {
    if (items.length < 1) {
      return;
    }
    if ("codigo" !== items[0].tipo) {
      return;
    }
    const demo_code = items[0].nombre;

    if (regexp_terminados.test(demo_code)) {
      return (
        <Button>
          <GroupOutlined /> Ver Grilla
        </Button>
      );
    }
    if (regexp_bif.test(demo_code)) {
      return (
        <Button>
          <GroupOutlined /> Ver Grilla
        </Button>
      );
    }
    if (regexp_monof.test(demo_code)) {
      return (
        <Button>
          <GroupOutlined /> Ver Grilla
        </Button>
      );
    }
  };

  const getNewButton = () => {
    const element = parent;

    if (element && "codigo" === element.tipo) {
      return;
    }

    if (null === element) {
      return (
        <Button
          onClick={(_) => {
            setAddFOpen(true);
          }}
          style={{ fontWeight: "600", color: "#293338" }}
        >
          <PlusOutlined /> Nuevo
        </Button>
      );
    }

    if ("familia" === element.tipo) {
      return (
        <Button
          onClick={(_) => {
            setAddSFOpen(true);
          }}
          style={{ fontWeight: "600", color: "#7a1616" }}
        >
          <PlusOutlined /> Nuevo
        </Button>
      );
    }
    if ("subfamilia" === element.tipo) {
      return (
        <Button
          onClick={(_) => {
            setAddGOpen(true);
          }}
          style={{ fontWeight: "600", color: "#7a1616" }}
        >
          <PlusOutlined /> Nuevo
        </Button>
      );
    }
    if ("grupo" === element.tipo) {
      return (
        <Button
          onClick={(_) => {
            setAddSGOpen(true);
          }}
          style={{ fontWeight: "600", color: "#7a1616" }}
        >
          <PlusOutlined /> Nuevo
        </Button>
      );
    }
  };
  return (
    <>
      <Card
        size="small"
        styles={{
          body: {
            backgroundColor: "#F8F8F8",
            boxShadow: "1px 1px 1px 1px rgba(154, 154, 155, 0.6)",
          },
        }}
        title={
          <Input
            style={{ width: "100%" }}
            allowClear
            onChange={(e) => setFiltroStr(e.target.value || "")}
            value={filtroStr}
            prefix={<SearchOutlined />}
          />
        }
      >
        {null === parent ? (
          <Row>
            <Col span={24}> {getNewButton()}</Col>
          </Row>
        ) : (
          <Row style={{ padding: "12px" }}>
            <Button
              onClick={(_) => {
                onParentChange(parent.parent || null);
              }}
            >
              {" "}
              <BackwardOutlined />
              <span style={{ fontWeight: "600", color: "#293338" }}>
                {" "}
                {getPath(parent)}{" "}
              </span>
            </Button>

            {getNewButton()}
          </Row>
        )}
        <Row g={16} gutter={[16, 16]}>
          {(filtroStr.trim().length < 1
            ? items
            : items.filter((i) =>
                i.nombre.toUpperCase().includes(filtroStr.toUpperCase()),
              )
          ).map((item) => (
            <Col xs={12} sm={8} md={6} lg={4} xl={3} key={item.id}>
              <Dropdown
                menu={{
                  items: cmItems,
                  onClick: (e) => {
                    handleMenuClick(e, item);
                  },
                }}
                trigger={["contextMenu"]}
              >
                <Card
                  loading={loading}
                  onClick={(_) => {
                    setSelectedItem(item);
                  }}
                  onDoubleClick={(_) => {
                    onParentChange(item);
                  }}
                  hoverable
                  style={{
                    borderRadius: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  styles={{
                    cursor: "pointer",

                    body: { padding: "16px", textAlign: "center" },
                  }}
                >
                  <div style={{ marginBottom: "8px", textAlign: "center" }}>
                    {/* Scale up the icon size for grid view */}
                    {cloneElement(getIcon(item.tipo), {
                      style: {
                        fontSize: "48px",
                        ...getIcon(item.type).props.style,
                      },
                    })}
                  </div>
                  <div
                    className="disable-select"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    {item.nombre}
                  </div>
                </Card>
              </Dropdown>
            </Col>
          ))}
        </Row>
      </Card>

      <Modal
        open={addSFOpen}
        footer={null}
        title="Agregar Subfamilia"
        onCancel={() => {
          setAddSFOpen(false);
          setReload(!reload);
        }}
      >
        <SubFamiliaForm
          callback={() => {
            setAddSFOpen(false);
            setReload(!reload);
          }}
          action="ADD"
        />
      </Modal>

      <Modal
        open={addFOpen}
        onCancel={() => {
          setAddFOpen(false);
        }}
        footer={null}
        title="Agregar Familia"
      >
        <FamiliaForm
          action={"ADD"}
          callback={() => {
            setAddFOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>

      <Modal
        destroyOnClose
        open={addGOpen}
        title="Agregar Grupo"
        footer={null}
        onCancel={() => {
          setAddGOpen(false);
        }}
      >
        <GrupoForm
          action="ADD"
          callback={() => {
            setAddGOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
      <Modal
        width={"800px"}
        open={addSGOpen}
        onCancel={() => {
          setAddSGOpen(false);
        }}
        footer={null}
        title="Editar Subgrupo"
        destroyOnClose
      >
        <SubGrupoFormV3
          idsubgrupo={parent?.id}
          callback={() => {
            setAddSGOpen(false);
            setReload(!reload);
          }}
        />
      </Modal>
    </>
  );
};

export default IconViewSubgrupoSelector;

/**
 * <Row>
            <Col span={24}>
                {selectedItem ? <>{selectedItem.nombre} <Button><InfoOutlined /> Detalles</Button> <Button><EditOutlined />Editar</Button></>: <></>}
            </Col>
        </Row>
 */
