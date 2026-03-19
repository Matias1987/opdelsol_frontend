import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { Col, QRCode, Row } from "antd";
import { useEffect, useState } from "react";

const QRAccess = (_) => {
  const [qrData, setQrData] = useState(null);
  const [status, setStatus] = useState("");

  const check_status = (_) => {
    //alert(qrData)
    if (!qrData) {
      return;
    }

    post_method(post.check_req_status, { qr_data: qrData }, (response) => {
      const data = response?.data;
      //alert(JSON.stringify(data))

      let has_to_recheck = !data || !data?.token;

      if (has_to_recheck) {
        setStatus("Pendiente...");
        setTimeout(check_status, 3000);
      } else {
        //set new token
        globals.establecerToken(response.data.token);
        //redirect
        alert("Access successful, now redirecting...");
      }
    });
  };

  const generate_request = (_) => {
    const id_usuario = globals.obtenerUID();
    const id_sucursal = globals.obtenerSucursal();

    post_method(
      post.generar_arequest,
      {
        id_usuario,
        id_sucursal,
      },
      (response) => {
        alert("qr response" + JSON.stringify(response.data.qr_data));
        setQrData((_) => response.data.qr_data);
      },
    );
  };

  useEffect(() => {
    //get user data:
    if (!qrData) {
      generate_request();
    } else {
      check_status();
    }
  }, [qrData]);

  return !qrData ? (
    <>Espere...</>
  ) : (
    <>
      <Row>
        <Col span={24}>
          <QRCode value={qrData} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>{status}</Col>
      </Row>{" "}
    </>
  );
};

export default QRAccess;
