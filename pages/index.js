const { public_urls } = require("@/src/urls")
const { useEffect } = require("react")

const IndexMain = _ => {
    useEffect(()=>{window.location.href = public_urls.dashboard_deposito},[])
}

export default IndexMain;