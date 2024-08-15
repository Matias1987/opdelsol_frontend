import FacturaForm from "@/components/forms/FacturaForm";
import SubGrupoForm from "@/components/forms/SubGrupoForm";
import MyLayout from "@/components/layout/layout";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post, public_urls } from "@/src/urls";

const { default: FacturaSelect } = require("@/components/FacturaSelect");
const { default: SubGroupSelect } = require("@/components/SubGroupSelect");
const { default: PopUpAgregarStockLoteForm } = require("@/components/forms/deposito/stock_lote/popup_stock_form");
const { DeleteOutlined, EditOutlined, PlusCircleOutlined } = require("@ant-design/icons");
const { Button, Table, Form, Tag, Modal } = require("antd");
const { useState } = require("react")

export default function AgregarStockLote(props){
    const [form] = Form.useForm();
    const [factura_popup_open, setFacturaPopupOpen] = useState(false)
    const [subgrupo_popup_open, setSubGrupoPopupOpen] = useState(false)
    const [tableData, setTableData] = useState([]);
    const [idSubgrupo, setIdSubgrupo] = useState(-1)
    const [btnDisabled,  setBtnDisabled] = useState(false)
    //testing
    const [updateall, setUpdateAll] = useState(false);

    const [multiplier, setMultiplier] = useState(1);
    const [precioDefecto, setPrecioDefecto] = useState(100);

    const [subgrupo, setSubgrupo] = useState(null)

    const HOOK = `${globals.obtenerUID()}.${Date.now()}.${Math.floor(Math.random() * 100)}`


    const subgrupoDetailsURL = get.obtener_detalle_subgrupo;

    const setValue = (key,value) => {
        switch(key){
            case "factura":
                form.setFieldsValue({factura:value})
                break;
            case "subgrupo":
                form.setFieldsValue({subgrupo:value})
                break;
        }
    }

    const getSubGrupoDetails = (id) => {
        if(id<0){
            return;
        }
        //alert(subgrupoDetailsURL + id)
        fetch(subgrupoDetailsURL + id)
        .then(response => response.json())
        .then((response)=>{
            //alert("SUBGRUPO :  " + JSON.stringify(response.data))
            setMultiplier(parseFloat(response.data[0].multiplicador));
            setPrecioDefecto(parseFloat(response.data[0].precio_defecto))
            setSubgrupo({
                nombre_corto: response.data[0].nombre_corto,
                nombre_largo: response.data[0].nombre_largo,
                multiplicador: response.data[0].multiplicador,
                precio_defecto: response.data[0].precio_defecto,
                idsubgrupo: response.data[0].idsubgrupo,

            })
            setIdSubgrupo(id);
        })

    } 

    const procesar_codigos = (_values) => 
    {
        let values = {..._values,
            codigo: _values.codigo.toUpperCase(),
            p1: _values.p1.toUpperCase(),
            p2: _values.p2.toUpperCase(),
        }
        var codigos = []

        const pattern1 = /^([0-9A-Z_\.\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([0-9A-Z_\.\s]+)$/gm

        const pattern2 = /^([0-9A-Z_\.\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([0-9A-Z_\.\s]+)\[([\-0-9\.]+)\s([\-0-9\.]+)\s([\-0-9\.]+)\]([0-9A-Z_\.\s]+)$/gm

        const res1 = pattern1.exec(values.codigo)

        if(res1!=null){
            var start = parseFloat(res1[2])
            var step = parseFloat(res1[4])
            var end = parseFloat(res1[3])
            for(let i=start;i<=end; i+=step ){
                codigos.push({
                    codigo: `${res1[1]}${(i>0?"+":"")+i.toFixed(2)}${res1[5]}`,
                    descripcion: `${values.p1}${(i>0?"+":"")+i.toFixed(2)}${values.p2}`,
                    esf:  i.toFixed(2),
                    cil: "",
                    tags: values.tags,
                })
            }
        }
        else{
            const res = pattern2.exec(values.codigo)
            if(res!=null){
                
                var start = parseFloat(res[2])
                var step = parseFloat(res[4])
                var end = parseFloat(res[3])
                var start2 = parseFloat(res[6])
                var step2 = parseFloat(res[8])
                var end2 = parseFloat(res[7])
                
                for(let i=start;i<=end; i+=step ){
                    for(let j=start2;j<=end2; j+=step2 ){
                        codigos.push({
                            codigo: `${res[1]}${(i>0?"+":"")+i.toFixed(2)}${res[5]}${j.toFixed(2)}${res[9]}`,
                            descripcion: `${values.p1}${(i>0?"+":"")+i.toFixed(2)}${values.p3}${j.toFixed(2)}${values.p2}`,
                            esf:i.toFixed(2),
                            cil:j.toFixed(2),
                            tags: values.tags,
                        })
                    }	
                }
            }
            else
            {
               
                return null
            }
        }
        //alert(JSON.stringify(codigos))
        return codigos;
    }
    
    const agregarRow = (_values) => 
    {
        //alert(JSON.stringify(_values))
        let values = {..._values, codigo: _values.codigo.toUpperCase()}
        var codigos = procesar_codigos(values)

        

        if(codigos == null){
            const found = tableData.find(r=>r.codigo == values.codigo)
            if(found){
                setTableData(
                    tableData.map(x=>(
                        x.codigo == values.codigo ? {...x,
                            cantidad: values.cantidad, 
                            costo: values.costo,
                            genero: values.genero, 
                            edad: values.edad,
                            descripcion: values.p1,
                            precio: values.precio,//Math.round((multiplier * values.costo) / 100) * 100,
                            modo_precio: values.modo_precio,
                            tags:values.tags,
                        } : x
                    ))
                )
            }
            else{
                setTableData([...tableData,{
                    codigo: values.codigo,
                    cantidad: values.cantidad,
                    costo: values.costo, 
                    descripcion: values.p1,
                    status: "PENDING",
                    genero: values.genero,
                    edad: values.edad,
                    precio: values.precio,// Math.round((multiplier * values.costo) / 100) * 100, 
                    modo_precio: values.modo_precio,
                    tags:values.tags,
                }])
            }
        }
        else{
            const __data = []
        
            codigos.forEach((cod)=>{
                //
                __data.push({
                    codigo: cod.codigo,
                    cantidad: values.cantidad,
                    costo: values.costo, 
                    descripcion: cod.descripcion,
                    status: "PENDING",
                    genero: values.genero,
                    edad: values.edad,
                    precio: values.precio,// Math.round((multiplier * values.costo) / 100) * 100, 
                    modo_precio: values.modo_precio,
                    esf: cod.esf,
                    cil: cod.cil,
                    tags:values.tags,
                })
            })
           
            setTableData(td=>{
                const _data = td.concat(__data)
                return _data
            })
        }
    }

        
            /*if(found) {
                setTableData(
                    tableData.map(x=>(
                        x.codigo == cod.codigo ? {...x,
                            cantidad: values.cantidad, 
                            costo: values.costo,
                            genero: values.genero, 
                            edad: values.edad,
                            descripcion: cod.descripcion,
                            precio: Math.round((multiplier * values.costo) / 100) * 100,
                        } : x
                    ))
                )
    
            }
            else{
                setTableData([...tableData,{
                    codigo: cod.codigo,
                    cantidad: values.cantidad,
                    costo: values.costo, 
                    descripcion: cod.descripcion,
                    status: "PENDING",
                    genero: values.genero,
                    edad: values.edad,
                    precio: Math.round((multiplier * values.costo) / 100) * 100, 
                }])
            }*/
        

        

        
    

    const remove_row = (key) => {
        setTableData(
            tableData.filter((r)=>(r.codigo!=key))
        )
    }

    const columns = [
        {title:"Codigo", dataIndex: "codigo"},
        {title:"Descripcion", dataIndex: "descripcion", render:(_,details)=>(
            <>
            {details.descripcion}&nbsp;
            <Tag color="blue">{details.genero}</Tag>
            <Tag color="green">{details.edad}</Tag>
            </>
        )},
        {title:"Cantidad", dataIndex: "cantidad"},
        {title:"Costo", dataIndex: "costo"},
        {title:"Precio", dataIndex: "precio"},
        {title:"Etiquetas", render:(_,{tags})=>tags.map(t=><Tag>{t}</Tag>)},
        {title:"Acciones", dataIndex: "codigo", render: (codigo)=>{
            let temp = null;
            for(let i=0;i<tableData.length;i++){
                if(tableData[i].codigo == codigo){
                    temp = tableData[i];
                    break;
                }
            }
            return(
                <>
                    <PopUpAgregarStockLoteForm title={"Editar"} precioDefecto={precioDefecto} multiplicador={multiplier} edit={true} values={temp} callback={(_data)=>{agregarRow(_data)}} />
                    <Button onClick={()=>{remove_row(codigo)}}><DeleteOutlined /></Button>
                </>
            )
        }},
        {
            title:"Estado", dataIndex: "status",
            render: (status)=>{
                return (
                    status == "PENDING" ? <Tag color="blue">PENDIENTE</Tag> : status == "OK" ? <Tag color="green">OK</Tag> : <Tag color="red">ERROR</Tag> 
                )
            }
        }
    ];

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const onFinish = (_values)=>{
        var values = Array();

       // alert(_values.subgrupo)

        if(typeof _values.subgrupo === 'undefined'){
            alert("Subgrupo no elegido");
            return;
        }

        if(_values.subgrupo == null){
            alert("Subgrupo no elegido");
            return;
        }
        if(_values.subgrupo == "-1"){
            alert("Subgrupo no elegido");
            return;
        }

        if(tableData.length<1){
            alert("No hay codigos para agregar");
            return;
        }

        setBtnDisabled(true);

        tableData.forEach(r=>{
            values.push(
                {
                    codigo: r.codigo,
                    cantidad: r.cantidad,
                    descripcion: r.descripcion,
                    costo: r.costo,
                    factura: _values.factura,
                    subgrupo_idsubgrupo: _values.subgrupo,
                    sucursal_idsucursal: globals.obtenerSucursal(),
                    genero: r.genero,
                    edad: r.edad,
                    modo_precio: r.modo_precio,
                    precio: r.precio,
                    esf: typeof r.esf === 'undefined' ? "" : r.esf,
                    cil: typeof r.cil === 'undefined' ? "" : r.cil,
                    tags: r.tags,
                    //add: typeof r.add === 'undefined' ? "" : r.add,

                }
            )
        })


        const update_status_row = (_status, _codigo) => {
            for(let i=0;i<tableData.length;i++){
                if(tableData[i].codigo == _codigo){
                    tableData[i].status = _status;
                }
            }
           
            setTableData(
                tableData.map(x=>(
                    x.codigo == _codigo ? {...x,status: _status} : x
                ))
            )
        }
        
        const _save_lote = () => {
            var curr = values.shift();

            //check if code exists
            post_method(post.codigo_por_codigo,{codigo: curr.codigo},(response)=>{
                if(response.data.length>0){
                    
                    update_status_row("Ya Existe",curr.codigo)
                    //alert("el codigo ya existe: " + response.data[0].idcodigo)
                    //el codigo ya existe
                    /*
                    ES POSIBLE QUE EL OBJETO STOCK NO EXISTA...
                    */
                    fetch(get.stock_exists + `${curr.sucursal_idsucursal}/${response.data[0].idcodigo}`/* url para ver si existe stock */)
                    .then(_response=>_response.json())
                    .then((_response)=>{
                        if(_response.data.length>0){
                            //stock ya existe
                            if(values.length>0){
                                _save_lote();
                            }
                            else{
                                alert("done")
                                document.location.href = public_urls.lista_stock;
                            }
                        }
                        else{
                            /// crear stock
                            const _data = {
                                sucursal_idsucursal: curr.sucursal_idsucursal,
                                codigo_idcodigo: response.data[0].idcodigo,//<<----?????
                                cantidad: curr.cantidad,
                                factura_idfactura: curr.factura,
                                costo: curr.costo,
                            }
                            //alert("insert stock now! " + JSON.stringify(res))
                            post_method(post.insert.stock,_data,(__res)=>{
                                update_status_row("OK",curr.codigo)
                                if(values.length>0){
                                    _save_lote()
                                }
                                else{
                                    alert("Hecho")
                                    document.location.href = public_urls.lista_stock;
                                }
                            })
                        }
                    })
                    
                }
                else{
                    
                    //alert("el codigo NO existe")
                    //start saving, first the code
                    //alert(JSON.stringify(curr))
                    post_method(post.insert.codigo,{...curr,hook:HOOK},(res)=>{
                        //THEN THE STOCK
                        if(res.status == "OK")
                        {
                            const _data = {
                                sucursal_idsucursal: curr.sucursal_idsucursal,
                                codigo_idcodigo: res.data,
                                cantidad: curr.cantidad,
                                factura_idfactura: curr.factura,
                                /*genero: curr.genero,
                                edad: curr.edad,
                                costo: curr.costo,
                                modo_precio: curr.modo_precio,
                                precio: curr.precio,
                                descripcion: curr.descripcion,*/
                                
                                //add: typeof curr.add === 'undefined' ? "" : curr.add,
                            }
                            //alert("insert stock now! " + JSON.stringify(res))
                            //then stock object...
                            post_method(post.insert.stock,_data,(__res)=>{
                                update_status_row("OK",curr.codigo)
                                if(values.length>0){
                                    _save_lote()
                                }
                                else{
                                    alert("Hecho")
                                    document.location.href = public_urls.lista_stock;
                                }
                            })
                        }
                    })
                }//end of if code not exists
            })
        }
        _save_lote();
    }

    const closePopup =()=>{
        setFacturaPopupOpen(false)
    }
    const onOk = () => {
        setFacturaPopupOpen(false)
        setUpdateAll(!updateall)
    }


    const closeSubgrupoPopup = () => {
        setSubGrupoPopupOpen(false)
    }

    const onOkSubGrupo = () => {
        setSubGrupoPopupOpen(false)
        setUpdateAll(!updateall)
    }

    const agregarSubgrupoPopup=_=>(
        <>
    <Button type="primary"  size="small"  onClick={()=>{setSubGrupoPopupOpen(true)}}>
        {props.edit ? <EditOutlined /> : <><PlusCircleOutlined />&nbsp;Agregar</>}
      </Button>
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CANCELAR"}}
        
        width={"80%"}
        title={"Agregar SubGrupo"}
        open={subgrupo_popup_open}
        onOk={closeSubgrupoPopup}
        onCancel={closeSubgrupoPopup}
        okText="CERRAR"
    >
        <SubGrupoForm action="ADD" callback={onOkSubGrupo} />
    </Modal>
    </>
    )
   

    const agregarFacturaPopup = _ =>
    <>
    <Button type="primary"  size="small"  onClick={()=>{setFacturaPopupOpen(true)}}>
        {props.edit ? <EditOutlined /> : <><PlusCircleOutlined />&nbsp;Agregar</>}
      </Button>
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CANCELAR"}}
        
        width={"80%"}
        title={"Agregar Factura"}
        open={factura_popup_open}
        onOk={closePopup}
        onCancel={closePopup}
        okText="CERRAR"
    >
        <FacturaForm action="ADD" callback={onOk} />
    </Modal>
    </>

    return(
        <>
        <h1>Agregar Stock por Lote</h1>

            <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>

                    <Form.Item style={{  padding:"3.5em", fontSize:".25em"}} label={"Subgrupo"} name={"subgrupo"} rules={[{required:true}]}>
                        <>
                        <SubGroupSelect callback={(id)=>{setValue("subgrupo", id);getSubGrupoDetails(id) }} />
                        {agregarSubgrupoPopup()}
                        {subgrupo !=null ? <p style={{fontSize:".75em"}}><i>Subgrupo: {subgrupo.nombre_corto}  Multiplicador: {subgrupo.multiplicador} </i></p> : null}
                        </>
                    </Form.Item>

                    <Form.Item label={"Factura"} name={"factura"}>
                        <>
                            <FacturaSelect reload={updateall} callback={(id)=>{ /*getSubGrupoDetails(id);*/ setValue("factura", id)}} />
                            <br />
                            {/* agregar facturas */}
                            {agregarFacturaPopup()}
                            {/* FIN agregar facturas */}
                            <br />
                            <br />
                        </>
                    </Form.Item>
                    
                    <Form.Item label={"Codigos"} name={"codigos"}>
                        { idSubgrupo === -1 ? <p style={{color:"red", padding:".7em", backgroundColor:"lightcoral"}}><b>Seleccione Subgrupo</b></p> :
                        <>
                        <PopUpAgregarStockLoteForm precioDefecto={precioDefecto} multiplicador={multiplier} title={"Agregar"} edit={false} values={null} callback={(_data)=>{
                                    agregarRow(_data)
                                }} />
                        {/*<PopupAgregarCodigoLoteStockV2 callback={
                            (cods)=>{
                                const _codes = []
                                cods.forEach((r)=>{
                                    _codes.push(
                                        {
                                            codigo: r.codigo,
                                            descripcion: r.descripcion,
                                            costo: 0,
                                            precio: 0,
                                            modo_precio: 0,
                                            cantidad: 0,
                                            status: "PENDING"
                                        }
                                    )
                                })
                                setTableData([..._codes])
                            }
                        } />*/}
                        <Table dataSource={tableData} columns={columns} pagination={false} />
                        </>
                        }
                    </Form.Item>

                    <Form.Item>
                        <Button disabled={btnDisabled} type="primary" htmlType="submit">Confirmar</Button>
                    </Form.Item>
            </Form>
        </>
    )
}


AgregarStockLote.PageLayout = MyLayout;