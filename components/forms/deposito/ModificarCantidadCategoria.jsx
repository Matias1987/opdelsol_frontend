import FamiliaSelect from "@/components/FamiliaSelect";
import GrupoSelect from "@/components/GrupoSelect";
import SubFamiliaSelect from "@/components/SubFamiliaSelect";
import SubGroupSelect from "@/components/SubGroupSelect";
import SucursalSelect from "@/components/SucursalSelect";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { EyeFilled } from "@ant-design/icons";
import { Button, Card, Col, Input, Modal, Row, Select, Table } from "antd";
import { useState } from "react";

const ModificarCantidadCategoria = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selection, setSelection] = useState({
    tipo: "",
    id: -1,
    cantidad: 0,
    idsucursal: globals.obtenerSucursal(),
  });
  const [_options, setOptions] = useState(<></>);

  const onAplicar = (_) => {
    if (+selection.idsucursal < 0) {
      alert("Seleccione sucursal");
      return;
    }
    if (+selection.id < 0) {
      alert("Seleccione categoria");
      return;
    }
    /*alert(
      JSON.stringify({
        url: post.update.modificar_cantidad_categoria,
        params__: selection,
      })
    );*/
    if (!confirm("Confirma modificar Cantidades?")) {
      return;
    }
    post_method(
      post.update.modificar_cantidad_categoria,
      selection,
      (response) => {
        alert("OK");
      }
    );
  };

  /*const onUpdateList = _ => {
        post_method(
            post.search.filtro_stock,
            {
                subgrupo: selection.tipo == "subgrupo" ? selection.id : "",
                grupo: selection.tipo == "grupo" ? selection.id : "",
                subfamilia: selection.tipo == "subfamilia" ? selection.id : "",
                familia: selection.tipo == "familia" ? selection.id : "",
            },
            (response)=>{
                setData(response.data.map(r=>({
                    codigo: r.codigo,
                    cantidad: r.cantidad
                })))
            }
        )
        fetch(post.search.filtro_stock)
        .then(response=>response.json())
        .then((response)=>{

        })
    }*/

  const onChange = (v) => {
    setSelection(f=>({...f,id:-1}))
    switch (v) {
      case "familia":
        setOptions(
          <FamiliaSelect
            callback={(id) => {
              setSelection((s) => ({ ...s, id: id, tipo: "familia" }));
            }}
          />
        );
        break;
      case "subfamilia":
        setOptions(
          <>
            <SubFamiliaSelect
              callback={(id) => {
                setSelection((s) => ({ ...s, id: id, tipo: "subfamilia" }));
              }}
            />
          </>
        );
        break;
      case "grupo":
        setOptions(
          <>
            <GrupoSelect
              callback={(id) => {
                setSelection((s) => ({ ...s, id: id, tipo: "grupo" }));
              }}
            />
          </>
        );
        break;
      case "subgrupo":
        setOptions(
          <>
            <SubGroupSelect
              callback={(id) => {
                setSelection((s) => ({ ...s, id: id, tipo: "subgrupo" }));
              }}
            />
          </>
        );
        break;
    }
  };
  const row_style = {
    padding: ".7em",
  };
  return (
    <>
      <Card
        size="small"
        title={<>Modificar Cantidad Categor&iacute;a</>}
        style={{ maxWidth: "700px" }}
      >
        <Row style={row_style} gutter={16}>
          <Col>
            <SucursalSelect
              callback={(_id) => {
                setSelection((_s) => ({ ..._s, idsucursal: _id }));
              }}
              idsucursal={globals.obtenerSucursal()}
            />
          </Col>
        </Row>
        <Row style={row_style} gutter={16}>
          <Col>
            <b className="text_1">Categor&iacute;a:</b>
          </Col>
          <Col>
            <Select
              size="small"
              style={{ width: "300px" }}
              options={[
                { label: "FAMILIA", value: "familia" },
                { label: "SUBFAMILIA", value: "subfamilia" },
                { label: "GRUPO", value: "grupo" },
                { label: "SUBGRUPO", value: "subgrupo" },
              ]}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{ ...row_style, backgroundColor: "lightyellow" }}
        >
          <Col>
            <b className="text_1">Valor Categor&iacute;a: </b>
          </Col>
          <Col>{_options}</Col>
          <Col span={2}></Col>
        </Row>
        {selection.tipo == "" ? (
          <></>
        ) : (
          <Row style={row_style} gutter={16}>
            <Col>
              <b className="text_1">Cantidad:</b>
            </Col>
            <Col>
              <Input
                type="number"
                value={selection.cantidad}
                onChange={(e) => {
                  setSelection((s) => ({
                    ...s,
                    cantidad: parseInt(e.target.value),
                  }));
                }}
              />
            </Col>
          </Row>
        )}
        <Row style={row_style}>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              danger
              onClick={onAplicar}
              type="primary"
              size="large"
              disabled={+selection.id<0}
            >
              Cambiar Cantidad Categor&iacute;a
            </Button>
          </Col>
        </Row>
      </Card>
      <Modal
        open={open}
        title={"Lista de Stock"}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Row>
          <Col span={24}>
            <div>
              <Table
                dataSource={data}
                columns={[
                  { dataIndex: "codigo", title: "Codigo" },
                  { dataIndex: "cantidad", title: "Cantidad" },
                ]}
              />
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ModificarCantidadCategoria;
