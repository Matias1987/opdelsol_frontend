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
  const [reload] = useState(false);
  const [datosProveedor, setDatosProveedor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("ARS");

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
          //alert(JSON.stringify(m));
          return {
            label: (
              <div style={{ fontWeight: "600", fontSize: "1.2em" }}>
                {m.moneda}
              </div>
            ),
            key: m.moneda,
            children: (
              <FichaProveedorMoneda
                idproveedor={idproveedor}
                moneda={m.moneda}
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

  const onChangeTab = (key) => {
    setSelectedTab(key);
  };

  const RoundedTabBar = (props1, DefaultTabBar) => {
  // props contains info about tabs, activeKey, etc.
  const { panes, activeKey, onTabClick } = props1;

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {panes.map(pane => (
        <Button
          style={{boxShadow:"2px 2px 1px 1px #afafaf"}}
          key={pane.key}
          shape="round"
          type={activeKey === pane.key ? 'primary' : 'default'}
          onClick={() => onTabClick(pane.key)}
        >
          { pane.props.tab /* This is the label of the tab */}
        </Button>
      ))}
    </div>
  );
};

  useEffect(() => {
    load_datos_proveedor();
    load_monedas_existentes_proveedor();
  }, [idproveedor, reload]);

  return (
    <>
      <Card
        style={{ margin: "12px" }}
        size="small"
        title={"Proveedor: " + (datosProveedor ? datosProveedor.nombre : "")}
        extra={
          <>
            <span style={{ fontSize: "14px", color: "gray" }}>
              ID: {idproveedor}
            </span>
            <Button
              onClick={(_) => {
                callback?.();
              }}
              danger
              type="link"
            >
              <CloseOutlined /> Cerrar
            </Button>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Tabs
              renderTabBar={RoundedTabBar}
              tabBarGutter={16}
              tabBarStyle={{
                background: "#f2f6fc",
                padding: "0 16px",
                borderBottom: "1px solid #d9d9d9",
              }}
              size="small"
              items={tabItems}
              direction="ltr"
              tabPosition="top"
              type="card"
              onChange={onChangeTab}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default FichaProveedorV2;
