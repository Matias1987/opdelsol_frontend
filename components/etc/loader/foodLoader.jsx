import {Progress} from "antd";

import { local_base_url } from "@/src/config";
import { useEffect } from "react";

const FoodLoader = props =>{



    return <>
    <div  style={{ width:"180px", }}>
       
            <Progress
                
                className="food-loader"
                percent={50}
                percentPosition={{ align: 'end', type: 'inner' }}

                size={[180, 40]}
                strokeColor="yellow"
                str
                style={{color:"black", mixBlendMode:"difference", background:`url(${"http://localhost:3000/lbg.png"})`}}
                
            />
            </div>
        </>
}

export default FoodLoader