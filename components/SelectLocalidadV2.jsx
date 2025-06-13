import globals from "@/src/globals"

const { get } = require("@/src/urls")
const { Row, Col, Select } = require("antd")
const { useState, useEffect } = require("react")

const SelectLocalidadV2 = (props) => {
    const [localidades, setLocalidades] = useState(null)
    const [provincias, setProvincias] = useState(null)
    const _row_style = {}
    const [selectedLocalidad, setSelectedLocalidad] =  useState({
        idlocalidad: 1279,
        iddepartamento: 162,
        idprovincia: 3,
        localidad: "RESISTENCIA",
        departamento: "",
        provincia: "PROVINCIA"
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
        /*alert(JSON.stringify({
            idlocalidad: globals.obtenerOpticaLocalidad(),
            idprovincia: globals.obtenerOpticaProvincia(),
        }))*/
        fetch(get.obtener_provincias)
        .then(e=>e.json())
        .then(response=>{
            setProvincias(response.data.map(r=>({
                idprovincia: r.idprovincia,
                provincia: r.provincia,

                value: r.idprovincia,
                label: r.provincia,
            })))
        })
        load_localidades(3)
        props?.callback?.(selectedLocalidad)
    },[])

    const _on_provincia_change = (e)=>{
        
        const prov = provincias.find(p=>p.idprovincia==e.target.value)
        
        setSelectedLocalidad(s=>{
            const _loc = {
                ...s,
                idprovincia: prov.idprovincia,
                provincia: prov.nombre,
                idlocalidad: -1,
                localidad:"",
            }
            props?.callback?.(_loc)
            return _loc

        })

        load_localidades(e.target.value)
    }

    const _on_localidad_change = (e)=>{
        setSelectedLocalidad(v=>{
            
            const loc = localidades.find(r=>r.idlocalidad==e.target.value)
   
            const _localidad = {
                ...v,
                idlocalidad: loc.idlocalidad, 
                iddepartamento: loc.iddepartamento, 
                localidad: loc.localidad, 
                departamento: loc.departamento
            }
            
            props?.callback?.(_localidad)
            return _localidad
        })
    }

    const _localidades_ = _ => (
        localidades == null ? <><i>Seleccione Provincia...</i></>
        :
        <>
             <select defaultValue={selectedLocalidad.idlocalidad} style={_select_style} onChange={_on_localidad_change}>
                    {
                        localidades.map((l)=>
                            <option value={l.idlocalidad}>{l.localidad}</option>
                        )
                    }
            </select>
        </>
    )

    const load_localidades = (idprovincia) => {
        fetch(get.obtener_localidades_provincia +idprovincia)
        .then(resp=>resp.json())
        .then((response)=>{
            setLocalidades(response.data.map(r=>({
                value: r.idlocalidad,
                label: r.localidad,
                
                idlocalidad: r.idlocalidad,
                iddepartamento: r.iddepartamento,
                departamento: r.departamento,
                localidad: r.localidad,
            })))
            //props?.callback?.(selectedLocalidad)
        })
    }

    return provincias == null ? <></> : <>
        <Row>
            <Col span={3} style={{textAlign:"right", paddingTop:".5em" }}>Prov.:&nbsp;&nbsp;</Col>
            <Col span={8}>
                <select defaultValue={selectedLocalidad.idprovincia} style={_select_style} onChange={_on_provincia_change}>
                    {
                        provincias.map((p)=><option value={p.idprovincia}>{p.provincia}</option>)
                    }
                   
       
                </select>
            </Col>
            <Col span={4} style={{textAlign:"right", paddingTop:".5em" }}>
                &nbsp;Loc.:&nbsp;
            </Col>
            <Col span={9}>
                {_localidades_()}
            </Col>
        </Row>
        
    </>
}


export default SelectLocalidadV2;