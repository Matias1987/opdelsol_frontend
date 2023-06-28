import { get } from "@/src/urls"

const { default: globals } = require("@/src/globals")
const { CheckCircleTwoTone } = require("@ant-design/icons")
const { Table, Button, Modal } = require("antd")
const { useState, useEffect } = require("react")
/**
 * 
 * @param onOpen function to be executed on opening
 * @param onCancel function to be executed on cancel
 * @param openButtonText text to show in the open button
 * @param validateOpen if this functions returns false, the popups doesn't show
 * 
 */
const SelectEnvioPopup = (props) => {
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const url_envios = get.envio_pendientes+ globals.obtenerSucursal();

    const showModal = () => {
        props?.onOpen?.()
        setOpen(props?.validateOpen?.() || true);
    }

    useEffect(()=>{
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
    },[])

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
        {props?.openButtonText||"Seleccionar Envío"}
    </Button>
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{children:"CERRAR"}}
        
        width={"80%"}
        title={props?.title||"Seleccione Envío"}
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

export default SelectEnvioPopup;