import React from 'react';
import { Form, Rate, Input, Button, Card, message } from 'antd';
import { StarFilled, UserOutlined, MessageOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const FeedbackForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Datos enviados:', values);
    // Aquí conectarías con tu API/Backend
    message.success({
      content: '¡Muchas gracias por tu calificación!',
      duration: 3,
    });
    form.resetFields();
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#fff8f8',
      padding: '16px'
    }}>
      <Card 
        bordered={false}
        style={{
          width: '100%',
          maxWidth: '450px',
          borderRadius: '16px',
        }}
      >
        {/* Encabezado de la Tarjeta */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>
            Tu opinión nos importa
          </h2>
          <p style={{ color: '#8c8c8c', margin: 0, fontSize: '14px' }}>
            Ayúdanos a mejorar calificando la atención que recibiste hoy.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Campo: Calificación con Estrellas */}
          <Form.Item
            name="rating"
            label={<span style={{ fontWeight: '500' }}>¿Cómo calificarías la atención?</span>}
            rules={[{ required: true, message: 'Por favor, selecciona una estrella' }]}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            <Rate 
              style={{ fontSize: '36px', backgroundColor: '#fff0f0', padding: '8px', borderRadius: '8px' }} 
              character={<StarFilled />}
            />
          </Form.Item>

          {/* Campo: Nombre del Vendedor (Opcional) */}
          <Form.Item
            name="sellerName"
            label={<span style={{ fontWeight: '500' }}>Nombre del vendedor (Opcional)</span>}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Ej. Juan Pérez" 
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          {/* Campo: Comentarios */}
          <Form.Item
            name="comment"
            label={<span style={{ fontWeight: '500' }}>Déjanos tu comentario</span>}
            rules={[{ required: true, message: 'Por favor, escribe un breve comentario' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="¿Qué fue lo que más te gustó o qué podríamos mejorar?" 
              maxLength={300}
              showCount
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          {/* Botón de Envío */}
          <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block
              size="large"
              style={{ 
                height: '48px', 
                borderRadius: '8px', 
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Enviar Calificación
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
