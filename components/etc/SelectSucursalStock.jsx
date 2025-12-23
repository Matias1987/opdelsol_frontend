import { get } from "@/src/urls";
import { Checkbox } from "antd";
import { useState, useEffect } from "react";

const SelectSucursalStock = ({ onSucursalSelect, disabled }) => {
  const [sucursales, setSucursales] = useState([]);

  const loadSucursales = () => {
    fetch(get.sucursales)
      .then((r) => r.json())
      .then((r) => {
        
        setSucursales(
          _s=>{
            const _ns = r.data.map((s) => ({
                                ...s,
                                checked: true,
                            }));
            onSucursalSelect?.((_ns.filter(_s=>_s.checked)).map(_s=>_s.idsucursal))

            return _ns;

          }
        );
      });
  };

  useEffect(()=>{
    loadSucursales();
  },[])

  return <>
  {
    sucursales.map(record=><><Checkbox
        checked={record.checked}
            onChange={(_) => {
              setSucursales((_s) =>{
                const _ns = _s.map((__s) =>
                  record.idsucursal == __s.idsucursal
                    ? { ...__s, checked: !__s.checked }
                    : __s
                );

                onSucursalSelect?.((_ns.filter(_s=>_s.checked)).map(_s=>_s.idsucursal))

                return _ns;
              }
                
              );
            }}
        >{record.nombre}</Checkbox> </>)
  }
  </>
};


export default SelectSucursalStock;