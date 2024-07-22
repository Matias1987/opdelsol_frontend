import { PrinterFilled }  from "@ant-design/icons"
import { Row, Col, Input, Button, Select } from "antd"
import { ClientPrintJob, InstalledPrinter, JSPrintManager, WSStatus } from "jsprintmanager"
import { useEffect, useState } from "react"

const ZebraPrintDialog = (props) => {

    const [printers, setPrinters] = useState([])
    const [selectedPrinter, setSelectedPrinter] = useState("")
    


    const jspmWSStatus = () =>{
        if(JSPrintManager.websocket_status == WSStatus.Open) 
            return true
        else if(JSPrintManager.websocket_status == WSStatus.Closed)
        {
            alert("Status Closed")
            return false
        }else if(JSPrintManager.websocket_status == WSStatus.Blocked)
        {
            alert("Status Blocked")
            return false
        }
    
    
    }
    
    const init = () => {

        JSPrintManager.auto_reconnect=true
        JSPrintManager.start()
        JSPrintManager.WS.onStatusChanged = ()=>{
            if(jspmWSStatus())
            {
                JSPrintManager.getPrinters().then((myPrinters)=>{
                    let options = []
                    for(let i = 0;i<myPrinters.length; i++)
                    {
                        options.push({value: myPrinters[i], label: myPrinters[i] })
                    }

                    setPrinters(options)

                    alert(JSON.stringify(options))
                    
                })
            }
        }

    }

    const print = () =>{
        if(selectedPrinter=="")
        {
            return
        }
        if(jspmWSStatus())
        {
            let cpj = new ClientPrintJob()
            alert(selectedPrinter)
            cpj.clientPrinter = new InstalledPrinter(selectedPrinter);

            //var cmds =  `^XA ^FO400,10^BY3 ^BUN,30,Y,N ^FD${'ARM0001'}^FS ^CFA,20 ^FO400,65^FD0^FS ^CFA,20 ^FO380,85^FD${'RB35078'}^FS ^XZ`;
            for(let i=0;i<2;i++)
            {
                var cmds =  ''; 
                cmds+=`^XA ^FO400,10^BY3 ^BAN,30,N,N ^FD${'ARM0001'}^FS ^CFA,20 ^FO400,65^FD0^FS ^CFA,20 ^FO380,85^FD${'RB35078'}^FS `;
                
                /*cmds += "^FO20,30^GB750,1100,4^FS";
                cmds += "^FO20,30^GB750,200,4^FS";
                cmds += "^FO20,30^GB750,400,4^FS";
                cmds += "^FO20,30^GB750,700,4^FS";
                cmds += "^FO20,226^GB325,204,4^FS";
                cmds += "^FO30,40^ADN,36,20^FDShip to:^FS";
                cmds += "^FO30,260^ADN,18,10^FDPart number #^FS";
                cmds += "^FO360,260^ADN,18,10^FDDescription:^FS";
                cmds += "^FO30,750^ADN,36,20^FDFrom:^FS";
                cmds += "^FO150,125^ADN,36,20^FDAcme Printing^FS";
                cmds += "^FO60,330^ADN,36,20^FD14042^FS";
                cmds += "^FO400,330^ADN,36,20^FDScrew^FS";
                cmds += "^FO70,480^BY4^B3N,,200^FD12345678^FS";
                cmds += "^FO150,800^ADN,36,20^FDMacks Fabricating^FS";
                cmds += "^XZ";*/
                cpj.printerCommands = cmds;
                cpj.sendToClient()
            }
        }
    }
    

    useEffect(()=>{
        init()

    },[])

    return <>
        <Row>
            <Col span={24}>
                Printing Dialog
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Select options={printers} value={selectedPrinter} onChange={(v)=>{setSelectedPrinter(v)}} style={{width:"200px"}} />
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button onClick={()=>{print()}}><PrinterFilled /> Print</Button>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
            
            </Col>
        </Row>
    </>
}

export default ZebraPrintDialog;