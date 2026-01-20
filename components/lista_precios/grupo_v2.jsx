import { get } from "@/src/urls";
import { Button, Col, Modal, Row, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import globals from "@/src/globals";
import { formatFloat } from "@/src/helpers/formatters";
import { EditFilled } from "@ant-design/icons";
/**
 *
 * @param nombre: Nombre del grupo
 * @param callback: Callback que se ejecuta al seleccionar un subgrupo
 * @param reload: Si se debe recargar los datos
 * @param filterStr: Filtro de búsqueda
 */
const GrupoV2 = ( { nombre, callback, reload, filterStr, readOnly, idgrupo, onEditarGrupoClick }) => {

  const [loading, setLoading] = useState(false);
  const [subgrupos, setSubgrupos] = useState([]);
  const [selectedSubgrupoId, setSelectedSubgrupoId] = useState(-1);
  const [mostrarPrecioPar, setMostrarPrecioPar] = useState(false);
  const [mostrarPrecioCaja, setMostrarPrecioCaja] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const columns = [
    {
      title: "Producto",
      dataIndex: "producto",
      render: (_, { producto, idsubgrupo, idfamilia }) => (
        <>
          <Button
        
            type="link"
            size="small"
            style={{
              color: "#000127ff",
              fontWeight: "600",
              whiteSpace: "normal",
              textAlign: "left",
            }}
          >
            {/*producto.replaceAll("_", " ")  + " " + idsubgrupo*/}
            <div dangerouslySetInnerHTML={{
                __html: (producto.replace('_',' ')).replace(/\n/g, "<br />"),
              }}></div>
          </Button>
        </>
      ),
    },
    {
      title: <div style={{ textAlign: "right" }}>Precio</div>,
      dataIndex: "precio",
      render: (_, { precio, precio_par, idfamilia }) => (
        <div
          style={{
            textAlign: "right",
            fontWeight: "500",
            color: "#000122ff",
            fontSize: "1.12em",
          }}
        >
          {
            <>
              <>
                {`Indv.: $ ${formatFloat(precio)}` }
                { mostrarPrecioPar ? <><br /><span style={{color:"red"}}> Par: $&nbsp;{ formatFloat(precio_par) }</span></> : <></>}
                {/* mostrarPrecioCaja ? <><br /><span style={{color:"green"}}> Caja: {(precio * 6 - precio * 6 * 0.1).toLocaleString("es-AR", {minimumFractionDigits: 2,})}</span></> : <></>*/ }
                </>
              </>
          }
        </div>
      ),
    },
    
  ];
const handleRowClick = (record, index) => {

  setSelectedSubgrupoId(record.idsubgrupo);
  callback?.(
    record.idsubgrupo,
    record.idfamilia == globals.familiaIDs.CRISTALES ||
      record.idfamilia == globals.familiaIDs.LC,
    record.idfamilia == globals.familiaIDs.LC
  );
};

  useEffect(() => {
    setLoading(false);
    fetch(get.optionsforgrupo + idgrupo + (readOnly ? `/1`:`/0`))
      .then((r) => r.json())
      .then((response) => {
        setLoading(false);
        if (response.error) {
          console.error(response.error);
          return;
        }
        if( response.data.length == 0) {
          setSubgrupos([]);
          return;
        }
        const idfamilia = response.data[0].familia_idfamilia;

        setMostrarPrecioCaja(idfamilia == globals.familiaIDs.LC);
        setMostrarPrecioPar(
        idfamilia == globals.familiaIDs.CRISTALES ||
        idfamilia == globals.familiaIDs.LC
        );

        setSubgrupos(
          response.data.map((sg) => ({
            producto: sg.label,
            precio_par: sg.precio_par,
            idfamilia: sg.familia_idfamilia,
            precio: sg.precio_defecto,
            idsubgrupo: sg.value,
            precio_mayorista: sg.precio_defecto_mayorista,
            visible_lp: sg.visible_lp,
          }))
        );
      })
      .catch((r) => {
        console.log("error");
      });
  }, [reload]);


  const get_table = (rows) => 
    rows.length<1 ? <></> : <Col span={24} style={{ padding: "6px" }}>
      <Table
        size="small"
        style={{ width: "100%" }}
        title={(_) => (
          <div style={{display:"flex", justifyContent:"space-between"}}>
            <div><span>{nombre /*+ props.idgrupo*/}</span></div>
            <div><Button onClick={_=>{onEditarGrupoClick(idgrupo)}}><EditFilled /></Button></div>
          </div>
        )}
        rowClassName={(record, index) =>
          +record.visible_lp == 1 ? (index % 2 === 0 ? "table-row-light" : "table-row-dark") : "error-row"
        }
        columns={columns}
        dataSource={rows}
        pagination={false}
        loading={loading}
        showHeader={false}
        onRow={(record, index) => {
        return {
          onClick: event => {
            handleRowClick(record, index);
          },
        };
      }}
      />
    </Col>
  

  return loading ? (
    <Spin />
  ) : get_table(subgrupos.filter((item) => {
          if (!filterStr) return true;
          return item.producto.toLowerCase().includes(filterStr.toLowerCase());
        })  )
    
  
};

export default GrupoV2;
