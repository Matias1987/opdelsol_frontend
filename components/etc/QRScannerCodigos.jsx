import { useState } from "react";
import QrReader from 'react-qr-scanner';

const QRScannerCodigos = ({onScan, onClose}) => {
  const [state, setState] = useState({
    delay: 100,
    result: "No result",
  });

  const handleScan = (data) => {
    setState({
      ...state,
      result: data,
    });
    if (data) {
      onScan?.(data.text);
      onClose?.();
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <>
      <div>
        <QrReader
          delay={state.delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{state.result}</p>
      </div>
    </>
  );
};

export default QRScannerCodigos;
