import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Select, Space, Input } from "antd";
import { useEffect, useState } from "react";

const SelectVendedor = ({ onChange }) => {
  const [selectedVendedor, setSelectedVendedor] = useState(-1);
  const [data, setData] = useState([]);

  const handleChange = (value) => {
    alert(value);
    setSelectedVendedor(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(()=>{
    load();
  },[]);


  const load = ()=>{
    fetch(get.get_vendedores)
    .then(response => response.json())
    .then(response => {
        alert(JSON.stringify(response));
      console.log(response);
      setData(response.data.map(item => ({ ...item, ...{ value: item.idusuario, label: item.nombre } })));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div style={{padding:"6px", backgroundColor:"#feffd6ff", borderRadius:"16px"}}>
      <Space>
        <Space.Compact>
          <span style={{ padding: "6px" }}>Vendedor:</span>
          <Input
            prefix="Nro.:"
            defaultValue={1}
            value={selectedVendedor}
            style={{ width: "170px" }}
            size="small"
          />
          <Select
            defaultValue={1}
            options={data}
            onChange={handleChange}
            value={selectedVendedor}
            style={{ width: "300px" }}
          />
        </Space.Compact>
      </Space>
    </div>
  );
};

export default SelectVendedor;
