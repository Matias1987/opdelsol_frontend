import Link from "next/link"

const { Menu } = require("antd")


const SideMenu = () => {
    //let navigate = UseNavi
    const goToPage = (_page) => {
        alert(_page)
        //navigate
    }

    const options = [
        {
            key: "nuevo_envio",
            label: "Nuevo Envio",
            link: "v1/deposito/stock/",
        },
        {
            key: "agregar_familia",
            label: "Agregar Familia",
            link: "v1/deposito/stock/agregar_familia",
        },
        {
            key: "agregar_subfamilia",
            label: "Agregar SubFamilia",
            link: "v1/deposito/stock/agregar_subfamilia",
        },
        {
            key: "agregar_grupo",
            label: "Agregar Grupo",
            link: "v1/deposito/stock/agregar_stock",
        },
        {
            key: "agregar_subgrupo",
            label: "Agregar SubGrupo",
            link: "v1/deposito/stock/agregar_stock",
        },
        {
            key: "agregar_codigo",
            label: "Agregar Codigo",
            link: "v1/deposito/stock/",
        },
        {
            key: "agregar_stock",
            label: "Agregar Stock",
            link: "v1/deposito/stock/",
        },
    ]

    return (
        
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                
                {
                    options.map(
                        (opt) => (
                            <Menu.Item key={opt.key} onClick={()=>{goToPage(opt.key)}}>
                                <span>{opt.label}</span>
                                <Link href={opt.link}>Home</Link>
                            </Menu.Item>
                        )
                    )
                }

                </Menu>
            
    )
}

export default SideMenu;