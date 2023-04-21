import CustomTable from "@/components/forms/CustomTable";
import { Button } from "antd";

export default function ListaStock(){
    return(
        <>
        <h1>Lista de Stock</h1>
        <CustomTable 
            fetchUrl={"http://localhost:3000/api/v1/stock"}
            columns = {
                [
                    {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
                    {title: 'Ruta',dataIndex: 'ruta',key: 'ruta'},
                    {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad'},
                    {
                        title: 'Acciones', dataIndex: 'idstock', key: 'idstock',
                        render: 
                            (_,{idstock})=>{
                                return (<>
                                     <Button size="small" type="primary" onClick={()=>{}}>Modificar Stock</Button>
                                </>    )                
                            }
                        
                    }
                ]
            }
            parsefnt={
                (response)=>(
                    response.data.map(
                        (row)=>(
                            {
                                codigo: row.codigo,
                                ruta: row.ruta,
                                cantidad: row.cantidad,
                            }
                        )
                    )
                )
            }
        />
        </>
    )
}