import { Row, Col, Input, Button, Modal, InputNumber, Radio }  from "antd" ;
import VistaPreviaPrecios from "../forms/deposito/vista_previa_precios";
import { useState } from "react";
import { decimal_separator } from "@/src/config";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";


const EditarPrecioIndvCategoria = ({ categoria, idcategoria }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    porcentaje: 0,
    redondeo: 1,
  });

  const onChange = (field, value) => {
    setData({
      ...data,
      [field]: value,
    });
  };

  const aplicarCambios = () => {
   // alert("To Do...");
   if(!confirm("¿Confirma la modificación de los precios de esta categoría?"))
   {
        return;
   }
    post_method(
        post.update.modificar_precios_defecto_subgrupo,
        {
            idfamilia:-1,
            idsubfamilia:-1, 
            idgrupo: idcategoria,
            idsubgrupo:-1,
            multiplicador: (+data.porcentaje)/100,
            roundFactor: +data.redondeo,
        },
        (response)=>{
            alert("Hecho");
        }
    );
    }

  return (
    <div>
      <Row style={{padding:"8px"}}>
        <Col span={24}>
          <InputNumber
            onClick={e=>{e.target.select()}} 
            decimalSeparator={decimal_separator}
            style={{width:"100%"}}
            onChange={(value) => {
              onChange("porcentaje", value ?? 0);
            }}
            value={data.porcentaje}
            prefix="Porcentaje a aumentar: "
          />
        </Col>
      </Row>
      <Row style={{padding:"8px"}}>
        <Col span={24}>
          <InputNumber
            onClick={e=>{e.target.select()}} 
            decimalSeparator={decimal_separator}
            style={{width:"100%"}}
            onChange={(value) => {
              onChange("redondeo", value ?? 1);
            }}
            value={data.redondeo}
            prefix="Redondeo: "
          />
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{padding:"8px"}}>
        <Radio.Group value={1}>
            <Radio value={1}>Aumento</Radio>
            <Radio value={2}>Descuento</Radio>
        </Radio.Group>
        </Col>
      </Row>
      <Row style={{padding:"8px"}}>
        <Col span={24}>
          <Button type="primary" block onClick={_=>{setModalVisible(true)}}>Vista Previa</Button>
        </Col>
      </Row>
      <Modal
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={"800px"}
        footer={null}
        destroyOnClose
      >
        <VistaPreviaPrecios
          pIncremento={data.porcentaje / 100}
          incrementar={true}
          redondeo={data.redondeo}
          tipoCategoria={categoria}
          idcategoria={idcategoria}
          onCancel={(_) => {
            setModalVisible(false);
          }}
          onOK={(_) => {
            setModalVisible(false);
            aplicarCambios();
          }}
        />
      </Modal>
    </div>
  );
};

export default EditarPrecioIndvCategoria;