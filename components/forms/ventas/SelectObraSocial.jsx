import CustomModal from "@/components/CustomModal";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import ObraSocialForm from "../ObraSocialForm";
import { get } from "@/src/urls";

const SelectObraSocial = (props) => {
    const [idOS , setIdOS] = useState(-1);
    const [obrasociales, setObraSociales] = useState([]);
    const [dataObraSocial, setDataObraSocial] = useState(null)
    const columns = [
        {title: 'Nombre', dataIndex: 'nombre'},
        {title: '', dataIndex: 'idmutual', render: (_,{idmutual})=>(
        <>
            <Button onClick={()=>{onOSSelected(idmutual)}}><CheckCircleOutlined /></Button>
        </>
        )}
    ]

    useEffect(()=>{
        //alert(get.lista_mutuales)
        //load os
        fetch(get.lista_mutuales)
        .then(response=>response.json())
        .then((response)=>{
            setObraSociales(
                response.data.map(r=>(
                    {
                        nombre: r.nombre,
                        idmutual: r.idmutual,
                    }
                ))
            )
        })
    },[])

    const show_details = () =>(
        dataObraSocial == null ? <Spin /> : <>
            Obra Social: <b>{dataObraSocial.nombre}</b>
            <Button danger onClick={()=>{setIdOS(-1); setDataObraSocial(null)}}><CloseOutlined /></Button>
        </>
    )

    const onOSSelected = (id) => {
        //load details
        setIdOS(id);
        fetch(get.obtener_mutual + id)
        .then(response=>response.json())
        .then((response)=>{
            setDataObraSocial({
                nombre: response.data[0].nombre
            })
            if(typeof props.callback !== 'undefined'){
                props.callback(id)
            }
        })

    }

    const onSearch = (value) => {

        const url = get.buscar_mutual;
        const _value = encodeURIComponent(value);
        fetch(url + _value)
        .then(response => response.json())
        .then((response)=>{
            setObraSociales(
                response.data.map(
                    r=>(
                        {
                            nombre: r.nombre,
                            idmutual: r.idmutual,
                            
                        }
                    )
                )
            )
        })
        .catch((err)=>{console.log(err)})
    }

    return (
        idOS === -1 ?
        <>
        <CustomModal openButtonText="Seleccione Obra Social" title="" >
            Obra Social
            <Input.Search onSearch={onSearch} />
            <CustomModal openButtonText="+ Agregar" title="Agregar" >
                <ObraSocialForm callback={onOSSelected} />
            </CustomModal>
            <Table columns={columns} dataSource={obrasociales} />
        </CustomModal>
        </> 
        : 
        show_details()
    )
}

export default SelectObraSocial;