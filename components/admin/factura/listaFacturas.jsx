import { get, post } from "@/src/urls";
import FacturaForm from "@/components/forms/FacturaForm";
import DetalleFactura from "@/components/forms/deposito/DetalleFactura";

import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  Select,
  Card,
  DatePicker,
  Checkbox,
} from "antd";
import { useState, useEffect } from "react";
import { CloseOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import ExportToCSV from "@/components/ExportToCSV";
import ListaProveedores from "../proveedor/ListaProveedores";
import { post_method } from "@/src/helpers/post_helper";
import AgregarFacturaV2 from "./agregarFacturaV2";
import AgregarFacturaV3 from "./agregarFacturaV3";
/**
 *
 * @param readOnly
 * @param proveedoresList array
 */
const ListaFacturas = (props) => {
  const [readOnly, setReadOnly] = useState(false);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [selectedProveedor, setSelectedProveedor] = useState(-1);
  const [selectedFactura, setSelectedFactura] = useState(-1);
  const [popupDetalleFacturaOpen, setPopupDetalleFacturaOpen] = useState(false);
  const [popupProvOpen, setPopupProvOpen] = useState(false);
  const [selectedProvIds, setSelectedProvIds] = useState([]);
  const url_for_facturas = post.obtener_facturas_filtros; //get.lista_facturas;
  const [tableData, setTableData] = useState([]);
  const [verFacturasChecked, setVerFacturasChecked] = useState(true);
  const [verRemitosChecked, setVerRemitosChecked] = useState(false);
  const [filtroFecha, setFiltroFecha] = useState({ desde: "", hasta: "" });
  const [popupAddFacturaOpen, setPopupAddFacturaOpen] = useState(false);
  const [popupAddRemitoOpen, setPopupAddRemitoOpen] = useState(false);
  const columns = [
    { title: <div style={{ textAlign: "center" }}>Nro.</div>, dataIndex: "numero", key: "numero", sorter: (a, b) => a.numero - b.numero },
    { title: "Fecha", dataIndex: "fecha", key: "fecha", sorter: (a, b) => new Date(a.fecha) - new Date(b.fecha) },
    { title: "Proveedor", dataIndex: "proveedor", key: "proveedor", sorter: (a, b) => a.proveedor.localeCompare(b.proveedor) },
    { title: "Cantidad", dataIndex: "cantidad", key: "cantidad", sorter: (a, b) => a.cantidad - b.cantidad, hidden:true },
    {
      sorter: (a, b) => a.monto - b.monto,
      title: <div style={{ textAlign: "right" }}>Monto</div>,
      dataIndex: "monto",
      key: "monto",
      render: (_, { monto }) => (
        <div style={{ textAlign: "right", width: "100%" }}>$&nbsp;{monto}</div>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "idfactura",
      key: "acciones",
      render: (_, { idfactura }) => {
        return (
          <>
            <Button
              onClick={() => {
                setSelectedFactura(idfactura);
                setPopupDetalleFacturaOpen(true);
              }}
            >
              <InfoOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const _parse = (str) => ({
    dia: str.substring(9, 11),
    mes: str.substring(6, 8),
    anio: str.substring(1, 5),
  });

  const load = () => {
    //alert(url_for_facturas)
    fetch(get.lista_proveedores)
      .then((r) => r.json())
      .then((r) => {
        setProveedores([
          ...[{ value: -1, label: "Todos" }],
          ...r.data.map((r) => ({ value: r.idproveedor, label: r.nombre })),
        ]);
      });

    const data = {
      ver_facturas: verFacturasChecked ? 1 : 0,
      ver_remitos: verRemitosChecked ? 1 : 0,
      idprovs: selectedProvIds.map((p) => p.idproveedor),
      desde: filtroFecha.desde,
      hasta: filtroFecha.hasta,
    };
    //alert(JSON.stringify(data))
    post_method(url_for_facturas, data, (resp) => {
      //alert(JSON.stringify(resp))
      setTableData(
        resp.data.map((r) => ({
          idfactura: r.idfactura,
          idproveedor: r.proveedor_idproveedor,
          numero: r.numero,
          proveedor: r.proveedor,
          cantidad: r.cantidad,
          monto: r.monto,
          fecha: r.fecha_f, //<---TODO
        }))
      );
    });

    /*fetch(url_for_facturas)
        .then(response=>response.json())
        .then((response)=>{
            
            setTableData(
                response.data.map(r=>
                    (
                        {
                            idfactura: r.idfactura,
                            idproveedor: r.proveedor_idproveedor,
                            numero: r.numero,
                            proveedor: r.proveedor,
                            cantidad: r.cantidad,
                            monto: r.monto,
                            fecha: r.fecha_formated, //<---TODO
                        
                        }
                    )
                )
            )

        })*/
  };
  useEffect(() => {
    setReadOnly(typeof props.readOnly === "undefined" ? false : props.readOnly);

    load();
  }, [change]);

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const onOk = (d) => {
    setOpen(false);
    setChange(!change);
  };

  const header = () => (
    <>
      <Row>
        <Col span={24}>
          Peri&oacute;do:&nbsp;&nbsp;
          <DatePicker.RangePicker
            onChange={(val, dateString) => {
              if (val == null) {
                setFiltroFecha({ desde: "", hasta: "" });
                return;
              }

              let from = _parse(JSON.stringify(val[0]));
              let to = _parse(JSON.stringify(val[1]));

              setFiltroFecha({
                desde: `${from.anio}-${from.mes}-${from.dia}`,
                hasta: `${to.anio}-${to.mes}-${to.dia}`,
              });
            }}
          />
          &nbsp;&nbsp;
          {selectedProvIds.length > 0 ? (
            <>
              <div
                style={{
                  backgroundColor: "lightyellow",
                  display: "inline-block",
                  fontSize: ".85em",
                  maxWidth: "400px",
                  maxHeight: "6em",
                  overflow: "hidden",
                }}
              >
                <Button
                  danger
                  size="small"
                  type="link"
                  onClick={() => {
                    setSelectedProvIds([]);
                  }}
                >
                  <CloseOutlined />
                </Button>
                {selectedProvIds.map((p) => `${p.nombre}, `)}
              </div>
              ...{" "}
            </>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                setPopupProvOpen(true);
              }}
            >
              Filtrar por Proveedores
            </Button>
          )}
          &nbsp;&nbsp;
          <Checkbox
            checked={verFacturasChecked}
            onChange={(e) => {
              setVerFacturasChecked(!verFacturasChecked);
            }}
          >
            <span>Facturas</span>
          </Checkbox>
          <Checkbox
            checked={verRemitosChecked}
            onChange={(e) => {
              setVerRemitosChecked(!verRemitosChecked);
            }}
          >
            <span>Remitos</span>
          </Checkbox>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => {
              setChange(!change);
            }}
          >
            Aplicar Filtros
          </Button>
          &nbsp;&nbsp;
          <ExportToCSV
            parseFnt={() => {
              let csv = "NRO, FECHA, PROVEEDOR, MONTO\r\n";

              tableData.forEach((f) => {
                csv += `${f.numero},${f.fecha},${f.proveedor},${f.monto}\r\n`;
              });

              return csv;
            }}
          />
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Card
        extra={<>
        <Button style={{borderRadius:"16px"}} type="primary" size="small" onClick={_=>{setPopupAddFacturaOpen(true)}}><PlusOutlined /> Agregar Factura</Button>
        &nbsp;&nbsp;
        <Button style={{borderRadius:"16px"}} type="primary" size="small" onClick={_=>{setPopupAddRemitoOpen(true)}}><PlusOutlined /> Agregar Remito</Button>
        </>}
        size="small"
        title={
          <>
            Lista de Facturas y/o Remitos&nbsp;&nbsp;
            {/*<Button disabled={readOnly} type="default"  style={{color:"blue"}}  size="small"  onClick={openPopup}><PlusOutlined />Agregar</Button>*/}
          </>
        }
      >
        {/*<Row>
                <Col span={4} style={{textAlign:"right", paddingTop:".3em"}}>   
                    Proveedor:
                </Col>
                <Col span={20} >
                    <Select options={proveedores} style={{width:"50%"}} onChange={(v)=>setSelectedProveedor(v)}/>
                </Col>
            </Row>*/}
        <Row>
          <Col span={24}>
            <Table
              scroll={{ y: "600px" }}
              pagination={false}
              title={header}
              size="small"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              columns={columns}
              dataSource={
                selectedProveedor < 0
                  ? tableData
                  : tableData.filter((f) => f.idproveedor == selectedProveedor)
              }
            />
          </Col>
        </Row>
      </Card>

      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ children: "CANCELAR" }}
        width={"80%"}
        title={"Agregar Factura"}
        open={open}
        onOk={closePopup}
        onCancel={closePopup}
        okText="CERRAR"
      >
        <FacturaForm action="ADD" callback={onOk} />
      </Modal>

      <Modal
        destroyOnClose
        footer={null}
        width={"80%"}
        open={popupDetalleFacturaOpen}
        onCancel={() => {
          setPopupDetalleFacturaOpen(false);
        }}
      >
        <DetalleFactura idFactura={selectedFactura} />
      </Modal>

      <Modal
        destroyOnClose
        open={popupProvOpen}
        footer={[
          <Button
            block
            type="primary"
            key={"1"}
            onClick={() => {
              setPopupProvOpen(false);
            }}
          >
            Aceptar
          </Button>,
        ]}
        width={"800px"}
        onCancel={() => {
          setPopupProvOpen(false);
        }}
      >
        <ListaProveedores
          onProvSelected={(v) => {
            setSelectedProvIds(v);
          }}
        />
      </Modal>

      <Modal
        destroyOnClose
        width={"70%"}
        open={popupAddFacturaOpen}
        title="Agregar Factura"
        footer={null}
        onCancel={() => {
          setPopupAddFacturaOpen(false);
        }}
      >
        <AgregarFacturaV3
          callback={() => {
            setChange(!change);
            setPopupAddFacturaOpen(false);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        width={"70%"}
        open={popupAddRemitoOpen}
        title="Agregar Remito"
        footer={null}
        onCancel={() => {
          setPopupAddRemitoOpen(false);
        }}
      >
        <AgregarFacturaV3
          esremito={true}
          callback={() => {
            setChange(!change);
            setPopupAddRemitoOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ListaFacturas;
