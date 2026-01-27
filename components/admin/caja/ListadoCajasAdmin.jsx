import CustomCalendar from "@/components/etc/CustomCalendar";
import ExportToExcel2 from "@/components/etc/ExportToExcel2";
import InformeCajaV2 from "@/components/informes/caja/InformeCajaV3";
import { formatFloat } from "@/src/helpers/formatters";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Card, Modal, Select, Divider } from "antd";
import { useEffect, useState } from "react";

const ListadoCajasAdmin = (props) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Add 1 because getMonth() is 0-indexed
  const day = currentDate.getDate();
  const [reload, setReload] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCaja, setSelectedCaja] = useState(null);
  const [selectedDate, setSelectedDate] = useState(`${year}-${month}-${day}`);
  const [detalleCajaOpen, setDetalleCajaOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const columns = [
    { title: "Sucursal", dataIndex: "sucursal", width: "130px" },

    { title: "Estado", dataIndex: "estado", width: "80px" },
    { width: "120px" , title: <div style={{textAlign:"right"}}>Monto</div>, dataIndex: "saldo", render: (_,{saldo}) => <div style={{textAlign:"right"}}>$&nbsp;{formatFloat(saldo)}</div> },
    {
      width: "250px",
      title: "Acciones",
      render: (_, record) => (
        <>
          <Button
            size="small"
            type="link"
            onClick={(_) => {
              setSelectedCaja(record);
              setDetalleCajaOpen(true);
            }}
          >
            <InfoOutlined /> Detalle
          </Button>
          <Button
            danger
            size="small"
            type="link"
            onClick={(_) => {
              setSelectedCaja(record);
              setPopupOpen(true);
            }}
          >
            <EditOutlined /> Cambiar Estado
          </Button>
        </>
      ),
    },
  ];
  const [cajas, setCajas] = useState([]);

  const load = () => {
    post_method(
      post.obtener_cajas_fecha,
      { fecha: selectedDate },
      (response) => {
        //alert(JSON.stringify(response.data));
        if (response.data.status == "error") return;
        setCajas(response.data || []);
      }
    );
  };

  const cambiarEstado = (nuevoEstado) => {
    post_method(
      post.cambiar_estado_caja,
      { idcaja: selectedCaja?.idcaja, estado: nuevoEstado },
      (response) => {
        if (response.data.status == "error") return;
        setReload(!reload);
      }
    );
  };

  useEffect(() => {
    load();
  }, [reload]);

  return (
    <>
      <Card title="Listado de Caja" size="small">
        <Row gutter={16}>
          <Col style={{ width: "300px", minWidth: "200px" }}>
            <CustomCalendar
              onSelect={(date) => {
                setCajas([])
                setSelectedDate(date.format("YYYY-MM-DD"));
                setReload(!reload);
              }}
            />
          </Col>
          <Col style={{width: "620px", minWidth:"620px" }}>
            <Table
              size="small"
              dataSource={cajas}
              columns={columns}
              scroll={{ y: "500px" }}
              pagination={false}
              footer={_=><>
              <ExportToExcel2 
                fileName={`Cajas_${selectedDate}`}
                sheets={[
                {sheet_name:"Cajas", data:cajas, columns:columns, footer:"", columns:[
                  {header:"Fecha", width:"30", key:"fecha_f"},
                  {header:"Sucursal", width:"30", key:"sucursal"},
                  
                  {header:"Monto", width:"30", key:"saldo"}
                ]}
              ]} /> </>}
            />
          </Col>
        </Row>
      </Card>
      <Modal
        destroyOnClose
        open={popupOpen}
        title="Cambiar Estado"
        footer={null}
        onCancel={(_) => {
          setPopupOpen(false);
        }}
        width={"400px"}
      >
        <>
          <Row style={{ padding: "6px" }}>
            <Col span={24}>
              Caja: {selectedCaja?.sucursal} {selectedCaja?.fecha}
            </Col>
          </Row>
          <Row style={{ padding: "6px" }}>
            <Col span={24}>
              <Select
                value={selectedEstado}
                onChange={(e) => {
                  setSelectedEstado(e);
                }}
                prefix="Estado: "
                style={{ width: "300px" }}
                options={[
                  { value: "CERRADO", label: "CERRADO" },
                  { value: "ABIERTA", label: "ABIERTA" },
                ]}
              />
            </Col>
          </Row>
          <Divider />
          <Row style={{ padding: "6px" }}>
            <Col span={24} style={{display:"flex", justifyContent:"flex-end"}}>
              <Button
                size="middle"
                
                type="primary"
                onClick={() => {
                  if(!selectedEstado)
                  {
                    alert("Seleccione un estado");
                    return;
                  }
                  cambiarEstado(selectedEstado);
                  setPopupOpen(false);
                }}
              >
                Aplicar
              </Button>
            </Col>
          </Row>
        </>
      </Modal>
      <Modal
        destroyOnClose
        open={detalleCajaOpen}
        title="Detalle de Caja"
        footer={null}
        onCancel={(_) => {
          setDetalleCajaOpen(false);
        }}
        width={"100%"}
      >
        <InformeCajaV2 idcaja={selectedCaja?.idcaja} />
      </Modal>
    </>
  );
};

export default ListadoCajasAdmin;
