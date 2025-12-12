import { Button, Col, Row, Table, Modal } from "antd";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useEffect, useState } from "react";
import { InfoCircleTwoTone } from "@ant-design/icons";
import InformeVentaV2 from "../ventas/InformeVentaV2";
import InformeVenta from "../ventas/Base";

const DetalleConsumoCodigo = ({
  idcodigo,
  codigo,
  fecha_desde,
  fecha_hasta,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { title: "Nro Venta", dataIndex: "idventa", key: "idventa", render:(_,{idventa})=><><Button type="link" onClick={_=>{setSelectedId(idventa); setModalOpen(true)}}> {idventa} <InfoCircleTwoTone /> </Button></> },
    { title: "Sucursal", dataIndex: "sucursal", key: "sucursal" },
    { title: "Fecha Retiro", dataIndex: "fecha_retiro", key: "fecha_retiro" },
    { title: "Código", dataIndex: "codigo" },
  ];
  const load = () => {
    //alert(JSON.stringify({ fk_codigo: idcodigo, fecha_desde: fecha_desde, fecha_hasta: fecha_hasta }));
    setLoading(true);
    post_method(
      post.detalle_consumo_codigo,
      { fk_codigo: idcodigo, fecha_desde, fecha_hasta },
      (response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    load();
  }, [idcodigo]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            title={(_) => <>Listado consumo</>}
            dataSource={data}
            columns={columns}
            loading={loading}
            scroll={{ y: "400px" }}
            pagination={false}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>Cant. Total: {data.length}</Col>
      </Row>
      <Modal open={modalOpen} onCancel={_=>{setModalOpen(false)}} destroyOnClose width={"1100px"} footer={null}>
        <InformeVenta idventa={selectedId} />
      </Modal>
    </>
  );
};

export default DetalleConsumoCodigo;
