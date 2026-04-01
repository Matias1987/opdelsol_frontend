import FichaProveedor from "@/components/admin/proveedor/fichaProveedor";
import ProveedorForm from "@/components/forms/ProveedorForm";
import { get, post } from "@/src/urls";
import { PlusOutlined } from "@ant-design/icons";

import { Table, Button, Modal, Row, Col, Card, Checkbox, Input } from "antd";
import { useState, useEffect } from "react";
import ListaFacturas from "../factura/listaFacturas";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { formatFloat } from "@/src/helpers/formatters";
import FichaProveedorV2 from "./fichaProveedorV2";

const ListaProveedores = (props) => {
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);

  const [popupFichaOpen, setPopupFichaOpen] = useState(false);
  const [idproveedor, setIdProveedor] = useState(-1);
  const [loading, setLoading] = useState(false);

  const url_for_proveedores = post.saldo_proveedores_lista; //get.lista_proveedores;
  const [tableData, setTableData] = useState([]);

  const [listaFacturasOpen, setListaFacturasOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const columns = [
    {
      render: (_, { idproveedor, checked }) => (
        <Checkbox
          checked={checked}
          onChange={(e) => {
            const temp = tableData.map((p) =>
              p.idproveedor == idproveedor ? { ...p, checked: !p.checked } : p
            );

            setTableData(temp);

            props?.onProvSelected?.(temp.filter((p) => p.checked));
          }}
        />
      ),
    },
    { title: "Nro.", dataIndex: "idproveedor", key: "idproveedor", sorter: (a, b) => a.idproveedor - b.idproveedor },
    { title: "Nombre", dataIndex: "nombre", key: "nombre", sorter: (a, b) => a.nombre.localeCompare(b.nombre) },
    { title: "C.U.I.T.", dataIndex: "cuit", key: "cuit", sorter: (a, b) => a.cuit.localeCompare(b.cuit) },
    {
      sorter: (a, b) => +a.saldo_ars - +b.saldo_ars,
      title: <div style={{ textAlign: "right" }}>Saldo ARS</div>,
      dataIndex: "saldo_ars",
      key: "saldo_ars",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          {formatFloat(record.saldo_ars)}
        </div>
      ),
    },
    {
      sorter: (a, b) => +a.saldo_usd - +b.saldo_usd,
      title: <div style={{ textAlign: "right" }}>Saldo USD</div>,
      dataIndex: "saldo_usd",
      key: "saldo_usd",
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          {formatFloat(record.saldo_usd)}
        </div>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "idproveedor",
      key: "acciones",
      render: (idproveedor) => {
        return !globals.esUsuarioAdminProv() && !globals.esUsuarioAdmin() ? (
          <></>
        ) : (
          <>
            <Button
              onClick={() => {
                setIdProveedor(idproveedor);
                setPopupFichaOpen(true);
              }}
            >
              Ficha
            </Button>
          </>
        );
      },
    },
  ];

  const load = () => {
    /*fetch(url_for_proveedores)
    .then(response=>response.json())
    .then((response)=>{

        setTableData(
            response.data.map((r)=>(
                {
                    idproveedor: r.idproveedor,
                    nombre: r.nombre,
                    cuit: r.cuit,
                    checked: false,
                }
                )
            )
        )

    })*/
   setLoading(true);
    post_method(url_for_proveedores, {}, (response) => {
      setTableData(
        response.data.map((r) => ({
          idproveedor: r.idproveedor,
          nombre: r.nombre,
          cuit: r.cuit,
          saldo_ars: r.saldo_ars,
          saldo_usd: r.saldo_usd,
          checked: false,
        }))
      );
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, [change]);

  const openPopup = () => {
    setOpen(true);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const onOk = (p) => {
    setOpen(false);
    setChange(!change);
  };

  const header = () => (
    <>
      <Row>
        <Col span={24}>
          <Input
            placeholder="Buscar por Nombre..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            allowClear
          />
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <Card
        size="small"
        title={
          <>
            Lista de Proveedores&nbsp;&nbsp;&nbsp;
            <Button
              type="default"
              style={{ color: "blue" }}
              size="small"
              onClick={openPopup}
            >
              <PlusOutlined /> Agregar
            </Button>
          </>
        }
      >
        <Row>
          <Col span={24}>
            <Table
              loading={loading}
              title={header}
              size="small"
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              columns={columns}
              dataSource={tableData.filter((d) =>
                searchValue.trim().length < 1
                  ? true
                  : (d.nombre || "")
                      .toUpperCase()
                      .includes(searchValue.toUpperCase())
              )}
            />
          </Col>
        </Row>
      </Card>

      <Modal
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ children: "CANCELAR" }}
        width={"80%"}
        title={"Agregar Proveedor"}
        open={open}
        onOk={closePopup}
        onCancel={closePopup}
        okText="CERRAR"
      >
        <ProveedorForm action="ADD" callback={onOk} />
      </Modal>

      {/** is this temporary? */}
      <Modal
        closable={false}
        footer={null}
        width={"90%"}
        open={popupFichaOpen}
        onCancel={() => {
          setPopupFichaOpen(false);
        }}
        destroyOnClose
      >
        <FichaProveedorV2
          idproveedor={idproveedor}
          callback={() => {
            setChange(!change);
            setPopupFichaOpen(false);
          }}
        />
      </Modal>
      <Modal
        destroyOnClose
        title="Listado"
        width={"800px"}
        open={listaFacturasOpen}
        onCancel={() => {
          setListaFacturasOpen(false);
        }}
        footer={null}
      >
        <ListaFacturas readOnly={true} />
      </Modal>
    </>
  );
};

export default ListaProveedores;
