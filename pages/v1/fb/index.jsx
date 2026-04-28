import { useEffect, useState } from 'react';
import { Form, Input, Button, Rate } from 'antd';
import LayoutSingle from '@/components/layout/layout_single';

export default function ClientFeedbackForm(){
  const [form] = Form.useForm();
  const [pIdVenta, setIdVenta] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    alert(window.location.search)
    const params = new URLSearchParams(window.location.search);
    //alert(params)//shows  idventa=9090

    const idventa = params.get('idventa');

    if(!idventa) {
      alert('No se encontró el ID de venta en la URL');
      return;
    }
    
    setIdVenta(idventa);
  }, []);

  const onFinish = (values) => {
    console.log('Form values:', values);
    // Here you can send values to your backend (e.g., via fetch/axios)
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 500, margin: '0 auto' }}
    >
      <Form.Item
        name="rating"
        label="Calificación de la atención"
        rules={[{ required: true, message: 'Por favor selecciona una calificación' }]}
      >
        <Rate count={5} />
      </Form.Item>

      <Form.Item
        name="opinion"
        label="Tu opinión sobre el vendedor"
        rules={[{ required: true, message: 'Por favor escribe tu opinión' }]}
      >
        <Input.TextArea rows={4} placeholder="Escribe tu experiencia en la tienda..." />
      </Form.Item>
      <Form.Item
        name="rating"
        label="Calificación del producto"
        rules={[{ required: true, message: 'Por favor selecciona una calificación' }]}
      >
        <Rate count={5} />
      </Form.Item>

      <Form.Item
        name="opinion"
        label="Tu opinión sobre el producto"
        rules={[{ required: true, message: 'Por favor escribe tu opinión' }]}
      >
        <Input.TextArea rows={4} placeholder="Escribe tu experiencia en la tienda..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar opinión
        </Button>
      </Form.Item>
    </Form>
  );
};

ClientFeedbackForm.PageLayout = LayoutSingle;
