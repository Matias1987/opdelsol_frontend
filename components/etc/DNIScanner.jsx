import { useEffect, useState } from "react";
import { Card, Button, Alert, Space, message } from "antd";
import { IdcardOutlined, StopOutlined } from "@ant-design/icons";
import { parseDniString } from "@/src/parseDniData";
import { Scanner } from "@yudiel/react-qr-scanner";
/*import * as QRLibrary from "@yudiel/react-qr-scanner";

console.log("QR Library exports:", QRLibrary);
console.log("Scanner:", QRLibrary.Scanner);
console.log("QrScanner:", QRLibrary.QrScanner);
*/
const DniScanner = ({ onDniScanned }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleScan = (detectedCodes) => {
  
    if (detectedCodes && detectedCodes.length > 0) {
      const rawValue = detectedCodes[0].rawValue;
      const parsedData = parseDniString(rawValue);

      if (parsedData) {
        setIsScanning(false);
        setErrorMsg(null);
        message.success("¡DNI escaneado correctamente!");

        // Enviamos el objeto con los datos al componente padre
        if (onDniScanned) {
          onDniScanned(parsedData);
        }
      } else {
        setErrorMsg(
          "El código leído no corresponde a un DNI argentino válido.",
        );
      }
    }
  };

  const handleError = (error) => {
    console.error("Error de cámara:", error);
    setErrorMsg("No se pudo acceder a la cámara. Verifica los permisos.");
  };

  useEffect(() => {
    //for testing only
    /*onDniScanned(
      parseDniString(
        "00738291045@MARTINEZ@FACUNDO EZEQUIEL@M@36789123@A@09/07/1992@18/11/2021@202",
      ),
    );*/
  }, []);

  return (
    <Card
      title={
        <Space>
          <IdcardOutlined />
          <span>Lector de DNI</span>
        </Space>
      }
      extra={
        <Button
          type={isScanning ? "default" : "primary"}
          danger={isScanning}
          icon={isScanning ? <StopOutlined /> : <IdcardOutlined />}
          onClick={() => {
            setErrorMsg(null);
            setIsScanning((prev) => !prev);
          }}
        >
          {isScanning ? "Detener" : "Escanear"}
        </Button>
      }
    >
      {errorMsg && (
        <Alert
          message={errorMsg}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {isScanning ? (
        <div style={{ borderRadius: 8, overflow: "hidden" }}>
          <Scanner
            onScan={handleScan}
            onError={handleError}
            formats={["qr_code", "pdf417"]}
            constraints={{
              facingMode: "environment",
              width: { ideal: 1920 },
              height: { ideal: 1080 },
            }}
          />
        </div>
      ) : (
        <div
          style={{
            height: 220,
            background: "#fafafa",
            border: "1px dashed #d9d9d9",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 16,
          }}
        >
          Presiona "Escanear" y apunta al código de barras del frente del DNI
        </div>
      )}
    </Card>
  );
};

export default DniScanner;
