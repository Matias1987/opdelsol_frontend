import CustomTable from "@/components/forms/CustomTable";

export default function ListaFamilias(){
    return(
        <>
        <h1>Lista de Familias</h1>
        <CustomTable 
            fetchUrl={"http://localhost:3000/api/v1/familia/"}
            columns = {
                [
                    {title: 'ID',dataIndex: 'id',key: 'id'},
                    {title: 'Nombre Largo',dataIndex: 'nombre_largo',key: 'nombre_largo'},
                    {title: 'Nombre Corto',dataIndex: 'nombre_corto',key: 'nombre_corto'}
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