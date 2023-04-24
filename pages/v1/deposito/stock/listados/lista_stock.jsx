import CustomModal from "@/components/CustomModal";
import CustomTable from "@/components/forms/CustomTable";
import ModificarCantidadForm from "@/components/forms/deposito/modificarCantidadForm";
import { get } from "@/src/urls";
import { Button } from "antd";

export default function ListaStock(){
    const idsucursal = "1";
    return(
        <>
        <h1>Lista de Stock</h1>
        <CustomTable 
            fetchUrl={get.lista_stock+idsucursal}
            columns = {
                [
                    {title: 'Codigo',dataIndex: 'codigo',key: 'codigo'},
                    {title: 'Ruta',dataIndex: 'ruta',key: 'ruta'},
                    {title: 'Cantidad',dataIndex: 'cantidad',key: 'cantidad'},
                    {
                        title: 'Acciones', dataIndex: 'idstock', key: 'idstock',
                        render: 
                            (_,{idcodigo})=>{
                                return (<>
                                     <CustomModal
                                     openButtonText={"Modificar Cantidad"}
                                     title={"Modificar Cantidad"}
                                     onOk={()=>{
                                        location.reload()
                                     }}> 

                                     <ModificarCantidadForm                                       
                                     idcodigo={idcodigo}
                                     idsucursal={idsucursal} 
                                     />
                                     
                                     </CustomModal>
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
                                ruta: row.ruta,
                                cantidad: row.cantidad,
                                idcodigo: row.idcodigo,
                            }
                        )
                    )
                )
            }
        />
        </>
    )
}