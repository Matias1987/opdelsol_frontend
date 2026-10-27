import { Button, Card, Tabs } from "antd";
import DistanciaCristal from "./distancia_cristal";
import { useEffect } from "react";
import { CameraOutlined, ScanOutlined } from "@ant-design/icons";

const TipoRecetaStock = ({ callback, path, trabajoObject }) => {
  /*const [trabajoStock, setTrabajoStock] = useState({
    lejos: null,
    cerca: null,
  });*/

  useEffect(()=>{},[trabajoObject]);

  const tabItems = [
    {
      key: "1",
      label: "LEJOS",
      children: (
        <>
          <DistanciaCristal
            path={[...path, "lejos"]}
            tipo={"lejos"}
            callback={callback}
            trabajoObject={trabajoObject?.lejos}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "CERCA",
      children: (
        <>
          <DistanciaCristal
            path={[...path, "cerca"]}
            tipo={"cerca"}
            callback={callback}
            trabajoObject={trabajoObject?.cerca}
          />
        </>
      ),
    },
  ];

  const onChangeTabs = (key) => {
    console.log(`Active tab key: ${key}`);
  };
  /*
 

  const onChange = (key, value) => {
    callback?.(path, key, value);
  };
*/
  return (
    <>
      <Card
        size="small"
        title={<span style={{ color: "#262D42" }}>Receta Stock&nbsp;&nbsp;<Button type="primary"><ScanOutlined /></Button></span>}
        style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
      >
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onChange={onChangeTabs}
          type="line"
        />
      </Card>
    </>
  );
};

export default TipoRecetaStock;
