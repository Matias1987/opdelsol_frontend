import { Button, Col, Input, Row, Table, Tree } from "antd"
import { useEffect, useState } from "react"

export default function(){
    const [step,setStep] = useState(0)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(0)
    const [lista, setLista] = useState("")
    const [prefijo, setPrefijo] = useState("")
    const [codes, setCodes] = useState([])
    const [listaCodigos, setListaCodigos ] = useState([])
    

    const check_node = (n, items, keyroot) => {

        if(n.length<1)//root
        {
            for(let i=0;i<items.length;i++)
            {
                n.push({children:[] ,title: prefijo.toString()+ items[i], key: keyroot + "-"  + i}  )
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
                    n.children.push({children:[] ,title: `${prefijo.toString()} ${items[i]}`, key: keyroot + "-"  + i}  )
                }
            }
            else{
                for(let i=0;i<n.children.length;i++)
                {
                    check_children(n.children[i], items,keyroot + "-" + i)
                }
            }
    }
    
    const add_range = () => {

        const items= []
        alert(JSON.stringify(
            {
                start: start,
                end: end,
                step:step
            }
        ))
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
        //alert(JSON.stringify(codes))
        for(let i=0;i<codes.length;i++)
        {
            //alert("enter; " + JSON.stringify(codes[i]))
            _process_code(codes[i],"", output)
        }
        //alert(JSON.stringify(output))
        setListaCodigos([...output])
    }

    useEffect(()=>{
        generar_lista()
    },[codes])

  
    
    return <>
            <Row>
                <Col span={24}> <h3>C&oacute;digos</h3></Col> 
            </Row>
            <Row>
                <Col span={8}>
                    <Input  value={prefijo} onChange={(e)=>{setPrefijo(e.target.value)}} prefix="Prefijo"/>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{padding: '.5em' ,backgroundColor:"rgba(106, 90, 205, 0.5)"}}>
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
                <Col span={12} style={{padding: '.5em' ,backgroundColor:"rgba(255, 99, 71, 0.5)"}}>
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
    </>
}