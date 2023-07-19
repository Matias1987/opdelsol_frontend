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
    obtenerTipoCuenta: () =>{
        return ['DEP_ARM','DEP_CRIS','DEP_LIQ']
    },
    obtenerIDsFamilias: () => (
        globals.obtenerTipoCuenta().map(t=>{
            switch(t)
            {
                case globals.tiposCuenta.DEP_ARM: return globals.familiaIDs.ARMAZON;
                case globals.tiposCuenta.DEP_CRIS: return globals.familiaIDs.DEP_CRIS;
                case globals.tiposCuenta.DEP_LC: return globals.familiaIDs.DEP_LC;
                case globals.tiposCuenta.DEP_LIQ: return globals.familiaIDs.DEP_LIQ;
                case globals.tiposCuenta.DEP_OT: return globals.familiaIDs.DEP_OT;
            }
        })
    ),

    familiaIDs: {
        ARMAZON: 2,
        LC: 15,
        LIQUIDOS: 14,
        INSUMO: 17,
        CRISTALES: 16,
        TRATAMIENTO: 18,
    },
    tiposCuenta:{
        DEP_ARM: 'DEP_ARM',
        DEP_CRIS: 'DEP_CRIS',
        DEP_LC: 'DEP_LC',
        DEP_LIQ: 'DEP_LIQ',
        DEP_OT: 'DEP_OT',
        CAJA: 'CAJA',
        VTAS: 'VTAS',
        ADM_1: 'ADM_1',
        ADM_2: 'ADM_2',
    }

}
export default globals;