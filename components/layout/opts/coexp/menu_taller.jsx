import {
    AreaChartOutlined,
    BoxPlotOutlined,
    CreditCardOutlined,
    DollarOutlined,
    HomeFilled,
    MenuOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Menu, Modal } from "antd";
import { useState } from "react";
import Link from "next/link";
import { public_urls } from "@/src/urls";
import { lista_precios_visible, local_base_url } from "@/src/config";
import CustomModal from "@/components/CustomModal";
import ListaPreciosV3 from "@/components/lista_precios/listaPreciosV3";
import BuscarVenta from "@/components/forms/ventas/BuscarVenta";

const items = [

    {
        label: (
            <Link
                style={{ fontWeight: "600", fontSize: "1.1em", color: "#102C3E" }}
                href={public_urls.lista_cajas_admin}
            >
                <DollarOutlined /> Stock Cristales
            </Link>
        ),
        key: "cristales",
    },


];


export default function MenuTallerCOExp() {
    const [modalBuscarVentaOpen, setModalBuscarVentaOpen] = useState(false)
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
                onCancel={_ => setModalBuscarVentaOpen(false)}
                destroyOnClose
                width={"100%"}
                footer={null} >
                <BuscarVenta />
            </Modal>
        </>
    );
}
