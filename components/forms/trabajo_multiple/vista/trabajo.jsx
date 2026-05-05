import { Card } from "antd";
import { useState } from "react";
import ItemsTMDetalle from "./trabajo_items";

const TrabajoDetalleTM = ({trabajo}) => {
    
    
    return <>
       <Card title={`Trabajo #${trabajo.nro} - ${trabajo.tipo}`} size="small">
            <ItemsTMDetalle items={trabajo.items} />
       </Card>
    </>
}

export default TrabajoDetalleTM;