import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const TreeMapVentasCategoriaPeriodo = ({ reload }) => {
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  const creation_fnt = (src, compare_method, get_array_method, shouldAdd=false) => {
    let result_array = [];

    src.forEach((row) => {
      const e_row = result_array.find((__r) => compare_method(__r, row));
      if (e_row) {
        //update
        result_array = result_array.map((_r) =>
          compare_method(_r, row) ? [_r[0], _r[1],  _r[2] + shouldAdd ? +row.qtty : 0] : _r,
        );
        return;
      }

      result_array.push(get_array_method(row));
    });
    return result_array;
  };

  const obtener_array_totales = (src) => {
    let result_array = [];
    src.forEach((row) => {
        const f = result_array.find(f=>f.idfamilia=== row.familia_idfamilia);
        const sf = result_array.find(f=>f.idsubfamilia=== row.subfamilia_idsubfamilia);
        const g = result_array.find(f=>f.idgrupo=== row.grupo_idgrupo);
        const sg = result_array.find(f=>f.idsubgrupo=== row.subgrupo_idsubgrupo);
        if(f)
        {
            result_array = result_array.map(_r=>_r.id === f.idfamilia ? ({..._r, qtty:  _r.qtty + row.qtty}) : _r);
        }
        else{
            result_array.push({id: row.idfamilia, qtty: row.qtty});
        }
        if(sf)
        {
            result_array = result_array.map(_r=>_r.id === sf.idsubfamilia ? ({..._r, qtty: _r.qtty + row.qtty}) : _r);
        }
        else{
            result_array.push({id: row.idfamilia, qtty: row.qtty});
        }
        if(g)
        {
            result_array = result_array.map(_r=>_r.id === g.idgrupo ? ({..._r, qtty: _r.qtty + row.qtty}) : _r);
        }
        else{
            result_array.push({id: row.idgrupo, qtty: row.qtty});
        }
        if(sg)
        {
            result_array = result_array.map(_r=>_r.id === sg.idsubgrupo ? ({..._r, qtty: _r.qtty + row.qtty}) : _r);
        }
        else{
            result_array.push({id: row.idsubgrupo, qtty: row.qtty});
        }
    });
    return result_array;
  };

  const obtener_array_final = (src) => {
    const header = ["Location", "Parent", "Market trade volume (size)"];
    const root = [{ v: "root", f: "Todos" }, null, 0];

    const familia_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "f" + rw.idfamilia,
      (rw) => [{ v: "f" + rw.idfamilia.toString(), f: rw.nf }, "root", 0],
    );

    const subfamilia_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "sf" + rw.idsubfamilia,
      (rw) => [
        { v: "sf" + rw.idsubfamilia.toString(), f: rw.nsf },
        "f" + rw.familia_idfamilia.toString(),
        0,
      ],
    );

    const grupo_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "g" + rw.idgrupo,
      (rw) => [
        { v: "g" + rw.idgrupo.toString(), f: rw.ng },
        "sf" + rw.subfamilia_idsubfamilia.toString(),
        0,
      ],
    );
    const subgrupo_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "sg" + rw.idsubgrupo,
      (rw) => [
        { v: "sg" + rw.idsubgrupo.toString(), f: rw.nsg },
        "g" + rw.grupo_idgrupo.toString(),
        0,
      ],
    );
    const codigo_part = creation_fnt(
      src,
      (rc, rw) => rc[0].v === "c" + rw.idcodigo,
      (rw) => [
        { v: "c" + rw.idcodigo.toString(), f: rw.cod },
        "sg" + rw.subgrupo_idsubgrupo.toString(),
        +rw.qtty,
      ],
      true,
    );


    return [
      ...[header],
      ...[root],
      ...familia_part,
      ...subfamilia_part,
      ...grupo_part,
      ...subgrupo_part,
      ...codigo_part,
    ];
  };

  const load = () => {
    post_method(post.total_ventas_categorias_periodo, {}, (response) => {
      //alert(JSON.stringify(response))
      const array_final = obtener_array_final(response.data);
      //const qtties = obtener_array_totales(response.data);
      //alert(JSON.stringify(qtties));
      setData(array_final);
    });
  };

  useEffect(() => {
    load();
  }, [reload]);

  const options = {
    minColor: "#f00",
    midColor: "#ddd",
    maxColor: "#0d0",
    headerHeight: 15,
    fontColor: "black",
    showScale: true,
  };
  return (
    <>
      <Chart
        key={loading}
        chartType="TreeMap"
        width="700px"
        height="700px"
        data={data}
        options={options}
      />
    </>
  );
};

export default TreeMapVentasCategoriaPeriodo;
