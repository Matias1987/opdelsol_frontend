const { Table } = require("antd")
const { useState, useEffect } = require("react")
/*
columns:
{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }
*/
const CustomTable = (props) => {
    const [tableloading,setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(()=>{
        setLoading(true)

        fetch(props.fetchUrl)
        .then(response=>
             response.json()
        )
        .then((response)=>{
            //alert(JSON.stringify(response))
            let _data = props.parsefnt(response)
            
            setData(_data)

            setLoading(false)

        })
        .catch(error=>("ERROR: " + console.error(error)))
    },[])
    return (
        <Table
        columns={props.columns}
        dataSource={data}
        loading={tableloading}
        />
    )
}
export default CustomTable;