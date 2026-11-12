import { Button, Card, Tabs } from "antd";
import DistanciaCristal from "./distancia_cristal";
import ScanOutlined from "@ant-design/icons/ScanOutlined";

const TipoMonofocalesLab = ({
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
            tipo={"lejos"}
            callback={callback}
            path={[...path, "lejos"]}
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
            tipo={"cerca"}
            callback={callback}
            path={[...path, "cerca"]}
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
        size="small"
        title={
          <span style={{ color: "#262D42" }}>
            Monofocales Laboratorio &nbsp;&nbsp;
            <Button
              type="primary"
              onClick={(_) => {
                onScanValues(null, localId, "monofocales_lab", true);
              }}
            >
              <ScanOutlined />
            </Button>
          </span>
        }
        style={{ boxShadow: "-1px 1px 1px 1px #9e9c9c" }}
      >
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onChange={onChangeTabs}
          type="line"
        />
      </Card>{" "}
    </>
  );
};

export default TipoMonofocalesLab;
