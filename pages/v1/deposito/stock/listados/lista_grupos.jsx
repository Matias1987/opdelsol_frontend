import CustomTable from "@/components/forms/CustomTable";
import { get } from "@/src/urls";
import { Button } from "antd";

export default function ListaGrupos(){
    return(
        <>
        <h1>Lista de Grupos</h1>
        <CustomTable 
            fetchUrl={get.lista_grupos}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {
                        title: 'Acciones', dataIndex: 'idgrupo', key: 'idgrupo',
                        render: 
                            (_,{idgrupo})=>{
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
                                id: row.idgrupo,
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