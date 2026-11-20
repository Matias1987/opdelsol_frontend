"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Modal, Input, Table, Button, Space, Tag, message } from "antd";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";

const { Search } = Input;

const normalizeText = (text) => {
  if (text === null || text === undefined) return "";
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function SearchSelectorModal({
  open,
  onCancel,
  onSelect,
  fetchData,
  columns = [],
  searchKeys = [],
  rowKey = "id",
  title = "Buscar y seleccionar",
  placeholder = "Escribe para buscar...",
  debounceMs = 500,
  // --- NUEVA PROP ---
  multiple = false, // false: selección única | true: selección múltiple con checkboxes
  initialSelectedItems = [], // Opcional: elementos ya seleccionados previamente
}) {
  const [searchText, setSearchText] = useState("");
  const [serverData, setServerData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estado para selección múltiple (guarda un mapa { [id]: objetoCompleto })
  const [selectedMap, setSelectedMap] = useState({});

  const debounceTimer = useRef(null);
  const lastFetchedQuery = useRef(null);

  const loadItems = useCallback(
    async (query = "") => {
      if (!fetchData) return;
      const cleanQuery = query.trim();

      if (lastFetchedQuery.current === cleanQuery) return;
      lastFetchedQuery.current = cleanQuery;

      setLoading(true);
      try {
        const items = await fetchData(cleanQuery);
        setServerData(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        message.error("No se pudieron cargar los datos");
        lastFetchedQuery.current = null;
      } finally {
        setLoading(false);
      }
    },
    [fetchData],
  );

  // Inicialización al abrir el modal
  useEffect(() => {
    if (open) {
      setSearchText("");
      lastFetchedQuery.current = null;
      loadItems("");

      // Precarga elementos seleccionados si los hubiera en modo múltiple
      if (multiple && Array.isArray(initialSelectedItems)) {
        const initialMap = {};
        initialSelectedItems.forEach((item) => {
          if (item && item[rowKey] !== undefined) {
            initialMap[item[rowKey]] = item;
          }
        });
        setSelectedMap(initialMap);
      } else {
        setSelectedMap({});
      }
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [open, loadItems, multiple, initialSelectedItems, rowKey]);

  // Filtrado local instantáneo sin tildes
  const filteredData = useMemo(() => {
    const term = normalizeText(searchText.trim());
    if (!term || searchKeys.length === 0) return serverData;

    return serverData.filter((item) =>
      searchKeys.some((key) => {
        const value = key.split(".").reduce((obj, k) => obj?.[k], item);
        return normalizeText(value).includes(term);
      }),
    );
  }, [serverData, searchText, searchKeys]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (val.trim() === "") {
      loadItems("");
      return;
    }

    debounceTimer.current = setTimeout(() => {
      loadItems(val);
    }, debounceMs);
  };

  const handleManualSearch = (value) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    loadItems(value);
  };

  // --- MODO ÚNICO: Selecciona y cierra al instante ---
  const handleSingleSelect = (record) => {
    if (onSelect) onSelect(record);
    onCancel();
  };

  // --- MODO MÚLTIPLE: Alterna la selección de una fila ---
  const toggleRowSelection = (record) => {
    const key = record[rowKey];
    setSelectedMap((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = record;
      }
      return next;
    });
  };

  // --- MODO MÚLTIPLE: Confirma todos los elegidos ---
  const handleConfirmMultiple = () => {
    if (onSelect) {
      onSelect(Object.values(selectedMap));
    }
    onCancel();
  };

  const selectedKeys = useMemo(() => Object.keys(selectedMap), [selectedMap]);

  // Configuración de checkboxes de Ant Design Table (solo si multiple === true)
  const rowSelection = useMemo(() => {
    if (!multiple) return undefined;

    return {
      selectedRowKeys: selectedKeys,
      preserveSelectedRowKeys: true, // Mantiene selección aunque cambien los resultados de búsqueda
      onSelect: (record) => toggleRowSelection(record),
      onSelectAll: (selected, selectedRows, changeRows) => {
        setSelectedMap((prev) => {
          const next = { ...prev };
          changeRows.forEach((row) => {
            const key = row[rowKey];
            if (selected) {
              next[key] = row;
            } else {
              delete next[key];
            }
          });
          return next;
        });
      },
    };
  }, [multiple, selectedKeys, rowKey]);

  // En modo único agrega el botón "Elegir"; en modo múltiple usa los checkboxes nativos
  const tableColumns = useMemo(() => {
    if (multiple) return columns;

    return [
      ...columns,
      {
        title: "Acción",
        key: "__action__",
        width: 110,
        fixed: "right",
        render: (_, record) => (
          <Button
            type="primary"
            size="small"
            icon={<CheckOutlined />}
            onClick={() => handleSingleSelect(record)}
          >
            Elegir
          </Button>
        ),
      },
    ];
  }, [columns, multiple]);

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      width={750}
      centered
      destroyOnClose
      // En modo múltiple mostramos el pie con el contador y botón de confirmar
      footer={
        multiple ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Tag color={selectedKeys.length > 0 ? "blue" : "default"}>
                {selectedKeys.length}{" "}
                {selectedKeys.length === 1 ? "seleccionado" : "seleccionados"}
              </Tag>
              {selectedKeys.length > 0 && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => setSelectedMap({})}
                >
                  Limpiar selección
                </Button>
              )}
            </div>
            <Space>
              <Button onClick={onCancel}>Cancelar</Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleConfirmMultiple}
                disabled={selectedKeys.length === 0}
              >
                Confirmar ({selectedKeys.length})
              </Button>
            </Space>
          </div>
        ) : null
      }
    >
      <Space direction="vertical" style={{ width: "100%" }} size="middle">
        <Search
          placeholder={placeholder}
          allowClear
          enterButton={
            <Button type="primary" icon={<SearchOutlined />}>
              Buscar
            </Button>
          }
          size="large"
          value={searchText}
          onChange={handleInputChange}
          onSearch={handleManualSearch}
          loading={loading}
        />

        <Table
          columns={tableColumns}
          dataSource={filteredData}
          rowKey={rowKey}
          rowSelection={rowSelection}
          loading={loading}
          size="middle"
          scroll={{ x: 450, y: 320 }}
          locale={{
            emptyText: loading
              ? "Buscando..."
              : "No se encontraron coincidencias",
          }}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            simple: true,
          }}
          onRow={(record) => ({
            // En modo múltiple, un clic en la fila marca/desmarca el checkbox; en único, doble clic selecciona
            onClick: () => {
              if (multiple) toggleRowSelection(record);
            },
            onDoubleClick: () => {
              if (!multiple) handleSingleSelect(record);
            },
            style: { cursor: "pointer" },
          })}
        />
      </Space>
    </Modal>
  );
}

/**
 * ejemplos
 * const PRODUCT_COLUMNS = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 100 },
  { title: 'Producto', dataIndex: 'name', key: 'name', ellipsis: true },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
    width: 110,
    render: (val) => `$${Number(val).toLocaleString('es-AR')}`,
  },
];

  const fetchProducts = useCallback(async (query) => {
    const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.items;
  }, []);

  
 *  <SearchSelectorModal
        open={activeModal === 'products'}
        onCancel={() => setActiveModal(null)}
        onSelect={(product) => setSelectedProduct(product)}
        title="Buscar Producto"
        placeholder="Buscar por SKU o nombre del artículo..."
        fetchData={fetchProducts}
        columns={PRODUCT_COLUMNS}
        searchKeys={['sku', 'name', 'category.name']} // Soporta propiedades anidadas
        rowKey="id"
      />

       MODO MÚLTIPLE: onSelect recibe un array de objetos 
<SearchSelectorModal
  open={openProductsModal}
  onCancel={() => setOpenProductsModal(false)}
  onSelect={(productos) => setSelectedProducts(productos)}
  multiple={true}
  initialSelectedItems={selectedProducts} // Mantiene marcados los que ya habías elegido
  title="Agregar Productos"
  fetchData={fetchProducts}
  columns={PRODUCT_COLUMNS}
  searchKeys={['sku', 'name']}
/>
 */
