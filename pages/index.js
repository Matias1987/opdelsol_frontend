import LayoutSingle from "@/components/layout/layout_single";

import { public_urls } from "@/src/urls";
import { useEffect } from "react";

export default function IndexMain(){
    useEffect(()=>{window.location.href = public_urls.modo},[])
}

IndexMain.PageLayout = LayoutSingle;