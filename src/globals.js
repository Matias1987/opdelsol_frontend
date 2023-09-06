import useStorage from "../useStorage"
import { parse_DMY_date } from "./helpers/string_helper";
import { get } from "./urls";
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
    obtenerUserName: () =>
    {
        const {getItem} = useStorage();
        return getItem("uname");
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

    obtenerCajaID: () => {
        const {getItem} = useStorage();
        return getItem("caja")?.idcaja||0
    },

    clearCajaLocal: () => {
        const {setItem} = useStorage();
        setItem("caja", 0);
    },

    obtenerCajaLocal: () => {
        const {getItem} = useStorage();
        //alert(getItem("caja") ||0)
        return getItem("caja") || 0
    },

    obtenerCajaAsync: (callback) => {
        const {setItem} = useStorage();
        fetch(get.caja+globals.obtenerSucursal())
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            if(response.data.status=='OK')
            {
                //check if the 'caja' is old
                let _date = parse_DMY_date(response.data.fecha_f)
                //now
                let today = new Date()
                today.setHours(0,0,0,0);

                if(_date < today){
                    alert("<!> Caja abierta de " + response.data.fecha_f)
                }

                callback(response.data)
                
                setItem("caja", response.data);
            }
            else{
                //caja not found!
                callback(null)
                setItem("caja", 0);
            }
        })
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

    esUsuarioLaboratorio: () => {
        const {getItem} = useStorage();
        return getItem("laboratorio")==1;
    },

    esUsuarioCaja1: () => {
        const {getItem} = useStorage();
        return getItem("caja1")==1;
    },
    esUsuarioCaja2: () => {
        const {getItem} = useStorage();
        return getItem("caja2")==1;
    },
    esUsuarioVentas: () => {
        const {getItem} = useStorage();
        return getItem("ventas")==1;
    },
    esUsuarioDeposito: () => {
        const {getItem} = useStorage();
        return getItem("deposito")==1;
    },
    esUsuarioDepositoMin: () => {
        const {getItem} = useStorage();
        return getItem("deposito_min")==1;
    },
    esUsuarioAdminMin: () => {
        const {getItem} = useStorage();
        return getItem("admin1")==1;
    },
    esUsuarioAdmin: () => {
        const {getItem} = useStorage();
        return getItem("admin2")==1;
    },

    familiaIDs: {
        ARMAZON: 2,
        LC: 13,
        LIQUIDOS: 14,
        INSUMO: 16,
        CRISTALES: 14,
        TRATAMIENTO: 15,
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
    },
    tiposVenta:{
        DIRECTA: "1",
        LCLAB: "6",
        LCSTOCK: "3",
        MONOFLAB: "4",
        MULTILAB: "5",
        RECSTOCK: "2",

    }

}
export default globals;