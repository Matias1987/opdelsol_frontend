import { get } from "@/src/urls"
import { Spin } from "antd"

const { useState } = require("react")

/**
 * @param idventa 
 */
const CambioSobre = (props) => {
    const [loading, setLoading] = useState(false)
    const [venta, setVenta] = useState(null)
    useState(()=>{
        setLoading(true)
        /**
         * get operation data
         */
        fetch(get.venta + props.idventa)
        .then(r=>r.json())
        .then((response)=>{
            setVenta(response.data)
        })
        /**
         * get client data
         */

    },[])

    return loading ? <><Spin /></> : <>
    <CambioSobre idventa={props.idventa} />
    </>;
}

export default CambioSobre;