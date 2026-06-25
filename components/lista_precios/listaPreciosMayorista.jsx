import { useEffect, useState } from "react";
import ListaPreciosCodigos from "./listaPreciosCodigos";
import { Button, Col, Divider, Modal, Row, Table } from "antd";
import SubGrupoFormV3 from "../forms/deposito/SubgrupoFormV3";
import CodeExample from "../etc/codeExample";
import { EditFilled } from "@ant-design/icons";
import { get } from "@/src/urls";
import { formatFloat } from "@/src/helpers/formatters";

const ListaPreciosMayorista = (_) => {
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [selectedSubgrupo, setSelectedSubgrupo] = useState(-1);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Nombre", render:(_,{nombre_corto})=><>{nombre_corto}</> },
    { title: <div style={{textAlign:"right"}}>Precio</div> , render:(_,{precio_mayorista})=><div style={{textAlign:"right"}}>$ { formatFloat( precio_mayorista)}</div> },
    {
      title: "Acciones",
      render: (_, record) => (
        <>
          <Button
            onClick={(_) => {
              setSelectedSubgrupo(record);
              setPopupDetalleOpen(true)
            }}
          >
            <EditFilled />
          </Button>
        </>
      ),
    },
  ];

  const load = () =>{
    setLoading(true);
    fetch(get.listado_subgrupos_filtros + `-1/-1/-1/${19}`)
      .then((r) => r.json())
      .then((response) => {
        setData(
          response.data.map((row) => ({
            idsubgrupo: row.idsubgrupo,
            nombre_corto: row.nombre_corto,
            nombre_largo: row.nombre_largo,
            multiplicador: row.multiplicador,
            idsubgrupo: row.idsubgrupo,
            ruta: row.ruta,
            precio_mayorista: row.precio_defecto_mayorista,
            checked: false,
          }))
        );
        setLoading(false);
      })
      .catch((e) => {
        "error";
      });
  }

  useEffect((_) => {load()}, [reload]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            scroll={{ y: 400 }}
            size="small"
          />
        </Col>
      </Row>

      <Modal
        destroyOnClose
        open={popupDetalleOpen}
        onCancel={() => {
          setPopupDetalleOpen(false);
        }}
        footer={null}
        title="  "
        width={"950px"}
      >
        <div>
          <SubGrupoFormV3
            mostrarPrecioMayorista={true}
            mostrarPrecioPar={false}
            mostrarPrecioCaja={false}
            callback={() => {
              setPopupDetalleOpen(false);
              setReload(!reload);
            }}
            readOnly={false}
            idsubgrupo={selectedSubgrupo.idsubgrupo}
            title={"Detalle Subgrupo " + selectedSubgrupo.nombre_corto}
          />
  
        </div>
      </Modal>
    </>
  );
};

export default ListaPreciosMayorista;
