import globals from "@/src/globals";
import { Alert } from "antd";
import { useEffect, useState } from "react";

const Alerts = (props) => {
    const [errorFecha, setErrFecha] = useState(false)
    const [errorEstado, setErrEstado] = useState(false)
    const [caja, setCaja] = useState(null)
    const _message = _  => {
        if(errorEstado )
        {
            return <Alert closable message={"Caja Cerrada " } type="error" showIcon />
        }
        else{
            if(errorFecha)
            {
                return <Alert closable message={"Caja de otra fecha " } type="error" showIcon />
            }
            else{
                return <></>
            }
        }
    }
    useEffect(()=>{
        const interval = setInterval(() => {
            const _caja = globals.obtenerCajaLocal()
            var _erre = false
            var _errf =  false
            if(_caja == 0)
            {
                _erre=true
            }
            else{
                _errf=true
            }
            setErrEstado(_erre)
            setErrFecha(_errf)
        }, 2000);
        return ()=>{clearInterval(interval)}
    },[])
    return _message()
}

export default Alerts;