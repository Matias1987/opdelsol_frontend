import CustomTable from "@/components/forms/CustomTable";
import { get } from "@/src/urls";
import { Button } from "antd";

export default function ListaFamilias(){
    return(
        <>
        <h1>Lista de Familias</h1>
        <CustomTable 
            fetchUrl={get.lista_familia}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {
                        title: 'Acciones', dataIndex: 'idfamilia', key: 'idfamilia',
                        render: 
                            (_,{idfamilia})=>{
                                return (<>
                                     <Button onClick={()=>{}}>Editar</Button>
                                </>    )                
                            }
                        
                    }
                ]
            }
            parsefnt={
                (response)=>( response.data.map(
                        row=>(
                            {
                                id: row.idfamilia,
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