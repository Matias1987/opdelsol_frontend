import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Card, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";

const ListaPreciosCodigos = ({ nivelFiltro, idRef, title }) => {
  const [data, setData] = useState(null);
  const columns = [
    {
      title: "Código", 
      dataIndex:"codigo"
    },
    {
      title: "Descripción", 
      dataIndex: "descripcion"
    },
    {
      title: <div style={{ textAlign: "right" }}>Precio</div>,
      dataIndex: "precio",
      render:(_,{precio})=><div style={{textAlign:"right"}}>{ formatFloat(precio)}</div>
    },
  ];
  const load = () => {
    const data = {
        idSubgrupo: nivelFiltro=="subgrupo"? idRef : "-1",
        idGrupo: nivelFiltro=="grupo"? idRef : "-1",
        idSubfamilia: nivelFiltro=="subfamilia"? idRef : "-1",
        idFamilia: nivelFiltro=="familia"? idRef : "-1",
    }

    post_method(post.lista_precios_codigos, data, (response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    load();
  }, []);

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
            prefix={
              <span style={{ color: "#3A5C79", fontStyle: "italic" }}>
                B&uacute;squeda {title}:
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
              size="small"
              columns={columns}
              dataSource={data}
              scroll={{ y: "500px" }}
              pagination={false}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ListaPreciosCodigos;
