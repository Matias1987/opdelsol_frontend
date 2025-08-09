import LayoutAdmin from "@/components/layout/layout_admin";
import { Card, Col, Menu, Row } from "antd";
/**
 * CMIndex Page: Admin Control Management muestra totales de la caja master, y tareas posibles, como transferencia a fondos fijos,
 * control de cajas de sucursales, ingreso de plata (transferencia de las cajas de sucursales a master)
 * @returns 
 */
export default function CMIndex() {
  return (
    <Card>
      <Row>
        <Col span={24}>
          <Menu
            theme="dark"
            mode="horizontal"
            items={[
              { label: "Transferencia a Fondos Fijos", key: "1" },
              { label: "Control de Cajas de Sucursales", key: "2" },
              { label: "Ingreso de Plata", key: "3" },
            ]}
          />
        </Col>
        <Col span={24}>
          <Card>
            <h2>Detalles de la Tarea</h2>
            <p>Información sobre la tarea seleccionada.</p>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
CMIndex.PageLayout = LayoutAdmin;  