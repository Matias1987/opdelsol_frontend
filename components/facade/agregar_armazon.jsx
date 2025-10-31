import { Button, Card, Col, Input, Row, Select, Table, Modal } from "antd";
import SelectArmazonMarca from "./select_marca";
import { useEffect, useState } from "react";
import SubFamiliaSelect from "../SubFamiliaSelect";
import GrupoSelect from "../GrupoSelect";
import { PlusOutlined } from "@ant-design/icons";
import EditableTable from "../etc/editableTable";


const AgregarArmazon = (props) => {
  /********************************************************************************************************* */
  const [modalAgregarCodigoOpen, setModalAgregarCodigoOpen] = useState(false);

    const [tipoArmazonData, setTipoArmazonData] = useState(null);
    const [marcaData, setMarcaData] = useState(null);
    const [subCategoriaData, setSubCategoriaData] = useState(null);

    const [selectedTipoArmazon, setSelectedTipoArmazon] = useState(null);
    const [selectedMarca, setSelectedMarca] = useState(null);
    const [selectedSubCategoria, setSelectedSubCategoria] = useState(null);

    const loadTipoArmazonData = () => {}

    const loadMarcaData = (idTipoArmazon) => {}

    const loadSubCategoriaData = (idMarca) => {}

    const onTipoArmazonChange = (value) => {
        setSelectedTipoArmazon(value);
        setMarcaData(null);
        setSubCategoriaData(null);
        loadMarcaData(value);
    }

    const onMarcaChange = (value) => {
        setSelectedMarca(value);
        setSubCategoriaData(null);
        loadSubCategoriaData(value);
    }

    const onSubCategoriaChange = (value) => {
        setSelectedSubCategoria(value);
    }

    useEffect(()=>{
        loadTipoArmazonData();
    },[]);

  const defaultColumns = [
    {
      editable: true,
      title: <>C&oacute;digo</>,
      dataIndex: "codigo",
    },
    {
      editable: true,
      title: <>Descripci&oacute;n</>,
      dataIndex: "descripcion",
    },
    {
      editable: true,
      title: <>Precio</>,
      dataIndex: "precio",
    },
  ];

  const get_new_row_obj = (_) => ({
    codigo: "Ingresar Codigo...",
    descripcion: "Ingresar Descripcion...",
    precio: 0,
  });

  const on_add_new_row = (_) => {};

  const col_label_style = { fontWeight: "500", fontSize: "16px", paddingTop: "5px" }; 

  const row_style = { marginBottom: "10px" };

  return (
    <>
    <Card title={<span style={{fontWeight:"bold", fontSize:"1.4em"}}>Agregar Armaz&oacute;n</span>}>

      <Row gutter={16} style={row_style}>
        <Col style={col_label_style}>Tipo de Armaz&oacute;n:&nbsp;</Col>
        <Col>
          <Select onChange={onTipoArmazonChange} style={{width:"300px"}} options={tipoArmazonData} />
        </Col>
      </Row>
      <Row gutter={16} style={row_style}>
        <Col style={col_label_style}>Marca:&nbsp;</Col>
        <Col>
          <Select onChange={onMarcaChange} style={{width:"300px"}} options={marcaData} />
        </Col>
        <Col>
          <Button>
            <PlusOutlined /> Agregar Marca
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={row_style}>
        <Col style={col_label_style}>Sub-Categor&iacute;a:&nbsp;</Col>
        <Col>
          <Select onChange={onSubCategoriaChange} style={{width:"300px"}} options={subCategoriaData} />
        </Col>
        <Col>
          <Button>
            <PlusOutlined /> Agregar
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={row_style}>
        <Col span={24}>
          <Card
            size="small"

          >
            <Row>
              <Col span={24}>
                <Table
                  pagination={false}
                  columns={defaultColumns}
                  dataSource={[]}
                  footer={() => (
                    <Button type="primary" onClick={() => setModalAgregarCodigoOpen(true)}>
                      <PlusOutlined /> Agregar Armaz&oacute;n
                    </Button>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      </Card>
      <Modal
        title="Agregar Armazón"
        open={modalAgregarCodigoOpen}
        onCancel={() => setModalAgregarCodigoOpen(false)}
        destroyOnClose={true}
        footer={null}
        width={"1200px"}
      >
        <Row gutter={16}>
          <Col >
            <Input prefix="Código: " allowClear />
          </Col>
       
          <Col >
            <Input prefix="Descripción: " style={{width:"400px"}} allowClear />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col >
            <Input prefix="Precio: " />
          </Col>
        </Row>
        <Row>
            <Col>
                  <Button>Agregar</Button>
            </Col>
        </Row>
      </Modal>
    </>
  );
};

export default AgregarArmazon;
