import { useState } from "react";

const Informe = () => {
  const [data, setData] = useState({
      idventa: 69747,
      cliente_idcliente: 6715,
      sucursal_idsucursal: 6,
      caja_idcaja: 1,
      usuario_idusuario: 5,
      medico_idmedico: null,
      monto_total: "0",
      descuento: "0",
      debe: "0",
      haber: "0",
      saldo: "0",
      fecha: "2026-05-07T15:17:56.000Z",
      fecha_alta: "2026-05-07T15:17:56.000Z",
      fk_os: null,
      fecha_retiro: "2026-01-01T03:00:00.000Z",
      fk_destinatario: null,
      subtotal: "0.000000",
      comentarios: "",
      tipo: "MULTIPLE",
      estado: "",
      hora_retiro: "",
      en_laboratorio: 0,
      json_items: "",
      estado_taller: null,
      recarga: "0.000000",
      uid: "",
      recibe_premio: 1,
      trabajos: [
        {
          idtrabajo: 65,
          tipo: "cristales_laboratorio",
          nro: 1,
          items: [
            {
              idcodigo: 130,
              esf: "0",
              cil: "0",
              eje: "0",
              cantidad: 1,
              precio: "0.000000",
              total: "0.000000",
            },
            {
              idcodigo: 130,
              esf: "0",
              cil: "0",
              eje: "0",
              cantidad: 1,
              precio: "0.000000",
              total: "0.000000",
            },
          ],
        },
        {
          idtrabajo: 66,
          tipo: "cristales_stock",
          nro: 2,
          items: [
            {
              idcodigo: 130,
              esf: "0",
              cil: "0",
              eje: "0",
              cantidad: 1,
              precio: "0.000000",
              total: "0.000000",
            },
            {
              idcodigo: 130,
              esf: "0",
              cil: "0",
              eje: "0",
              cantidad: 1,
              precio: "0.000000",
              total: "0.000000",
            },
          ],
        },
      ],
    });
  const load = () => {};

  const header = () =>{ return <>
  <h1>Informe de trabajo múltiple</h1>
  <p>Venta N°: {data.idventa}</p>
  <p>Cliente ID: {data.cliente_idcliente}</p>
  <p>Fecha: {new Date(data.fecha).toLocaleString()}</p>
  </>}

  const trabajo = (data) =>{
    return <table>
        <thead>
            <tr>    
                <th>Id Codigo</th>
                <th>Esf</th>
                <th>Cil</th>
                <th>Eje</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                data.items.map(i=>{
                    return <tr>
                        <td>{i.idcodigo}</td>
                        <td>{i.esf}</td>
                        <td>{i.cil}</td>
                        <td>{i.eje}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.precio}</td>
                        <td>{i.total}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
  }
  const totales = () => {}

  return <>
    {header()}
    {
        data.trabajos.map(t=>trabajo(t))
    }

    {totales()}

  </>
};
