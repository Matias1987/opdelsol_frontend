const { public_urls } = require("@/src/urls")
const { useEffect } = require("react")

const Index = _ => {
    useEffect(()=>{window.location.href = public_urls.dashboard_deposito},[])
}

export default Index;