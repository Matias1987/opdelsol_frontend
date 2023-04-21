import CustomTable from "@/components/forms/CustomTable";
import { get, post, public_urls } from "@/src/urls";
import { Button } from "antd";

export default function ListaSubGrupos(){
    return(
        <>
        <h1>Lista de SubGrupos</h1>
        <Button danger={true} onClick={()=>{window.location.replace(public_urls.editar_multiplicadores)}}>Modificar Multiplicadores</Button>
        <CustomTable 
            fetchUrl={get.lista_subgrupo}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'},
                    {title: 'Multiplicador',dataIndex: 'multiplicador',key: 'multiplicador'},
                    {
                        title: 'Acciones', dataIndex: 'idsubgrupo', key: 'idsubgrupo',
                        render: 
                            (_,{idsubgrupo})=>{
                                return (
                                        <>
                                        <Button onClick={()=>{}}>Editar</Button>
                                        </>    
                                        )                
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
                                nombre_largo: row.nombre_largo,
                                multiplicador: row.multiplicador,
                                idsubgrupo: row.idsubgrupo,
                            }
                        )
                    )
                )
            }
        />
        </>
    )
}