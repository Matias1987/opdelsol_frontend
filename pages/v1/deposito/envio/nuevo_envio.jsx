import EnvioForm from "@/components/forms/EnvioForm";
import MyLayout from "@/components/layout/layout";
import LayoutCaja from "@/components/layout/layout_caja";
import globals from "@/src/globals";

export default function NuevoEnvio(){


    return (
        <>
        <h3>Nuevo Env&iacute;o</h3>
        <EnvioForm  action="NONE" />
        </>
    )

}

NuevoEnvio.PageLayout = globals.esUsuarioDepositoMin() ? LayoutCaja : MyLayout;