import { Button, Table, Search, Input, Row, Affix, Checkbox } from "antd";
import { useRef, useState } from "react";
import { get } from "@/src/urls";
import globals from "@/src/globals";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
/**
 * 
 * @param ids array of id to filter
 * @param idSucursalDestino 
 * @param onParseResponse
 * @param callback
 */
const SearchStockEnvio = (props) => {
    const id_sucursal = globals.obtenerSucursal();
    const search_url = get.buscar_stock_envios + id_sucursal+ "/";
    const [top,setTop] = useState(10);
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("");
   

    const doSearch = (value, id)=>{
        
        fetch(search_url + props.idSucursalDestino + "/" + encodeURIComponent( value )+ "/" + id)
        .then((response)=>response.json())
        .then((_response)=>{
            
            var response = typeof props.onParseResponse !== 'undefined' ? props.onParseResponse(_response) : _response;
            /*
            this returns rows results from search
            */
           //controlar con datos existentes
            setDataSource(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        cantidad: row.cantidad,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        cantidad_destino: row.cantidad_sucursal,
                        habilitado: {val: typeof row.habilitado === 'undefined' ? true : row.habilitado, idcodigo: row.idcodigo},/* un codigo puede no estar habilitado */
                        checked: false,
                    })
                )
            )
            setLoading(false)
        })
        .catch((error)=>{console.error(error)})
    }
    


    const onSearch = (value) => {
        if(typeof props.idSucursalDestino === 'undefined'){
            alert("Sucursal destino no especificada");
            return
        }
        if(props.idSucursalDestino<0){
            alert("Sucursal destino no especificada");
            return
        }
        if(value.trim().length<1)
        {
            alert("Campo Vacío")
            return;
        }
        setLoading(true)

        //test if the input value match a barcode pattern
        const _id = regex_get_id_if_match(value);

        if(_id>-1){
            //alert("this is a barcode, id is : " + _id)
            //this is an id!
            doSearch("null",_id)
            setSearchValue("")

        }
        else{
            doSearch(value,0)
        }
    }
        
        
    return (
        <>
        <Row>
            <Affix offsetTop={top}>
                <Input.Search prefix={"/"} onSearch={onSearch} value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}} />
            </Affix>
        </Row>
        <Row style={{height: "300px", overflowY: "scroll"}}>
            <Table 
                pagination={false}
                loading={loading}
                dataSource={dataSource} 
                columns={
                    [
                        {title:"Codigo", dataIndex: "codigo" },
                        {title:"Loc.", dataIndex: "cantidad", render: (_,{cantidad})=>(<span style={{color:"#00972D"}}>{cantidad}</span>)},
                        {title:"Dest.", dataIndex: "cantidad_destino", render: (_,{cantidad_destino})=>(<span style={{color:"red"}}>{cantidad_destino}</span>)},
                        {
                            title:<>
                                <Button onClick={
                                    (e)=>{
                                        props.callback((dataSource.filter(r=>r.checked)).map(e=>e.idcodigo))
                                    }
                                }><PlusCircleOutlined /></Button>
                            </>, 
                            dataIndex: "habilitado",
                            render: 
                                (_,{habilitado})=>{
                                    return (
                                    <>
                                        {
                                            habilitado.val?
                                            <Button onClick={()=>{props.callback([habilitado.idcodigo])}}><PlusCircleFilled /></Button>
                                            :
                                            <span>Ya seleccionado</span>
                                        }
                                        
                                    </>
                                    )
                                }
                        },
                        {title:<>
                        <Checkbox 
                            onChange={(e)=>{setDataSource(ds=>(ds.map(r=>({...r,checked:e.target.checked}))))}}
                        /></>, dataIndex:"", render:(_,{idcodigo, checked})=>{
                            return <><Checkbox onChange={(e)=>{
                                                setDataSource(ds=>ds.map(r=>(r.idcodigo==idcodigo?{...r,checked:e.target.checked}:r)))}}
                                                checked={checked}
                                    /></>}}
                    ]
                }
            />
            </Row>
        </>
    )
}

export default SearchStockEnvio;