import { Col, DatePicker, Row, Tabs } from "antd";
import CodeGridHTML from "./CodeGridHTML";
import { useState } from "react";
import dayjs from "dayjs";

const CodeGridHTMLTipos = (props) => {
    const dateNow = new Date();
    const [month, setMonth] = useState(dateNow.getMonth() + 1);
    const [year, setYear] = useState(dateNow.getFullYear());
    
  const items = [
    {
      key: "1",
      label: "Stock",
      children: <><CodeGridHTML {...props} gridType="stock" /></>,
    },
    {
      key: "0",
      label: "Consumo",
      children: <>
        <Row><Col span={24}><DatePicker defaultValue={dayjs()} picker="month" format="MM/YYYY" onChange={onChangeMonth} /></Col></Row>
        <Row><Col span={24}><CodeGridHTML {...props} gridType="uso" mes={month} anio={year} key={month + year} /></Col></Row>
      
      </>,
    },
    
    {
      key: "2",
      label: "Ideal",
      children: <><CodeGridHTML {...props} gridType="ideal" /></>,
    },
    {
      key: "3",
      label: "Pedido",
      children: <><CodeGridHTML {...props} gridType="pedido" /></>,
    },
    {
      key: "4",
      label: "Critico",
      children: <><CodeGridHTML {...props} gridType="critico" /></>,
    },
  ];

  function onChangeMonth(date, dateString) {
    //alert(dateString);
    const parts = dateString.split("/");
    setMonth(parseInt(parts[0], 10));
    setYear(parseInt(parts[1], 10));
  }

  function onChange(key) {
    console.log(key);
  }

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </>
  );
};

export default CodeGridHTMLTipos;