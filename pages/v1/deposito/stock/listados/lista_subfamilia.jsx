import CustomTable from "@/components/forms/CustomTable";
import { Button } from "antd";

export default function ListaSubFamilias(){
    return(
        <>
        <h1>Lista de SubFamilias</h1>
        <CustomTable 
            fetchUrl={"http://localhost:3000/api/v1/subfamilia"}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {
                        title: 'Acciones', dataIndex: 'idsubfamilia', key: 'idsubfamilia',
                        render: 
                            (_,{idsubfamilia})=>{
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
                                id: row.idsubfamilia,
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