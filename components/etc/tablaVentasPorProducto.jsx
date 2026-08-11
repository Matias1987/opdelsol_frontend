import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import PrinterWrapper from "../PrinterWrapper";
import InformeVenta from "../informes/ventas/Base";
import InfoCircleOutlined from "@ant-design/icons/InfoCircleOutlined";

const TablaVentasPorProducto = ({ idproducto, meses }) => {
  const [dataSourceTable, setDataSourceTable] = useState([]);
  const [popupImprimirOpen, setPoupImprimirOpen] = useState(false);
  const [selectedVentaId, setSelectedVentaId] = useState(-1);
  const columnsTable = [
    {
      title: "Nro.",
      dataIndex: "idventa",
      width: "100px",
      render: (_, { idventa }) => (
        <Button
          style={{ fontWeight: "600" }}
          type="link"
          onClick={(_) => {
            setSelectedVentaId(idventa);
            setPoupImprimirOpen(true);
          }}
        >
          <InfoCircleOutlined /> {idventa}{" "}
        </Button>
      ),
    },
    { title: "Cantidad", dataIndex: "cantidad", width: "100px" },
    { title: "Cliente", dataIndex: "nombre_cliente" },
  ];

  const load = () => {
    //alert(JSON.stringify({ cantMeses: meses, idcodigo: idproducto }))
    post_method(
      post.obtener_ventas_por_tipo_producto,
      { cantMeses: meses, idcodigo: idproducto },
      (response) => {
        setDataSourceTable(response.data);
      },
    );
  };

  useEffect(() => {
    load();
  }, [idproducto, meses]);

  return (
    <>
      <Table
        size="small"
        style={{ width: "700px" }}
        scroll={{ y: "300px" }}
        dataSource={dataSourceTable}
        columns={columnsTable}
      />
      <Modal
        open={popupImprimirOpen}
        onCancel={(_) => {
          setPoupImprimirOpen(false);
        }}
        destroyOnClose
        width={"1000px"}
        title=""
        footer={null}
      >
        <PrinterWrapper>
          <InformeVenta idventa={selectedVentaId} />
        </PrinterWrapper>
      </Modal>
    </>
  );
};

export default TablaVentasPorProducto;
