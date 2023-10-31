import CustomModal from "@/components/CustomModal"
import { Button, Col, Input, Modal, Row, Table, Tree } from "antd"
import { useEffect, useState } from "react"

const PopupAgregarCodigoLoteStockV2 = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [step,setStep] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [lista, setLista] = useState("")
    const [prefijo, setPrefijo] = useState("")
    const [codes, setCodes] = useState([])
    const [listaCodigos, setListaCodigos ] = useState([])
    const [jsonText, setJsonText] = useState("[]")
    const [queries, setQueries] = useState("")
    

    const check_node = (n, items, keyroot) => {

        if(n.length<1)//root
        {
            for(let i=0;i<items.length;i++)
            {
                n.push({children:[] ,title: items[i], key: keyroot + "-"  + i}  )
            }
        }
        else
        {
            for(let i=0;i<n.length;i++){
                check_children(n[i],items,keyroot + "-" + i)
            }
        }
    }

    const check_children = (n, items, keyroot) =>{
        
            if(n.children.length<1)
            {
                for(let i=0;i<items.length;i++)
                {
                    n.children.push({children:[] ,title: `${items[i]}`, key: keyroot + "-"  + i}  )
                }
            }
            else{
                for(let i=0;i<n.children.length;i++)
                {
                    check_children(n.children[i], items,keyroot + "-" + i)
                }
            }
    }

    const add_text = () => {
        const items = [prefijo.toString()]
        var _codes = [...codes]
        check_node(_codes,items,"0")
        setCodes(c=>{
            return [..._codes]
        })
    }
    
    const add_range = () => {

        const items= []
        for(let j=+start;j<=+end;j+=+step){
            items.push(j.toFixed(2))
        }

        var _codes = [...codes]
        check_node(_codes,items,"0")
        
        setCodes(c=>{
            return [..._codes]
        })
        
    }

    const add_list = () => {
        
        const parts = lista.split(';')
        const items= []

        for(let i=0;i<parts.length;i++){
            items.push(parts[i])
        }
       
        var _codes = [...codes]
        check_node(_codes,items,"0")
        
        setCodes(c=>{
            return [..._codes]
        })
    }

    const _process_code = (n,prev, output) => {
        if(n.children.length<1)
        {
           
            output.push({codigo: prev + n.title, descripcion: prev + n.title})
        }
        else{
            for(let i=0;i<n.children.length;i++)
            {
                _process_code(n.children[i],prev + n.title,output)
            }
        }
    }

    const generar_lista = _ => {
        var output=[]
        for(let i=0;i<codes.length;i++)
        {
            _process_code(codes[i],"", output)
        }
        setListaCodigos([...output])
        var _queries = ""
        output.forEach(r=>{
            _queries+=`INSERT INTO codigo (subgrupo_idsubgrupo, codigo, descripcion) VALUES (1516, '${r.codigo}', '${r.descripcion}');\r\n`
        
        })
        setQueries(_queries)
    }

    useEffect(()=>{
        generar_lista()
    },[codes])

  
    
    return <>
    <Button type="link" onClick={()=>{setModalOpen(true)}}>Agregar Lista Adv.</Button>
    <Modal width={"80%"} open={modalOpen} onCancel={()=>{setModalOpen(false)}} footer={null}>
        <Row>
            <Col span={20}> <h3>C&oacute;digos</h3></Col> 
            <Col span={2}><Button onClick={()=>{setCodes([])}}>Reset</Button></Col>
            <Col span={2}>
                <CustomModal openButtonText="JSON">
                    <Row>
                        <Col span={24}>
                        <Input.TextArea rows={20} defaultValue={ JSON.stringify(codes)} onChange={(e)=>{setJsonText(e.target.value)}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button onClick={(e)=>{
                                setCodes(JSON.parse(jsonText))
                            }}>
                                Establecer
                            </Button>
                        </Col>
                    </Row>
                    

                </CustomModal>
                <CustomModal openButtonText="QUERIES">
                    <Row>
                        <Col span={24}>
                        <Input.TextArea rows={20} defaultValue={ queries}  />
                        </Col>
                    </Row>
                </CustomModal>
            </Col>
        </Row>
        <Row>
            <Col span={4}>
                <h5>Agregar C&oacute;digos a la tabla:</h5>
            </Col>
            
        </Row>
        <Row>
            <Col span={4} style={{padding: '.5em', backgroundColor:"rgba(60, 179, 113, 0.5)"}}>
                <Row>
                    <Col span={24}>
                        <h5>Texto</h5>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input  value={prefijo} onChange={(e)=>{setPrefijo(e.target.value)}} prefix="Valor"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>{add_text()}}>Agregar </Button>
                    </Col>
                </Row>
                
            </Col>
            <Col span={10} style={{padding: '.5em' ,backgroundColor:"rgba(106, 90, 205, 0.5)"}}>
                <Row>
                    <Col span={24}>
                        <h5>Rango</h5>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <Input type="number" value={start} onChange={(e)=>{setStart(e.target.value)}} prefix="Start"/>
                    </Col>
                    <Col span={8}>
                        <Input type="number" value={step} onChange={(e)=>{setStep(e.target.value)}} prefix="Step"/>
                    </Col>
                    <Col span={8}>
                        <Input type="number" value={end} onChange={(e)=>{setEnd(e.target.value)}} prefix="End"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>{add_range()}}>Agregar </Button>
                    </Col>
                </Row>
            </Col>
            <Col span={10} style={{padding: '.5em' ,backgroundColor:"rgba(255, 99, 71, 0.5)"}}>
                <Row>
                    <Col span={24}>
                        <h5>Lista</h5>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Input value={lista} onChange={(e)=>{setLista(e.target.value)}} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button onClick={()=>{add_list()}}>Agregar </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <Tree checkable treeData={codes}/>
            </Col>
            <Col span={12}>
                <Table columns={[{title:"Codigo", dataIndex:"codigo"}, {title:"Descripcion", dataIndex:"descripcion"}]} dataSource={listaCodigos}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button block onClick={()=>{props?.callback?.(listaCodigos); setModalOpen(false)}}>Agregar</Button>
            </Col>
        </Row>
        </Modal>
    </>
}

export default PopupAgregarCodigoLoteStockV2;