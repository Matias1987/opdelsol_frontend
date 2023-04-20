import CustomTable from "@/components/forms/CustomTable";
import { Button } from "antd";

export default function ListaCodigos(){
    return(
        <>
            <h1>Lista C&oacute;digos</h1>
            <CustomTable 
                fetchUrl={"http://localhost:3000/api/v1/codigos"}
                columns = {
                    [
                        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
                        {title: 'Descripcion',dataIndex: 'descripcion',key: 'descripcion'},
                        {
                            title: 'Acciones', dataIndex: 'idcodigo', key: 'idcodigo',
                            render: 
                                (_,{idcodigo})=>{
                                    return (<>
                                         <Button onClick={()=>{}}>Editar</Button>
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
                                    descripcion: row.descripcion,
                                }
                            )
                        )
                    )
                }
            />
        </>

    )
}