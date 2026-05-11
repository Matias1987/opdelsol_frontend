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
    post_method(
      post.descuentos_subgrupo_cliente,
      { idsubgrupo: idsubgrupo, idcliente: idcliente || null },
      (response) => {
        callback1?.(response);
      },
    );
  };

  const load = () => {
    if (!idgrupo || +idgrupo < 0) {
      return;
    }
    setLoading(true);
    const url = get.lista_subgrupo + idgrupo;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        //alert(JSON.stringify(res));
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

      callback?.({idsubgrupo: val, descuento: dto.porcentaje, precio: selectedgrupo.precio});
      setLoading(false);
    });
  };

  return (
    <Select
      style={style}
      loading={loading}
      options={data}
      onChange={onChange}
    />
  );
};

export default SelectDisenio;
