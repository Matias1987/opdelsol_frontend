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
    },
    obtenerUID: () => {
        const {getItem} = useStorage();
        return getItem("uid");
    },
    obtenerCaja: () => {
        return 1
    },
    familiaIDs: {
        ARMAZON: 2,
        LC: 15,
        LIQUIDOS: 14,
        INSUMO: 17,
        CRISTALES: 16,
        TRATAMIENTO: 18,
    }

}
export default globals;