import { get } from "@/src/urls";

import { Select, Row, Col } from "antd";
import { useState, useEffect } from "react";

const SucursalSelect = (props) => {
    const [sucursalData,setSucursalData] = useState([]);
    const sucursalUrl = get.sucursales;
    const [selectedSucursal, setSelectedSucursal] = useState("-1")
    const loadSucursales = () => {
        fetch(sucursalUrl)
        .then((response)=>response.json())
        .then((response)=>{
            setSucursalData(
                [
                    ...[{label:"-", value:"-1"}],
                    ...response.data.map(r=>({
                        label: r.nombre,
                        value: r.idsucursal,
                    }))
                ]
            )
        })
        .catch((error)=>{console.error(error)})
    }

    useEffect(()=>{
        loadSucursales()
    },[])

    return (
        <Row >
            <Col span={3} style={
                {
                    paddingTop:".4em",
                    paddingRight:"1em"
                }
                }>
                Sucursal:
            </Col>
            <Col span={21}>
                <Select 
                    options={sucursalData}
                    style={{width:"100%", minWidth:"80px", maxWidth:"160px"}}
                    value={selectedSucursal}

                    onChange={
                        (value)=>{
                            setSelectedSucursal(value)
                            props.callback(value)
                        }
                    }
                />
            </Col>
        </Row>
    )

}

export default SucursalSelect;