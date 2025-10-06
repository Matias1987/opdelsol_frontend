import globals from "@/src/globals";
import {
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  InfoOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  Row,
  Space,
  Table,
  Tag,
  Card,
} from "antd";
import ExportToCSV from "../ExportToCSV";
import ExportToExcel from "../etc/ExportToExcel";
import { useState } from "react";


const StockTable = (props) => {
  const {
    data,
    loading,
    onMenuOptionSelected,
    onItemCBChecked,
    onActivarCodigosClick,
    onDesactivarCodigosClick,
    onEditarEtiquetasClick,
    onEditarSeleccionClick,
  } = props;
  const [searchStr, setSearchStr] = useState("");
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
      disabled: !globals.esUsuarioDeposito(),
    },
    {
      label: "Modificar Precio Subgrupo",
      key: "4",
      icon: <EditOutlined />,
      disabled: !globals.esUsuarioDeposito(),
    },
  ];

  const header = (_) => (
    <>
      {
        <Row
          style={{
            backgroundColor: "rgba(255, 255, 255,0)",
            borderRadius: "16px",
          }}
          gutter={"16"}
        >
          <Col>
            <ExportToCSV
              parseFnt={() => {
                let str =
                  "Familia, SubFamilia, Grupo, Subgrupo, Codigo, Descripcion, Cantidad, Precio, Tags,\r\n";
                data.forEach((r) => {
                  str += `${r.familia},${r.subfamilia},${r.grupo},${
                    r.subgrupo
                  },' ${r.codigo} ',${r.descripcion},${r.cantidad},${
                    r.precio
                  },${(r.etiquetas || "").replace(/,/g, " ; ")},\r\n`;
                });
                return str;
              }}
            />
          </Col>
          <Col>
            <ExportToExcel
              fileName={`ls_${(new Date()).getTime()}`}
              columns={[
                { width:15, key: "familia", header: "Familia" },
                { width:15, key: "subfamilia", header: "SubFamilia" },
                { width:15, key: "grupo", header: "Grupo" },
                { width:15, key: "subgrupo", header: "SubGrupo" },
                { width:35, key: "codigo", header: "Codigo" },
                { width:45, key: "descripcion", header: "Descripcion" },
                { width:15, key: "cantidad", header: "Cantidad" },
              ]}
              data={data.map((r) => ({
                familia: r.familia,
                subfamilia: r.subfamilia,
                grupo: r.grupo,
                subgrupo: r.subgrupo,
                codigo: r.codigo,
                descripcion: r.descripcion,
                cantidad: r.cantidad,
              }))}
              buttonSize={"small"}
            />
          </Col>
          <Col>
            <Button
              size="small"
              type="primary"
              style={{ color: "white" }}
              disabled={data.filter((d) => d.checked).length < 1}
              onClick={() => {
                onEditarEtiquetasClick?.();
              }}
            >
              Editar Etiquetas
            </Button>
          </Col>
          <Col>
            <Button
              disabled={data.filter((d) => d.checked).length < 1}
              size="small"
              type="primary"
              style={{ color: "white" }}
              onClick={(_) => {
                onActivarCodigosClick?.();
              }}
            >
              Activar C&oacute;digos
            </Button>
          </Col>
          <Col>
            <Button
              disabled={data.filter((d) => d.checked).length < 1}
              size="small"
              type="primary"
              style={{ color: "white" }}
              danger
              onClick={(_) => {
                onDesactivarCodigosClick?.();
              }}
            >
              Desactivar C&oacute;digos
            </Button>
          </Col>
          <Col>
              <Button 
              style={{backgroundColor:"#1288E5"}}
              disabled={data.filter((d) => d.checked).length < 1}
              size="small"
              type="primary"
              
              onClick={_=>{
                onEditarSeleccionClick?.()
              }}>
                <EditOutlined /> Editar Selecci&oacute;n
              </Button>
          </Col>
          <Col>
          <Input size="small" allowClear style={{width:"200px"}} prefix="Código: " value={searchStr} onChange={e=>{setSearchStr((e.target.value||"").trim())}} />
          </Col>
        </Row>
      }
    </>
  );

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
            <Tag
              color="error"
              style={{ fontSize: ".65em", margin: "0", padding: "1px" }}
            >
              <b>{subgrupo}</b>
            </Tag>
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
      width: "100px",
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
      width: "90px",
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
      render: (_, record) => (
        <>
          <Dropdown
            menu={{
              items: [
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
                  disabled: !globals.esUsuarioDeposito(),
                },
                {
                  label: "Modificar Precio Subgrupo",
                  key: "4",
                  icon: <EditOutlined />,
                  disabled: !globals.esUsuarioDeposito() || +record.modo_precio != 1,
                },
              ],
              onClick: ({ key }) => {
                onMenuOptionSelected?.(key, record.idcodigo);
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
      hidden: false,
      title: (
        <>
          <Checkbox
            onChange={(e) => {
              //onItemCBChecked?.(e)
              /*
              setData((_data) =>
                _data.map((d) => ({ ...d, checked: e.target.checked }))
              );*/
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
              onItemCBChecked?.(e, idcodigo);
              /*
              setData((_data) =>
                _data.map((d) =>
                  d.idcodigo == idcodigo
                    ? { ...d, checked: e.target.checked }
                    : d
                )
              );*/
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

  return (
    <Card title="Lista de Códigos" size="small">
    <Table
      title={header}
      rowClassName={(record, index) =>
        +record.activo == 0
          ? "error-row"
          : index % 2 === 0
          ? "table-row-light"
          : "table-row-dark"
      }
      columns={columns.filter((item) => !item.hidden)}
      dataSource={(searchStr.trim()).length>0 ? data.filter(c=>c.codigo.toUpperCase().includes(searchStr.toUpperCase())) : data }
      loading={loading || false}
      scroll={{ y: 400 }}
      size="small"
    />
    </Card>
  );
};

export default StockTable;
