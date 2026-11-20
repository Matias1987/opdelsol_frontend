'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Card, Row, Col, Input, Typography, Tag, Empty, Space, Badge, Spin } from 'antd';
import {
  ShopOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  RightOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const normalizeText = (text) => {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export default function BranchSelector({
  branches = [],
  defaultBranchId = null, // NUEVO: ID de la sucursal por defecto del usuario
  currentBranchId = null,
  onSelectBranch,
  loading = false,
}) {
  const [searchText, setSearchText] = useState('');
  const hasAutoSelected = useRef(false); // Evita disparar el callback múltiples veces

  // Busca si la sucursal por defecto existe y está activa
  const validDefaultBranch = useMemo(() => {
    if (!defaultBranchId || loading || branches.length === 0) return null;

    const found = branches.find((b) => b.id === defaultBranchId);
    return found && found.active !== false ? found : null;
  }, [defaultBranchId, branches, loading]);

  // Efecto de auto-selección sin mostrar la interfaz
  useEffect(() => {
    if (validDefaultBranch && !hasAutoSelected.current) {
      hasAutoSelected.current = true;
      if (onSelectBranch) {
        onSelectBranch(validDefaultBranch);
      }
    }
  }, [validDefaultBranch, onSelectBranch]);

  // Filtrado instantáneo por nombre, código o dirección
  const filteredBranches = useMemo(() => {
    const term = normalizeText(searchText.trim());
    if (!term) return branches;

    return branches.filter(
      (branch) =>
        normalizeText(branch.name).includes(term) ||
        normalizeText(branch.code).includes(term) ||
        normalizeText(branch.address).includes(term) ||
        normalizeText(branch.city).includes(term)
    );
  }, [branches, searchText]);

  // Si hay una sucursal por defecto y aún está cargando la lista, mostramos solo un spinner limpio
  if (defaultBranchId && loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
        <Spin size="large" tip="Ingresando a sucursal asignada..." />
      </div>
    );
  }

  // Si encontró una sucursal por defecto válida, no renderiza el menú de selección
  if (validDefaultBranch) {
    return null;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '16px' }}>
      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3} style={{ marginBottom: 4 }}>
          Selecciona tu sucursal
        </Title>
        <Text type="secondary">
          Elige el punto de operación donde vas a trabajar hoy
        </Text>
      </div>

      {/* Buscador (aparece si hay más de 4 sucursales) */}
      {branches.length > 4 && (
        <div style={{ maxWidth: 480, margin: '0 auto 24px auto' }}>
          <Input
            size="large"
            placeholder="Buscar sucursal por nombre, código o ciudad..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}

      {/* Grilla Responsive de Tarjetas */}
      {filteredBranches.length === 0 && !loading ? (
        <Empty description="No se encontraron sucursales con ese criterio" />
      ) : (
        <Row gutter={[16,16]}>
          {filteredBranches.map((branch) => {
            const isSelected = currentBranchId === branch.id;
            const isInactive = branch.active === false;

            return (
              <Col key={branch.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable={!isInactive}
                  loading={loading}
                  onClick={() => {
                    if (!isInactive && onSelectBranch) {
                      onSelectBranch(branch);
                    }
                  }}
                  style={{
                    height: '100%',
                    borderRadius: 12,
                    cursor: isInactive ? 'not-allowed' : 'pointer',
                    opacity: isInactive ? 0.6 : 1,
                    border: isSelected
                      ? '2px solid #1677ff'
                      : '1px solid #f0f0f0',
                    backgroundColor: isSelected ? '#f0f5ff' : '#ffffff',
                    transition: 'all 0.2s ease',
                  }}
                  styles={{
                    body: {
                      padding: '18px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    },
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 12,
                      }}
                    >
                      <Space>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            backgroundColor: isSelected ? '#1677ff' : '#e6f4ff',
                            color: isSelected ? '#fff' : '#1677ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 18,
                          }}
                        >
                          <ShopOutlined />
                        </div>
                        {branch.code && (
                          <Tag color="blue" style={{ margin: 0 }}>
                            {branch.code}
                          </Tag>
                        )}
                      </Space>

                      {isSelected ? (
                        <CheckCircleFilled style={{ color: '#1677ff', fontSize: 20 }} />
                      ) : isInactive ? (
                        <Tag color="default">Cerrada</Tag>
                      ) : (
                        <RightOutlined style={{ color: '#bfbfbf', fontSize: 14 }} />
                      )}
                    </div>

                    <Title level={5} style={{ margin: '0 0 6px 0' }}>
                      {branch.name}
                    </Title>

                    {(branch.address || branch.city) && (
                      <Space align="start" size={6} style={{ marginTop: 4 }}>
                        <EnvironmentOutlined
                          style={{ color: '#8c8c8c', marginTop: 4 }}
                        />
                        <Text type="secondary" style={{ fontSize: 13 }}>
                          {[branch.address, branch.city].filter(Boolean).join(' - ')}
                        </Text>
                      </Space>
                    )}
                  </div>

                  {branch.statusText && (
                    <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid #f5f5f5' }}>
                      <Badge
                        status={isInactive ? 'default' : 'success'}
                        text={
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {branch.statusText}
                          </Text>
                        }
                      />
                    </div>
                  )}
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}
