import { get } from "@/src/urls";
import { Card, Select, Table } from "antd";
import { useEffect, useState } from "react";

const ListaOpinionesClientes = () => {
  const [data, setData] = useState([]);

  const [selectedType, setSelectedType] = useState("acercamiento"); // Estado para el tipo seleccionado
  const columns_comentarios_retirar = [
    {
        title:"Sucursal",
        dataIndex:"sucursal",
        key:"sucursal"
    },
    {
        title:"Comentario",
        dataIndex:"comentario",
        key:"comentario"
    }
  ];
  const columns_opiniones_servicio = [
    {
        title:"Vendedor",
        dataIndex:"vendedor",
        key:"vendedor"
    },
    {
        title:"Comentario",
        dataIndex:"comentario",
        key:"comentario"
    },
    {
        title:"Fecha",
        dataIndex:"fecha",
        key:"fecha"
    },
    {
        title:"Puntuación",
        dataIndex:"puntuacion",
        key:"puntuacion"
    },
    {
        title:"Sucursal",
        dataIndex:"sucursal",
        key:"sucursal"
    }
  ];

  useEffect(()=>{
    load();
  },[])

  const load = () =>{
    fetch(get.obtener_opiniones)
      .then((response) => response.json())
      .then((result) => {
        alert("Opiniones cargadas: " + result.length);
        setData(result);
      });
  }

  const table_comentarios_retirar = (_) => (
    <Table
        title={_=><>Listado de Comentarios al retirar: </>}
      dataSource={data?.filter?.((item) => item.tipo === "acercamiento")}
      columns={columns_comentarios_retirar}
    />
  );

  const table_opiniones_servicio = (_) => (
    <Table
      title={_=><>Listado de Opiniones sobre la atención: </>}
      dataSource={data?.filter?.((item) => item.tipo === "atencion")}
      columns={columns_opiniones_servicio}
    />
  );

  return (
    <>
      <Card
        title="Comentarios y Opiniones de Clientes"
        bordered={false}
        style={{ width: "100%" }}
      >
        <Select
          style={{ width: "100%" }}
          prefix="Tipo:"
          placeholder="Seleccionar tipo de opinión"
          defaultValue={"acercamiento"}
          onChange={(value) => {
            setSelectedType(value);
            // Aquí puedes implementar la lógica para filtrar las opiniones según el tipo seleccionado
            // Por ejemplo, podrías hacer una llamada a la API para obtener las opiniones filtradas
            // y luego actualizar el estado 'data' con los resultados.
          }}
        >
          <Select.Option value="acercamiento">
            Comentarios al retirar{" "}
          </Select.Option>
          <Select.Option value="atencion">
            Opiniones sobre la atenci&oacute;n
          </Select.Option>
        </Select>

        {selectedType === "acercamiento"
          ? table_comentarios_retirar()
          : table_opiniones_servicio()}
      </Card>
    </>
  );
};
export default ListaOpinionesClientes;
