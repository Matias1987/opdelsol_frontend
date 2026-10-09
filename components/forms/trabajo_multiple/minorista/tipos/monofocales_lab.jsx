import {
  Card,
  Tabs,
} from "antd";
import DistanciaCristal from "./distancia_cristal";

const TipoMonofocalesLab = ({ callback, path }) => {
 
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
          />
        </>
      ),
    },
  ];

  const onChangeTabs = (key) => {
    console.log(`Active tab key: ${key}`);
  };

  return (
    <>
      <Card
        size="small"
        title={<span style={{ color: "#262D42" }}>Monofocales Laboratorio</span>}
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
