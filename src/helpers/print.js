const { JSPrintManager, WSStatus, ClientPrintJob } = require("jsprintmanager")
const { default: globals } = require("../globals")

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
                    options.push(myPrinters[i])
                //    options+=`<option>${myPrinters[i]}</option>`
                }
                globals.setPrinters(options)

            })
        }
    }
}

const print = () => {
    if(jspmWSStatus()){
        let cpj = new ClientPrintJob()

    }
}

module.exports = {print, init}