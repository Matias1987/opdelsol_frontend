import { get } from "@/src/urls";
import { Row, Col, Select } from "antd";
import { useState, useEffect } from "react";

const SelectLocalidadV3 = (props) => {
    const {fk_localidad,fk_provincia} = props

    const [localidades, setLocalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    
    const [provinciasLoading, setProvinciasLoading] = useState(true)
    const [localidadLoading, setLocalidadLoading] = useState(true)

    const [selection, setSelection] =  useState({
        idlocalidad: fk_localidad,
        //iddepartamento: 162,
        idprovincia: fk_provincia,
        localidad: "",
        departamento: "",
        provincia: ""
    })



    useEffect(()=>{

        load_provincias()
        load_localidades()
        props?.callback?.({idlocalidad:fk_localidad, idprovincia: fk_provincia })
    },[])

    const _on_provincia_change = (v)=>{
       
        const prov = provincias.find(p=>p.idprovincia==v)
        
        setSelection(s=>{
            const _loc = {
                ...s,
                idprovincia: prov.idprovincia,
                provincia: prov.nombre,
                idlocalidad: -1,
                localidad:"",
            }
            props?.callback?.({idlocalidad:-1, idprovincia: prov.idprovincia })
            return _loc

        })

        //load_localidades(e.target.value)
    }

    const _on_localidad_change = (l)=>{
        
        setSelection(v=>{
         
            const loc = localidades.find(r=>r.idlocalidad==l)
   
            const _localidad = {
                ...v,
                idlocalidad: loc.idlocalidad, 
                iddepartamento: loc.iddepartamento, 
                localidad: loc.localidad, 
                departamento: loc.departamento
            }
            
            props?.callback?.({idlocalidad: loc.idlocalidad, idprovincia: selection.idprovincia })
            return _localidad
        })
    }

    const load_provincias = () => {
        setProvinciasLoading(true)
        fetch(get.obtener_provincias)
        .then(e=>e.json())
        .then(response=>{
            setProvincias(_=>
                
                [{idprovincia: -1, provincia:"", value:-1, label:""}].concat(response.data.map(r=>({
                    idprovincia: r.idprovincia,
                    provincia: r.provincia,
                    value: r.idprovincia,
                    label: r.provincia,
                    
                })))   

            )
            setProvinciasLoading(false)
        }
        )
    }

    const load_localidades = () => {
        setLocalidadLoading(true)
        fetch(get.obtener_localidades_provincia +'-1')
        .then(resp=>resp.json())
        .then((response)=>{
            
            setLocalidades(
                [{value:-1, label:"", idprovincia:-1}].concat(
                (response.data||[]).map(r=>({
                value: r.idlocalidad,
                label: r.localidad,
                
                idlocalidad: r.idlocalidad,
                iddepartamento: r.iddepartamento,
                departamento: r.departamento,
                localidad: r.localidad,
                provincia_id: r.provincia_id,
                        }))
                    )
                )
            setLocalidadLoading(false)
               
        })
    }

    return   <Row>
            { provinciasLoading ? <></> :
                <Col span={11}>
                    <Select  
                    defaultValue={fk_provincia}
                    value={selection.idprovincia} 
                    onChange={_on_provincia_change} 
                    prefix={"Prov.: "} 
                    options={provincias} 
                    style={{width:"100%", overflow:"hidden"}} />
                </Col>
            }
            { localidadLoading || localidades.filter(r=>+r.provincia_id==+fk_provincia).length<1 ? <></>:
                <Col span={11}>
                    <Select 
                    prefix={"Loc.: "}
                    defaultValue={fk_localidad}
                    options={localidades.filter(r=>+r.provincia_id==+fk_provincia)} 
                    value={selection.idlocalidad}  
                    style={{width:"100%", overflow:"hidden"}} 
                    onChange={_on_localidad_change}
                    />
                </Col>
            }
        </Row>
}


export default SelectLocalidadV3;