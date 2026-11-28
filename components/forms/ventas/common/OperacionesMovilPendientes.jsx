import { useCallback, useEffect, useState } from "react";
import { Button, Card, Space, Typography, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import OperacionesMovilTable from "./OperacionesMovilTable";
import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get } from "@/src/urls";
const REFRESH_INTERVAL = 30000;
export default function OperacionesMovilPendientes({ onContinuar }) {
  const [loading, setLoading] = useState(false);
  const [operaciones, setOperaciones] = useState([]);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const cargarOperaciones = useCallback(async () => {
    try {
      setLoading(true);
      const  {data} = await fetchConRetryYTimeout(
        get.lista_operaciones_movil //+ "?estado=PENDIENTE",
      );
      alert(JSON.stringify(data))
      setOperaciones(data);
      setUltimaActualizacion(new Date());
    } catch (error) {
      console.error(error);
      message.error("No se pudieron obtener las operaciones pendientes");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    cargarOperaciones();
  }, [cargarOperaciones]);
  useEffect(() => {
    const interval = setInterval(() => {
      cargarOperaciones();
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [cargarOperaciones]);
  return (
    <Card
      title="Operaciones recibidas desde móvil"
      extra={
        <Space>
          {ultimaActualizacion && (
            <Typography.Text type="secondary">
              Actualizado: {ultimaActualizacion.toLocaleTimeString()}
            </Typography.Text>
          )}
          <Button
            icon={<ReloadOutlined />}
            loading={loading}
            onClick={cargarOperaciones}
          >
            Actualizar
          </Button>
        </Space>
      }
    >
      <OperacionesMovilTable
        data={operaciones}
        loading={loading}
        onContinuar={onContinuar}
      />
    </Card>
  );
}
