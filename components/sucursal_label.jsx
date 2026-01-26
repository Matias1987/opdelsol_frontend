import { get } from "@/src/urls";
import { Button, Col, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import SucursalSelect from "./SucursalSelect";
import globals from "@/src/globals";

const SucursalLabel = ({changeSucursalEnabled=false}) => {
  const [data, setData] = useState(null);
  const [reload, setReload] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  useEffect(() => {
    if (globals.obtenerSucursal() < 0) {
      return;
    }
    const idsucursal = globals.obtenerSucursal();
    //get details
    fetch(get.sucursal_details + idsucursal)
      .then((response) => response.json())
      .then((response) => {
        if ((response.data || null) == null) {
          setData(null);
          return;
        }
        if (typeof response.data.length === "undefined") {
          setData(null);
          return;
        }
        if (response.data.length < 1) {
          setData(null);
          return;
        }

        setData(response.data);
      })
      .catch((e) => {
        console.log("error");
      });
  }, [reload]);

  return data == null ? (
    <></>
  ) : (
    <>
      <Button type="text" onClick={_=>{changeSucursalEnabled && setPopupOpen(true)}} style={{ color: "white", cursor: "pointer" }}>
        {data[0].nombre}
      </Button>
      <Modal
        open={popupOpen}
        onCancel={() => setPopupOpen(false)}
        destroyOnClose
        width={"400px"}
        title="Seleccionar Sucursal: "
        footer={null}
      >
        <Row style={{padding:"6px"}}>
            <Col span={24}>
                <SucursalSelect
                addNullOption={false}
                callback={(v) => {
                    setSelectedSucursal(v);
                }}
                />
            </Col>
        </Row>
        <Row style={{padding:"6px"}}>
            <Col span={24}>
                <Button 
                disabled={selectedSucursal==null} 
                type="primary" 
                onClick={_=>{
                    globals.establecerSucursal(selectedSucursal);
                    setSelectedSucursal(null);
                    setPopupOpen(false);
                    setReload(!reload);
                }}>Aplicar</Button>
            </Col>
        </Row>
        
      </Modal>
    </>
  );
};

export default SucursalLabel;
