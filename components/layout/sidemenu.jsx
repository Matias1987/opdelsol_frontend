import Link from "next/link"

const { Menu } = require("antd")


const SideMenu = () => {
    //let navigate = UseNavi
    const goToPage = (_page) => {
        
        //navigate
    }

    const options = [
        //agregar
        {
            key: "nuevo_envio",
            label: "Nuevo Envio",
            link: "agregar_envio",
        },
        {
            key: "agregar_familia",
            label: "Agregar Familia",
            link: "agregar_familia",
        },
        {
            key: "agregar_subfamilia",
            label: "Agregar SubFamilia",
            link: "agregar_subfamilia",
        },
        {
            key: "agregar_grupo",
            label: "Agregar Grupo",
            link: "agregar_grupo",
        },
        {
            key: "agregar_subgrupo",
            label: "Agregar SubGrupo",
            link: "agregar_subgrupo",
        },
        {
            key: "agregar_codigo",
            label: "Agregar Codigo",
            link: "agregar_codigo",
        },
        {
            key: "agregar_stock",
            label: "Agregar Stock",
            link: "agregar_stock",
        },
        {
            key: "lista_familia",
            label: "Lista Familias",
            link: "listados/lista_familia",
        },
        {
            key: "lista_subfamilia",
            label: "Lista SubFamilias",
            link: "lista_subfamilia",
        },
        {
            key: "lista_grupos",
            label: "Lista Grupos",
            link: "lista_grupos",
        },
        {
            key: "lista_subgrupos",
            label: "Lista SubGrupos",
            link: "lista_subgrupos",
        },
        {
            key: "lista_codigo",
            label: "Lista Codigos",
            link: "lista_codigo",
        },
        {
            key: "lista_stock",
            label: "Lista Stock",
            link: "lista_stock",
        },
        {
            key: "lista_envio",
            label: "Lista Envios",
            link: "lista_envio",
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