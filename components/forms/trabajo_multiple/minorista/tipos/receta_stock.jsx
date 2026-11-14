import { Button, Card, Tabs } from "antd";
import DistanciaCristal from "./distancia_cristal";
import ScanOutlined from "@ant-design/icons/ScanOutlined";

const TipoRecetaStock = ({
  callback,
  path,
  trabajoObject,
  onScanValues,
  localId,
}) => {
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
    //console.log(`Active tab key: ${key}`);
  };

  return (
    <>
      <Card
        extra={
          <Button
            style={{ color: "#da4035", fontWeight: "600" }}
            type="dashed"
            onClick={(_) => {
              onScanValues(null, localId, "receta_stock", true);
            }}
            icon={<ScanOutlined />}
          >
            Leer Receta
          </Button>
        }
        size="small"
        title={
          <span style={{ color: "#262D42" }}>Receta Stock&nbsp;&nbsp;</span>
        }
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
