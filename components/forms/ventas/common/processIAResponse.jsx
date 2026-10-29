import React, { useMemo } from "react";
import { Form, Table, Select, Input, InputNumber, Button, Card } from "antd";
import { procesar_seleccion } from "@/src/helpers/venta_multiple_helper";

const ProcessIAResponse = ({ jsonServer, callback }) => {
  const [form] = Form.useForm();

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

    const final = procesar_seleccion(payload);

    alert(JSON.stringify(final, null, 2));

    callback(final);
  };

  // 2. Definición estática de columnas
  const columnas = [
    {
      width: "110px",
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
      width: "100px",
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
      width: "100px",
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
      width: "100px",
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
              scroll={{ y: 600 }}
              dataSource={fields}
              columns={columnas}
              pagination={false}
              bordered
              rowKey="key"
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
