import {Tabs} from "antd";
import ListaPreciosCodigos from "./listaPreciosCodigos";
import { useState } from "react";

const ListaPreciosV4 = (props) => {
    const [activeKey, setActiveKey] = useState('1');

  const onChange = (key) => {
    setActiveKey(key)
    console.log(key);
  };

  const current_tab_style = {fontSize:"1.3em", fontWeight:"bolder", color:"#075599"}
  const idle_tab_style = {fontSize:"1.0em", fontWeight:"400", color:"#969595"}

  const items = [
  {
    key: '1',
    label: <span style={activeKey=='1' ? current_tab_style : idle_tab_style }>Cristales</span>,
    children: <ListaPreciosCodigos title={"Cristales"} idRef={"67689"} nivelFiltro={"subgrupo"} />,
  },
  {
    key: '2',
    label: <span style={activeKey=='2' ? current_tab_style : idle_tab_style}>Armazones</span>,
    children: <ListaPreciosCodigos title={"Armazones"} idRef={"2"} nivelFiltro={"familia"} />,
  },

];

  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={activeKey} items={items} onChange={onChange} type="card" />
    </>
  );
};

export default ListaPreciosV4;
