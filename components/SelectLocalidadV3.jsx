import globals from "@/src/globals"

const { get } = require("@/src/urls")
const { Row, Col, Select } = require("antd")
const { useState, useEffect } = require("react")

const SelectLocalidadV3 = (props) => {
    const {fk_localidad,fk_provincia} = props

    const [localidades, setLocalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    const [firstLoad, setFirstLoad] = useState(true)
    const _row_style = {}
    const [selectedLocalidad, setSelectedLocalidad] =  useState({
        idlocalidad: fk_localidad,
        //iddepartamento: 162,
        idprovincia: fk_provincia,
        localidad: "",
        departamento: "",
        provincia: ""
    })

    const _select_style = {
        width:"100%",
        fontSize: "1.1em",
        backgroundColor: "white",
        color: "#181E21",
        padding: ".32em",
        borderColor: "#D9D9D9",
    }

    useEffect(()=>{

        setSelectedLocalidad(l=>({...l,idlocalidad:fk_localidad,idprovincia:fk_provincia}))
       
        setFirstLoad(true)
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
            
        
        }
        )
        load_localidades()
        props?.callback?.({idlocalidad:fk_localidad, idprovincia: fk_provincia })
    },[])

    const _on_provincia_change = (v)=>{
       
        const prov = provincias.find(p=>p.idprovincia==v)
        
        setSelectedLocalidad(s=>{
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
        setSelectedLocalidad(v=>{
         
            const loc = localidades.find(r=>r.idlocalidad==l)
   
            const _localidad = {
                ...v,
                idlocalidad: loc.idlocalidad, 
                iddepartamento: loc.iddepartamento, 
                localidad: loc.localidad, 
                departamento: loc.departamento
            }
            
            props?.callback?.({idlocalidad: loc.idlocalidad, idprovincia: selectedLocalidad.idprovincia })
            return _localidad
        })
    }

    const load_localidades = () => {
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
               
               
        })
    }

    return provincias == null ? <></> : <>
        <Row>
            
            <Col span={11}>
                <Select  
                defaultValue={fk_provincia}
                value={selectedLocalidad.idprovincia} 
                onChange={_on_provincia_change} 
                prefix={"Prov.: "} 
                options={provincias} 
                style={{width:"100%", overflow:"hidden"}} />
            </Col>
            <Col span={4} style={{textAlign:"right", paddingTop:".5em" }}>
                &nbsp;Loc.:&nbsp;
            </Col>
            <Col span={9}>
                {/*_localidades_()*/}
                <Select 
                defaultValue={fk_localidad}
                options={localidades.filter(r=>+r.provincia_id==+selectedLocalidad.idprovincia)} 
                value={selectedLocalidad.idlocalidad}  
                style={{width:"100%", overflow:"hidden"}} 
                onChange={_on_localidad_change}
                />
            </Col>
        </Row>
        
    </>
}


export default SelectLocalidadV3;