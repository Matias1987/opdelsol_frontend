import {  public_urls } from "@/src/urls";
import { Layout, Row, Col, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useUserStatus } from "../providers/UserContext";

const MenuDistribuidora = dynamic(() => import("./menu_distribuidora"), {
  ssr: false,
  loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
});

const TrabajoMultiple = dynamic(
  () => import("../forms/trabajo_multiple/venta_multiple"),
  {
    ssr: false,
    loading: () => <div style={{ height: "30px" }}>&#9203;</div>,
  },
);

export default function LayoutDistribuidora(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { Content } = Layout;
  const { userLogedIn } = useUserStatus();
  
  const card_style2 = {
    header: {
      backgroundColor: "#262D42",
    },
    body: {
      backgroundColor: "#FAFAFA",
      padding: "0",
    },
  };

  useEffect(() => {
    if (!userLogedIn) {
      window.location.replace(public_urls.login);
    }
  }, [userLogedIn]);
  

  return (
    <Layout style={{ padding: 0 }} className="layout">
      <Card
        size="small"
        styles={card_style2}
        title={
          <div>
            {
              <MenuDistribuidora
                showBadge={showBadge}
                onNuevaVentaClick={(_) => {
                  setModalOpen(true);
                }}
              />
            }
          </div>
        }
        style={{
          borderLeft: "#262D42",
          borderRight: "#262D42",
        }}
      >
        <Content
          style={{
            margin: "10px 50px",
            padding: 6,
            borderRadius: "15px",
            minHeight: 580,
          }}
        >
          <Row>
            <Col span={24}>{props.children}</Col>
          </Row>
        </Content>
      </Card>
      <Modal
        footer={null}
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        width={"100%"}
      >
        <TrabajoMultiple
          on_change_done={(b) => {
            setShowBadge(b);
          }}
        />
      </Modal>
    </Layout>
  );
}
