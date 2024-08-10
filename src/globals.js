import useStorage from "@/useStorage";
import { parse_DMY_date } from "./helpers/string_helper";
import { get, public_urls } from "./urls";

/*import useStorage from "../useStorage"
import { parse_DMY_date } from "./helpers/string_helper";
import { get, public_urls } from "./urls";*/
const globals =  {

    /**printers */
    setPrinters: (val) => {
        const {setItem} = useStorage()
        setItem("printers",val)
    },

    getPrinters:()=>{
        const {getItem} = useStorage()
        return getItem("printers")
    },

    /** end of printers */

    establecerUserSoloVentaCaja: (val) => {
        const {setItem} = useStorage()
        setItem("soloVtaCaja",val)
    },

    obtenerSoloVtaCajaUser: () => {
        const {getItem} = useStorage();
        return getItem("soloVtaCaja");
    },

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
    setUserLogedIn: () => {
        const {setItem} = useStorage();
        setItem("loged", 1);
    },

    obtenerCajaLocal: () => {
        const {getItem} = useStorage();
        //alert(getItem("caja") ||0)
        return getItem("caja") || 0
    },

    userLogedIn: () => {
        const {getItem} = useStorage();
        return (getItem("loged")==1)||0
    },

    isCajaOpen: () => {
        const {getItem} = useStorage();
        return (getItem("cajaOpen")==1)||false
    },

    setCajaOpen: (cajaopen) => {
        const {setItem} = useStorage();
        setItem("cajaOpen", 1);
    },


    obtenerCajaAsync: (callback, avoidOutdated=true) => {
       
        fetch(get.caja+globals.obtenerSucursal())
        .then(response=>response.json())
        .then((response)=>{
            //alert(JSON.stringify(response))
            const {setItem} = useStorage();
            if(response.data.status=='OK')
            {
                //check if the 'caja' is old
                let _date = parse_DMY_date(response.data.fecha_f)
                //now
                let today = new Date()
                today.setHours(0,0,0,0);

                if(_date < today){
                    alert("<!> Caja abierta de " + response.data.fecha_f)
                    //callback(null)
                    //setItem("caja", 0);
                    //return
                }

                setItem("caja", response.data);

                callback(response.data)
                
                
            }
            else{
                //caja not found!
                callback(null)
                setItem("caja", 0);
            }
        })
    },

    validate_user : (wnd) => {
        const {getItem} = useStorage();
        if(!globals.esUsuarioDeposito() && !globals.esUsuarioDepositoMin())
        {
            wnd.location.replace(public_urls.modo)
        }

        const _token = getItem("token",'session')

        if(_token === typeof 'undefined' ){
            alert("Debe Iniciar Sesion")
            wnd.location.replace(public_urls.login)
        }

        var _t = setTimeout(() => {

            if(_t !== typeof 'undefined'){
                console.log("clear timeout")
                clearTimeout(_t)
            }
            fetch(get.check_login+_token)
            .then(response=>response.json())
            .then((response)=>{ 
                if(response.data.logged=='0'){
                    alert("Debe Iniciar Sesion")
                    wnd.location.replace(public_urls.login)
                }
                else{
                    _t  = validate_user();
                }

            })
            
        }, 2000);
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
        LC: 14,
        LIQUIDOS: 16,
        INSUMO: 15,
        CRISTALES: 13,
        TRATAMIENTO: 17,
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

    },
    estdosVenta:{
        INGREDADO: 'INGRESADO',
        PENDIENTE: 'PENDIENTE',
        ANULADO: 'ANULADO',
        TERMINADO: 'TERMINADO',
        ENTREGADO: 'ENTREGADO',
        PEDIDO: 'PEDIDO',
    },

    zpl2_code: `^XA ^FO400,10^BY3 ^BUN,30,Y,N ^FD{0}^FS ^CFA,20 ^FO400,65^FD{1}^FS ^CFA,20 ^FO380,85^FD{2}^FS ^XZ`

}
export default globals;