import { get } from "@/src/urls";
import  FilterTwoTone from "@ant-design/icons/FilterTwoTone";
import { Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

const SelectItem = ({ tipo, callback }) => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Updates instantly for the Input UI
  const [searchString, setSearchString] = useState(""); // Updates after user pauses typing
  const columns = [{ dataIndex: "codigo" , render:(_,{codigo}) =><span style={{fontWeight:"600", color:"#0a0033", fontSize:"1.2em"}}>{codigo}</span>}, ];
  // Simple, dependency-free debounce helper
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // 2. Pre-index lowercase strings ONCE when dataSource changes (Popup opens)
  const searchIndex = useMemo(() => {
    return dataSource.map((record) => {
      const val = record?.codigo;
      if (val === undefined || val === null) return "";
      return typeof val === "string" ? val.toLowerCase() : String(val);
    });
  }, [dataSource]);

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearchString(value), 150),
    [],
  );

  // 2. High-performance filtering loop targeting the pre-indexed "codigo"
  const filteredData = useMemo(() => {
    const cleanedSearch = searchString.trim();

    // 1. If search is empty, return original data (no sort needed)
    if (cleanedSearch.length < 1) return dataSource;

    const parts = cleanedSearch.toLowerCase().split(/\s+/);
    const partsLen = parts.length;
    const dataLen = dataSource.length;
    const matches = [];

    // 2. High-performance filtering loop
    for (let i = 0; i < dataLen; i++) {
      const codigoStr = searchIndex[i];
      let found = true;
      for (let j = 0; j < partsLen; j++) {
        if (!codigoStr.includes(parts[j])) {
          found = false;
          break;
        }
      }
      if (found) {
        matches.push({
          item: dataSource[i],
          length: codigoStr.length,
        });
      }
    }

    // 3. Sort the matched results by the pre-calculated length (increasing order)
    matches.sort((a, b) => a.length - b.length);

    // 4. Extract and return just the original objects
    return matches.map((match) => match.item);
  }, [searchString, dataSource, searchIndex]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const load = () => {
    setLoading(true);
    const url =
      "stock" == tipo ? get.venta_mayorista_bases : get.venta_mayorista_stock;
    //alert(url);
    fetch(url)
      .then((r) => r.json())
      .then((response) => {
        setLoading(false);

        if (!response?.data) {
          return;
        }
        //alert(JSON.stringify(response));
        setDataSource(
          response.data.map((record) => ({
            id: record.idcodigo,
            codigo: record.codigo,
            precio_minorista: record.precio,
            precio_mayorista: record.precio_mayorista,
          })),
        );
      });
  };

  useEffect(() => {
    load();
  }, []);

  const header = () => (
    <>
      <Input
        prefix={<><FilterTwoTone /></>}
        style={{ width: "100%" }}
        allowClear
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );

  return (
    <>
      <Table
        size="small"
        showHeader={false}
        loading={loading}
        title={header}
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        scroll={{ y: 400 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (_) => {
              callback?.(record);
            },
          };
        }}
      />
    </>
  );
};

export default SelectItem;
