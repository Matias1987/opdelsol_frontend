import globals from "@/src/globals";
import { get } from "@/src/urls";
import { Select, Space, Input } from "antd";
import { useEffect, useState } from "react";

const SelectVendedor = ({ onChange }) => {
  const [selectedVendedor, setSelectedVendedor] = useState(-1);
  const [idInput, setIdInput] = useState(-1)
  const [data, setData] = useState([]);

  const handleChange = (value) => {
    //alert(value);
    setSelectedVendedor(value);
    setIdInput(value)
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
        
      console.log(response);
      const __data = [ ...[{value: -1, label: "Seleccione..."}],
                        ...response.data.map(item => ({ ...item, ...{ value: item.idusuario, label: item.nombre } }))
                      ]
      setData(__data);

      const multiple_instances = +globals.multInstances()==1;

      const __id = multiple_instances ? -1 : +globals.obtenerUID();


      setSelectedVendedor(__id);
      onChange?.(__id);
      setIdInput(__id);
      //alert(JSON.stringify(__data));
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  return (
    <div style={{fontSize:".9em", padding:"8px", color:"blue", backgroundColor:"rgba(0,0,0,0)", borderRadius:"16px"}}>
      <Space size={"small"}>
        <Space.Compact>
        
          <Select
            prefix="Vendedor: "
            defaultValue={-1}
            options={data}
            onChange={handleChange}
            value={selectedVendedor}
            style={{ width: "300px", fontSize:".9em" }}
          />&nbsp;
          <Input
            prefix="Nro.:"
            defaultValue={+globals.obtenerUID()}
            value={idInput}
            style={{ width: "100px", fontSize:".9em" }}
            size="small"
            onChange={e=>{
              setIdInput(parseInt(e.target.value||"0"))
            }}
            onPressEnter={(e)=>{
              const id = parseInt(idInput)
              if(typeof data.find(r=>r.value==id)!== 'undefined')
              {
                setSelectedVendedor(id)
              }
              else{
                alert("Vendedor no encontrado")
                setIdInput(selectedVendedor)
              }
              
            }}
          />
          
        </Space.Compact>
      </Space>
    </div>
  );
};

export default SelectVendedor;
