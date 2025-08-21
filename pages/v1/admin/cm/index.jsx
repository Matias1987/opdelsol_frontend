import Egreso from "@/components/caja_master/egreso";
import Ingreso from "@/components/caja_master/ingreso";
import ListadoCajaSucursales from "@/components/caja_master/listado_caja_sucursales";
import NuevaCaja from "@/components/caja_master/nueva_caja";
import Transferencia from "@/components/caja_master/transferencia";
import LayoutAdmin from "@/components/layout/layout_admin";
import { headers } from "@/next.config";
import { ArrowDownOutlined, ArrowUpOutlined, HomeOutlined, InfoOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Button, Card, Col, Menu, Modal, Row, Statistic, Table, Tabs } from "antd";
import { useState } from "react";
/**
 * CMIndex Page: Admin Control Management muestra totales de la caja master, y tareas posibles, como transferencia a fondos fijos,
 * control de cajas de sucursales, ingreso de plata (transferencia de las cajas de sucursales a master)
 * @returns
 */
export default function CMIndex() {
  const [transferenciaFondoFOpen, setTransferenciaFondoFOpen] = useState(false);
  const [egresoCajaOpen, setEgresoCajaOpen] = useState(false);
  const [ingresoPlataOpen, setIngresoPlataOpen] = useState(false);
  const [nuevoFondoOpen, setNuevoFondoOpen] = useState(false);
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
    color: "#0000ff"
  };

  return (
    <>
    <Card title="Caja">
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={
          [
            {
              key: '1',
              label: <><HomeOutlined/> Resumen</>,
              children: <>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card variant="borderless">
                      <Statistic
                        title="Active"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card variant="borderless">
                      <Statistic
                        title="Idle"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                </Row>
                <Row>
            <Col span={24}>
            <Card
            styles={{ header: { backgroundColor: '#d2d1ffff' } }}
            size="small"
            title="Ultimas Operaciones"
            extra={<>
                <Button size="small" style={buttonStyle} onClick={() => setIngresoPlataOpen(true)}>Nuevo Egreso</Button>
                <Button size="small" style={buttonStyle} onClick={() => setIngresoPlataOpen(true)}>Nuevo Ingreso</Button>
                <Button size="small" style={buttonStyle} onClick={() => setTransferenciaFondoFOpen(true)}>Nueva Transferencia a Fondo Fijo</Button>
            </>}
            >
              <Table
                size="small"
                
                dataSource={[]} columns={[]} pagination={false}
              />
            </Card>
            
          </Col>
          </Row>
              </>,
            },
            {
              key: '2',
              label: <><OrderedListOutlined /> Listado</>,
              children: <>
                <Card
                  title="Control de Cajas"
                  size="small"
                  extra={<>

                  </>}
                >
                  <Row>
                    <Col span={24}>
   

                    </Col>
                    <Col span={24}>

                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <ListadoCajaSucursales />
                    </Col>
                  </Row>
                </Card>

              </>,
            },
            {
              label:<><InfoOutlined /> Fondos Fijos</>,
              key: 3,
              children: <>
                <Row>
                  <Col span={24}>
                    <Table
                      size="small"
                      title={_ => <>Fondos Fijos&nbsp;<Button size="small" style={buttonStyle} onClick={() => setNuevoFondoOpen(true)}>Nuevo Fondo Fijo</Button></>}
                      dataSource={[]} columns={[]} pagination={false}
                    />
                  </Col>
                </Row>
              </>
            }
          ]
        } onChange={_ => { }} 
      />
    </Card>
    <Modal>
      
    </Modal>
      <Modal
      destroyOnClose
      title="Nueva Transferencia"
      footer={null}
        onCancel={() => setTransferenciaFondoFOpen(false)}
        open={transferenciaFondoFOpen}
      >
        <Transferencia aFondoFijo={true} />
      </Modal>
      <Modal
        title="Nuevo Egreso"
        footer={null}
        onCancel={() => {}}
        open={egresoCajaOpen}
      >
        <Egreso />
      </Modal>
      <Modal
        title="Nuevo Ingreso"
        footer={null}
        onCancel={() => setIngresoPlataOpen(false)}
        open={ingresoPlataOpen}
      >
        <Ingreso />
      </Modal>
      <Modal
        title="Nuevo Fondo Fijo"
        footer={null}
        onCancel={() => setNuevoFondoOpen(false)}
        open={nuevoFondoOpen}
      >
        <NuevaCaja />
      </Modal>
    </>
  );
}
CMIndex.PageLayout = LayoutAdmin;
