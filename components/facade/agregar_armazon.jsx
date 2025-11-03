import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Table,
  Modal,
  Checkbox,
} from "antd";
import SelectArmazonMarca from "./select_marca";
import { useEffect, useState } from "react";
import SubFamiliaSelect from "../SubFamiliaSelect";
import GrupoSelect from "../GrupoSelect";
import { PlusOutlined } from "@ant-design/icons";
import EditableTable from "../etc/editableTable";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

const AgregarArmazon = (props) => {
  /********************************************************************************************************* */
  const [modalAgregarCodigoOpen, setModalAgregarCodigoOpen] = useState(false);

  const [tipoArmazonData, setTipoArmazonData] = useState(null);
  const [marcaData, setMarcaData] = useState(null);
  const [subCategoriaData, setSubCategoriaData] = useState(null);
  const [sucursales, setSucursales] = useState([]);
  const [selectedTipoArmazon, setSelectedTipoArmazon] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(null);
  const [selectedSubCategoria, setSelectedSubCategoria] = useState(null);
  const [cantidadInicial, setCantidadInicial] = useState(0);
  const [codigosData, setCodigosData] = useState([]);
  const [agregarMarcaModalOpen, setAgregarMarcaModalOpen] = useState(false);
  const [agregarSubCategoriaModalOpen, setAgregarSubCategoriaModalOpen] = useState(false);
  const [marcaToAdd, setMarcaToAdd] = useState("");
  const [subCategoriaToAdd, setSubCategoriaToAdd] = useState("");
  const [codeToAdd, setCodeToAdd] = useState({
    codigo: "",
    descripcion: "",
    precio: 0,
  });

  const loadSucursales = () => {
    fetch(get.sucursales)
      .then((r) => r.json())
      .then((r) => {
      //  alert(JSON.stringify(r.data));
        setSucursales(
          
          r.data.map((s) => ({
            ...s,
            checked: true,
          }))
        );
      });
  };

  const loadTipoArmazonData = () => {
    const url = get.optionsforfamilia + 2;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setTipoArmazonData(r.data);
      });
  };

  const loadMarcaData = (idTipoArmazon) => {
    const url = get.optionsforsubfamilia + idTipoArmazon;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setMarcaData(r.data);
      });
  };

  const loadSubCategoriaData = (idMarca) => {
    const url = get.optionsforgrupo + idMarca;
    fetch(url)
      .then((r) => r.json())
      .then((r) => {
        setSubCategoriaData(r.data);
      });
  };

  const onTipoArmazonChange = (value) => {
    setSelectedTipoArmazon(value);
    setMarcaData(null);
    setSubCategoriaData(null);
    loadMarcaData(value);
  };

  const onMarcaChange = (value) => {
    setSelectedMarca(value);
    setSubCategoriaData(null);
    loadSubCategoriaData(value);
  };

  const onSubCategoriaChange = (value) => {
    setSelectedSubCategoria(value);
  };

  useEffect(() => {
    loadSucursales();
    loadTipoArmazonData();
  }, []);

  const defaultColumns = [
    {
      title: <>C&oacute;digo</>,
      dataIndex: "codigo",
    },
    {
      title: <>Descripci&oacute;n</>,
      dataIndex: "descripcion",
    },
    {
      title: <>Precio</>,
      dataIndex: "precio",
    },
    {
      title: <>Acciones</>,
      render: (_, record) => (
        <><Button danger onClick={() => {
          setCodigosData((oldData) => oldData.filter((d) => d.codigo !== record.codigo));
        }}>Eliminar</Button></>
      ),
    }
  ];
  const columnsSucursales = [
    {
      title: "",
      render: (_, record) => (
        <>
          <Checkbox
            checked={record.checked}
            onChange={(_) => {
              setSucursales((_s) =>
                _s.map((__s) =>
                  record.idsucursal == __s.idsucursal
                    ? { ...__s, checked: !__s.checked }
                    : __s
                )
              );
            }}
          />
        </>
      ),
    },
    { title: "Sucursal", dataIndex: "nombre" },
  ];

  const on_add_new_row = (_) => {
    if(codeToAdd.codigo.trim()===""){
      alert("El c&oacute;digo no puede estar vacío");
      return;
    }
    if(codeToAdd.descripcion.trim()===""){
      alert("La descripción no puede estar vacía");
      return;
    }
    setCodigosData((oldData) => [...oldData, codeToAdd]);
    setModalAgregarCodigoOpen(false);
    setCodeToAdd({
      codigo: "",
      descripcion: "",
      precio: 0,
    });
  };

  const col_label_style = {
    fontWeight: "500",
    fontSize: "16px",
    paddingTop: "5px",
  };

  const row_style = { marginBottom: "10px" };

  const onSave = () =>{
    
    if(selectedSubCategoria===null){
      alert("Debe seleccionar una sub-categoría");
      return;
    }

    if(codigosData.length===0){
      alert("Debe agregar al menos un código de armazón");
      return;
    }
    
    if(!confirm("¿Está seguro de guardar los armazones agregados?")){
      return;
    }
    const dataToSave = {
      idsubgrupo: selectedSubCategoria,
      codigos: codigosData,
      idsucursales: sucursales.filter(s=>s.checked).map(s=>s.idsucursal),
      cantidad_inicial: cantidadInicial,
    }

    //alert(JSON.stringify(dataToSave));

    const url = post.insert.insertar_codigos; //? toDo, url doesn't exist yet

    post_method(url, dataToSave,(response)=>{
      alert("Armazones guardados correctamente");
      //reset form
      setSelectedTipoArmazon(null);
      setSelectedMarca(null);
      setSelectedSubCategoria(null);
      setMarcaData(null);
      setSubCategoriaData(null);
      setCantidadInicial(0);
      setCodigosData([]);
    })
  }

  return (
    <>
      <Card
        title={
          <span style={{ fontWeight: "bold", fontSize: "1.4em" }}>
            Agregar Armazones
          </span>
        }
      >
        <Row gutter={16} style={row_style}>
          <Col style={col_label_style}>Tipo de Armaz&oacute;n:&nbsp;</Col>
          <Col>
            <Select
              onChange={onTipoArmazonChange}
              style={{ width: "300px" }}
              options={tipoArmazonData}
              disabled={
                tipoArmazonData === null || tipoArmazonData.length === 0
              }
            />
          </Col>
        </Row>
        <Row gutter={16} style={row_style}>
          <Col style={col_label_style}>Marca:&nbsp;</Col>
          <Col>
            <Select
              onChange={onMarcaChange}
              style={{ width: "300px" }}
              options={marcaData}
              disabled={marcaData === null || marcaData.length === 0}
            />
          </Col>
          <Col>
            <Button type="primary" onClick={()=>setAgregarMarcaModalOpen(true)}>
              <PlusOutlined /> Agregar Marca
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={row_style}>
          <Col style={col_label_style}>Sub-Categor&iacute;a:&nbsp;</Col>
          <Col>
            <Select
              onChange={onSubCategoriaChange}
              style={{ width: "300px" }}
              options={subCategoriaData}
              disabled={
                subCategoriaData === null || subCategoriaData.length === 0
              }
            />
          </Col>
          <Col>
            <Button type="primary" onClick={() => setAgregarSubCategoriaModalOpen(true)}>
              <PlusOutlined /> Agregar
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={row_style}>
          <Col span={24}>
            <Card size="small">
              <Row>
                <Col span={24}>
                  <Table
                    pagination={false}
                    columns={defaultColumns}
                    dataSource={codigosData}
                    footer={() => (
                      <Button
                        type="primary"
                        onClick={() => setModalAgregarCodigoOpen(true)}
                      >
                        <PlusOutlined /> Agregar Armaz&oacute;n
                      </Button>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card
                    style={{ marginTop: "20px" }}
                    size="small"
                    title="Cantidad Inicial"
                  >
                    <Row>
                      <Col span={24}>
                        <Input type="number" prefix="Cantidad Inicial: " placeholder="Cantidad Inicial" value={cantidadInicial} onChange={e=>{setCantidadInicial(e.target.value)}}/>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Table
                          title={_=><>Sucursales en la que el C&oacute;digo estar&aacute; disponible</>}
                          size="small"
                          pagination={false}
                          columns={columnsSucursales}
                          dataSource={sucursales}
                          showHeader={false}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: "10px", textAlign: "right" }}>
                  <Button onClick={onSave} size="large" type="primary">Guardar Armazones</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Agregar Código de Armazón"
        open={modalAgregarCodigoOpen}
        onCancel={() => setModalAgregarCodigoOpen(false)}
        destroyOnClose={false}
        footer={null}
        width={"450px"}
      >
        <Row gutter={16} style={{paddingTop:"10px"}}>
          <Col>
            <Input prefix="Código: " allowClear value={codeToAdd.codigo} onChange={e => setCodeToAdd({ ...codeToAdd, codigo: e.target.value })} />
          </Col>

          <Col>
            <Input
              prefix="Descripción: "
              style={{ width: "400px" }}
              allowClear
              value={codeToAdd.descripcion}
              onChange={e => setCodeToAdd({ ...codeToAdd, descripcion: e.target.value })}
            />
          </Col>
        </Row>
        <Row gutter={16} style={{paddingTop:"10px"}}>
          <Col>
            <Input prefix="Precio: " type="number" value={codeToAdd.precio} onChange={e => setCodeToAdd({ ...codeToAdd, precio: e.target.value })} />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ marginTop: "30px", textAlign: "right" }}>
            <Button block type="primary" onClick={on_add_new_row}>Agregar</Button>
          </Col>
        </Row>
      </Modal>
      <Modal 
      title="Agregar Marca de Armazón"
      open={agregarMarcaModalOpen}
      onCancel={()=>setAgregarMarcaModalOpen(false)}
      footer={null}
      width={"450px"}
    >
      <Row gutter={16} style={{paddingTop:"10px"}}>
        <Col>
          <Input prefix="Marca: " allowClear value={marcaToAdd} onChange={e => setMarcaToAdd(e.target.value)} />
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ marginTop: "30px", textAlign: "right" }}>
          <Button block type="primary" onClick={on_add_new_row}>Agregar</Button>
        </Col>
      </Row>
    </Modal>
    <Modal
      title="Agregar Subcategoría de Armazón"
      open={agregarSubCategoriaModalOpen}
      onCancel={() => setAgregarSubCategoriaModalOpen(false)}
      footer={null}
      width={"450px"}
    >
      <Row gutter={16} style={{ paddingTop: "10px" }}>
        <Col>
          <Input prefix="Subcategoría: " allowClear value={subCategoriaToAdd} onChange={e => setSubCategoriaToAdd(e.target.value)} />
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ marginTop: "30px", textAlign: "right" }}>
          <Button block type="primary" onClick={on_add_new_row}>Agregar</Button>
        </Col>
      </Row>
    </Modal>
  </>
  );
};

export default AgregarArmazon;
