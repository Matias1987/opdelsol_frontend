import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useEffect, useState } from "react";

import { Row, Col, Modal, Divider, Button } from "antd";
import Comentario from "@/components/comentario";
import ConnectedButton from "@/components/etc/CntButton";

const CargaBloqueo = (props) => {
  const [open, setOpen] = useState(false);
  const [bloqueo, setBloqueo] = useState(null);

  useEffect(() => {
    setBloqueo({
      idusuario: globals.obtenerUID(),
      comentario: "",
      idsucursal: globals.obtenerSucursal(),
      idcliente: props.idcliente,
      tk: globals.getToken(),
    });
  }, []);

  const onUpdate = (data) => {
    setBloqueo((b) => {
      const _b = { ...b, comentario: data.comentario };
      return _b;
    });
  };

  const onSubmit = (_) => {
    post_method(post.update.bloquear_cliente, bloqueo, (response) => {
      setOpen(false);
      props?.callback?.();
    });
  };

  return (
    <>
      <ConnectedButton
        type="primary"
        size="small"
        danger
        onClick={() => {
          setOpen(true);
        }}
      >
        Bloquear Cliente
      </ConnectedButton>
      <Modal
        destroyOnClose
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={false}
        title={"Carga Bloqueo"}
      >
        <Row>
          <Col span={24}>
            <Comentario callback={onUpdate} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Divider />
            <ConnectedButton block type="primary" onClick={onSubmit}>
              Guardar
            </ConnectedButton>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CargaBloqueo;
