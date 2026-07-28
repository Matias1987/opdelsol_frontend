import { Menu, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";
import { local_base_url } from "@/src/config";
import BuscarVenta from "@/components/forms/ventas/BuscarVenta";

export default function MenuTallerCOExp() {
  const [modalBuscarVentaOpen, setModalBuscarVentaOpen] = useState(false);
  const [current, setCurrent] = useState("12");
  const get_url_to = (_target) => local_base_url + _target;
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <Menu
        style={{
          backgroundColor: "#41B79E" /*"#C4DD76""lightblue"*/,
          boxShadow: "0px 5px  30px #959A9A",
          borderTop: "3px solid #236254",
          borderEndEndRadius: "16px",
          borderEndStartRadius: "16px",
        }}
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="sub2_35">
          <Link href={get_url_to("deposito/stock/crsv2/stock_cristales")}>
            Stock Cristales
          </Link>
        </Menu.Item>
      </Menu>
      <Modal
        open={modalBuscarVentaOpen}
        onCancel={(_) => setModalBuscarVentaOpen(false)}
        destroyOnClose
        width={"100%"}
        footer={null}
      >
        <BuscarVenta />
      </Modal>
    </>
  );
}
