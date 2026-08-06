import ModificarCantidadCategoria from "@/components/forms/deposito/ModificarCantidadCategoria";
import MyLayout from "@/components/layout/layout";
import { Flex } from "antd";

export default function ModifCantCat(props){
    return <><Flex justify="center" align="center" style={{  width: "100%" }}><ModificarCantidadCategoria /></Flex> </>
}

ModifCantCat.PageLayout = MyLayout;