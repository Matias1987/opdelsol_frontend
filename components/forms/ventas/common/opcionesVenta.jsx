import globals from "@/src/globals";
import {
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
  } = props;

  const menuOptions = {
    DETALLE: "1",
    COBRAR: "2",
    ANULAR: "3",
    IMPRIMIR: "4",
    MARCAR_TERMINADO: "5",
    ENVIAR_A_LABORATORIO: "6",
  }


//#region items
  const items_ingresada = [
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Cobrar",
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Anular",
      key: menuOptions.ANULAR,
      icon: <CloseOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
  ];

  const items_pendientes_taller = [
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Cobrar",
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
    },
  ];

  const items_terminadas = [
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

  const items_taller_sucursal = [
    {
      label: "Detalle",
      key: menuOptions.DETALLE,
      icon: <InfoOutlined />,
    },
    {
      label: "Cobrar",
      key: menuOptions.COBRAR,
      icon: <DollarOutlined />,
    },
    {
      label: "Marcar Como Terminado",
      key: menuOptions.MARCAR_TERMINADO,
      icon: <CheckOutlined />,
    },
    {
      label: "Imprimir",
      key: menuOptions.IMPRIMIR,
      icon: <PrinterOutlined />,
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
        return items_pendientes_taller;
      case globals.estadosVenta.TERMINADO:
        return items_terminadas;
      case globals.estadosVenta.TALLER_SUCURSAL:
        return items_taller_sucursal;
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
