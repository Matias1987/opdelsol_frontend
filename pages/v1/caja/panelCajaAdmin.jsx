import { Button, Spin } from "antd";
import { useEffect, useState } from "react";

export default function panelCajaAdmin(){
    const [caja, setCaja] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{},[])

    const detalle_caja = _ => 
        caja == null ? <></> : <>
            <div>
                <p>Nro. Caja: 1 Estado:  Fecha:  Usuario:  Monto Inicial: </p>
                <Button>Cerrar Caja</Button>
            </div>
        </>

    const caja_cerrada = _ => <><Button>Abrir Caja</Button></>

        return loading ? <Spin/> : (caja == null ? caja_cerrada() : detalle_caja()); 
    

}