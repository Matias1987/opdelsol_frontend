import { Button, Upload } from "antd";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";

/**
 *
 * @param fkref
 * @param tipo
 * @param callback
 */
const UploadSingle = (props) => {
  const { fkref, tipo, callback } = props;
  const _props = {
    name: "file",
    action: post.upload_image,
    accept: "image/*",
    headers: {
      authorization: "Basic " + globals.getToken(),
    },
    beforeUpload: (file) => {
      return true;
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        const body = { fname: info.file.name, fk_ref: fkref, tipo: tipo };
        post_method(post.register_image, body, (response) => {
          alert("Imagen Cargada.");
          callback?.();
        });
      } else if (info.file.status === "error") {
        alert(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Upload {..._props} showUploadList={false}>
        <Button type="default" icon={<UploadOutlined />} size="small">
          Agregar
        </Button>
      </Upload>
    </>
  );
};

export default UploadSingle;
