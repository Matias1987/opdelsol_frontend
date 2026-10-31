import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Select, Button, Alert, Space, Typography } from 'antd';
import { EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function BranchSelection({ branches = [], userId }) {
  const [selectedBranch, setSelectedBranch] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!selectedBranch) {
      setError('Por favor, selecciona una sucursal para continuar.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/set-branch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, branchId: selectedBranch }),
      });

      if (!response.ok) throw new Error('Error al establecer la sucursal.');

      const data = await response.json();
      sessionStorage.setItem('current_branch', selectedBranch);

      // Redirigir al dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '0 16px'
    }}>
      <Card 
        style={{ 
          maxWidth: 420, 
          width: '100%', 
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <EnvironmentOutlined style={{ fontSize: 36, color: '#1677ff', marginBottom: 12 }} />
            <Title level={3} style={{ margin: 0 }}>
              Selecciona tu sucursal
            </Title>
            <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
              Detectamos que puedes operar en múltiples locaciones. Por favor, indica dónde te encuentras hoy.
            </Text>
          </div>

          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              closable 
              onClose={() => setError('')} 
            />
          )}

          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>
                Sucursal Actual
              </label>
              <Select
                placeholder="-- Selecciona una sucursal --"
                style={{ width: '100%' }}
                size="large"
                value={selectedBranch}
                onChange={(value) => setSelectedBranch(value)}
                disabled={loading}
                options={branches.map(branch => ({
                  value: branch.id,
                  label: branch.code ? `${branch.name} (${branch.code})` : branch.name
                }))}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                showSearch
              />
            </div>

            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              disabled={!selectedBranch}
              icon={<ArrowRightOutlined />}
              onClick={handleSubmit}
              style={{ marginTop: 8 }}
            >
              Confirmar e Ingresar
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}
