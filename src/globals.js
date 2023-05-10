import useStorage from "../useStorage"
const globals =  {
    establecerSucursal: (idsucursal) =>
    {
        const {setItem} = useStorage();
        setItem("idsucursal",idsucursal);
    },
    obtenerSucursal: () =>
    {
        const {getItem} = useStorage();
        return getItem("idsucursal");
    },
    establecerToken: (_token) =>{
        const {setItem} = useStorage();
        setItem("token",_token);
    },
    getToken: ()=>{
        const {getItem} = useStorage();
        return getItem("token");
    }

}
export default globals;