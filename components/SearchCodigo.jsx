import { Button, Table, Input,  Row, Col } from "antd";
import { useState } from "react";
import { PlusCircleFilled, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { get } from "@/src/urls";

const SearchCodigo = (props) => {
    const {suggestions} = props
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const onSearch = () => {
        if((searchValue.trim()).length<1)
        {
            return 
        }
        setLoading(true)
        fetch(get.search_codigos + searchValue)
        .then((response)=>response.json())
        .then((response)=>{
            /*
            this returns rows results from search
            */
            setDataSource(
                response.data.map(
                    (row) => ({
                        key: row.idcodigo,
                        codigo: row.codigo,
                        descripcion: row.descripcion,
                        idcodigo: row.idcodigo,
                        })
                )
            )
            setLoading(false)
        })
        .catch((error)=>{console.error(error)})
    }


    const _suggestions = _ => <>
        {
            typeof suggestions === 'undefined' ? <></> : suggestions.map(s=>(s||"").trim().length<1 ? <></> : <Button type="link" onClick={()=>{setSearchValue(s)}}><i>{s}</i></Button>)
        }
    </>

    return (
        <>

        {  (suggestions||[]).length<1 ? <></> :
            <Row>
                <Col span={2} style={{fontSize:"0.75em" ,padding:"1em", textAlign:"right"}}>
                    Sugerencias:
                </Col>
                <Col span={22} style={{padding:"1em"}}>
                {_suggestions()}   
                </Col>
            </Row>
        }
        <Row>
            <Col span={24}>
                <Input 
                allowClear
                value={searchValue}
                addonAfter={<><Button onClick={onSearch}><SearchOutlined /></Button></>}
                onChange={(e)=>{
                    setSearchValue(e.target.value)
                }}   prefix={<div style={{color:"red"}} >Buscar por código:&nbsp;&nbsp;&nbsp;</div>} 
                />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Table 
                size="small"
                scroll={{y:"300px"}}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                loading={loading}
                dataSource={dataSource} 
                columns={
                    [
                        {title:"Codigo", dataIndex: "codigo",},
                        {title:"Descripcion", dataIndex: "descripcion",},
                        {
                            title:"", 
                            dataIndex: "idcodigo",
                            render: 
                                (_,{idcodigo})=>{
                                    return (
                                        <>
                                            <Button onClick={()=>{props.callback(idcodigo)}}><PlusOutlined /></Button>
                                        </>
                                    )
                                }
                        },
                    ]
                }
            />
            </Col>
        </Row>
        </>
    )
}

export default SearchCodigo;