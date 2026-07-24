import { get } from "@/src/urls";
import { Input, Table } from "antd";
import { useEffect, useMemo, useState } from "react";

const SelectItem = ({ tipo }) => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [inputValue, setInputValue] = useState(""); // Updates instantly for the Input UI
  const [searchString, setSearchString] = useState(""); // Updates after user pauses typing
  const columns = [];
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

      for (let j = 0; j < partsLen; j++) {
        if (codigoStr.includes(parts[j])) {
          // Cache the string length right here to avoid recalculating it during sort
          matches.push({
            item: dataSource[i],
            length: codigoStr.length,
          });
          break;
        }
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
    const url = "stock" == tipo ? get.venta_mayorista_bases : get.venta_mayorista_stock;
    fetch(url)
    .then(r=>r.json())
    .then(response=>{
        
    })
  };

  useEffect(() => {
    load();
  }, []);

  const header = () => (
    <>
      <Input
        prefix={<></>}
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
        loading={loading}
        title={header}
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </>
  );
};

export default SelectItem;
