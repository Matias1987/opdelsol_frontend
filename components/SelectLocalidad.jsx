const { get } = require("@/src/urls")
const { Row, Col, Select } = require("antd")
const { useState, useEffect } = require("react")

const SelectLocalidad = (props) => {
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

    useEffect(()=>{
        
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

    const _localidades_ = _ => (
        localidades == null ? <><i>Seleccione Provincia...</i></>
        :
        <>
            <Select value={selectedLocalidad.idlocalidad} style={{width:"100%"}} options={localidades} onChange={(val)=>{
                setSelectedLocalidad(v=>{
                    
                    const loc = localidades.find(r=>r.idlocalidad==val)
           
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
            }} />
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
            <Col span={2} style={{textAlign:"right", paddingTop:".5em" }}>Provincia:&nbsp;&nbsp;</Col>
            <Col span={6}>
                <Select value={selectedLocalidad.idprovincia} style={{width:"100%"}} options={provincias} onChange={(v)=>{
                    
                    const prov = provincias.find(p=>p.idprovincia==v)

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

                    load_localidades(v)
                }} />
            </Col>
            <Col span={5} style={{textAlign:"right", paddingTop:".1em" }}>
                &nbsp;Localidad:&nbsp;
            </Col>
            <Col span={6}>
                {_localidades_()}
            </Col>
        </Row>
        
    </>
}


export default SelectLocalidad;