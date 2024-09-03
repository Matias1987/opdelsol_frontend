import { Button, Table, Input, Row, Affix, Checkbox, Col, Modal, Divider } from "antd";
import { useRef, useState } from "react";
import { get, post } from "@/src/urls";
import globals from "@/src/globals";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import { regex_get_id_if_match } from "@/src/helpers/barcode_helper";
import SubGroupSelect from "@/components/SubGroupSelect";
import CategoriaSelect from "@/components/CategoriaSelect";
import FiltroBusquedaProductoEnvio from "./filtroBusquedaProductoEnvio";
import { post_method } from "@/src/helpers/post_helper";
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
    const [buttonText, setButtonText] = useState("...")
    const [modalOpen, setModalOpen] = useState(false)
    const [idCat, setIdCat] = useState(-1)
    const [categoria, setCategoria] = useState(-1)
    const [tags, setTags] = useState([])
   

    const doSearch_old = (value, id)=>{
        let _searchvalue = value.trim().length<1 ?"-1": value.trim();
        const url = search_url + props.idSucursalDestino + "/" + encodeURIComponent( _searchvalue )+ "/" + id + "/" + categoria + "/" + idCat;

        fetch(url)
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

    const doSearch = (value, id)=>{
        let _searchvalue = value.trim().length<1 ?"-1": value.trim();
        const params = {
            tags:tags,
            sucursal_destino: props.idSucursalDestino,
            sucursal_origen: globals.obtenerSucursal(),
            filtro: _searchvalue,
            idsubfamilia: categoria=="subfamilia" ? idCat : "-1",
            idfamilia: categoria=="familia" ? idCat : "-1",
            idgrupo: categoria=="grupo" ? idCat : "-1",
            idsubgrupo: categoria=="subgrupo" ? idCat : "-1"

        }


        post_method(post.buscar_stock_envios,params,(response)=>{
            //alert(JSON.stringify(response))
            setDataSource(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        cantidad: row.cantidad,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        cantidad_destino: row.cantidad_destino,
                        habilitado: {val: typeof row.habilitado === 'undefined' ? true : row.habilitado, idcodigo: row.idcodigo},/* un codigo puede no estar habilitado */
                        checked: false,
                    })
                )
            )
            setLoading(false)
        })

       // alert(JSON.stringify(params))
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
        //if(value.trim().length<1)
        //{
        //    alert("Campo Vacío")
        //    return;
        //}
        setLoading(true)

        //test if the input value match a barcode pattern
        const _id = regex_get_id_if_match(value);

        if(_id>-1){
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
            <Col span={24}>
            Etiquetas: {tags.map(t=>`${t},`)}
            {categoria=="familia" ? <>Familia: {idCat}</>:<></>}
            {categoria=="subfamilia" ? <>SubFamilia: {idCat}</>:<></>}
            {categoria=="grupo" ? <>Grupo: {idCat}</>:<></>}
            {categoria=="subgrupo" ? <>SubGrupo: {idCat}</>:<></>}
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Affix offsetTop={top}>
                    <Input.Search 
                    allowClear

                    prefix={<><Button style={{backgroundColor:"lightseagreen", fontWeight:"bold"}} 

                    onClick={()=>{
                        if(idCat>-1)
                        {
                            setButtonText("..."); 
                            setIdCat(-1); 
                            setCategoria("-1")
                            setTags([])
                            return
                        }
                        
                        setModalOpen(true)
                        }}

                        >{buttonText}</Button></>} 
                        width={"100%"} 
                        onSearch={onSearch} 
                        value={searchValue} 
                        onChange={(e)=>{
                            //if(e.target.)
                            setSearchValue(e.target.value)
                        }} 
                        />
                </Affix>
            </Col>
        </Row>
        <Row style={{height: "300px", overflowY: "scroll"}}>
            <Col span={24}>
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
                                    <Button 
                                    onClick={
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
            </Col>
            </Row>
            <Modal destroyOnClose title="Filtro por Subgrupo" open={modalOpen} onCancel={()=>{setModalOpen(false)}} 
            okText="Aplicar"
            footer={null}
            width={"80%"}
            >
                <Row>
                    <Col span={24}>
                        {/*<CategoriaSelect callback={(categoria, id)=>{
                            setCategoria(categoria)
                            setIdCat(id)
                            setModalOpen(false)
                            setButtonText(categoria + " " + id)
                        }}/>*/}
                        <FiltroBusquedaProductoEnvio callback={(filtro)=>{
                            setCategoria(filtro.categoria)
                            setIdCat(filtro.refId)
                            setTags(filtro.tags)
                            setModalOpen(false)
                            setButtonText("X")
                        }}
                        />
                    </Col>
                </Row>
           
                
                 
            </Modal>
        </>
    )
}

export default SearchStockEnvio;