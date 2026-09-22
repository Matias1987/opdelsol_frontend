import globals from "@/src/globals";
import { formatFloat } from "@/src/helpers/formatters";
import { get } from "@/src/urls";
import {
  AlertOutlined,
  ReloadOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Alert } from "antd";
import { useEffect, useState } from "react";

const BarraResumenCaja = () => {
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alerta, setAlerta] = useState("");
  const [loading, setLoading] = useState(false);
  const load = (_) => {
    setLoading(true);
    setAlerta("");
    fetch(get.resumen_caja + globals.obtenerSucursal())
      .then((r) => r.json())
      .then((response) => {
        setLoading(false);
        const rows = [];
        let saldo = 0;

        const { saldos, idcaja, fecha, estado } = response?.data ?? null;

        if (!idcaja) {
          setAlerta("Caja cerrada");
          setData([]);
          return;
        }

        if (fecha) {
          // 1. Convertir el string a un objeto Date
          const fechaRecibida = new Date(fecha);
          fechaRecibida.setHours(0, 0, 0, 0);

          // 2. Obtener la fecha y hora actual
          const fechaActual = new Date();
          fechaActual.setHours(0, 0, 0, 0);
          // 3. Comparar si la fecha recibida es anterior (menor) a la actual
          if (fechaRecibida < fechaActual) {
            setAlerta(
              "Caja abierta con fecha: " +
                `${fechaRecibida.getDate()}-${+fechaRecibida.getMonth() + 1}-${fechaRecibida.getFullYear()}`,
            );
          }
        }

        if (!saldos) {
          return;
        }

        saldos.forEach((row) => {
          saldo +=
            row.tipo == "ingreso"
              ? parseFloat(row.monto || "0")
              : -parseFloat(row.monto || "0");
          rows.push({
            tipo: row.tipo,
            detalle: row.detalle,
            valor: row.monto,
          });
        });

        rows.push({
          tipo: "",
          detalle: "Neto",
          valor: saldo,
        });

        setData(rows);
      })
      .catch((error) => {
        setAlerta("Error al intentar obtener resumen.");
        setData([]);
        console.log("Error fetching resumen caja:", error);
      });
  };

  useEffect(() => {
    load();
    // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      setUpdate(!update);
    }, 20000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [update]);

  const style = {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "20px",
    fontSize: "11px",
    paddingTop: "2px",
    paddingLeft: "34px",
    //backgroundColor:"#FFFFB8",
    //background: "#f8f8eaff",
    background:
      "linear-gradient(45deg, rgb(255, 255, 255) 20%, rgba(248, 248, 234, 1) 95%)",
    color: "#5c5705",
    //color: "#663F4C"
  };

  return data ? (
    <div style={style}>
      {alerta ? (
        <div style={{ fontStyle: "italic", color: "#5c2c05" }}>
          <WarningOutlined />
          &nbsp;{alerta}&nbsp;&nbsp;
        </div>
      ) : (
        <></>
      )}
      {data.map((_row, index) => (
        <div style={{ paddingLeft: "50px", width: "200px" }} key={index}>
          <span style={{ whiteSpace: "nowrap" }}>
            {_row.detalle || ""}:&nbsp;&nbsp;
          </span>
          <span style={{ fontWeight: "bold" }}>
            {formatFloat(parseFloat(_row.valor || "0"))}
          </span>
        </div>
      ))}
      {loading ? (
        <></>
      ) : (
        <div
          style={{ width: "30px" }}
          onClick={(_) => {
            load();
          }}
        >
          <ReloadOutlined></ReloadOutlined>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default BarraResumenCaja;
