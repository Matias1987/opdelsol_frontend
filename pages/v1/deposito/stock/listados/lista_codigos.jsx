import CustomTable from "@/components/forms/CustomTable";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import FiltroCodigos from "@/components/forms/deposito/FiltroCodigos";
import MyLayout from "@/components/layout/layout";
import { get } from "@/src/urls";
import { Col, Row, Tag } from "antd";
import { useEffect } from "react";
export default function ListaCodigos(){
    //useEffect(()=>{alert(get.lista_codigos)},[])
    const callback_filtros = (filtros) => {

    }
    return(
        <>
            <h1>Lista C&oacute;digos</h1>
            <Row>
                <Col span={24}>
                    <FiltroCodigos callback={callback_filtros} />
                </Col>
            </Row>
            <CustomTable 
                fetchUrl={get.lista_codigos}
                columns = {
                    [
                        {title: 'Codigo',dataIndex: 'codigo'},
                        {title: 'Descripcion',dataIndex: 'descripcion'},
                        {title: 'Modo Precio',dataIndex: 'modo_precio', render:(_,{modo_precio})=>{
                            switch(modo_precio)
                            {
                                case 0: return <Tag color="blue">Multiplicador</Tag>
                                case 1: return <Tag color="orange">Subgrupo</Tag>
                                case 2: return <Tag color="yellow">Propio</Tag>
                            }
                        }},
                        /*{
                            title: 'Estado',
                            dataIndex: 'estado', 
                           
                            render: (_,{estado})=>(<span style={{color: (estado=='ACTIVO' ? "green" : "red")}} >{estado}</span>)
                        },*/
                        {
                            title: 'Acciones', dataIndex: 'idcodigo',
                            render: 
                                (_,{idcodigo})=>{
                                    return (
                                    <>
                                         {/*<Button onClick={()=>{}}>Editar</Button>&nbsp;&nbsp;
                                         <Button danger onClick={()=>{}}>Inhabilitar/Habilitar</Button>*/}
                                         <EditarCodigoIndiv idcodigo={idcodigo} buttonText="Editar" />
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
                                    idcodigo: row.idcodigo,
                                    codigo: row.codigo,
                                    descripcion: row.descripcion,
                                    modo_precio: row.modo_precio,
                                    //estado: "ACTIVO"
                                }
                            )
                        )
                    )
                }
            />
        </>

    )
}

ListaCodigos.PageLayout = MyLayout;