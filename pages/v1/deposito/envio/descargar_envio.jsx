import DescargarEnvio from "@/components/forms/deposito/DescargaEnvio";
import MyLayout from "@/components/layout/layout";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";

export default function Importar(props){
    return <><h3>Descargar Env&iacute;o</h3><br /><DescargarEnvio /></>
}

Importar.PageLayout = globals.esUsuarioDepositoMin() ? LayoutCaja : MyLayout;