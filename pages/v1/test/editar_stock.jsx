import SubGroupSelect from "@/components/SubGroupSelect";
import CodeGrid from "@/components/etc/CodeGrid";
import MyLayout from "@/components/layout/layout";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";


export default function EditarStock () { 
    const [idsubgrupo, setIdSubgrupo] = useState(-1)
    const [open , setOpen] = useState(false)
    return (
    <>
        <Row>
            <Col span={24}>
                <SubGroupSelect callback={(id)=>{
                    if(id>0){
                        //alert()
                        setIdSubgrupo(id)
                    }
                }}
                />

            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={()=>{setOpen(true)}} >Editar Grilla</Button>
            </Col>
        </Row>
        <Modal width={"900px"} open={open} key={idsubgrupo} destroyOnClose={true} onCancel={()=>{setOpen(false)} }>
            <CodeGrid idsubgrupo={idsubgrupo} width={500} height={480}/>
        </Modal>
    </>
    )}

    EditarStock.PageLayout = MyLayout;