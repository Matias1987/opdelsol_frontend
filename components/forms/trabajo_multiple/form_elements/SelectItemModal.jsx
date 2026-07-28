import { useState } from "react";
import SelectItem from "./SelectItem";
import { Button, Modal } from "antd";
import  CloseOutlined from "@ant-design/icons/CloseOutlined";

const SelectItemModal = ({ tipo, idcliente, callback }) => {
  const [selection, setSelection] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      {!selection ? (
        <>
          <Button
            style={{borderColor:"#110157", borderRadius:"8px", fontWeight:"600", color:"#110157", backgroundColor:"rgba(77, 28, 253, 0.1)"}}
            onClick={(_) => {
              setModalOpen(true);
            }}
          >
            Seleccione...
          </Button>
        </>
      ) : (
        <>
          <div
            style={{
              padding: "2px",
              fontWeight: "600",
              color: "#110157",
              fontSize: "1.1em",
            }}
          >
            {selection.codigo}&nbsp;
            <Button
              size="small"
              type="link"
              danger
              onClick={(_) => {
                setSelection(null);
                callback(-1, null);
              }}
            >
              <CloseOutlined size={"small"} />
            </Button>
          </div>
        </>
      )}
      <Modal
        title="Búsqueda"
        open={modalOpen}
        onCancel={(_) => {
          setModalOpen(false);
        }}
        destroyOnClose
        footer={null}
        width={"800px"}
      >
        <SelectItem
          tipo={"base"}
          callback={(r) => {
            const _data = {
              codigo: r.codigo,
              descripcion: "",
              precio: r.precio_minorista,
              cantidad: 1,
              precio_defecto_mayorista: r.precio_mayorista,
              idcodigo: r.id,
              descuento: 0,
            };

            setSelection(_data);

            callback?.(_data.idcodigo, _data);
            setModalOpen(false);
            /*
            post_method(
              post.descuentos_subgrupo_cliente,
              { idsubgrupo: idsubgrupo, idcliente: idcliente || null },
              (response) => {
                let dto = null;
                if (response && response?.length > 0) {
                  dto = response[0];
                  setDescuento(response[0]);
                }
                setModalOpen(false);
                callback?.({
                  idcodigo: r.idcodigo,
                  descuento: dto ? dto?.porcentaje : 0,
                  precio: r.precio_mayorista,
                  iddescuento: dto ? dto?.id_descuento : null,
                });
                setSelection(r);
              },
            );
            */
          }}
        />
      </Modal>
    </>
  );
};

export default SelectItemModal;
