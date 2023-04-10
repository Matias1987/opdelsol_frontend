import Link from "next/link"
const urlhelper = require("../../src/url_helper");
const { Menu } = require("antd")


const SideMenu = () => {
    //let navigate = UseNavi

    const get_url_to = (_target) => urlhelper.getUrl() + "/v1/" +_target

    const goToPage = (_page) => {
        
        //navigate
    }

    const options = [
        //agregar
        /*{
            key: "agregar_sucursal",
            label: "Agregar Sucursal",
            link: get_url_to("deposito/agregar_factura"),
        },*/
        {
            key: "agregar_factura",
            label: "Agregar Factura",
            link: get_url_to("deposito/agregar_factura"),
        },
        {
            key: "agregar_proveedor",
            label: "Agregar Proveedor",
            link: get_url_to("deposito/agregar_proveedor"),
        },
        {
            key: "modificar_precios_subgrupo",
            label: "Modificar Precios Por Subgrupo",
            link: get_url_to("deposito/stock/modificar_precios_categoria"),
        },
        {
            key: "nuevo_envio",
            label: "Nuevo Envio",
            link: get_url_to("deposito/envio/nuevo_envio"),
        },
        {
            key: "agregar_familia",
            label: "Agregar Familia",
            link: get_url_to("deposito/stock/agregar_familia"),
        },
        {
            key: "agregar_subfamilia",
            label: "Agregar SubFamilia",
            link: get_url_to("deposito/stock/agregar_subfamilia"),
        },
        {
            key: "agregar_grupo",
            label: "Agregar Grupo",
            link: get_url_to("deposito/stock/agregar_grupo"),
        },
        {
            key: "agregar_subgrupo",
            label: "Agregar SubGrupo",
            link: get_url_to("deposito/stock/agregar_subgrupo"),
        },
        {
            key: "agregar_codigo",
            label: "Agregar Codigo",
            link: get_url_to("deposito/stock/agregar_codigo"),
        },
        {
            key: "agregar_stock",
            label: "Agregar Stock",
            link: get_url_to("deposito/stock/agregar_stock"),
        },
        {
            key: "lista_familia",
            label: "Lista Familias",
            link: get_url_to("deposito/stock/listados/lista_familia"),
        },
        {
            key: "lista_subfamilia",
            label: "Lista SubFamilias",
            link: get_url_to("deposito/stock/listados/lista_subfamilia"),
        },
        {
            key: "lista_grupos",
            label: "Lista Grupos",
            link: get_url_to("deposito/stock/listados/lista_grupos"),
        },
        {
            key: "lista_subgrupos",
            label: "Lista SubGrupos",
            link: get_url_to("deposito/stock/listados/lista_subgrupos"),
        },
        {
            key: "lista_codigo",
            label: "Lista Codigos",
            link: get_url_to("stock/listados/lista_codigo"),
        },
        {
            key: "lista_stock",
            label: "Lista Stock",
            link: get_url_to("deposito/stock/listados/lista_stock"),
        },
        {
            key: "lista_envio",
            label: "Lista Envios",
            link: get_url_to("deposito/envio/lista_envio"),
        },
    ]

    return (
        
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                
                {
                    options.map(
                        (opt) => (
                            <Menu.Item key={opt.key} onClick={()=>{goToPage(opt.key)}}>
                                <Link href={opt.link}>{opt.label}</Link>
                            </Menu.Item>
                        )
                    )
                }
                </Menu>
    )
}

export default SideMenu;