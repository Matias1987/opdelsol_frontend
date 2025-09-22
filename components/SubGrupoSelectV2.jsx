
import { get } from "@/src/urls";
import { PlusOutlined } from "@ant-design/icons";

import { Space, Select, Spin, Col, Row, Card, Button, Modal }  from "antd";
import { useState, useEffect }  from "react";
import SubGrupoForm from "./forms/SubGrupoForm";

const SubGroupSelectV2 = (props) => {

    const familiaFetchUrl = get.familia_menu_opt;// "http://localhost:3000/api/v1/familia/menu/options/";
    const subfamiliaFetchUrl = get.optionsforfamilia; //"http://localhost:3000/api/v1/subfamilia/optionsforfamilia/";
    const grupoFetchUrl = get.optionsforsubfamilia; //"http://localhost:3000/api/v1/grupos/optionsforsubfamilia/";
    const subGrupoFetchUrl = get.optionsforgrupo; //"http://localhost:3000/api/v1/subgrupos/optionsforgrupo/";


    const [idFamilia,setIdFamilia] = useState(-1);
    const [idSubFamilia, setIdSubFamilia] = useState(-1)
    const [idGrupo, setIdGrupo] = useState(-1)
    const [idSubGrupo, setIdSubGrupo] = useState(-1)

    const [familiaOptions, setFamiliaOptions] = useState([]);
    const [subFamiliaOptions, setSubFamiliaOptions] = useState([]);
    const [grupoOptions, setGrupoOptions] = useState([]);
    const [subGrupoOptions, setSubGrupoOptions] = useState([]);
    const [subgrupo_popup_open, setSubGrupoPopupOpen] = useState(false)

    const [familiaLoading , setFamiliaLoading] = useState(false);

    const [reload, setReload] = useState(false)


    const loadFamilia = () => {
        setFamiliaLoading(true);
        fetch(familiaFetchUrl)
        .then((response) => response.json())
        .then((response) => {
            setFamiliaOptions(response.data);
            setFamiliaLoading(false);
        })
        .catch(error => console.error(error))
    }

    const loadSubFamilia = (_idfamilia) =>{
        
        fetch(subfamiliaFetchUrl + _idfamilia)
        .then((response) => response.json())
        .then((response) => {
            setSubFamiliaOptions(response.data);
           
        })
        .catch(error => console.error(error))
    }

    const loadGrupo = (_idsubfamilia) => {
        
        fetch(grupoFetchUrl+_idsubfamilia)
        .then((response) => response.json())
        .then((response)=>{
            setGrupoOptions(response.data);
            
        })
        .catch(error => console.error(error))
    }


    const loadSubgrupo = (_idgrupo) => {
        
        fetch(subGrupoFetchUrl+_idgrupo)
        .then((response) => response.json())
        .then((response)=>{
            setSubGrupoOptions(response.data);
            
        })
        .catch(error => console.error(error))
    }

    useEffect(()=>{
        loadFamilia();
    },[reload]);

    const onAgregarSubgrupoClick=_=>{
        setSubGrupoPopupOpen(true)
    }

    return (
        <> 
            <Card 
            title={<><span style={{color:"darkblue"}}>Seleccione Categor&iacute;a de Producto</span> <Button size="small" type="link" onClick={onAgregarSubgrupoClick}><i><PlusOutlined size={"small"}/>Agregar Cat.</i></Button></>} size="small" 
            style={{width:"400px", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius:"16px"}}>
            <Row>
                    <Col span={24}>
                        <Select 
                        prefix={<span style={{color:"#536872"}}>Familia: </span>}
                        size="middle"
                        disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                        
                        style={{ width: "100%", overflow:"hidden"  }}
                        value={idFamilia==-1 ? "Seleccione..." : idFamilia}
                        loading = {familiaLoading}
                        onChange={
                            (value)=>{
                                
                                setIdSubFamilia(-1);
                                setIdGrupo(-1);
                                setIdSubGrupo(-1);

                                setSubFamiliaOptions(null)
                                setGrupoOptions(null)
                                setSubGrupoOptions(null)

                                setIdFamilia(value);

                                loadSubFamilia(value);
                                props.callback(-1)
                            }
                        }
                        options = {familiaOptions}
                        />
                    </Col>
                    <Col span={24}>
                        <Select 
                            size="middle"
                            disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                            prefix={<span style={{color:"#536872"}}>Subfamilia: </span>}
                            style={{ width: "100%" , overflow:"hidden" }}
                            loading = {idFamilia<0}
                            options = {subFamiliaOptions}
                            placeholder = {"Select"}
                            value = {idSubFamilia<0? "Seleccione: " : idSubFamilia}
                            onChange = {
                                (value)=>{
                                    
                                    setIdGrupo(-1);
                                    setIdSubGrupo(-1);
                                    setGrupoOptions(null)
                                    setSubGrupoOptions(null)
                                    setIdSubFamilia(value);

                                    loadGrupo(value);
                                    props.callback(-1)
                                }

                            }
                            />
                    </Col>
                    <Col span={24}>
                        <Select 
                            size="middle"
                            disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                            prefix={<span style={{color:"#536872", overflow:"hidden" }}>Grupo: </span>}
                            style={{ width: "100%" }}
                            loading = {idSubFamilia<0}
                            options = {grupoOptions}
                            placeholder = {"Select"}
                            value = {idGrupo<0? "Seleccione: " : idGrupo}
                            onChange = {
                                (value)=>{

                                    setIdSubGrupo(-1)
                                    setSubGrupoOptions(null)
                                    setIdGrupo(value)
                                    loadSubgrupo(value)
                                    props.callback(-1)
                                }
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <Select 
                            size="middle"
                            disabled={typeof props.disabled === 'undefined' ? false : props.disabled}
                            prefix={<span style={{color:"#536872"}}>SubGrupo: </span>}
                            style={{ width: "100%", overflow:"hidden" }}
                            loading = {idGrupo<0}
                            options = {subGrupoOptions}
                            placeholder = {"Seleccione"}
                            value = {idSubGrupo<0? "Seleccione: " : idSubGrupo}
                            onChange = {
                                (value)=>{
                                    setIdSubGrupo(value)
                                    props.callback(value)
                                }
                            }
                            
                            />
                    </Col>
                </Row>
            </Card>
            <Modal
                destroyOnClose
                footer={null}
               
                width={"500px"}
                title={"Agregar SubGrupo"}
                open={subgrupo_popup_open}
                onCancel={_=>{setSubGrupoPopupOpen(false)}}
                
            >
                <SubGrupoForm action="ADD" callback={_=>{setSubGrupoPopupOpen(false); setReload(!reload)}} />
            </Modal>
        </>

    );
}

export default SubGroupSelectV2;