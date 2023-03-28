/*first select provider and then factura */

import { Spin } from "antd"
import { useState } from "react"

const { default: LoadSelect } = require("./LoadSelect")


const FacturaSelect = (props) =>{ 

    const [idProveedor, setIdProveedor] = useState(-1) 

    return (
        <>
    <LoadSelect 
        fetchurl = {"http://localhost:3000/api/v1/proveedores"}
        parsefnt = {
            (data) => {
                return data.map((row)=>(
                    {
                        "value": row.idproveedor,
                        "label": row.nombre
                    }
                ))
            }
        }
        callback = {
            (id) => {
                //alert("prov id " + id)
                setIdProveedor(id)
            }
        }
    
    />
    { idProveedor<0 ? <Spin/> :
        (<LoadSelect 
        fetchurl = {"http://localhost:3000/api/v1/facturas"}
        parsefnt = {
            (data)=>{
                return data.map((row)=>(
                    {
                        value: row.idfactura,
                        label: row.numero
                    }
                ))
            }
        }
        callback = {
            (id) => {
                props.callback(id)
            }
        }
    />)
    }
    </>
    
    )}
    
export default FacturaSelect;



    

