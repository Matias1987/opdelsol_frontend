import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, InputNumber, Row, Select, Tag } from "antd";
import SelectTag from "../etiquetas/selectTag";
import SubGroupSelect from "../SubGroupSelect";
import GrupoSelect from "../GrupoSelect";
import SubFamiliaSelect from "../SubFamiliaSelect";
import FamiliaSelect from "../FamiliaSelect";
import { useState } from "react";

const SideMenuListaStock = (props) => {
  const [tipoOrden, setTipoOrden] = useState("");
  const [tipoFiltro, setTipoFitro] = useState(-1);
  
  const [idsubgrupo, setIdSubgrupo] = useState(-1);
  const [tags, setTags] = useState([]);
  const procesar_tags = (values) => {
    var _tags = {};

    tags.forEach((t) => {
      _tags[t.tipo] = t.valor;
    });

    let _sucursal =
      selectedSucursal < -1 ? globals.obtenerSucursal() : selectedSucursal;

    return {
      sucursal: _sucursal,
      codigo_contenga_a:
        typeof _tags["codigo_contenga_a"] === "undefined"
          ? ""
          : _tags["codigo_contenga_a"],
      grupo_contenga_a:
        typeof _tags["grupo_contenga_a"] === "undefined"
          ? ""
          : _tags["grupo_contenga_a"],
      codigo_igual_a:
        typeof _tags["codigo_igual_a"] === "undefined"
          ? ""
          : _tags["codigo_igual_a"],
      precio_mayor_a:
        typeof _tags["precio_mayor_a"] === "undefined"
          ? ""
          : _tags["precio_mayor_a"],
      precio_menor_a:
        typeof _tags["precio_menor_a"] === "undefined"
          ? ""
          : _tags["precio_menor_a"],
      precio_igual_a:
        typeof _tags["precio_igual_a"] === "undefined"
          ? ""
          : _tags["precio_igual_a"],
      cantidad_igual_a:
        typeof _tags["cantidad_igual_a"] === "undefined"
          ? ""
          : _tags["cantidad_igual_a"],
      cantidad_mayor_a:
        typeof _tags["cantidad_mayor_a"] === "undefined"
          ? ""
          : _tags["cantidad_mayor_a"],
      cantidad_menor_a:
        typeof _tags["cantidad_menor_a"] === "undefined"
          ? ""
          : _tags["cantidad_menor_a"],
      sexo: typeof _tags["sexo"] === "undefined" ? "" : _tags["sexo"],
      edad: typeof _tags["edad"] === "undefined" ? "" : _tags["edad"],
      descripcion:
        typeof _tags["detalles"] === "undefined" ? "" : _tags["detalles"],

      subgrupo:
        typeof _tags["subgrupo"] === "undefined" ? "" : _tags["subgrupo"],
      grupo: typeof _tags["grupo"] === "undefined" ? "" : _tags["grupo"],
      subfamilia:
        typeof _tags["subfamilia"] === "undefined" ? "" : _tags["subfamilia"],
      familia: typeof _tags["familia"] === "undefined" ? "" : _tags["familia"],
      order: tipoOrden,
      etiquetas: etiquetas,
    };
  };

  const onFinishFiltro = (values) => {
    if (typeof values === "undefined") {
      return;
    }
    if (values === null) {
      return;
    }

    if (typeof values.valor === "undefined") {
      return;
    }

    if (values.valor === null) {
      return;
    }

    var found = null;
    try {
      found = tags.find(
        (i) =>
          tipos_filtro_dic[i.tipo].tipo ==
          tipos_filtro_dic[values.tipo_filtro].tipo
      );
    } catch (e) {
      console.log("error adding tag");
    }

    if (typeof found === "undefined") {
      setTags((tags) => [
        ...tags,
        { tipo: values.tipo_filtro, valor: values.valor },
      ]);
    } else {
      alert("Tipo de Filtro ya Cargado");
    }

    setValue("valor", null);
    setValue("tipo_filtro", null);

    setTipoFitro(null);
  };

  const tipos_filtro_dic = {
    grupo_contenga_a: { tipo: "grupo", descripcion: "Grupo Cont." },
    codigo_contenga_a: { tipo: "codigo", descripcion: "Codigo Cont." },
    codigo_igual_a: { tipo: "codigo", descripcion: "Codigo Igual a" },
    precio_mayor_a: { tipo: "precio", descripcion: "Precio Mayor a" },
    precio_menor_a: { tipo: "precio", descripcion: "Precio Menor a" },
    precio_igual_a: { tipo: "precio", descripcion: "Precio Igual a" },
    cantidad_igual_a: { tipo: "cantidad", descripcion: "Cantidad Igual a" },
    cantidad_mayor_a: { tipo: "cantidad", descripcion: "Cantidad Mayor a" },
    cantidad_menor_a: { tipo: "cantidad", descripcion: "Cantidad Menor a" },
    sexo: { tipo: "sexo", descripcion: "Genero" },
    edad: { tipo: "edad", descripcion: "Edad" },
    detalles: { tipo: "detalles", descripcion: "Descripción" },
    subgrupo: { tipo: "subgrupo", descripcion: "Subgrupo" },
    grupo: { tipo: "grupo", descripcion: "Grupo" },
    subfamilia: { tipo: "subfamilia", descripcion: "Subfamilia" },
    familia: { tipo: "familia", descripcion: "Familia" },
    sucursal: { tipo: "sucursal", descripcion: "Sucursal" },
  };

  const setValue = (idx, value) => {
    switch (idx) {
      case "tipo_filtro":
        //form.setFieldsValue({ tipo_filtro: value });
        break;
      case "valor":
        //form.setFieldsValue({ valor: value });
        break;
    }
  };

  const setValue1 = (idx, value) => {
    switch (idx) {
      case "orden":
        //form1.setFieldsValue({ orden: value });
        break;
      case "valor":
        //form1.setFieldsValue({ valor: value });
        break;
    }
  };

  const FiltroValor = () => {
    switch (tipoFiltro) {
      case "grupo_contenga_a":
        return (
          <Input
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "codigo_contenga_a":
        return (
          <Input
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "codigo_igual_a":
        return (
          <Input
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "precio_mayor_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "precio_menor_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "precio_igual_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "cantidad_igual_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "cantidad_mayor_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "cantidad_menor_a":
        return (
          <InputNumber
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "sexo":
        return (
          <Select
            options={[
              { label: "Masculino", value: "masculino" },
              { label: "Femenino", value: "femenino" },
              { label: "Unisex", value: "unisex" },
            ]}
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "edad":
        return (
          <Select
            options={[
              { label: "Adulto", value: "adulto" },
              { label: "Niños", value: "niño" },
              { label: "Joven", value: "joven" },
            ]}
            onChange={(val) => {
              setValue("valor", val);
            }}
          />
        );
      case "detalles":
        return (
          <Input
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "subgrupo":
        return (
          <SubGroupSelect
            callback={(id) => {
              setValue("valor", id);
              setIdSubgrupo(id);
            }}
          />
        );
      case "grupo":
        return (
          <GrupoSelect
            callback={(id) => {
              setValue("valor", id);
            }}
          />
        );
      case "subfamilia":
        return (
          <SubFamiliaSelect
            callback={(id) => {
              setValue("valor", id);
            }}
          />
        );
      case "familia":
        return (
          <>
            <FamiliaSelect
              callback={(id) => {
                setValue("valor", id);
              }}
            />
          </>
        );
      default:
        return <b>Seleccione tipo filtro...</b>;
    }
  };

  return (
    <>
      <Row
        gutter={16}
        style={{
          backgroundColor: "rgba(173,216,230,.2)",
          paddingTop: ".3em",
          paddingLeft: ".3em",
          paddingRight: ".3em",
          border: "1px solid rgba(173,216,230,1)",
        }}
      >
        <Col>
          <Select
            prefix={<span style={{ fontWeight: "bold" }}>Filtro: </span>}
            placeholder="Seleccione..."
            options={[
              { label: "SubGrupo", value: "subgrupo" },
              { label: "Grupo", value: "grupo" },
              { label: "SubFamilia", value: "subfamilia" },
              { label: "Familia", value: "familia" },
              { label: "Grupo Contenga a", value: "grupo_contenga_a" },
              //{ label: "Codigo Contenga a", value: "codigo_contenga_a" },
              //{label: 'Codigo Igual a ', value: 'codigo_igual_a'},
              { label: "Precio - Mayor a", value: "precio_mayor_a" },
              { label: "Precio - Menor a", value: "precio_menor_a" },
              { label: "Precio - Igual a", value: "precio_igual_a" },
              { label: "Cantidad - Igual a", value: "cantidad_igual_a" },
              { label: "Cantidad - Mayor a", value: "cantidad_mayor_a" },
              { label: "Cantidad - Menor a", value: "cantidad_menor_a" },
              //{label: 'Descripción', value: 'detalles'},
            ]}
            style={{ width: "250px" }}
            onChange={(value) => {
              setValue("tipo_filtro", value);
              setTipoFitro(value);
            }}
          />
        </Col>
        <Col span={12}>{FiltroValor()}</Col>
        <Col>
          <Button type="link" danger htmlType="submit" size="small">
            <PlusOutlined size={"small"} /> Agregar Filtro...
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          {tags.map((t) =>
            typeof tipos_filtro_dic[t.tipo] === "undefined" ||
            tipos_filtro_dic[t.tipo] === null ? (
              <></>
            ) : (
              <Tag
                color="red"
                closable
                onClose={(e) => {
                  e.preventDefault();
                  removeTag(t);
                }}
              >
                {tipos_filtro_dic[t?.tipo]?.descripcion + ": " + t?.valor}
              </Tag>
            )
          )}
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Select
            prefix={<span style={{ fontWeight: "bold" }}>Orden: </span>}
            options={[
              { label: "Alfabetico - Ascendiente", value: "alf_asc" },
              { label: "Alfabetico - Descendiente", value: "alf_desc" },
              { label: "Precio - Descendiente", value: "precio_desc" },
              { label: "Precio - Ascendiente", value: "precio_asc" },
              { label: "Cantidad - Ascendiente", value: "cantidad_asc" },
              { label: "Cantidad - Descendiente", value: "cantidad_desc" },
            ]}
            style={{ width: "250px", overflow: "hidden" }}
            onChange={(value) => {
              setValue1("orden", value);
              setTipoOrden(value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <SelectTag
            callback={(v) => {
              setEtiquetas(v);
            }}
          />
        </Col>
        <Col span={6} style={{ paddingLeft: "25px" }}>
          <Button type="primary" htmlType="submit" size="small" block>
            Aplicar Filtros
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SideMenuListaStock;
