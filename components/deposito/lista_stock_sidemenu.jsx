import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Tag,
} from "antd";
import SelectTag from "../etiquetas/selectTag";
import SubGroupSelect from "../SubGroupSelect";
import GrupoSelect from "../GrupoSelect";
import SubFamiliaSelect from "../SubFamiliaSelect";
import FamiliaSelect from "../FamiliaSelect";
import { useState } from "react";

const SideMenuListaStock = (props) => {
  const { folded, onMenuFoldedClick, onMenuUnfoldedClick, callback, loading } = props;
  const [orden, setOrden] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [valorFiltro, setValorFiltro] = useState(null);
  const [tags, setTags] = useState([]);
  const [filtros, setFiltros] = useState([]);

  const agregar_filtro = () => {
    if(!valorFiltro)
    {
      return
    }
    ///alert(JSON.stringify(tipoFiltro))
    if(filtros.find(f=>f.tipo==tipoFiltro))
    {
      alert("Ya se encuentra el tipo de filtro")
      return
    }
    const val = (valorFiltro.valor||"").toString();
    if(!/^[_A-ZÑ0-9\s\.\-]+$/.test(val.toUpperCase()))
    {
      alert("El valor solo puede contener letras, números, espacio, punto y guión.")
      return
    }

    if(valorFiltro.tipo=="number")
    {
      if(isNaN(parseFloat(valorFiltro.valor)))
      {
        return;
      }
    }
    setFiltros((f) => [
      ...f,
      ...[
        {
          tipo: tipoFiltro,
          valor: valorFiltro.valor,
          descripcion: valorFiltro.descripcion,
        },
      ],
    ]);

    setTipoFiltro("");
    setValorFiltro(null);
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

  const setValue = (tipo, val, descripcion = "") => {
    if(!val)
    {
      return
    }
    if(((val.toString()||"").trim()).length<1)
    {
      return;
    }
    setValorFiltro((_) => ({
      tipo: tipo,
      valor: val,
      descripcion: descripcion,
    }));
  };

  const FiltroValor = () => {
    switch (tipoFiltro) {
      case "grupo_contenga_a":
        return (
          <Input
            prefix="Valor: "
            size="small"
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "codigo_contenga_a":
        return (
          <Input
            prefix="Valor: "
            size="small"
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "codigo_igual_a":
        return (
          <Input
            prefix="Valor: "
            size="small"
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "precio_mayor_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "precio_menor_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "precio_igual_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "cantidad_igual_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "cantidad_mayor_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "cantidad_menor_a":
        return (
          <Input
            type="number"
            prefix="Valor: "
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "detalles":
        return (
          <Input
            prefix="Valor: "
            size="small"
            type="text"
            onChange={(e) => {
              setValue("valor", e.target.value);
            }}
          />
        );
      case "subgrupo":
        return (
          <SubGroupSelect
            callback={(id, desc) => {
              setValue("valor", id, desc);
            }}
          />
        );
      case "grupo":
        return (
          <GrupoSelect
            callback={(id, desc) => {
              setValue("valor", id, desc);
            }}
          />
        );
      case "subfamilia":
        return (
          <SubFamiliaSelect
            callback={(id, desc) => {
              setValue("valor", id, desc);
            }}
          />
        );
      case "familia":
        return (
          <>
            <FamiliaSelect
              callback={(id, desc) => {
                setValue("valor", id, desc);
              }}
            />
          </>
        );
      default:
        return <>{/*<span style={{color:"gray"}}><i>Seleccione tipo filtro...</i></span>*/}</> ;
    }
  };

  const row_style = {
    padding: "6px",
  };

  const on_finish = () => {
    const data  = {
      tags,
      filtros,
    }
    

    callback?.(data)
  };

  return folded ? (
    <Button
      onClick={(_) => {
        onMenuUnfoldedClick();
      }}
    >
      <MenuUnfoldOutlined /> Filtros
    </Button>
  ) : (
    <>
      <Card
        style={{ backgroundColor: "#ECECED", borderRadius: "16px" }}
        title="Filtros"
        size="small"
        extra={
          <>
            <Button
              style={{ borderRadius: "12px" }}
              onClick={(_) => {
                onMenuFoldedClick();
              }}
            >
              <MenuFoldOutlined />
            </Button>
          </>
        }
      >
        <Row
          style={{
            ...row_style,
            ...{
              borderRadius: "8px",
              border: "1px solid #C0C0C1",
              padding: "6px",
            },
          }}
        >
          <Col style={{fontWeight:"600", paddingTop:"4px"}}>Filtro a Agregar:&nbsp;&nbsp; </Col>
          <Col>
            <Select
              value={tipoFiltro}
              
              placeholder="Seleccione Tipo de Filtro..."
              options={[
                { label: "Codigo", value: "codigo_contenga_a" },
                { label: "SubGrupo", value: "subgrupo" },
                { label: "Grupo", value: "grupo" },
                { label: "SubFamilia", value: "subfamilia" },
                { label: "Familia", value: "familia" },
                { label: "Grupo Contenga a", value: "grupo_contenga_a" },

                //{label: 'Codigo Igual a ', value: 'codigo_igual_a'},
                { label: "Precio - Mayor a", value: "precio_mayor_a" },
                { label: "Precio - Menor a", value: "precio_menor_a" },
                { label: "Precio - Igual a", value: "precio_igual_a" },
                { label: "Cantidad - Igual a", value: "cantidad_igual_a" },
                { label: "Cantidad - Mayor a", value: "cantidad_mayor_a" },
                { label: "Cantidad - Menor a", value: "cantidad_menor_a" },
                {label: 'Descripción', value: 'detalles'},
              ]}
              style={{ width: "200px" }}
              onChange={(value) => {
                setTipoFiltro(value);
              }}
            />
           
          </Col>

          <Col span={24} style={{ paddingTop: "16px" }}>
            {FiltroValor()}
          </Col>
        </Row>
        <Row style={row_style}>
          <Col>
            <Button
              disabled={valorFiltro==null}
              onClick={agregar_filtro}
              type="link"
              danger
              htmlType="submit"
              size="small"
              style={{ width: "100%" }}
            >
              <PlusOutlined size={"small"} /> Agregar Filtro...
            </Button>
          </Col>
        </Row>

        <Row style={{...row_style,...{backgroundColor:"lightyellow", borderRadius:"8px", padding:"6px"}}}>
          <Col span={24}>
            {filtros.map((t) =>
              typeof tipos_filtro_dic[t.tipo] === "undefined" ||
              tipos_filtro_dic[t.tipo] === null ? (
                <></>
              ) : (
                <Tag
                  style={{overflow:"hidden", maxWidth:"100px"}}
                  color="red"
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    setFiltros((ff) => ff.filter((f) => f.tipo != t.tipo));
                  }}
                >
                  {tipos_filtro_dic[t?.tipo]?.descripcion +
                    ": " +
                    t?.valor +
                    " " +
                    t?.descripcion}
                </Tag>
              )
            )}
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Select
              placeholder="Por defecto..."
              prefix={<span style={{ fontWeight: "bold" }}>Orden: </span>}
              options={[
                { label: "Alfabetico - Ascendiente", value: "alf_asc" },
                { label: "Alfabetico - Descendiente", value: "alf_desc" },
                { label: "Precio - Descendiente", value: "precio_desc" },
                { label: "Precio - Ascendiente", value: "precio_asc" },
                { label: "Cantidad - Ascendiente", value: "cantidad_asc" },
                { label: "Cantidad - Descendiente", value: "cantidad_desc" },
              ]}
              allowClear
              style={{ width: "100%", overflow: "hidden" }}
              onChange={(value) => {
                setOrden(value);
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <SelectTag
              callback={(v) => {
                setTags(v)
              }}
            />
          </Col>
        </Row>
        <Row style={row_style}>
          <Col span={24}>
            <Divider />
            <Button
              disabled={(filtros.length<1&&tags.length<1)||(typeof loading==='undefined' ? false : loading)}
              type="primary"
              htmlType="submit"
              size="small"
              block
              style={{ borderRadius: "6px" }}
              onClick={on_finish}
            >
              Aplicar Filtros
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default SideMenuListaStock;
