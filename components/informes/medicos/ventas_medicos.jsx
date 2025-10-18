import CustomModal from "@/components/CustomModal";
import ExportToExcel2 from "@/components/etc/ExportToExcel2";
import ExportToCSV from "@/components/ExportToCSV";
import PrinterWrapper from "@/components/PrinterWrapper";
import VentaDetallePopup from "@/components/VentaDetalle";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { InfoCircleFilled } from "@ant-design/icons";
import { Button, Col, Divider, Input, Modal, Row, Table } from "antd";
import { useEffect, useState } from "react";

/**
 *
 * @param idmedico
 * @param mes
 * @param anio
 * @param idsucursal
 */
const VentasMedicos = (props) => {
  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [idmedico, setIdMedico] = useState(-1);
  const [total, setTotal] = useState(0);
  const [periodo, setPeriodo] = useState({
    mes: 0,
    anio: 0,
  });
  const columns = [
    { width:"100px", dataIndex: "idventa", title: "Nro. Op." },
    { width:"100px", dataIndex: "fecha_retiro", title: "Fecha Retiro" },
    { width:"150px", dataIndex: "sucursal", title: "Sucursal" },
    { width:"200px", dataIndex: "cliente", title: "Cliente" },
    { width:"100px", dataIndex: "dni", title: "DNI" },
    {
      dataIndex: "tipo",
      title: "Detalle",
      width:"100px",
      render: (_, { tipo }) => {
        switch (tipo.toString()) {
          case globals.tiposVenta.DIRECTA:
            return "VENTA DIRECTA";
          case globals.tiposVenta.LCLAB:
            return "L.C. Lab.";
          case globals.tiposVenta.LCSTOCK:
            return "L.C. Stock";
          case globals.tiposVenta.MONOFLAB:
            return "Monof. Lab.";
          case globals.tiposVenta.MULTILAB:
            return "Multif. Lab.";
          case globals.tiposVenta.RECSTOCK:
            return "Rec. Stock";
          case 7:
            return "";
        }
      },
    },
    { dataIndex: "monto", title: "Monto", width:"100px", render:(_,{monto})=><div style={{textAlign:"right"}}>$  {monto}</div> },
    {
      title: "",
      render: (_, { idventa }) => (
        <>
          <VentaDetallePopup idventa={idventa} />
        </>
      ),
    },
  ];

  useEffect(() => {
    setIdMedico(props.idmedico);
    init();
  }, []);

  const init = () => {
    setPeriodo({
      mes: props.mes,
      anio: props.anio,
    });
    post_method(
      post.lista_ventas_medico,
      {
        mes: props.mes,
        anio: props.anio,
        idmedico: props.idmedico,
        idsucursal: props.idsucursal,
      },
      (response) => {
        var _total = 0;
        response.data.forEach((r) => {
          _total += parseFloat(r.monto_total_raw);
        });
        setTotal(_total);

        setDataSource(
          response.data.map((r) => ({
            idventa: r.idventa,
            cliente: r.cliente,
            dni: r.dni,
            tipo: r.tipo,
            monto: r.monto_total,
            sucursal: r.sucursal,
            fecha_retiro: r.fecha_retiro_f,
          }))
        );
      }
    );
  };
  const getTipo = (v) => {
    switch (v) {
      case globals.tiposVenta.DIRECTA:
        return "VENTA DIRECTA";
      case globals.tiposVenta.LCLAB:
        return "L.C. Lab.";
      case globals.tiposVenta.LCSTOCK:
        return "L.C. Stock";
      case globals.tiposVenta.MONOFLAB:
        return "Monof. Lab.";
      case globals.tiposVenta.MULTILAB:
        return "Multif. Lab.";
      case globals.tiposVenta.RECSTOCK:
        return "Rec. Stock";
      case 7:
        return "";
    }
  };
  return (
    <>
      <Row>
        <Col span={24}>
          {/*<ExportToCSV
            fileName={`ventas_${props?.nombre_medico}__${props.mes}-${props.anio}`}
            parseFnt={() => {
              let str = "";
              str += `MES:;${props.mes}; ANIO:;${props.anio}; ;\r\n`;
              str += `MEDICO:;${props?.nombre_medico};;;;\r\n`;
              str +=
                "NRO. VTA.; FECHA RETIRO; CLIENTE; DNI;  TIPO; SUCURSAL; MONTO\r\n";
              dataSource.forEach((r) => {
                str += `${r.idventa};${r.fecha_retiro};${r.cliente};${r.dni};${r.tipo};${r.sucursal};${r.monto}\r\n`;
              });
              return str;
            }}
          />*/}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PrinterWrapper>
            <b>
              Lista de Ventas del M&eacute;dico: {props?.nombre_medico || ""}
            </b>
            <Table
              size="small"
              pagination={false}
              columns={columns}
              dataSource={dataSource}
              scroll={{ y: "400px" }}
            />
            <Divider />
            <b>
              Cant. Total: {dataSource.length} | Monto Total: $ {total}
            </b>
          </PrinterWrapper>
        </Col>
      </Row>
    </>
  );
};

export default VentasMedicos;
