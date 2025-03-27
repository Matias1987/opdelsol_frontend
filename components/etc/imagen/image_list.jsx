import { useEffect, useState } from "react"

import { Image } from "antd"
import { post_method } from "@/src/helpers/post_helper"
import { uploads_url } from "@/src/config"

/**
 * 
 * @param resource_url  
 * @param method 
 * @param post_params 
 * 
 */

const ImageList = props => {
    const {resource_url, method, post_params, reload} = props

    const [images, setImages] = useState([])


    const load_get = ()=>{
        fetch(resource_url)
        .then(r=>r.json())
        .then(response=>{

        })
        .catch(e=>{console.log(e)})
    }

    const load_post = () =>{
        post_method(resource_url,post_params,(response)=>{
            setImages(response.data.map(img=>({src: uploads_url + img.fname})))
        })
    }

    useEffect(()=>{
        
        if(method==='GET')
        {
            alert(method)
          load_get()  
        }
        else{
            load_post()
        }
    },[reload])

    return <>
    <Image.PreviewGroup>
        {
            images.map(img=><>
                <Image src={img.src} width={"100px"} />
            </>)
        }
    </Image.PreviewGroup>
    </>
}

export default ImageList