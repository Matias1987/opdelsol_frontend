import IconViewSubgrupoSelector from "@/components/deposito/iconViewSubgrupoSelector";
import EditarCodigoIndiv from "@/components/forms/deposito/EditarCodigoIndiv";
import EditarDisenio from "@/components/forms/trabajo_multiple/editar_disenio";
import LayoutDistribuidora from "@/components/layout/layout_distribuidora";
import { Card, Modal } from "antd";
import { useState } from "react";
import EditarFamilia from "../deposito/stock/editar_familia";
import FamiliaForm from "@/components/forms/FamiliaForm";
import SubGrupoFormV3 from "@/components/forms/deposito/SubgrupoFormV3";

export default function productos_distrib() {
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [popupEditDisenioOpen, setPopupEditDisenioOpen] = useState(false);
  const [popupEditCodigoOpen, setPopupEditCodigoOpen] = useState(false);
  const [popupEditFOpen, setPopupEditFOpen] = useState(false);
  const [popupEditSFOpen, setPopupEditSFOpen] = useState(false);
  const [popupEditGOpen, setPopupEditGOpen] = useState(false);
  const [popupEditSGOpen, setPopupEditSGOpen] = useState(false);

  const onEditarClick = (id, tipo) => {
    setSelectedProducto({ id, tipo });
    switch (tipo) {
      case "codigo":
        setPopupEditCodigoOpen(true);
        break;
      case "familia":
        setPopupEditFOpen(true);
        break;
      case "subfamilia":
        setPopupEditSFOpen(true);
        break;
      case "grupo":
        setPopupEditGOpen(true);
        break;
      case "subgrupo":
        setPopupEditSGOpen(true);
        break;
      case "trabajo":
        setPopupEditDisenioOpen(true);
        break;
    }
  };
  return (
    <>
      <Card
        title="Productos"
        size="small"
        styles={{
          header: {
            backgroundColor: "##ffffed",
            background:
              "linear-gradient(281deg, #ffebcd 32%, rgba(231,233,235, 1) 75%)",
            borderBottom: "1px solid #eee",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
        }}
      >
        <IconViewSubgrupoSelector
          idInicial={19}
          tipoInicial={"familia"}
          nombreInicial={"DISTRIBUIDORA"}
          modoDistribuidora
          onEditarClick={onEditarClick}
          incCodigos={true}
          vistaTabla={true}
        />
      </Card>
      <Modal
        open={popupEditDisenioOpen}
        onCancel={(_) => setPopupEditDisenioOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      >
        <EditarDisenio
          idsubgrupo={selectedProducto?.id}
          callback={(_) => {
            setPopupEditDisenioOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={popupEditCodigoOpen}
        onCancel={(_) => setPopupEditCodigoOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      >
        <EditarCodigoIndiv
          idcodigo={selectedProducto?.id}
          buttonText={<>Editar C&oacute;digo</>}
          callback={(_) => {
            setPopupEditCodigoOpen(false);
          }}
        />
      </Modal>
      <Modal
        open={popupEditFOpen}
        onCancel={(_) => setPopupEditFOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      ></Modal>
      <Modal
        open={popupEditSFOpen}
        onCancel={(_) => setPopupEditSFOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      ></Modal>
      <Modal
        open={popupEditGOpen}
        onCancel={(_) => setPopupEditGOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      ></Modal>
      <Modal
        open={popupEditSGOpen}
        onCancel={(_) => setPopupEditSGOpen(false)}
        destroyOnClose
        width={"600px"}
        footer={null}
      >
        <SubGrupoFormV3
          idsubgrupo={selectedProducto?.id}
          callback={(_) => {
            setPopupEditSGOpen(false);
          }}
        />
      </Modal>
    </>
  );
}

productos_distrib.PageLayout = LayoutDistribuidora;
