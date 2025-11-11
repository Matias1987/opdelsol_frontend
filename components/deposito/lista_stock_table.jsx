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
import { useEffect, useState } from "react";

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
    verRutaCol,
    verTagsCol,
    verPrecioCol,
  } = props;

  const [searchStr, setSearchStr] = useState("");

  const header = (_) => (
    <>
      <Row >
        <Col span={24} style={{textAlign:"center", fontWeight:"500"}}>Listado de C&oacute;digos</Col>
      </Row>
      <Row
        style={{
          backgroundColor: "rgba(255, 255, 255,0)",
          borderRadius: "16px",
        }}
        gutter={"16"}
      >
        <Col>
          <Button
            size="small"
            type="link"
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
            type="link"
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
            type="link"
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
            disabled={data.filter((d) => d.checked).length < 1}
            size="small"
            type="link"
            onClick={(_) => {
              onEditarSeleccionClick?.();
            }}
          >
            <EditOutlined /> Editar Selecci&oacute;n
          </Button>
        </Col>
        {/*<Col>
          <Input size="small" allowClear style={{width:"200px"}} prefix="Código: " value={searchStr} onChange={e=>{setSearchStr((e.target.value||"").trim())}} />
          </Col>*/}
        <Col>
          {data.filter((d) => d.checked).length < 1 ? (
            <></>
          ) : (
            <ExportToExcel
              buttonType="link"
              fileName={`ls_${new Date().getTime()}`}
              columns={[
                { width: 15, key: "familia", header: "Familia" },
                { width: 15, key: "subfamilia", header: "SubFamilia" },
                { width: 15, key: "grupo", header: "Grupo" },
                { width: 15, key: "subgrupo", header: "SubGrupo" },
                { width: 35, key: "codigo", header: "Codigo" },
                { width: 45, key: "descripcion", header: "Descripcion" },
                { width: 15, key: "cantidad", header: "Cantidad" },
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
          )}
        </Col>
      </Row>
      <Row gutter={8}>
        <Col style={{ fontWeight: "500" }}>Columnas: </Col>
        <Col>
          <Checkbox
            defaultChecked={typeof verRutaCol === 'undefined' ? false : verRutaCol}
            onChange={(v) => {
              setColumns((cc) =>
                cc.map((col) =>
                  col.key === "ruta" ? { ...col, hidden: !v.target.checked } : col
                )
              );
            }}
          >
            Ruta
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            onChange={(v) => {
              setColumns((cc) =>
                cc.map((col) =>
                  col.key === "tags" ? { ...col, hidden: !col.hidden } : col
                )
              );
            }}
          >
            Etiquetas
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            onChange={(v) => {
              setColumns((cc) =>
                cc.map((col) =>
                  col.key === "precio" ? { ...col, hidden: !col.hidden } : col
                )
              );
            }}
          >
            Precio
          </Checkbox>
        </Col>
      </Row>
    </>
  );

  const [columns, setColumns] = useState([
    {
      fixed: "left",
      width: "200px",
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo",
      render: (_, { codigo }) => (
        <>
          <div
            style={{
              fontSize: "1em",
              //whiteSpace: "nowrap",
              //overflowX: "scroll",
              width: "100%",
            }}
          >
            <b>{codigo}</b>
          </div>
        </>
      ),
    },
    {
      hidden: true,
      width: "200px",
      title: "Ruta",
      dataIndex: "idcodigo",
      key: "ruta",
      render: (_, { familia, subfamilia, grupo, subgrupo, idsubgrupo }) => (
        <Space size={[0, "small"]} wrap>
          <span style={{ fontSize: "1em" }}>
            <Tag
              color="success"
              style={{ fontSize: "1em", margin: "0", padding: "1px" }}
            >
              {familia}
            </Tag>
            <Tag
              color="processing"
              style={{ fontSize: "1em", margin: "0", padding: "1px" }}
            >
              {subfamilia}
            </Tag>
            <Tag
              color="#F40800"
              style={{ fontSize: "1em", margin: "0", padding: "1px" }}
            >
              <b>{grupo}</b>
            </Tag>
            <Tag
              color="#4900F4"
              style={{ fontSize: "1em", margin: "0", padding: "1px" }}
            >
              <b>{subgrupo}</b>
            </Tag>
          </span>
        </Space>
      ),
    },

    {
      width: "200px",
      title: "Desc.",
      dataIndex: "descripcion",
      key: "descripcion",
      render: (_, { descripcion }) => (
        <div
          style={{
            width: "100%" /*overflowX: "scroll", whiteSpace: "nowrap" */,
          }}
        >
          {descripcion}
        </div>
      ),
    },

    {
      hidden: true,
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
      hidden: true,
      width: "200px",
      title: "Etiquetas",
      key: "tags",
      render: (_, { etiquetas }) => (
        <span style={{ fontWeight: "bold", color: "darkgreen" }}>
          {etiquetas}
        </span>
      ),
    },
    {
      fixed: "right",
      width: "90px",
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
      width: "90px",
      hidden: false,
      render: (_, { cantidad }) => (
        <div style={{ width: "90%", textAlign: "right" }}>{cantidad}</div>
      ),
    },
    {
      fixed: "right",
      width: "200px",
      title: "Acciones",
      dataIndex: "idstock",
      key: "idstock",
      width: "120px",
      hidden: false,
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
                  disabled: !(
                    globals.esUsuarioDeposito() ||
                    globals.esUsuarioLaboratorio() ||
                    globals.esUsuarioDepositoMin()
                  ),
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
                  disabled:
                    !globals.esUsuarioDeposito() || +record.modo_precio != 1,
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
      fixed: "right",
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
    /*{
      render: (_, obj) => (
        <>{+obj.activo == 1 ? <CheckOutlined /> : <CloseOutlined />}</>
      ),
      title: "Activo",
      width: "80px",
    },*/
  ]);

  useEffect(()=>{
    setColumns(_cols=>
     _cols.map(c=> 
      c.key=='precio' ? {...c, hidden: typeof verPrecioCol !== 'undefined' ? verPrecioCol: true} :
      c.key=='ruta' ? {...c, hidden: typeof verRutaCol !== 'undefined' ? verRutaCol: true} :
      c.key=='tags' ? {...c, hidden: typeof verTagsCol !== 'undefined' ? verTagsCol : true} : 
      c
    )
  );

  },[])

  return (
    <Card size="small">
      <Table
        title={header}
        rowClassName={(record, index) =>
          +record.activo == 0 ? "error-row" : "table-row-light"
        }
        columns={columns.filter((item) => !item.hidden)}
        dataSource={
          searchStr.trim().length > 0
            ? data.filter((c) =>
                c.codigo.toUpperCase().includes(searchStr.toUpperCase())
              )
            : data
        }
        loading={loading || false}
        scroll={{ y: 400 }}
        size="small"
      />
    </Card>
  );
};

export default StockTable;
