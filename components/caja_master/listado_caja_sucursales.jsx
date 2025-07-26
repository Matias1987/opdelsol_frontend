const ListadoCajaSucursales = props =>{

    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch('/api/caja_sucursales')
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Listado de Caja por Sucursales</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListadoCajaSucursales