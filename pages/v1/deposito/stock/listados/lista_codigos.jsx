import CustomTable from "@/components/forms/CustomTable";

export default function ListaCodigos(){
    return(
        <>
            <h1>Lista C&oacute;digos</h1>
            <CustomTable 
                fetchUrl={"http://localhost:3000/api/v1/codigos"}
                columns = {
                    [
                        {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
                        {title: 'Descripcion',dataIndex: 'descripcion',key: 'descripcion'}
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