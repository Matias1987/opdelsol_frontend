import { QrScanner } from "@yudiel/react-qr-scanner"
import { Input } from "antd"
import { useState } from "react"

const DelSolQRScanner = (props) => {
    const [result, setResult] = useState("")

    return (
        <>
            {/*<Input value={result} prefix={"result:  "} />
            <QrScanner
                onDecode={(_result) => console.log(_result)}
                onError={(error) => console.log(error?.message)}
    />*/}
        </>
    )
}

export default DelSolQRScanner