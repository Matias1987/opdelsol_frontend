import { get } from "@/src/urls";
import { Button, Card, Modal, Table } from "antd";
import { use, useEffect, useState } from "react";
import Transferencia from "./transferencia";
import DetalleFondoFijo from "./detalle_ff";

const ListaFondoFijos = (props) => {
  const [data, setData] = useState([]);
  const [popupTOpen, setPopupTOpen] = useState(false);
  const [popupDetalleOpen, setPopupDetalleOpen] = useState(false);
  const [selectedFF, setSelectedFF] = useState(null);
  const load = () => {
    fetch(get.lista_ff)
      .then((response) => response.json())
      .then((response) => {
        //alert(JSON.stringify(response));
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Card 
      size="small" 
      title="Lista de Fondos Fijos"
      extra={<Button type="primary" onClick={() => setPopupTOpen(true)}>Transferir a Fondo Fijo</Button>}
      >
        <Table
          size="small"
          pagination={false}
          scroll={{ y: "240px" }}
          dataSource={data}
          columns={[
            { title: "ID", dataIndex: "idcaja" },
            { title: "Sucursal", dataIndex: "sucursal" },
            {
              render: (_, obj) => (
                <>
                  <Button
                    type="link"
                    onClick={() => {
                      setSelectedFF(obj);
                      setPopupDetalleOpen(true);
                    }}
                  >
                    Ver Detalles
                  </Button>
                  
                </>
              ),
            },
          ]}
        />
      </Card>
      <Modal
        title="Transferir a Fondo Fijo"
        open={popupTOpen}
        onCancel={() => setPopupTOpen(false)}
        footer={null}
      >
        <Transferencia idCajaOrigen={selectedFF?.idcaja} aFondoFijo={true} callback={load} />
      </Modal>
      <Modal
        width={"800px"}
        title=" "
        open={popupDetalleOpen}
        onCancel={() => setPopupDetalleOpen(false)}
        footer={null}
      >
        <DetalleFondoFijo idcaja={selectedFF?.idcaja} nombre={selectedFF?.sucursal} />
      </Modal>
    </>
  );
};
export default ListaFondoFijos;
