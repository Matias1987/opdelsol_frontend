import LayoutSingle from "@/components/layout/layout_single";

const { public_urls } = require("@/src/urls")
const { useEffect } = require("react")

export default function IndexMain(){
    useEffect(()=>{window.location.href = public_urls.modo},[])
}

IndexMain.PageLayout = LayoutSingle;