import { get } from "@/src/urls";
import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";

const EgresoModo = ({callback}) => {
  const [egresoModos, setEgresoModos] = useState([]);
  const [cuentasBancarias, setCuentasBancarias] = useState([]);
  const [localId, setLocalId] = useState(0);
  const [modos, setModos] = useState([
    { value: "efvo", label: "Efectivo" },
    { value: "tb", label: "Transferencia Bancaria" },
    { value: "mp", label: "Mercado Pago" },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModo, setSelectedModo] = useState(null);
  const [selectedCuenta, setSelectedCuenta] = useState(null);
  const [monto, setMonto] = useState(0);
  const [total, setTotal] = useState(0);

  const loadCuentasBancarias = _=>{
    //todo: cargar cuentas bancarias desde el backend
    fetch(get.obtener_cuenta_bancarias)
      .then(response => response.json())
      .then(response => {
        alert(JSON.stringify(response));
        setCuentasBancarias(response.data.map(cb => ({ value: cb.id_cuenta_bancaria, label: cb.alias, idCuenta: cb.id_cuenta_bancaria })));
      })
      .catch(error => {
        console.error("Error al cargar cuentas bancarias:", error);
      });
  }

  const calcularTotal = (src) => {
    let _total=0;
    src.forEach(m=>{
      _total += m.monto;
    })
    setTotal(_total);
  }

  const onAgregarClick = _=>{
    if(0==monto){
      alert("Monto igual a 0");
      return;
    }
    if("tb"==selectedModo){
      if(null==selectedCuenta)
      {
        alert("Cuenta no seleccionada...")
        return;
      }
    }
    setLocalId(localId+1);

    const modo = {
      monto: monto,
      modo: selectedModo,
      selectedCuenta: selectedCuenta ? (cuentasBancarias.find(cb=>cb.idCuenta==selectedCuenta)[0]||null) : null,
      localId: localId,
    }
    
    const resArr = [...egresoModos, modo];

    calcularTotal(resArr);

    setEgresoModos(_=>resArr);

    callback?.(resArr);
    
  }
  useEffect(()=>{
    loadCuentasBancarias();
  },[])

  const rowStyle = {
    padding: "6px",
  };
  return (
    <>

      <Row style={rowStyle}>
        <Col span={24}>
          <Table
            title={_=><span style={{fontWeight:"600"}}>Detalles</span>}
            pagination={false}
            scroll={{y:"300px"}}
            footer={_=><span style={{fontStyle:"italic", fontSize:".9em", color:"#8d8b8b"}}>Total: {total}</span>}
            size="small"
            dataSource={egresoModos}
            columns={[
              { title: "Detalle", dataIndex: "modo" },
              { title: "Monto", dataIndex: "monto" },
              {
                title: "Acciones",
                render: (text, record) => (
                  <Button
                    type="link"
                    onClick={() =>{
                      const _temp = egresoModos.filter(em=>em.localId!=record.localId);
                      calcularTotal(_temp);
                      setEgresoModos(_temp);
                    }}
                  >
                    Eliminar
                  </Button>
                ),
              },
            ]}
          />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col span={24}>
          <Button type="dashed" danger onClick={() => setModalOpen(true)} block>
            <PlusCircleTwoTone />Agregar Modo de Pago
          </Button>
        </Col>
      </Row>
      <Modal
        destroyOnClose
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        title="Agregar Modo de Egreso"
      >
        <Row style={rowStyle}>
          <Col span={24}>
            <Select style={{ width: "100%" }} prefix="Modo:" options={modos} value={selectedModo} onChange={v=>{setSelectedModo(v)}} />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={24}>
            <Select
              disabled={selectedModo!="tb"}
              style={{ width: "100%" }}
              prefix="Cuenta:"
              options={cuentasBancarias}
              onChange={e=>{setSelectedCuenta(e)}}
              value={selectedCuenta}
            />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={24}>
            <InputNumber prefix="Monto:" style={{ width: "100%" }} value={monto} onChange={val=>{setMonto(parseFloat(val||"0"))}} />
          </Col>
        </Row>
        <Row style={rowStyle}>
          <Col span={24}>
            <Button disabled={0==monto || ("tb"==selectedModo && null==selectedCuenta) || !selectedModo} type="primary" block onClick={onAgregarClick}>
              Agregar
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default EgresoModo;
