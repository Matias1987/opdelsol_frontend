import Transferencia from "@/components/caja_master/transferencia";
import LayoutAdmin from "@/components/layout/layout_admin";
import { Button, Card, Col, Menu, Modal, Row, Table } from "antd";
import { useState } from "react";
/**
 * CMIndex Page: Admin Control Management muestra totales de la caja master, y tareas posibles, como transferencia a fondos fijos,
 * control de cajas de sucursales, ingreso de plata (transferencia de las cajas de sucursales a master)
 * @returns
 */
export default function CMIndex() {
  const [transferenciaFondoFOpen, setTransferenciaFondoFOpen] = useState(false);
  const [controlCajasOpen, setControlCajasOpen] = useState(false);
  const [ingresoPlataOpen, setIngresoPlataOpen] = useState(false);
  /*
  const menuStyle = {
  background: 'linear-gradient(to right, #e6f0ff, #f9fbff)',
  borderRadius: '8px',
  padding: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
};

const itemStyle = {
  color: '#4a90e2',
  fontWeight: '500',
  fontSize: '16px',
};

const selectedStyle = {
  backgroundColor: '#d0e4ff',
  borderRadius: '6px',
};*/

const buttonStyle = { 
  borderRadius: '6px',
  padding: '8px 16px',
  margin: '4px',
  backgroundColor: '#f0f0f0',
  border: '1px solid #d9d9d9',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s',
  color:"#0000ff"
};

  return (
    <>
      <Card
      title="Control de Cajas"
      size="small"
      extra={<>
      
      </>}
      >
        <Row>
          <Col span={24}>
           { /*<Menu
              style={{
                background: "transparent",
                border: "none",
                padding: "16px",
              }}
              
              onClick={(e) => {
                if (e.key === "1") {
                  setTransferenciaFondoFOpen(true);
                } else if (e.key === "2") {
                  setControlCajasOpen(true);
                } else if (e.key === "3") {
                  setIngresoPlataOpen(true);
                }
              }}
              theme="light"
              mode="horizontal"
              items={[
                { label: "Transferencia a Fondos Fijos", key: "1" },
                { label: "Control de Cajas de Sucursales", key: "2" },
                { label: "Ingreso de Plata", key: "3" },
              ]}
            />*/}
   
          </Col>
          <Col span={24}>
        
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              size="small"
              title={_ => <>Lista&nbsp;<Button size="small" style={buttonStyle} onClick={() => setIngresoPlataOpen(true)}>Nueva Caja</Button></>}
              dataSource={[]} columns={[
                {title:"Sucursal"},
                {title:"Estado"},
                {title:"Acciones"},
              ]} pagination={false} 
            />
          </Col>
          <Col span={24}>
            <Table
              size="small"
              title={_ => <>Fondos Fijos&nbsp;<Button size="small" style={buttonStyle} onClick={() => setIngresoPlataOpen(true)}>Nueva Fondo Fijo</Button></>}
              dataSource={[]} columns={[]} pagination={false}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        onCancel={() => setTransferenciaFondoFOpen(false)}
        open={transferenciaFondoFOpen}
      >
        <Transferencia />
      </Modal>
      <Modal
        onCancel={() => setControlCajasOpen(false)}
        open={controlCajasOpen}
      ></Modal>
      <Modal
        onCancel={() => setIngresoPlataOpen(false)}
        open={ingresoPlataOpen}
      ></Modal>
    </>
  );
}
CMIndex.PageLayout = LayoutAdmin;
