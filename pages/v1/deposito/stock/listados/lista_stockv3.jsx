import CodeGrid from "@/components/etc/CodeGrid";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarStockIndiv from "@/components/forms/deposito/EditarStockIndiv";
import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {  CheckOutlined,  CloseOutlined,  DownOutlined,  EditOutlined,  InfoOutlined,} from "@ant-design/icons";
import {  Button,  Card,  Checkbox,  Col,  Divider,  Dropdown,  Modal,  Row,  Select,  Space,  Table,  Tabs,  Tag,} from "antd";
import { useEffect, useState } from "react";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import LayoutVentas from "@/components/layout/layout_ventas";
import TagsLote from "@/components/etiquetas/TagsLote";
import DetalleStock from "@/components/forms/deposito/detalle/DetalleStock";
import CodeGridHTML from "@/components/etc/CodeGridHTML";
import SideMenuListaStock from "@/components/deposito/lista_stock_sidemenu";

export default function ListaStockV3() {
  const [usuarioDep, setUsuarioDep] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueChanged, setValueChanged] = useState(false);
  const idsucursal = globals.obtenerSucursal(); 
  const [listId, setListId] = useState(0);
  const [quickSearchValue, setQuickSearchValue] = useState("");
  const [codigoSearch, setCodigoSearch] = useState(true);
  const [etiquetas, setEtiquetas] = useState([]);
  const [popupTagsOpen, setPopupTagsOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [popupEditarStockIndvOpen, setPopupEditarStockIndvOpen] = useState(false);
  const [popupEditarCodigoIndvOpen, setPopupEditarCodigoIndvOpen] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(-2);
  const [selectedIdCodigo, setSelectedIdCodigo] = useState(-1);
  const [open, setOpen] = useState(false);


  const items = [
    {
      label: "Detalle",
      key: "1",
      icon: <InfoOutlined />,
    },
    {
      label: "Editar Stock",
      key: "2",
      icon: <EditOutlined />,
      disabled: !globals.esUsuarioDeposito(),
    },
    {
      label: "Editar Código",
      key: "3",
      icon: <EditOutlined />,
      disabled: !(
        globals.esUsuarioDeposito() &&
        (selectedSucursal == globals.obtenerSucursal() || selectedSucursal < -1)
      ),
    },
  ];

  const cambiar_estados_codigos = (activo) => {
    post_method(
      get.cambiar_estado_codigo_activo,
      {
        activo: activo,
        codigos: data.filter((d) => d.checked).map((c) => c.idcodigo),
      },
      (response) => {
        setValueChanged(!valueChanged);
      }
    );
  };

  //THIS IS NEW
  useEffect(() => {
    setUsuarioDep(globals.esUsuarioDeposito());
    /*
    setLoading(true);

    const data = procesar_tags();
    post_method(post.search.filtro_stock, data, (response) => {
      setData(
        response.data.map((row) => ({
          key: row.idcodigo,
          codigo: row.codigo,
          ruta: row.ruta,
          cantidad: row.cantidad,
          idcodigo: row.idcodigo,
          precio: row.precio,
          sexo: row.sexo,
          genero: row.genero,
          edad: row.edad,
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
      setLoading(false);
      setListId(listId + 1);
    });*/
  }, [valueChanged]);

  const columns = [
    {
      width: "200px",
      title: "Ruta",
      dataIndex: "idcodigo",
      key: "ruta",
      render: (_, { familia, subfamilia, grupo, subgrupo, idsubgrupo }) => (
        <Space size={[0, "small"]} wrap>
          <span style={{ fontSize: "1em" }}>
            <Tag
              color="success"
              style={{ fontSize: ".65em", margin: "0", padding: "1px" }}
            >
              {familia}
            </Tag>
            <Tag
              color="processing"
              style={{ fontSize: ".65em", margin: "0", padding: "1px" }}
            >
              {subfamilia}
            </Tag>
            <Tag
              color="error"
              style={{ fontSize: ".65em", margin: "0", padding: "1px" }}
            >
              <b>{grupo}</b>
            </Tag>
            <EditarSubgrupo
              idsubgrupo={idsubgrupo}
              buttonText={subgrupo}
              callback={() => {
                setValueChanged(!valueChanged);
              }}
            />
          </span>
        </Space>
      ),
    },
    {
      width: "200px",
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      render: (_, { codigo }) => (
        <>
          <div
            style={{
              fontSize: ".85em",
              whiteSpace: "nowrap",
              overflowX: "scroll",
              width: "100%",
            }}
          >
            <b>{codigo}</b>
          </div>
        </>
      ),
    },
    {
      width: "200px",
      title: "Desc.",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (_, { descripcion }) => (
        <div
          style={{ width: "100%", overflowX: "scroll", whiteSpace: "nowrap" }}
        >
          {descripcion}
        </div>
      ),
    },

    {
      width: "200px",
      title: "Edad",
      dataIndex: "edad",
      key: "edad",
      hidden: true,
    },
    {
      width: "200px",
      title: "Género",
      dataIndex: "genero",
      key: "genero",
      hidden: true,
    },
    {
      width: "200px",
      title: "Precio",
      dataIndex: "idcodigo",
      key: "precio",
      render: (_, { precio, modo_precio }) => {
        switch (modo_precio) {
          case 0:
            return (
              <div style={{ width: "100%", textAlign: "right" }}>
                $&nbsp;{precio}&nbsp;&nbsp;<Tag color="blue">M</Tag>
              </div>
            );
          case 1:
            return (
              <div style={{ width: "100%", textAlign: "right" }}>
                $&nbsp;{precio}&nbsp;&nbsp;<Tag color="orange">SG</Tag>
              </div>
            );
          case 2:
            return (
              <div style={{ width: "100%", textAlign: "right" }}>
                $&nbsp;{precio}&nbsp;&nbsp;<Tag color="red">P</Tag>
              </div>
            );
        }
      },
    },
    {
      width: "200px",
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      width: "90px",
      render: (_, { cantidad }) => (
        <div style={{ width: "90%", textAlign: "right" }}>{cantidad}</div>
      ),
    },
    {
      width: "200px",
      title: "Etiquetas",
      render: (_, { etiquetas }) => (
        <span style={{ fontWeight: "bold", color: "darkgreen" }}>
          {etiquetas}
        </span>
      ),
    },
    {
      width: "200px",
      title: "Acciones",
      dataIndex: "idstock",
      key: "idstock",
      width: "120px",
      render: (_, { idcodigo }) => (
        <>
          <Dropdown
            menu={{
              items,
              onClick: ({ key }) => {
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
              },
            }}
          >
            <Button type="primary" size="small">
              <Space>
                Acciones
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </>
      ),
    },
    {
      title: (
        <>
          <Checkbox
            onChange={(e) => {
              setData((_data) =>
                _data.map((d) => ({ ...d, checked: e.target.checked }))
              );
            }}
          />
        </>
      ),
      width: "50px",
      render: (_, { checked, idcodigo }) => (
        <>
          <Checkbox
            checked={checked}
            onChange={(e) => {
              setData((_data) =>
                _data.map((d) =>
                  d.idcodigo == idcodigo
                    ? { ...d, checked: e.target.checked }
                    : d
                )
              );
            }}
          />
        </>
      ),
    },
    {
      render: (_, obj) => (
        <>{+obj.activo == 1 ? <CheckOutlined /> : <CloseOutlined />}</>
      ),
      title: "Activo",
      width: "80px",
    },
  ];


/*
  const removeTag = (tag) => {
    setTags(tags.filter((t1) => tag.tipo !== t1.tipo));
  };


  const onQuickSearchClick = () => {
    if (codigoSearch) {
      setTags([{ tipo: "codigo_contenga_a", valor: quickSearchValue }]);
    } else {
      setTags([{ tipo: "grupo_contenga_a", valor: quickSearchValue }]);
    }

    setValueChanged(!valueChanged);
  };
*/
  
  return (
    <>
      <Card
        size="small"
        title="Stock"
        style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
      >
        <Row>
          <Col span={6}>
          <SideMenuListaStock />
          </Col>
          <Col span={18}>
            <Tabs
              defaultActiveKey="1"
              onChange={(key) => {
                console.log(key);
              }}
              items={[
                {
                  key: "1",
                  label: "Tabla",
                  children: (
                    <>
                      <Table
                        rowClassName={(record, index) =>
                          +record.activo == 0
                            ? "error-row"
                            : index % 2 === 0
                            ? "table-row-light"
                            : "table-row-dark"
                        }
                        columns={columns.filter((item) => !item.hidden)}
                        dataSource={data}
                        loading={loading}
                        scroll={{ y: 400 }}
                        size="small"
                      />
                    </>
                  ),
                },
                {
                  key: "2",
                  label: "Grilla",
                  children: (
                    <>
                      <Row>
                        <Col span={24}>
                          <Select
                            disabled
                            size="large"
                            defaultValue={"1"}
                            style={{ width: "400px" }}
                            options={[
                              { label: "Cantidad", value: "1" },
                              { label: "Ideal", value: "2" },
                              { label: "Dif.", value: "3" },
                            ]}
                          />
                          <Divider />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
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
                        </Col>
                      </Row>
                    </>
                  ),
                },
              ]}
            />
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
          idsucursal={selectedSucursal < 0 ? idsucursal : selectedSucursal}
          callback={() => {
            setPopupDetalleOpen(false);
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
          setValueChanged(!valueChanged);
        }}
        width={"900px"}
      >
        <EditarStockIndiv
          idcodigo={selectedIdCodigo}
          idsucursal={globals.obtenerSucursal()}
          callback={() => {
            setPopupEditarStockIndvOpen(false);
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
