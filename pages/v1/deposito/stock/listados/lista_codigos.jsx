import CustomTable from "@/components/forms/CustomTable";
import { get } from "@/src/urls";
import { Button } from "antd";

export default function ListaCodigos(){
    return(
        <>
            <h1>Lista C&oacute;digos</h1>
            <CustomTable 
                fetchUrl={get.lista_codigos}
                columns = {
                    [
                        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
                        {title: 'Descripcion',dataIndex: 'descripcion',key: 'descripcion'},
                        {
                            title: 'Estado',
                            dataIndex: 'estado', 
                            key: 'estado',
                            render: (_,{estado})=>(<span style={{color: (estado=='ACTIVO' ? "green" : "red")}} >{estado}</span>)
                        },
                        {
                            title: 'Acciones', dataIndex: 'idcodigo', key: 'idcodigo',
                            render: 
                                (_,{idcodigo})=>{
                                    return (
                                    <>
                                         <Button onClick={()=>{}}>Editar</Button>&nbsp;&nbsp;
                                         <Button danger onClick={()=>{}}>Inhabilitar/Habilitar</Button>
                                    </>    
                                    )                
                                }
                            
                        },
                    ]
                }
                parsefnt={
                    (response)=>(
                        response.data.map(
                            (row)=>(
                                {
                                    codigo: row.codigo,
                                    descripcion: row.descripcion,
                                    estado: "ACTIVO"
                                }
                            )
                        )
                    )
                }
            />
        </>

    )
}