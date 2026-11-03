import React, { useEffect, useMemo, useState } from "react";
import { Form, Table, Select, Input, InputNumber, Button, Card } from "antd";
import { procesar_seleccion } from "@/src/helpers/venta_multiple_helper";
import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get, post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";

/**
 *
 * @param {*} tipoVenta Receta stock, monofocal, multifocal, etc.
 * @returns
 */
const ProcessIAResponse = ({ jsonServer, tipoVenta, callback }) => {
  const [form] = Form.useForm();
  const [subgrupoData, setSubgrupoData] = useState(null); // here we load the subgrupo corresponding to the sale kind.

  const load_tipos_cristales = async () => {
    //alert(get.obtener_subgrupos_tipo_venta);
    const response = await fetchConRetryYTimeout(
      get.obtener_subgrupos_tipo_venta,
    );
    //alert(JSON.stringify(response));
    setSubgrupoData(
      response.data.map((sg) => ({
        value: sg.idsubgrupo,
        label: sg.nombre_corto,
      })),
    );
  };

  useEffect(() => {
    alert(JSON.stringify(jsonServer, null, 2)); //for testing purposes, we can remove this later.
    //Cargar los datos de subgrupos de acuerdo al tipo de venta...
    load_tipos_cristales();
  }, []);

  // 1. Helper de transformación envuelto en useMemo para evitar ejecuciones innecesarias
  const datosInicialesAplanados = useMemo(() => {
    if (!jsonServer || !jsonServer.data) return [];

    const { graduacion_lejos, graduacion_cerca, adicion } = jsonServer.data;
    const filas = [];

    // Determinar la distancia inicial lógica
    let distanciaInicial = "lejos";
    if (
      adicion ||
      (graduacion_lejos?.ojo_derecho?.esfera &&
        graduacion_cerca?.ojo_derecho?.esfera)
    ) {
      distanciaInicial = "ambos";
    } else if (
      graduacion_cerca?.ojo_derecho?.esfera &&
      !graduacion_lejos?.ojo_derecho?.esfera
    ) {
      distanciaInicial = "cerca";
    }

    // Procesar Ojo Derecho (OD)
    const deLejosOD = graduacion_lejos?.ojo_derecho;
    const deCercaOD = graduacion_cerca?.ojo_derecho;
    filas.push({
      distancia: distanciaInicial,
      lado: "od",
      esf: deLejosOD?.esfera || deCercaOD?.esfera || null,
      cil: deLejosOD?.cilindro || deCercaOD?.cilindro || null,
      eje: deLejosOD?.eje
        ? parseFloat(deLejosOD.eje)
        : deCercaOD?.eje
          ? parseFloat(deCercaOD.eje)
          : null,
      ad: adicion || null,
    });

    // Procesar Ojo Izquierdo (OI)
    const deLejosOI = graduacion_lejos?.ojo_izquierdo;
    const deCercaOI = graduacion_cerca?.ojo_izquierdo;
    filas.push({
      distancia: distanciaInicial,
      lado: "oi",
      esf: deLejosOI?.esfera || deCercaOI?.esfera || null,
      cil: deLejosOI?.cilindro || deCercaOI?.cilindro || null,
      eje: deLejosOI?.eje
        ? parseFloat(deLejosOI.eje)
        : deCercaOI?.eje
          ? parseFloat(deCercaOI.eje)
          : null,
      ad: adicion || null,
    });

    return filas;
  }, [jsonServer]);

  // Si aún no tenemos los datos procesados, evitamos renderizar una tabla rota
  if (!jsonServer || datosInicialesAplanados.length === 0) {
    return <Card loading title="Cargando datos de la receta..." />;
  }

  const alEnviar = (valores) => {
   
    const payload = {
      success: true,
      data: {
        medico_nombre: jsonServer?.data?.medico_nombre || null,
        paciente_nombre: jsonServer?.data?.paciente_nombre || null,
        recetas_editadas: valores.recetas,
      },
    };
 //alert(JSON.stringify(payload, null, 2)); //for testing purposes, we can remove this later.
    const final = procesar_seleccion(payload);

    alert(JSON.stringify(final, null, 2));

    callback(final);
  };

  const handleSelectChange = async (value, rowIndex) => {
    //try to get esf and cil from the table row and send it to the server to get the corresponding sg code.
    const esf = form.getFieldValue(["recetas", rowIndex, "esf"]);
    const cil = form.getFieldValue(["recetas", rowIndex, "cil"]);
    const payload = {
      esf: esf,
      cil: cil,
      idsubgrupo: value,
    };
    //alert(JSON.stringify(payload)); //for testing purposes, we can remove this later.
    post_method(post.obtener_codigo_sg_grad, payload, (response) => {
      //alert(JSON.stringify(response)); //for testing purposes, we can remove this later.
      form.setFieldValue(
        ["recetas", rowIndex, "idcodigo"],
        response.data[0]?.idcodigo ?? "0",
      );
    });
  };

  // 2. Definición estática de columnas
  const columnas = [
    {
      width: "80px",
      title: "Distancia",
      dataIndex: "distancia",
      key: "distancia",
      render: (text, record, index) => (
        <Form.Item name={[index, "distancia"]} style={{ margin: 0 }}>
          <Select style={{ width: 90 }}>
            <Select.Option value="ambos">Ambos</Select.Option>
            <Select.Option value="lejos">Lejos</Select.Option>
            <Select.Option value="cerca">Cerca</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      width: "80px",
      title: "Lado",
      dataIndex: "lado",
      key: "lado",
      render: (text, record, index) => (
        <Form.Item name={[index, "lado"]} style={{ margin: 0 }}>
          <Select style={{ width: 80 }}>
            <Select.Option value="od">OD</Select.Option>
            <Select.Option value="oi">OI</Select.Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "sg",
      key: "sg",
      width: "350px",
      render: (text, record, index) => (
        <Form.Item name={[index, "sg"]} style={{ margin: 0 }}>
          <Select
            showSearch
            optionFilterProp="label"
            style={{ width: "100%" }}
            options={subgrupoData || []}
            onChange={(val) => {
              handleSelectChange(val, index);
            }}
          />
        </Form.Item>
      ),
    },
    {
      hidden: true,
      dataIndex: "idcodigo",
      key: "idcodigo",
      render: (text, record, index) => (
        <Form.Item name={[index, "idcodigo"]} hidden style={{ margin: 0 }}>
          <Input />
        </Form.Item>
      ),
    },

    {
      width: "80px",
      title: "Esfera (ESF)",
      dataIndex: "esf",
      key: "esf",
      render: (text, record, index) => (
        <Form.Item name={[index, "esf"]} style={{ margin: 0 }}>
          <Input placeholder="ej: -2.50" style={{ width: 90 }} />
        </Form.Item>
      ),
    },
    {
      width: "90px",
      title: "Cilindro (CIL)",
      dataIndex: "cil",
      key: "cil",
      render: (text, record, index) => (
        <Form.Item name={[index, "cil"]} style={{ margin: 0 }}>
          <Input placeholder="ej: -1.00" style={{ width: 90 }} />
        </Form.Item>
      ),
    },
    {
      width: "100px",
      title: "Eje (°)",
      dataIndex: "eje",
      key: "eje",
      render: (text, record, index) => (
        <Form.Item name={[index, "eje"]} style={{ margin: 0 }}>
          <InputNumber
            placeholder="90"
            min={0}
            max={180}
            style={{ width: 80 }}
          />
        </Form.Item>
      ),
    },
    {
      width: "100px",
      title: "Adición (AD)",
      dataIndex: "ad",
      key: "ad",
      render: (text, record, index) => (
        <Form.Item name={[index, "ad"]} style={{ margin: 0 }}>
          <Input placeholder="ej: +1.50" style={{ width: 90 }} />
        </Form.Item>
      ),
    },
  ];

  if (!subgrupoData) {
    return <Card loading title="Cargando subgrupos de venta..." />;
  }

  return (
    <>
      <h3>{`Médico: ${jsonServer?.data?.medico_nombre || "No indicado"}`}</h3>
      {/* SE CORRIGE AQUÍ: Se inyectan los datos usando initialValues de manera directa */}
      <Form
        form={form}
        onFinish={alEnviar}
        initialValues={{ recetas: datosInicialesAplanados }}
      >
        <Form.List name="recetas">
          {(fields) => (
            <Table
              className="zero-padding-table"
              dataSource={fields}
              columns={columnas}
              pagination={false}
              bordered
              rowKey="key"
              scroll={{ y: 400 }}
            />
          )}
        </Form.List>

        <Button
          type="primary"
          htmlType="submit"
          block
          style={{ marginTop: 16 }}
        >
          Aceptar
        </Button>
      </Form>
    </>
  );
};

export default ProcessIAResponse;
