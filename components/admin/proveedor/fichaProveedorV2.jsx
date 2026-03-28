import { Button, Card, Col, Row, Spin, Tabs } from "antd";
import { useEffect, useState } from "react";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import FichaProveedorMoneda from "./fichaProveedorMoneda";
import { CloseOutlined } from "@ant-design/icons";

const FichaProveedorV2 = ({ idproveedor, callback }) => {
  const [monedasExistentesProveedor, setMonedasExistentesProveedor] = useState(
    [],
  );
  const [tabItems, setTabItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [datosProveedor, setDatosProveedor] = useState(null);

  const detalle_proveedor = (_) =>
    datosProveedor == null ? (
      <Spin />
    ) : (
      <>
        <Row>
          <Col span={24}>
            Nombre:{" "}
            <span style={{ fontWeight: "bold", color: "darkslateblue" }}>
              {datosProveedor.nombre}
            </span>
          </Col>
        </Row>
      </>
    );

  const load_datos_proveedor = (_) => {
    fetch(get.detalle_proveedor + idproveedor)
      .then((r) => r.json())
      .then((response) => {
        //alert(JSON.stringify(response))
        setDatosProveedor(response.data[0]);
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const load_monedas_existentes_proveedor = (_) => {
    post_method(
      post.monedas_existentes_proveedor,
      { idproveedor: idproveedor },
      (response) => {
        setMonedasExistentesProveedor(response.data);
        const items = response.data.map((m) => {
          return {
            label: m.moneda,
            key: m.moneda,
            children: (
              <FichaProveedorMoneda
                idproveedor={idproveedor}
                modo={m.moneda}
                callback={callback}
                datosProveedor={datosProveedor}
              />
            ),
          };
        });
        setTabItems(items);
      },
    );
  };

  useEffect(() => {
    load_datos_proveedor();
    load_monedas_existentes_proveedor();
  }, [idproveedor, reload]);

  return (
    <>
    <Card style={{ margin: "12px" }} size="small" title={"Proveedor: " + (datosProveedor ? datosProveedor.nombre : "")} extra={
        <>
        <span style={{fontSize:"14px", color:"gray"}}>ID: {idproveedor}</span>
        <Button onClick={_=>{callback?.()}} danger type="link"><CloseOutlined /> Cerrar</Button>
        </>

        }>

      <Row>
        <Col span={24}>
          <Tabs items={tabItems} direction="ltr" tabPosition="top" type="card" />
        </Col>
      </Row>
      </Card>
    </>
  );
};

export default FichaProveedorV2;
