import fetchConRetryYTimeout from "@/src/helpers/get_helper";
import { get } from "@/src/urls";
import { Select } from "antd";
import { useEffect, useState } from "react";

const SelectSubgrupoTipoVenta = ({ callback, pWidth }) => {
  const [data, setData] = useState(null);

  const load_tipos_cristales = async () => {
    const response = await fetchConRetryYTimeout(
      get.obtener_subgrupos_tipo_venta,
    );
    setData(
      response.data.map((sg) => ({
        value: sg.idsubgrupo,
        label: sg.nombre_corto,
      })),
    );
  };

  useEffect((_) => {
    load_tipos_cristales();
  }, []);

  if (null === data) {
    return <></>;
  }

  return (
    <>
      <Select
        prefix="Tipo"
        options={data}
        width={pWidth ?? "300px"}
        onChange={(val) => callback(val)}
      />
    </>
  );
};

export default SelectSubgrupoTipoVenta;
