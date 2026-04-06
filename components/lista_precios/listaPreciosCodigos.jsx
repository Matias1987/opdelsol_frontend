import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Card, Col, Input, Row, Switch, Table } from "antd";
import { useEffect, useState } from "react";

const ListaPreciosCodigos = ({ nivelFiltro, idRef, title, onRowClick }) => {
  const [data, setData] = useState(null);
  const [filterStr, setFilterStr] = useState("");
  const [modoBusquedaCodigo, setModoBusquedaCodigo] = useState(true);
  const columns = [
    {
      sorter: (a, b) => a.codigo.localeCompare(b.codigo),
      title: "Código",
      dataIndex: "codigo",
      render: (_, { codigo }) => (
        <div style={{ fontWeight: "500", color: "#000127ff" }}>{codigo}</div>
      ),
    },
    {
      sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
      title: "Descripción",
      dataIndex: "descripcion",
      render: (_, { descripcion }) => (
        <div style={{ color: "#333", fontWeight: "500" }}>{descripcion}</div>
      ),
    },
    {
      sorter: (a, b) => a.precio - b.precio,
      title: <div style={{ textAlign: "right" }}>Precio</div>,
      dataIndex: "precio",
      render: (_, { precio }) => (
        <div
          style={{
            textAlign: "right",
            fontSize: "1.3em",
            color: "#010038",
            fontWeight: "500",
          }}
        >
          $&nbsp;{formatFloat(precio)}
        </div>
      ),
    },
  ];
  const load = () => {
    const data = {
      idSubgrupo: nivelFiltro == "subgrupo" ? idRef : "-1",
      idGrupo: nivelFiltro == "grupo" ? idRef : "-1",
      idSubfamilia: nivelFiltro == "subfamilia" ? idRef : "-1",
      idFamilia: nivelFiltro == "familia" ? idRef : "-1",
    };

    post_method(post.lista_precios_codigos, data, (response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const handleRowClick = (record, index) => {
    console.log("Row clicked:", record, index);
    onRowClick?.(record);
  };
  return (
    <>
      <Card
        styles={{
          header: {
            backgroundColor: "#f5f3f3",
            padding: "4px",
            borderBottom: "1px solid #c9c9c9",
          },
        }}
        style={{
          borderRadius: "4px",
          boxShadow: "4px 4px 9px 1px rgba(119, 119, 119, 0.5)",
        }}
        size="small"
        title={
          <Input
            onChange={(e) => {
              setFilterStr(e ? e.target.value : "");
            }}
            prefix={
              <span style={{ color: "#3A5C79", fontStyle: "italic" }}>
                B&uacute;squeda {title}:{" "}
                <Switch
                  style={{ backgroundColor: modoBusquedaCodigo==1 ? "green" : "#D86500" }}
                  checkedChildren="Código"
                  unCheckedChildren="Descripción"
                  checked={modoBusquedaCodigo}
                  onChange={(checked) => {
                    setModoBusquedaCodigo(checked);
                  }}
                />
              </span>
            }
            allowClear
            style={{ width: "100%", backgroundColor: "rgba(0,0,0,0)" }}
          />
        }
      >
        <Row>
          <Col span={24}>
            <Table
              loading={data == null}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              size="small"
              columns={columns}
              dataSource={
                filterStr
                  ? data
                      .filter((item) =>
                        modoBusquedaCodigo
                          ? item.codigo
                              .toLowerCase()
                              .includes(filterStr.toLowerCase())
                          : item.descripcion
                              .toLowerCase()
                              .includes(filterStr.toLowerCase()),
                      )
                      .sort((a, b) =>
                        modoBusquedaCodigo
                          ? +a.long_cod - +b.long_cod
                          : +a.long_desc - +b.long_desc,
                      )
                  : data
              }
              scroll={{ y: "500px" }}
              pagination={true}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    handleRowClick(record, index);
                  },
                };
              }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListaPreciosCodigos;
