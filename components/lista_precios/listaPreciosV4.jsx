import {Modal, Tabs} from "antd";
import ListaPreciosCodigos from "./listaPreciosCodigos";
import { useState } from "react";
import EditarCodigoIndiv from "../forms/deposito/EditarCodigoIndiv";
import { id_subgrupo_cristales } from "@/src/config";
import globals from "@/src/globals";

const ListaPreciosV4 = ({editable}) => {
    const [activeKey, setActiveKey] = useState('1');
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(0);
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
    children: <ListaPreciosCodigos key={reloadTrigger} title={"Cristales"} idRef={id_subgrupo_cristales} nivelFiltro={"subgrupo"} onRowClick={(record) => {
      if(!editable) return;
      setCodigoSeleccionado(record.idcodigo);
      setModalEditarVisible(true);
    }} />,
  },
  {
    key: '2',
    label: <span style={activeKey=='2' ? current_tab_style : idle_tab_style}>Armazones</span>,
    children: <ListaPreciosCodigos key={reloadTrigger} title={"Armazones"} idRef={globals.familiaIDs.ARMAZON} nivelFiltro={"familia"} onRowClick={(record) => {
      if(!editable) return;
      setCodigoSeleccionado(record.idcodigo);
      setModalEditarVisible(true);
    }} />,
  },

];

  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={activeKey} items={items} onChange={onChange} type="card" />
      <Modal
        destroyOnClose
         width={"900px"}
         centered
        title="Editar Código"
        open={modalEditarVisible}
        onCancel={() => setModalEditarVisible(false)}
        footer={null}
      >
        <EditarCodigoIndiv idcodigo={codigoSeleccionado} callback={() => {
          setModalEditarVisible(false);
          setReloadTrigger((prev) => prev + 1);
        }} 
        key={codigoSeleccionado}
        />
      </Modal>
    </>
  );
};

export default ListaPreciosV4;
