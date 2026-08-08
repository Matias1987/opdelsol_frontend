import { useEffect, useState } from "react";
import MiniImageGallery from "./mini_gallery";
import { Button, Card, Col, Modal, Row } from "antd";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import UploadSingle from "./upload_single";
import { uploads_url } from "@/src/config";
import ThumbnailSizePicker from "./ThumbnailSizePicker";
import { ReloadOutlined } from "@ant-design/icons";

const AdministradorImagenes = ({ idcodigo, record, callback }) => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenPorDefecto, setImagenPorDefecto] = useState(null);
  const [reloadImages, setReloadImages] = useState(false);
  const [size, setSize] = useState({ w: 16, h: 16 });
  const load = () => {
    post_method(
      post.obtener_images,
      { fk_ref: idcodigo, tipo: "producto" },
      (response) => {
        const _imgs = response.data.map((img) => ({
          id: img.idimagen,
          url: uploads_url + img.fname,
          isDefault: +img.default === 1,
        }));

        setImagenes(_imgs);
        // Set the default image if it exists
        const defaultImage = _imgs.find((img) => img.isDefault);
        if (defaultImage) {
          setImagenPorDefecto(defaultImage);
        }
      },
    );
  };
  const onDelete = (id) => {
    if (!confirm("Confirmar Eliminar imagen")) {
      return;
    }
    post_method(post.remove_image, { id: id }, (response) => {
      setReloadImages(!reloadImages);
      callback?.();
    });
  };
  const onSetDefault = (id) => {
    post_method(
      post.marcar_defaut,
      { id: id, idanterior: imagenPorDefecto ? imagenPorDefecto.id : -1 },
      (_) => {
        setReloadImages(!reloadImages);
        callback?.();
      },
    );
  };

  useEffect(() => {
    load();
  }, [idcodigo, reloadImages]);

  return (
    <>
      <Card
        title={<>Administrador de Imágenes&nbsp;</>}
        size="small"
        extra={<></>}
      >
        <Row gutter={16} style={{ paddingBottom: "8px" }}>
          <Col>
            <ThumbnailSizePicker
              onSizeChange={(size) => {
                console.log("Selected thumbnail size:", size);
                switch (size) {
                  case "small":
                    setSize({ w: 32, h: 32 });
                    break;
                  case "medium":
                    setSize({ w: 64, h: 64 });
                    break;
                  case "large":
                    setSize({ w: 128, h: 128 });
                    break;
                }
              }}
            />
          </Col>
          <Col>
            <Button
              size="small"
              type="default"
              onClick={() => setReloadImages(!reloadImages)}
            >
              <ReloadOutlined />
            </Button>
          </Col>
          <Col>
            <UploadSingle
              tipo="producto"
              fkref={idcodigo}
              callback={(_) => {
                setReloadImages(!reloadImages);
                callback?.();
              }}
            />
          </Col>
          <Col></Col>
        </Row>

        <Row style={{padding:"8px"}}>
          <Col span={24}>
            <MiniImageGallery
              size={size}
              images={imagenes}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}  style={{padding:"8px"}}>
            <div style={{ width: "164px" }}>
              <div
                style={{
                  display: "block",
                  float: "left",
                  width: "16px",
                  height: "16px",
                  background: "#FF0400",
                  boxShadow: "1px 1px 1px 1px #c4c4c4",
                  borderRadius: "4px",
                }}
              />{" "}
              &nbsp; Imagen por defecto.
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AdministradorImagenes;
