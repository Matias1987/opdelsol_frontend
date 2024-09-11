import globals from "@/src/globals"
import { get } from "@/src/urls"
import { CheckCircleTwoTone } from "@ant-design/icons"

import { Table, Button, Modal } from "antd"
import { useState, useEffect }  from "react"
/**
 * 
 * @param onOpen function to be executed on opening
 * @param onCancel function to be executed on cancel
 * @param openButtonText text to show in the open button
 * @param validateOpen if this functions returns false, the popups doesn't show
 * 
 */
const SelectEnvio = (props) => {
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [buttonText, setButtonText] = useState("")
    const [header, setHeader] = useState("")
    const url_envios = get.envio_pendientes+ globals.obtenerSucursal();

    const showModal = () => {
        props?.onOpen?.()
        setOpen(props?.validateOpen?.() || true);
    }

    useEffect(()=>{
        setButtonText(props?.openButtonText||"Seleccionar Envío")
        setHeader(props?.title||"Seleccione Envío")
        if(!open) return;
        setLoading(true)
        fetch(url_envios )
        .then(response=>response.json())
        .then((response)=>{
            setSource(source => 
                response.data.map(e=>(
                    {
                        fecha: e.fecha,
                        idenvio: e.idenvio,
                        cantidad: e.cantidad_total,
                        estado: e.estado,
                    }
                ))
            )
            setLoading(false)
        })    
    },[open])

    const onEnvioSelect = (idenvio) => {
        
        props?.callback?.(idenvio);
        setOpen(false)
    }

    const handleCancel = () => {
        props?.onCancel?.();
        setOpen(false);
      };

    return (
    <>
    <Button type="primary" ghost size="small" onClick={showModal}>
        {buttonText}
    </Button>
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
        title={header}
        open={open}
        
        onOk={()=>{ 
          props?.onOk?.(); 
          setOpen(false)}
        }

        onCancel={handleCancel}
        okText="CERRAR"
        destroyOnClose={true}
      >
        <Table 
        loading={loading}
            dataSource={source}
            columns={[
                {title:"Fecha", dataIndex: "fecha" },
                {title:"Nro.", dataIndex:"idenvio"},
                {title:"Cant.", dataIndex:"cantidad"},
                {title:"", dataIndex:"idenvio", render:(_,{idenvio})=>{
                    return (
                        <Button onClick={()=>{onEnvioSelect(idenvio)}}><CheckCircleTwoTone /></Button>
                    )
                }}
            ]}
        />
    </Modal>
    </>
    )
}

export default SelectEnvio;