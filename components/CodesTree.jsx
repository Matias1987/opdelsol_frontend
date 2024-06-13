import { get } from "@/src/urls";
import { useEffect, useState } from "react";
import GrillaCristales from "./informes/GrillaCristales";

import { CarryOutOutlined, FormOutlined, TableOutlined }  from "@ant-design/icons";
import { Tree, Row, Col, Table, Divider, Button, Modal }  from "antd";



const CodesTree = () => {

  const [treeData, setTreeData] = useState();
  const [dataSource, setDataSource] = useState([])
  const [seleccion,  setSeleccion] = useState(null)
  const [gridPopupOpen, setGridPopupOpen] = useState(false)
  useEffect(()=>{
    //alert(get.stock_full)
    fetch(get.stock_full)
    .then(response=>response.json())
    .then((response)=>{
      //alert(JSON.stringify(response.data))
      process_tree(response.data)
    })
    .catch(err=>{console.log(err)})
  },[])

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
    
    //console.log(JSON.stringify(data));
    //alert(JSON.stringify(tree))
    setTreeData(tree)
  }
  
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setSeleccion({
      tipo: info.node.type,
      id:info.node.id,
    })
    if(info.node.type=='subgrupo')
    {
      //alert(get.lista_codigos_categoria + `${-1}/${-1}/${-1}/${info.node.idsubgrupo}/-1`)
      fetch(get.lista_codigos_categoria + `${-1}/${-1}/${-1}/${info.node.idsubgrupo}/-1`)
      .then(response=>response.json())
      .then((response)=>{
         setDataSource(
          response.data.map(
            r=>({
              codigo: r.codigo,
              descripcion: r.descripcion,
              idcodigo: r.idcodigo,
            })
          )
         )
      })
    }
    
  };
  
  return (
    <>
    <Row>
      <Col>
      {
        seleccion==null?<></>:<>
          <h5>Tipo:&nbsp;<b>{seleccion.tipo}</b>&nbsp;&nbsp;&nbsp;ID:&nbsp;<b>{seleccion.id}</b></h5> 
          <Button onClick={()=>{setGridPopupOpen(true)}}><TableOutlined /></Button>
          <Modal
          
          width={"80%"}
            onCancel={()=>{setGridPopupOpen(false)}}
            open={gridPopupOpen}
          >
            <GrillaCristales id={seleccion.id} categoria={seleccion.tipo} key={seleccion.id} />
          </Modal>
          <Divider />
        </>
      }
      </Col>
    </Row>
    <Row>
      <Col span={12} style={{overflowY: "scroll", height: "600px"}}>
      <Tree
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
          {dataIndex:'codigo', title:'Codigo'},
          {dataIndex:'descripcion', title:'Descripción'},
        
        ]}
        />
      </Col>
    </Row>
    </>
  );
};
export default CodesTree;
