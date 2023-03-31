import CustomTable from "@/components/forms/CustomTable";

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
                    {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad'}
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