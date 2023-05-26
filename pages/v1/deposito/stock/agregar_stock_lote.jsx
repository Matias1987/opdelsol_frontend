import FacturaForm from "@/components/forms/FacturaForm";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { get, post, public_urls } from "@/src/urls";

const { default: FacturaSelect } = require("@/components/FacturaSelect");
const { default: SubGroupSelect } = require("@/components/SubGroupSelect");
const { default: PopUpAgregarStockLoteForm } = require("@/components/forms/deposito/stock_lote/popup_stock_form");
const { DeleteOutlined } = require("@ant-design/icons");
const { Button, Table, Form, Tag, Modal } = require("antd");
const { useState } = require("react")

const AgregarStockLote = (props) => {
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState([]);


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

    
    const agregarRow = (values) => {
        const found = typeof tableData.find(e=>e.codigo == values.codigo) !== 'undefined';
        //alert("found: " + found)
        if(found) {
            //update
            /*for(let i=0;i<tableData.length;i++){
                if(tableData[i].codigo == values.codigo){
                    alert("changing value")
                    tableData[i].cantidad = values.cantidad;
                    tableData[i].costo = values.costo;
                    break;
                }
            }
            setTableData(tableData);*/

            setTableData(
                tableData.map(x=>(
                    x.codigo == values.codigo ? {...x,cantidad: values.cantidad, costo: values.costo} : x
                ))
            )

        }
        else{
            setTableData([...tableData,{
                codigo: values.codigo,
                cantidad: values.cantidad,
                costo: values.costo, 
                descripcion: values.descripcion,
                status: "PENDING",
            }])
        }

        
    }

    const remove_row = (key) => {
        setTableData(
            tableData.filter((r)=>(r.codigo!=key))
        )
    }

    const columns = [
        {title:"Codigo", dataIndex: "codigo"},
        {title:"Descripcion", dataIndex: "descripcion"},
        {title:"Cantidad", dataIndex: "cantidad"},
        {title:"Costo", dataIndex: "costo"},
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
                    <PopUpAgregarStockLoteForm title={"Editar"} edit={true} values={temp} callback={(_data)=>{agregarRow(_data)}} />
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

        if(tableData.length<1){
            alert("No hay codigos para agregar");
            return;
        }

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
                    alert("el codigo ya existe: " + response.data[0].idcodigo)
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
                    post_method(post.insert.codigo,curr,(res)=>{
                        if(res.status == "OK")
                        {
                            const _data = {
                                sucursal_idsucursal: curr.sucursal_idsucursal,
                                codigo_idcodigo: res.data,
                                cantidad: curr.cantidad,
                                factura_idfactura: curr.factura,
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


    return(
        <>
        <h1>Agregar Stock por Lote</h1>
            <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
                    <Form.Item label={"Factura"} name={"factura"}>
                        <>
                            <FacturaSelect callback={(id)=>{setValue("factura", id)}} />
                            <br />
                            {/* agregar facturas */}
                            <Modal
                                cancelButtonProps={{ style: { display: 'none' } }}
                                okButtonProps={{children:"CANCELAR"}}
                                
                                width={"80%"}
                                title={"Agregar Factura"}
                                open={open}
                                onOk={closePopup}
                                onCancel={closePopup}
                                okText="CERRAR"
                            >
                                <FacturaForm action="ADD" callback={onOk} />
                            </Modal>
                            {/* FIN agregar facturas */}
                        </>
                    </Form.Item>
                    <Form.Item style={{ backgroundColor: "#E1EEFF", padding:"3.5em", fontSize:".25em"}} label={"Subgrupo"} name={"subgrupo"} rules={[{required:true}]}>
                        <SubGroupSelect callback={(id)=>{setValue("subgrupo", id)}} />
                    </Form.Item>
                <Form.Item label={"Codigos"} name={"codigos"}>
                    <>
                    <PopUpAgregarStockLoteForm title={"Agregar"} edit={false} values={null} callback={(_data)=>{
                                agregarRow(_data)
                            }} />
                    <Table dataSource={tableData} columns={columns} />
                    </>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Confirmar</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AgregarStockLote;