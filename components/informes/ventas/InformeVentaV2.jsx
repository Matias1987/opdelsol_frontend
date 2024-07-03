import { get } from "@/src/urls"
import { PrinterFilled, ScissorOutlined } from "@ant-design/icons"
import { Button, Modal, Spin, Tag } from "antd"
import Barcode from "react-barcode"
import ReactToPrint from "react-to-print"

const { useState, useEffect, useRef } = require("react")
const { default: VentaDirectaItems } = require("./VentaDirectaItems")
const { default: RecStockItems } = require("./RecStockItems")
const { default: LCLabItems } = require("./LCLabItems")
const { default: LCStockItems } = require("./LCStockItems")
const { default: MultifLabItems } = require("./MultifLabItems")
const { default: MonofLabItems } = require("./MonofLabItems")
const { default: FechaEntregaInf } = require("./common/FechaRetiroInf")
const { default: MontosTotalesInf } = require("./common/MontosTotales")
const { default: ModoPagoInf } = require("./common/ModoPago")
const { default: DestinatarioInf } = require("./common/Destinatario")
const { default: ResponsableInf } = require("./common/Responsable")
const { default: DataSucursalInf } = require("./common/DataSucursalInf")

const InformeVentaV2 = (props) => {

    const [data, setData] = useState(null)
	const [mp, setMP] = useState([])
	const [haber, setHaber] = useState(null)
    
    const componentRef = useRef();
    
    const [dataLoaded, setDataLoaded] = useState(false)
    
    const [open, setOpen] = useState(false)

    const [itemsLoaded, setItemsLoaded] = useState(false)
    const [sucursalLoaded, setSucursalLoaded] = useState(false)
    const [clienteLoaded, setClienteLoaded] = useState(false)
    const [destLoaded, setDestLoaded] = useState(false)
    const [mpLoaded, setMPLoaded] = useState(false)

    const linkToPrint = () => {
        return (
            <Button disabled={ !(dataLoaded && itemsLoaded && sucursalLoaded && clienteLoaded && mpLoaded) }>Imprimir</Button>
        )
    }
    const page_style = `
        body{
            background-color: white;
            color: black;
            font-size: .96em;
        }
        td, th {
            background-color: white;
            color: black;
            padding: 0;
            margin: 0;
            font-size: .96em;
            border: 0px solid black;
        }
        table{
            margin:0;
            border: 0px solid black;
            padding: 0;
        }
        button{
            width:0;
            height: 0;
            font-size:0em;
            padding:0;
            margin:0;
            border: none;
            display:none;
        }

        .background-anulado{
            position:absolute;
            z-index:0;
            background:white;
            display:block;
            min-height:50%; 
            min-width:50%;
            color:yellow;
        }

        .bg-text-anulado
        {
            color:lightgrey;
            font-size:120px;
            transform:rotate(300deg);
            -webkit-transform:rotate(300deg);
        }
        .sobre-content{
            position:absolute;
            z-index:1;
        }
       
        
    `

    useEffect(()=>{
        if(typeof props.open !== 'undefined'){
            setOpen(props.open)
            if(props.open){
                onOpen()
            }
        }
    },[])

    const load = () => {
        const url= get.venta;
		const url_mp = get.get_venta_mp;
		//alert(url_mp + props.idventa)
		//get venta
		fetch(url+props.idventa)
		.then(response=>response.json())
		.then((response)=>{

			fetch(url_mp + props.idventa)
			.then(_response=>_response.json())
			.then((_response)=>{

				setMP(_response.data)

				var total_haber=0;

				_response.data.forEach(r=>{
					if(r.modo_pago!='ctacte')
					{
						total_haber += parseFloat(r.monto)
					}
				})

				//alert("data venta: " + JSON.stringify(response))

				setData({...response.data[0], total_haber: total_haber})
				
				setDataLoaded(true)
				
			})	
		})
        setOpen(true)
    }

    const onOpen = () => {
        
        load()
    }
    const callback_itemsLoaded = () => {setItemsLoaded(true)}
    const callback_sucursalLoaded = () => {setSucursalLoaded(true)}
    const callback_clienteLoaded = () => {setClienteLoaded(true)}
    const callback_destLoaded = () => {setDestLoaded(true)}
    const callback_MPLoaded = () => {setMPLoaded(true)}
	
    
    const productos = () => {
		//alert(data.tipo)
        switch(+data.tipo)
        {
            case 1: return <VentaDirectaItems idventa={data.idventa} callback={callback_itemsLoaded}/> ;
            case 2: return <RecStockItems idventa={data.idventa} callback={callback_itemsLoaded}/> ;
            case 6: return <LCLabItems idventa={data.idventa} callback={callback_itemsLoaded}/> ;
            case 3: return  <LCStockItems idventa={data.idventa} callback={callback_itemsLoaded}/>;
            case 5: return  <MultifLabItems idventa={data.idventa} callback={callback_itemsLoaded}/>;
            case 4: return  <MonofLabItems idventa={data.idventa} callback={callback_itemsLoaded}/>;
        }
    }
	const tipo_venta = (tipo) => {
		switch(+tipo)
		{
			case 1: return "VENTA DIRECTA"; 
			case 2: return "RECETA STOCK"; 
			case 3: return "LENTES DE CONTACTO STOCK"; 
			case 4: return "MONOFOCALES LABORATORIO"; 
			case 5: return "MULTIFOCALES LABORATORIO"; 
			case 6: return "LENTES DE CONTACTO LABORATORIO"; 
		}
	}
    return (
        <>
        { (props.hidebutton||false) == false ?  <Button onClick={()=>{onOpen()}} size="small"><PrinterFilled /></Button> : <></>}
        <Modal footer={null} width={"95%"} open={open} onCancel={()=>{
            setOpen(false)
            props?.onclose?.()
        }}>
		{data === null ? <Spin /> :
        <>
        <ReactToPrint pageStyle={page_style} trigger={linkToPrint} content={() => componentRef.current} />
                <hr />
                <br />
                
                <div ref={componentRef} >

                    {data.estado!='ANULADO' ? <></> :
                        <div className="box-overlay">
                        <br />
                        <span>ANULADO<br /> </span>
                        </div>
                    }

                    <div  style={{width: '100%', paddingLeft: '12px', paddingRight: '12px', paddingTop: '20px'}}> 
                    <table style={{height: '78px', width:'96%', border:'1', cellspacing:'0', cellpadding:'0', fontSize:"16px", padding:"0"}}>
                        <tbody>
                            <tr>
                                <td>
                                    <table style={{height: '21px', width:'100%', border:'1', cellspacing:'0', cellpadding:'0',}}>
                                        <tbody>
                                            <tr>
                                                <td width='250px'>
                                                    <table border='0' cellspacing='0' cellpadding='0'>
                                                        <tbody>
                                                            <tr>
                                                                <td width='40px'>
                                                                <img src=""/>
                                                                </td>
                                                                <td>
                                                                    <DataSucursalInf idsucursal={data.sucursal_idsucursal} />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    Nombre: <span style={{fontWeight: 'bold'}}>{data.cliente_nombre}</span><br />
                                                    <div style={{fontSize: '.7em', fontWeight:'bold', border:'1px', borderStyle:'dotted', borderColor:'black', padding:".25em"}}>
                                                    No se entregar&aacute;n trabajos sin esta boleta. Pasados los 30 d&iacute;as de la fecha
                                                    estipulada los precios podr&aacute;n ser actualizados al d&iacute;a. Transcurridos los 
                                                    60 d&iacute;as a partir de la fecha, no se aceptar&aacute;n reclamos.<br />
                                                    </div>
                                                    
                                                    Vendedor: <b>{data.usuario_nombre}</b>
                                                </td>
                                                <td style={{textAlign: 'center'}}>
                                                    {
                                                    tipo_venta(data.tipo)
                                                    }
                                                    <br />
                                                    {
                                                        //<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
                                                    }
                                                </td>
                                                <td width='250px'>

                                                    
                                                
                                                    <FechaEntregaInf data={data} />
                                                    
                                                    <MontosTotalesInf data={data}/>
                                                    
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding:"0", fontSize:".6em"}}>
                                    <ScissorOutlined  /><hr style={{ margin:"-1em", border:"1px dotted"}} />
                                    <br />
                                </td></tr>
                            <tr>
                                <td>
                                    <table style={{height: '21px', width:'100%'}} >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Vendedor: <b>{data.usuario_nombre}</b>
                                                    <ResponsableInf id={data.cliente_idcliente} callback={callback_clienteLoaded}/>
                                                    <DestinatarioInf id={data.fk_destinatario} />
                                                    <hr />
                                                    {data.obra_social!="" ? "Obra Social: "+data.obra_social : ""}<br /> {data.medico!="" ? "Medico: " + data.medico : ""} <br />Fecha de Entrega: {data.fecha_entrega_formated + "  " + (data.hora_retiro == "null" ? "-" : data.hora_retiro)}
                                                </td>
                                                <td width='180px'>
                                                    <div style={{marginTop:"-1.2em"}}>
                                                        <DataSucursalInf idsucursal={data.sucursal_idsucursal} callback={callback_sucursalLoaded} />
                                                        <FechaEntregaInf data={data} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr >
                                <td style={{textAlign: 'center', padding:"0"}}>
                                {
                                    //<Barcode value={data.idventa}  displayValue={false} width={2} height={6}/>
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {productos()}
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table width='100%' border='0' cellspacing='0' cellpadding='0'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <ModoPagoInf idventa={data.idventa} callback={callback_MPLoaded} />
                                                </td>
                                                <td>&nbsp;&nbsp;</td>
                                                <td width='250px'>
                                                    <MontosTotalesInf data={data} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Comentarios: </b><br />
                                    {data.comentarios}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
           
                <br />
                <hr />
                </div>
        <ReactToPrint  pageStyle={page_style} trigger={linkToPrint} content={() => componentRef.current} />
            
		</>}
        </Modal>
        </>
    )
}

export default InformeVentaV2;