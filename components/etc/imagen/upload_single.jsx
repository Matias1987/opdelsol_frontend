import { Button, Form, Input, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { post } from "@/src/urls";
import globals from "@/src/globals";
import { post_method } from "@/src/helpers/post_helper";

/**
 * 
 * @param fkref 
 * @param tipo
 * @param callback 
 */
const UploadSingle = props => {
    const {fkref, tipo, callback}= props
    const _props = {
        name: 'file',
        action: post.upload_image,
        accept:"image/*",
        headers: {
          authorization: 'Basic ' + globals.getToken(),
        },
        beforeUpload:(file)=>{ 
           // alert(JSON.stringify(file));
            return true
        },

        onChange(info) {
          //  alert(JSON.stringify(info))
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            const body = {fname: info.file.name, fk_ref: fkref, tipo:tipo}
            //alert(JSON.stringify(body))
            post_method(post.register_image, body, (response)=>{
                alert("OK");
                callback?.()
            })
            //message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            alert(`${info.file.name} file upload failed.`);
          }
        },
      };

    return <>
        {/*<form action={get_remote_url(remote_url.post.upload_image)} method="POST" encType="multipart/form-data">
            <input type="file" name="image" />
            <input hidden name="fk_ref" value={fkref} />
            <button type="submit">Upload</button>
        </form>*/}
        <Upload {..._props}>
            <Button type="link" icon={<UploadOutlined />}> Agregar</Button>
        </Upload>
    </>
}

export default UploadSingle