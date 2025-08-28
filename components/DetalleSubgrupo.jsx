import { get } from "@/src/urls";
import { Row, Col, Tag } from "antd";
import { useEffect, useState } from "react";

const DetalleSubgrupo = props => {
    const [subgrupo, setSubgrupo] = useState(null);
    const {idsubgrupo} = props;

    const load = _=>{
        fetch(get.obtener_detalle_subgrupo + idsubgrupo)
        .then(r=>r.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            setSubgrupo(response.data[0])
        })
        .catch(e=>{console.log("error")})
    }

    useEffect(() => {
        load();
    }, [idsubgrupo]);

    return <span style={{fontWeight:"600",}}>
     Subgrupo:&nbsp;{subgrupo==null ? idsubgrupo : <><Tag color="geekblue" style={{fontSize:"1.3em"}}>{subgrupo.nombre_largo}</Tag></>}
    </span>
}

export default DetalleSubgrupo;