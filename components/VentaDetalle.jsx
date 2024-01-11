import { EyeFilled, InfoCircleFilled } from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { useState } from "react";
import InformeVenta from "./informes/ventas/Base";
import InformeVentaMin from "./informes/ventas/InformeVentasMin";
import InformeVentaMinV2 from "./informes/ventas/InformeVentasMinV2";
import { get } from "@/src/urls";
/**
 * 
 * @param idventa 
 * @returns 
 */
const VentaDetallePopup = (props)=> {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
	const [mp, setMP] = useState([])
	const [haber, setHaber] = useState(null)
    const [loading, setLoading] = useState(true)
    const url= get.venta;
    const url_mp = get.get_venta_mp;

    const onOpen = () => {
        
        setLoading(true)
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

				setData({...response.data[0], total_haber: total_haber})
                setLoading(false)
				
			})	
		})
        setOpen(true)
    }
    return <>
        <Button type="ghost" onClick={onOpen}>
            <EyeFilled />
        </Button>
        <Modal
            open={open}
            onCancel={()=>{setOpen(false)}}
            footer={null}
            title={"Detalle Venta"}
            width={"80%"}
        >
            {loading?<Spin />:<InformeVentaMinV2 data={data}/>}

        </Modal>
    </>
}

export default VentaDetallePopup;