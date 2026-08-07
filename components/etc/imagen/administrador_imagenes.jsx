import { useEffect, useState } from "react";
import MiniImageGallery from "./mini_gallery";
import { Button, Card, Col, Modal, Row } from "antd";
import { post } from "@/src/urls";
import { post_method } from "@/src/helpers/post_helper";
import UploadSingle from "./upload_single";
import { uploads_url } from "@/src/config";
import ThumbnailSizePicker from "./ThumbnailSizePicker";
import { ReloadOutlined } from "@ant-design/icons";

const AdministradorImagenes = ({ idcodigo, record }) => {
  const [imagenes, setImagenes] = useState([]);
  const [imagenPorDefecto, setImagenPorDefecto] = useState(null);
  const [reloadImages, setReloadImages] = useState(false);
  const [size, setSize] = useState({ w: 16, h: 16 });
  const load = () => {
    post_method(
      post.obtener_images,
      { fk_ref: idcodigo, tipo: "producto" },
      (response) => {
        setImagenes(
          response.data.map((img) => ({
            id: img.idimagen,
            url: uploads_url + img.fname,
            isDefault: img.default,
          })),
        );
        // Set the default image if it exists
        const defaultImage = response.data.find((img) => img.default);
        if (defaultImage) {
          setImagenPorDefecto(defaultImage.idimagen);
        }
      },
    );
  };
  const onDelete = (id) => {
    if(!confirm("Confirmar Eliminar imagen"))
    {
        return;
    }
    post_method(post.remove_image, { id: id }, (response) => {
      setReloadImages(!reloadImages);
    });
  };
  const onSetDefault = (id) => {};

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
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <MiniImageGallery
              size={size}
              images={imagenes}
              onDelete={onDelete}
              onSetDefault={onSetDefault}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AdministradorImagenes;
