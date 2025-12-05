import globals from "@/src/globals";
import {
  BackwardOutlined,
  CheckOutlined,
  CloseOutlined,
  DollarOutlined,
  DownOutlined,
  InfoCircleFilled,
  InfoOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

const OpcionesVenta = (props) => {
  const {
    venta,
    onDetalleClick,
    onImprimirClick,
    onCobrarClick,
    onMarcarTerminadoClick,
    onEnviarALaboratorioClick,
    onAnularClick,
    onResfuerzoClick,
    onDevolucionClick,
  } = props;

  const menuOptions = {
    DETALLE: "1",
    COBRAR: "2",
    ANULAR: "3",
    IMPRIMIR: "4",
    MARCAR_TERMINADO: "5",
    ENVIAR_A_LABORATORIO: "6",
    RESFUERZO: "7",
    DEVOLUCION: "8",
  };

  //#region items
  const items_ingresada = [
    {
      label: (
        <span style={{ color: "#1890ff", fontWeight: "600" }}>Cobrar</span>
      ),
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
    {
      label: <span style={{ color: "#ff1818ff" }}>Anular</span>,
      key: menuOptions.ANULAR,
      icon: <CloseOutlined />,
    },
  ];

  const items_pendientes_taller = [
    {
      label: (
        <span style={{ color: "#1890ff", fontWeight: "600" }}>
          Cobrar Resfuerzo
        </span>
      ),
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },

    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
  ];

  const items_terminadas = [
    {
      label: (
        <span style={{ color: "#1890ff", fontWeight: "600" }}>Entrega</span>
      ),
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },

    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
    {
      label: "Resfuerzo",
      key: menuOptions.RESFUERZO,
      icon: <DollarOutlined />,
    },
    {
      label: "Enviar a Depósito",
      key: menuOptions.DEVOLUCION,
      icon: <BackwardOutlined />,
    },
  ];

  const items_taller_sucursal = [
    {
      label: (
        <span style={{ color: "#1890ff", fontWeight: "600" }}>
          Cobrar Resfuerzo
        </span>
      ),
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: (
        <span style={{ color: "#4f992aff", fontWeight: "600" }}>
          Marcar Como Terminado
        </span>
      ),
      key: menuOptions.MARCAR_TERMINADO,
      icon: <CheckOutlined />,
    },
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },

    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
    {
      label: "Enviar a Depósito",
      key: menuOptions.DEVOLUCION,
      icon: <BackwardOutlined />,
    },
  ];

  const items_entregadas = [
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
  ];

  const items_anuladas = [
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
  ];
  //#endregion
  const get_items = (_) => {
    switch (venta.estado) {
      case globals.estadosVenta.INGRESADO:
        return items_ingresada;
      case globals.estadosVenta.PENDIENTE:
        return venta.en_laboratorio
          ? items_pendientes_taller
          : items_taller_sucursal;
      case globals.estadosVenta.TERMINADO:
        return items_terminadas;
      case globals.estadosVenta.ENTREGADO:
        return items_entregadas;
      case globals.estadosVenta.ANULADO:
        return items_anuladas;
    }
  };

  const onMenuOptionSelected = (key) => {
    switch (key) {
      case menuOptions.DETALLE:
        onDetalleClick?.(venta);
        break;
      case menuOptions.COBRAR:
        onCobrarClick?.(venta);
        break;
      case menuOptions.ANULAR:
        onAnularClick?.(venta);
        break;
      case menuOptions.IMPRIMIR:
        onImprimirClick?.(venta);
        break;
      case menuOptions.MARCAR_TERMINADO:
        onMarcarTerminadoClick?.(venta);
        break;
      case menuOptions.ENVIAR_A_LABORATORIO:
        onEnviarALaboratorioClick?.(venta);
        break;
      case menuOptions.RESFUERZO:
        onResfuerzoClick?.(venta);
        break;
      case menuOptions.DEVOLUCION:
        onDevolucionClick?.(venta);
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items: get_items(),
        onClick: ({ key }) => {
          onMenuOptionSelected(key);
        },
      }}
    >
      <Button type="primary" size="large">
        <Space>
          Acciones
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default OpcionesVenta;
