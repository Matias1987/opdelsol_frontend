import {Card, Col, Row} from "antd"
import ImageList from "./image_list"
import UploadSingle from "./upload_single"
import { useState } from "react"
import { post } from "@/src/urls"

/**
 * 
 * @param idproducto 
 * 
 */
const ImagenesProducto = props =>{
    const {idproducto, readonly, size} = props
    const [reloadImages, setReloadImages] = useState(false)
    const row_style={padding:"6px"}


    return <>
        <Card title={ readonly ? <>Im&aacute;genes</> : <>Im&aacute;genes&nbsp;<UploadSingle tipo='producto' fkref={idproducto} callback={_=>{setReloadImages(!reloadImages)}} /></> } size="small">
            <Row  style={row_style}>
                <Col span={24}>
                    <ImageList 
                        reload={reloadImages}
                        resource_url = {post.obtener_images} 
                        post_params = {{fk_ref: idproducto, tipo:"producto"}} 
                    />
                </Col>
            </Row>
            
        </Card>
    </>
}

export default ImagenesProducto