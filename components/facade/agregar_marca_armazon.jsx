import { Select } from "antd";

const AgregarMarcaArmazon = props => {
    const [subfamiliaData, setSubfamiliaData] = useState(null)
    const onTipoArmazonSelect = (v) => {
        load_subgrupos()
    }

    return <>
    <Select loading={subgruposData==null} onChange={onTipoArmazonSelect} style={select_style} prefix={<>Tipo Armaz&oacute;n: </>} />
    </>
}

export default AgregarMarcaArmazon;