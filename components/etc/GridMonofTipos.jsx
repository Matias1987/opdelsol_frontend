import { Col, DatePicker, Modal, Row, Tabs } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DetalleCodigo from "../forms/deposito/DetalleCodigo";
import EditarStockIndiv from "../forms/deposito/EditarStockIndiv";
import CargaStockIdeal from "../forms/deposito/cargaStockIdeal";
import EditarCantidadCritica from "../forms/deposito/editarCantidadCritica";
import DetalleConsumoCodigo from "../informes/taller/detalle_consumo_codigo";
import GridMonof from "./GridMonof";

const GridMonofTipos = (props) => {
  const { onHasToUpdate } = props;
  const dateNow = new Date();
  const [month, setMonth] = useState(dateNow.getMonth() + 1);
  const [year, setYear] = useState(dateNow.getFullYear());

  const [modalEditarStockOpen, setModalEditarStockOpen] = useState(false);
  const [modalEditarIdealOpen, setModalEditarIdealOpen] = useState(false);
  const [modalEditarPedidoOpen, setModalEditarPedidoOpen] = useState(false);
  const [modalEditarCriticoOpen, setModalEditarCriticoOpen] = useState(false);
  const [modalDetalleOpen, setModalDetalleOpen] = useState(false);
  const [modalDetalleConsumoOpen, setModalDetalleConsumoOpen] = useState(false);
  const [recordId, setRecordId] = useState({});
  const [reload, setReload] = useState(false);
  const modal_width = "800px";

  const onCellClickIdeal = (index, idcodigo) => {
    setRecordId(idcodigo);
    switch (index) {
      case "1":
        setModalDetalleOpen(true);
        break;
      case "2":
        setModalEditarIdealOpen(true);
        break;
    }
  };

  const onCellClickStock = (index, idcodigo) => {
    setRecordId(idcodigo);
    switch (index) {
      case "1":
        setModalDetalleOpen(true);
        break;
      case "2":
        setModalEditarStockOpen(true);
        break;
    }
  };

  const onCellClickUso = (index, idcodigo) => {
    setRecordId(idcodigo);
    switch (index) {
      case "1":
        setModalDetalleConsumoOpen(true);
        break;
    }
  };

  const onCellClickPedido = (index, idcodigo) => {
    setRecordId(idcodigo);
    switch (index) {
      case "1":
        setModalDetalleOpen(true);
        break;
      case "2":
        setModalEditarPedidoOpen(true);
        break;
    }
  };

  const onCellClickCritico = (index, idcodigo) => {
    setRecordId(idcodigo);
    switch (index) {
      case "1":
        setModalDetalleOpen(true);
        break;
      case "2":
        setModalEditarCriticoOpen(true);
        break;
    }
  };

  const items = [
    {
      key: "1",

      label: "Stock",
      children: (
        <>
          <GridMonof
            {...props}
            gridType="stock"
            onCellClick={onCellClickStock}
          />
        </>
      ),
    },
    {
      key: "0",
      disabled: true,
      label: "Consumo",
      children: (
        <>
          <Row style={{ paddingTop: "12px" }}>
            <Col span={24}>
              <DatePicker
                prefix="Periodo: "
                defaultValue={dayjs()}
                picker="month"
                format="MM/YYYY"
                onChange={onChangeMonth}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: "16px" }}>
            <Col span={24}>
              <GridMonof
                {...props}
                gridType="uso"
                mes={month}
                anio={year}
                key={month + year}
                onCellClick={onCellClickUso}
                editarDisabled
              />
            </Col>
          </Row>
        </>
      ),
    },

    {
      key: "2",
      disabled: true,
      label: "Ideal",
      children: (
        <>
          <GridMonof
            {...props}
            gridType="ideal"
            onCellClick={onCellClickIdeal}
          />
        </>
      ),
    },

    {
      key: "4",
      disabled: true,
      label: "Critico",
      children: (
        <>
          <GridMonof
            {...props}
            gridType="critico"
            onCellClick={onCellClickCritico}
          />
        </>
      ),
    },
    {
      key: "3",
      disabled: true,
      label: "Dif.",
      children: (
        <>
          <GridMonof
            {...props}
            gridType="pedido"
            onCellClick={onCellClickPedido}
          />
        </>
      ),
    },
  ];

  function onChangeMonth(date, dateString) {
    //alert(dateString);
    const parts = dateString.split("/");
    setMonth(parseInt(parts[0], 10));
    setYear(parseInt(parts[1], 10));
  }

  function onChange(key) {
    console.log(key);
  }

  useEffect(() => {
    // alert(JSON.stringify(props.codigosSrc))
  }, [month, year]);

  return (
    <>
      <Tabs
        tabBarStyle={{ marginBottom: 0, borderBottom: "1px solid #e60000ff" }} // Styles for the entire bar
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        tabPosition="top"
        type="card"
      />
      <Modal
        open={modalEditarCriticoOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Editar"
        onCancel={(_) => {
          setModalEditarCriticoOpen(false);
        }}
      >
        <EditarCantidadCritica
          idcodigo={recordId}
          callback={(_) => {
            setModalEditarCriticoOpen(false);
            onHasToUpdate?.();
          }}
        />
      </Modal>
      <Modal
        open={modalEditarIdealOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Editar Ideal"
        onCancel={(_) => {
          setModalEditarIdealOpen(false);
        }}
      >
        <CargaStockIdeal
          idcodigo={recordId}
          callback={(_) => {
            setModalEditarIdealOpen(false);
            onHasToUpdate?.();
          }}
        />
      </Modal>
      <Modal
        open={modalEditarPedidoOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Editar Pedido"
        onCancel={(_) => {
          setModalEditarPedidoOpen(false);
        }}
      ></Modal>
      <Modal
        open={modalEditarStockOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Editar Stock"
        onCancel={(_) => {
          setModalEditarStockOpen(false);
        }}
      >
        <EditarStockIndiv
          idcodigo={recordId}
          idsucursal={props.idsucursal}
          callback={(_) => {
            onHasToUpdate?.();
            setModalEditarStockOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={modalDetalleOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Detalle"
        onCancel={(_) => {
          setModalDetalleOpen(false);
        }}
      >
        <DetalleCodigo idcodigo={recordId} />
      </Modal>
      <Modal
        open={modalDetalleConsumoOpen}
        width={modal_width}
        destroyOnClose
        footer={null}
        title="Detalle"
        onCancel={(_) => {
          setModalDetalleConsumoOpen(false);
        }}
      >
        <DetalleConsumoCodigo
          idcodigo={recordId}
          codigo="i dunno..."
          fecha_desde={"1970-01-01"}
          fecha_hasta={"2026-01-01"}
        />
      </Modal>
    </>
  );
};

export default GridMonofTipos;
