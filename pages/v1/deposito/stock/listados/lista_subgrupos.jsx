import CustomTable from "@/components/forms/CustomTable";
import { Button } from "antd";

export default function ListaSubGrupos(){
    return(
        <>
        <h1>Lista de SubGrupos</h1>
        <CustomTable 
            fetchUrl={"http://localhost:3000/api/v1/subgrupos"}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {
                        title: 'Acciones', dataIndex: 'idsubgrupo', key: 'idsubgrupo',
                        render: 
                            (_,{idsubgrupo})=>{
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
                                id: row.idsubgrupo,
                                nombre_corto: row.nombre_corto,
                                nombre_largo: row.nombre_largo
                            }
                        )
                    )
                )
            }
        />
        </>
    )
}