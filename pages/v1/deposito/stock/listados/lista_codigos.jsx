import EditarLoteGrupo from "@/components/deposito/editarLoteGrupo";
import DefaultImageProduct from "@/components/etc/imagen/default_image_prod";
import ImagenesProducto from "@/components/etc/imagen/imagen_producto";
import TagsLote from "@/components/etiquetas/TagsLote";
import DetalleCodigo from "@/components/forms/deposito/DetalleCodigo";
import EditarCodigoGrupo from "@/components/forms/deposito/EditarCodigoGrupo";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarSubgrupo from "@/components/forms/deposito/EditarSubgrupo";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import {
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  InfoOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Card,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";

import { useEffect, useState } from "react";

export default function ListaCodigos() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [change, setChange] = useState(false);
  const [popupTagsOpen, setPopupTagsOpen] = useState(false);
  const [popupEditarCodigoIndvOpen, setPopupEditarCodigoIndvOpen] =
    useState(false);
  const [popupImagenesOpen, setPopupImagenesOpen] = useState(false);
  const [selectedIdCodigo, setSelectedIdCodigo] = useState(-1);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [popupEditarLoteOpen, setPopupEditarLoteOpen] = useState(false);
  const [filtros, setFiltros] = useState({
    idfamilia: "-1",
    idsubfamilia: "-1",
    idgrupo: "-1",
    idsubgrupo: "-1",
    codigo: "",
    etiquetas: [],
  });
  const items = [
    {
      label: "Detalle",
      key: "1",
      icon: <InfoOutlined />,
    },

    {
      label: "Editar",
      key: "2",
      icon: <EditOutlined />,
      disabled: !globals.esUsuarioDeposito(),
    },
    {
      label: "Imágenes",
      key: "3",
      icon: <PictureOutlined />,
      disabled: !globals.esUsuarioDeposito(),
    },
  ];
  useEffect(() => {
    update_list();
  }, [change]);

  const update_list = () => {
    setLoading(true);
    post_method(post.obtener_codigos_filtro, filtros, (response) => {
      setDataSource(
        response.data.map((row) => ({
          idcodigo: row.idcodigo,
          etiquetas: row.etiquetas,
          codigo: row.codigo,
          descripcion: row.descripcion,
          modo_precio: row.modo_precio,
          precio: row.precio_codigo,
          checked: false,
          ruta: `${row.familia} / ${row.subfamilia} / ${row.grupo} / `,
          idsubgrupo: row.subgrupo_idsubgrupo,
          subgrupo: row.subgrupo,
          activo: row.activo,
          //estado: "ACTIVO"
        }))
      );

      setLoading(false);
    });
  };

  const callback_filtros = (filtros) => {
    //alert(JSON.stringify(filtros))
    setFiltros(filtros);
    setChange(!change);
  };

  const cambiar_estados_codigos = (activo) => {
    post_method(
      get.cambiar_estado_codigo_activo,
      {
        activo: activo,
        codigos: dataSource.filter((d) => d.checked).map((c) => c.idcodigo),
      },
      (response) => {
        setChange(!change);
      }
    );
  };

  const columns = [
    {
      width: "70px",
      render: (_, record) => (
        <DefaultImageProduct idproduct={record.idcodigo} width="70px" key={change} />
      ),
    },
    {
      width: "60px",
      title: (
        <>
          <Checkbox
            onChange={(e) => {
              setDataSource((d) =>
                d.map((r) => ({ ...r, checked: e.target.checked }))
              );
            }}
          />
        </>
      ),
      dataIndex: "idcodigo",
      render: (_, { idcodigo, checked }) => {
        return (
          <>
            <Checkbox
              checked={checked}
              onChange={(v) => {
                setDataSource((d) =>
                  d.map((r) =>
                    r.idcodigo == idcodigo ? { ...r, checked: !r.checked } : r
                  )
                );
              }}
            />
          </>
        );
      },
    },
    {
      width: "250px",
      title: "Ruta",
      dataIndex: "ruta",
      render: (_, obj) => (
        <span style={{ fontSize: ".75em" }}>
          {obj.ruta}
          <EditarSubgrupo
            idsubgrupo={obj.idsubgrupo}
            buttonText={obj.subgrupo}
            callback={() => {
              setChange(!change);
            }}
          />
        </span>
      ),
    },
    { width: "250px", title: "Codigo", dataIndex: "codigo" },
    { width: "250px", title: "Descripcion", dataIndex: "descripcion" },
    {
      width: "150px",
      title: "Modo Precio",
      dataIndex: "modo_precio",
      render: (_, { modo_precio }) => {
        switch (modo_precio) {
          case 0:
            return <Tag color="blue">Multiplicador</Tag>;
          case 1:
            return <Tag color="orange">Subgrupo</Tag>;
          case 2:
            return <Tag color="yellow">Propio</Tag>;
        }
      },
    },
    {
      width: "200px",
      title: "Etiquetas",
      render: (_, { etiquetas }) => {
        return (
          <span style={{ color: "blue", fontWeight: "bold" }}>{etiquetas}</span>
        );
      },
    },
    { width: "100px", title: "Precio", dataIndex: "precio" },
    /*{
            title: 'Estado',
            dataIndex: 'estado', 
            
            render: (_,{estado})=>(<span style={{color: (estado=='ACTIVO' ? "green" : "red")}} >{estado}</span>)
        },*/
    {
      width: "100px",
      title: "",
      render: (_, { idcodigo }) => (
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
                  setPopupEditarCodigoIndvOpen(true);
                  break;
                case 3:
                  setSelectedIdCodigo(idcodigo);
                  setPopupImagenesOpen(true);
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
      ),
    },
    {
      render: (_, obj) => (
        <>{+obj.activo == 1 ? <CheckOutlined /> : <CloseOutlined />}</>
      ),
      title: "Activo",
      width: "50px",
    },
  ];

  return (
    <>
      <Card
        size="small"
        title="Productos"
        style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}
      >
        <Row style={{ padding: "1em" }}>
          <Col span={24}>
            <FiltroCodigos callback={callback_filtros} />
          </Col>
        </Row>
        <Row style={{ padding: "1em" }}>
          <Col span={24}>
            <Button
              disabled={dataSource.filter((d) => d.checked).length < 1}
              onClick={(_) => {
                setPopupEditarLoteOpen(true);
              }}
            >
              Editar
            </Button>
            &nbsp;
            <Button
              size="small"
              disabled={dataSource.filter((d) => d.checked).length < 1}
              type="primary"
              onClick={() => {
                setPopupTagsOpen(true);
              }}
            >
              Editar Etiquetas
            </Button>
            &nbsp;
            <Button
              disabled={dataSource.filter((d) => d.checked).length < 1}
              size="small"
              onClick={(_) => {
                if (!confirm("Establecer códigos como activos?")) {
                  return;
                }
                cambiar_estados_codigos(1);
              }}
            >
              Activar C&oacute;digos
            </Button>
            &nbsp;
            <Button
              disabled={dataSource.filter((d) => d.checked).length < 1}
              size="small"
              danger
              onClick={(_) => {
                if (!confirm("Establecer códigos como inactivos?")) {
                  return;
                }
                cambiar_estados_codigos(0);
              }}
            >
              Desctivar C&oacute;digos
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={dataSource}
              loading={loading}
              scroll={{ y: "300px" }}
              rowClassName={(record, index) =>
                +record.activo == 0
                  ? "error-row"
                  : index % 2 === 0
                  ? "table-row-light"
                  : "table-row-dark"
              }
            />
          </Col>
        </Row>
      </Card>
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
          codigos={dataSource
            .filter((d) => d.checked)
            .map((c) => ({ idcodigo: c.idcodigo, codigo: c.codigo }))}
          callback={() => {
            setPopupTagsOpen(false);
            setChange(!change);
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
            setChange(!change);
            setPopupEditarCodigoIndvOpen(false);
          }}
        />
      </Modal>
      <Modal
        width={"80%"}
        footer={null}
        destroyOnClose
        open={popupDetalleOpen}
        onCancel={(_) => {
          setPopupDetalleOpen(false);
        }}
      >
        <DetalleCodigo idcodigo={selectedIdCodigo} />
      </Modal>
      <Modal
        width={"80%"}
        footer={null}
        destroyOnClose
        open={popupImagenesOpen}
        onCancel={(_) => {
          setPopupImagenesOpen(false);
          setChange(!change)
        }}
        title="Imágenes del producto"
      >
        <ImagenesProducto idproducto={selectedIdCodigo} />
      </Modal>
      <Modal
        open={popupEditarLoteOpen}
        onCancel={(_) => setPopupEditarLoteOpen(false)}
        destroyOnClose
        width={"900px"}
        title=" "
        footer={null}
      >
        <EditarCodigoGrupo
          codigos={dataSource
            .filter((d) => d.checked)
            .map((c) => ({
              idcodigo: c.idcodigo,
              codigo: c.codigo,
              precio: c.precio,
            }))}
          callback={() => {
            setChange(!change);
            setPopupEditarLoteOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

ListaCodigos.PageLayout = MyLayout;
