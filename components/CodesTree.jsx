import { get } from "@/src/urls";
import { useEffect, useState } from "react";
import GrillaCristales from "./informes/GrillaCristales";

import { CarryOutOutlined,  EditFilled,  ReloadOutlined,  TableOutlined }  from "@ant-design/icons";
import { Tree, Row, Col, Table, Divider, Button, Modal, Checkbox }  from "antd";
import EditarCodigo from "@/pages/v1/deposito/stock/editar_codigo";
import EditarCodigoIndiv from "./forms/deposito/EditarCodigoIndiv";

/**
 * 
 * @param onCodeSelect 
 * @param callback 
 * @returns 
 */

const CodesTree = (props) => {

  const [treeData, setTreeData] = useState();
  const [dataSource, setDataSource] = useState([])
  const [seleccion,  setSeleccion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [popupEditCodigoOpen, setPopupEditCodigoOpen] = useState(false)
  const [codigoSeleccion, setCodigoSeleccion] = useState(-1)
  //const [gridPopupOpen, setGridPopupOpen] = useState(false)
  const [reload, setReload] = useState(false)
  useEffect(()=>{
    load()
  },[])

  const load = () => {
    setLoading(true)

    fetch(get.stock_full)
    .then(response=>response.json())
    .then((response)=>{
      
      process_tree(response.data)
      setLoading(false)
    })
    .catch(err=>{console.log(err)})
  }

  const process_tree = (data) => {

    var tree = []
  
    data.forEach(r=>{
        
      let familia = tree.find(t=>t.idfamilia ===r.idfamilia)
      if(typeof familia === 'undefined')
      {
        familia = {key: r.idfamilia,idfamilia: r.idfamilia, id: r.idfamilia, type:'familia', title: r.familia, children:[], icon:<CarryOutOutlined />}
        tree.push(familia)
      }
      
      let subfamilia = familia.children.find(t=>t.idsubfamilia==r.idsubfamilia)
      if(typeof subfamilia === 'undefined')
      {
        subfamilia = {key: `${r.idfamilia}-${r.idsubfamilia}`, idsubfamilia: r.idsubfamilia, id: r.idsubfamilia, type:'subfamilia', title: r.subfamilia, children:[], icon:<CarryOutOutlined />}
        familia.children.push(subfamilia)
      }
      
      let grupo = subfamilia.children.find(t=>t.idgrupo == r.idgrupo)
      if(typeof grupo === 'undefined')
      {
        grupo = {key: `${r.idfamilia}-${r.idsubfamilia}-${r.idgrupo}`, idgrupo: r.idgrupo,id: r.idgrupo, type:'grupo', title: r.grupo, children: [], icon:<CarryOutOutlined />}
        subfamilia.children.push(grupo)
      }
      
      let subgrupo = grupo.children.find(t=>t.idsubgrupo == r.idsubgrupo)
      if(typeof subgrupo === 'undefined'){
        subgrupo = {key: `${r.idfamilia}-${r.idsubfamilia}-${r.idgrupo}-${r.idsubgrupo}`, idsubgrupo: r.idsubgrupo,id: r.idsubgrupo, type:'subgrupo', title: r.subgrupo, children: []}
        grupo.children.push(subgrupo)
      }
    })
    
   
    setTreeData(tree)
  }
  
  const onSelect = (selectedKeys, info) => {
    props?.callback?.(info.node.type, info.node.id)
    setSeleccion({
      tipo: info.node.type,
      id:info.node.id,
    })
    if(info.node.type=='subgrupo')
    {
      fetch(get.lista_codigos_categoria + `${-1}/${-1}/${-1}/${info.node.idsubgrupo}/-1`)
      .then(response=>response.json())
      .then((response)=>{
         setDataSource(
          response.data.map(
            r=>({
              codigo: r.codigo,
              descripcion: r.descripcion,
              idcodigo: r.idcodigo,
              precio:r.precio,
              checked:false
            })
          )
         )
      })
    }
    else{
      setDataSource([])
    }
    
  };
  
  return (
    <>
    {<Row>
      <Col span={2} style={{padding:"1em"}}>
        <Button size="small" type="text" disabled={loading} onClick={()=>{setReload(!reload)}}><ReloadOutlined /> Recargar</Button>
      </Col>
      <Col span={6}>
      {
        seleccion==null?<></>:<div style={{padding:"1em"}}>
          <i style={{color:"#555555", fontSize:".9em"}} >Tipo:&nbsp;<b>{seleccion.tipo.toUpperCase()}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{seleccion.id}</b></i> 
  
        </div>
      }
      </Col>
      <Col span={12}>
      </Col>
    </Row>}
    <Row>
      <Col span={12} style={{overflowY: "scroll", height: "600px", padding:"1em"}}>
        <Tree
          key={reload}
          style={{backgroundColor:"lightyellow", fontWeight:"bold", color:"#000D9D"}}
          showLine={true}
          showIcon={true}
          defaultExpandedKeys={['2']}
          onSelect={onSelect}
          treeData={treeData}
        />
      </Col>
      <Col span={12}>
        <Table 
        dataSource={dataSource}
        columns={[
          {dataIndex:'codigo', title:'Codigo', visible:true},
          {dataIndex:'descripcion', title:'Descripción', visible:true},
          {dataIndex:'precio', title:'Precio', visible:true},
          {render:(_,{idcodigo})=><><EditarCodigoIndiv  buttonText={<><EditFilled /></>} idcodigo={idcodigo} callback={()=>{setPopupEditCodigoOpen(false)}} /></>, visible:true},
          { title: <><Checkbox onChange={(e)=>{
            const _items = dataSource.map(c=>({...c,checked:e.target.checked})) 
            setDataSource(_items)
            props?.onCodeSelect?.(_items.filter(c=>c.checked))

          }}></Checkbox></>,
            render:(_,{idcodigo, checked})=><Checkbox 
            checked={checked}
            onChange={(e)=>{ 
              const _items = dataSource.map((c=>c.idcodigo==idcodigo?{...c,checked:e.target.checked} : c))
              setDataSource(
               _items 
              )
              props?.onCodeSelect?.(_items.filter(c=>c.checked))
            }}></Checkbox>,
            visible:true
        }
          
        ].filter(r=>r.visible)}
        />
      </Col>
    </Row>
    
    </>
  );
};
export default CodesTree;
