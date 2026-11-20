'use client';

import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Space,
  Modal,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function LoginPage({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Reemplaza por tu llamada real al endpoint de autenticación
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Usuario o contraseña incorrectos');
      }

      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* PANEL IZQUIERDO: Branding / Identidad (Oculto en móviles xs/sm) */}
      <Col
        xs={0}
        md={12}
        lg={14}
        style={{
          background: 'linear-gradient(135deg, #001529 0%, #0958d9 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
        }}
      >
        {/* Cabecera del panel */}
        <Space align="center" size={12}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            <SafetyCertificateOutlined />
          </div>
          <Text strong style={{ color: '#fff', fontSize: 18, letterSpacing: 0.5 }}>
            SISTEMA DE GESTIÓN
          </Text>
        </Space>

        {/* Mensaje central */}
        <div style={{ maxWidth: 460 }}>
          <Title level={1} style={{ color: '#fff', marginBottom: 16, fontWeight: 700 }}>
            Operaciones ágiles en todas tus sucursales.
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
            Ingresa con tus credenciales asignadas para acceder al panel operativo,
            control de stock y gestión diaria.
          </Text>
        </div>

        {/* Pie del panel */}
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
          © {new Date().getFullYear()} • Acceso exclusivo para personal autorizado
        </Text>
      </Col>

      {/* PANEL DERECHO: Formulario de Login (100% ancho en móviles) */}
      <Col
        xs={24}
        md={12}
        lg={10}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
          background: 'linear-gradient(180deg, #e6f4ff 0%, #f5f7fa 40%)',
        }}
      >
        <Card
          bordered={false}
          style={{
            width: '100%',
            maxWidth: 420,
            borderRadius: 16,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          }}
          styles={{ body: { padding: '36px 28px' } }}
        >
          {/* Logo visible solo en móviles (ya que el panel izquierdo se oculta) */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                backgroundColor: '#e6f4ff',
                color: '#1677ff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 26,
                marginBottom: 14,
              }}
            >
              <SafetyCertificateOutlined />
            </div>
            <Title level={3} style={{ margin: '0 0 4px 0' }}>
              Bienvenido
            </Title>
            <Text type="secondary">
              Ingresa tu usuario y contraseña para continuar
            </Text>
          </div>

          {/* Alerta de error de credenciales */}
          {errorMsg && (
            <Alert
              message={errorMsg}
              type="error"
              showIcon
              closable
              onClose={() => setErrorMsg(null)}
              style={{ marginBottom: 20, borderRadius: 8 }}
            />
          )}

          {/* Formulario */}
          <Form
            name="login_form"
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
            size="large"
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Ej. jperez"
                autoComplete="username"
                autoCapitalize="none" // Evita mayúsculas automáticas en teclados móviles
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
              style={{ marginBottom: 24 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={loading}
                block
                style={{ height: 46, borderRadius: 8, fontWeight: 600 }}
              >
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>

          {/* Pie de ayuda para usuarios internos */}
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Button
              type="link"
              size="small"
              icon={<QuestionCircleOutlined />}
              onClick={() => setHelpOpen(true)}
              style={{ color: '#8c8c8c' }}
            >
              ¿No puedes ingresar o olvidaste tu clave?
            </Button>
          </div>
        </Card>
      </Col>

      {/* Modal informativo de soporte interno */}
      <Modal
        title="Soporte de Acceso"
        open={helpOpen}
        onCancel={() => setHelpOpen(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setHelpOpen(false)}>
            Entendido
          </Button>,
        ]}
        centered
      >
        <p>
          Las cuentas de acceso son administradas internamente. Si olvidaste tu
          contraseña o aún no tienes un usuario asignado, comunícate con el{' '}
          <b>Administrador del Sistema</b> o con el área de soporte interno para
          solicitar el blanqueo de clave.
        </p>
      </Modal>
    </Row>
  );
}
