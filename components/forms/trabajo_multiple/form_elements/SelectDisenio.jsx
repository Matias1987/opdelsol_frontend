import { post_method } from "@/src/helpers/post_helper";
import { get, post } from "@/src/urls";
import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectDisenio = ({ idgrupo, callback, style, idcliente }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selection, setSelection] = useState(null);
  const [descuento, setDescuento] = useState(null);

  const load_discounts = (idsubgrupo, callback1) => {
    //alert(JSON.stringify({ idsubgrupo: idsubgrupo, idcliente: idcliente || null }));
    post_method(
      post.descuentos_subgrupo_cliente,
      { idsubgrupo: idsubgrupo, idcliente: idcliente || null },
      (response) => {
        callback1?.(response);
      },
    );
  };

  const load = () => {
    setSelection(null);
    if (!idgrupo || +idgrupo < 0) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const url = get.subgrupo_por_grupo_v2 + idgrupo;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const options = res.data.map((sg) => ({
          label: sg.nombre_corto,
          value: sg.idsubgrupo,
          precio: sg.precio_defecto_mayorista,
        }));
        setData(options);
        setLoading(false);
      });
    //... to do
  };

  useEffect(() => {
    load();
  }, [idgrupo]);

  const onChange = (val) => {
    setDescuento(null);
    setSelection(val);
    setLoading(true);
    load_discounts(val, (response) => {
        let dto = null;
      if (response && response?.length > 0) {
        dto = response[0];
        setDescuento(response[0]);
      }
      const selectedgrupo = data.find((d) => d.value === val);

      callback?.({idsubgrupo: val, descuento: dto? dto?.porcentaje: 0, precio: selectedgrupo.precio, iddescuento: dto ? dto?.id_descuento: null});
      setLoading(false);
    });
  };

  return +idgrupo>0 ? (
    <Select
      value={selection}
      placeholder="Seleccione un diseño"
      style={style}
      loading={loading}
      options={data}
      onChange={onChange}
    />
  ) : <div style={{padding:"6px"}}><span style={{fontWeight:"600", color:"gray", fontStyle:"italic", fontSize:"11px"}}>Seleccione Tipo...</span></div>;
};

export default SelectDisenio;
