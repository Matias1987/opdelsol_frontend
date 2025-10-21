import { Row, Col, Input, Spin } from "antd";
import { useEffect, useState } from "react";
import StockCodigosSucursales from "./StockCodigoSucursales";
import EnviosCodigos from "./EnviosCodigo";
import { get } from "@/src/urls";
import Tags from "@/components/etiquetas/tagsCodigos";
import ImagenesProducto from "@/components/etc/imagen/imagen_producto";
import TagsSmall from "@/components/etiquetas/tagsSmall";
import DefaultImageProduct from "@/components/etc/imagen/default_image_prod";
import DetalleCodigoHeader from "../DetalleCodigoHeader";

const DetalleCodigo = (props) => {
  const { idcodigo } = props;

  return <>
      <Row>
        <Col span={24}>
        <DetalleCodigoHeader idcodigo={idcodigo} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ImagenesProducto idproducto={idcodigo} readonly />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StockCodigosSucursales idcodigo={idcodigo} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <EnviosCodigos idcodigo={idcodigo} />
        </Col>
      </Row>
    </>
};

export default DetalleCodigo;
