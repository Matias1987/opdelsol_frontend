import React, { useState } from 'react';
import { Table, Input } from 'antd';
import SelectCodigoVenta from '@/components/forms/ventas/SelectCodigoVenta';
import globals from '@/src/globals';

const PrescriptionTable = () => {
  const [formValues, setFormValues] = useState({
    od: { esf: '', cil: '', eje: '', precio: '' },
    oi: { esf: '', cil: '', eje: '', precio: '' },
    armazon: { esf: '', cil: '', eje: '', precio: '' },
    tratamiento: { esf: '', cil: '', eje: '', precio: '' },
  });

  const handleChange = (key, dataIndex, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [dataIndex]: value,
      },
    }));
  };

  const dataSource = [
    { key: 'od', codigo: 'od', esf: true, cil: true, eje: true, precio: true },
    { key: 'oi', codigo: 'oi', esf: true, cil: true, eje: true, precio: true },
    { key: 'armazon', codigo: 'armazon', esf: true, cil: false, eje: false, precio: true },
    { key: 'tratamiento', codigo: 'tratamiento', esf: true, cil: false, eje: false, precio: true },
  ];

  const columns = [
    { title: 'Código', dataIndex: 'codigo', key: 'codigo', render:(_, record)=><><SelectCodigoVenta
                hideExtOpt={"1"}
                idfamilias={[globals.familiaIDs.ARMAZON]}
                buttonText={"Seleccionar..."}
                callback={(v) => {}} /> </> },
    {
      title: 'Esf',
      dataIndex: 'esf',
      key: 'esf',
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            placeholder="Input"
            value={formValues[record.key].esf}
            onChange={(e) => handleChange(record.key, 'esf', e.target.value)}
          />
        ) : (
          '-'
        ),
    },
    {
      title: 'Cil',
      dataIndex: 'cil',
      key: 'cil',
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            placeholder="Input"
            value={formValues[record.key].cil}
            onChange={(e) => handleChange(record.key, 'cil', e.target.value)}
          />
        ) : (
          '-'
        ),
    },
    {
      title: 'Eje',
      dataIndex: 'eje',
      key: 'eje',
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            placeholder="Input"
            value={formValues[record.key].eje}
            onChange={(e) => handleChange(record.key, 'eje', e.target.value)}
          />
        ) : (
          '-'
        ),
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
      render: (hasInput, record) =>
        hasInput ? (
          <Input
            placeholder="Input"
            value={formValues[record.key].precio}
            onChange={(e) => handleChange(record.key, 'precio', e.target.value)}
          />
        ) : (
          '-'
        ),
    },
  ];

  return <Table size='small' dataSource={dataSource} columns={columns} pagination={false} />;
};

export default PrescriptionTable;
