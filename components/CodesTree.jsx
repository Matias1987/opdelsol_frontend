const { CarryOutOutlined, FormOutlined } = require("@ant-design/icons");
const { Tree } = require("antd");

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: (
              <>
                <div>multiple line title</div>
                <div>multiple line title</div>
              </>
            ),
            key: '0-0-0-1',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
            icon: <CarryOutOutlined />,
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
            icon: <CarryOutOutlined />,
            switcherIcon: <FormOutlined />,
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    icon: <CarryOutOutlined />,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        icon: <CarryOutOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-1-0-0',
            icon: <CarryOutOutlined />,
          },
          {
            title: 'leaf',
            key: '0-1-0-1',
            icon: <CarryOutOutlined />,
          },
        ],
      },
    ],
  },
];
const CodesTree = () => {
  
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
       
        
      </div>
      <Tree
        showLine={true}
        showIcon={true}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};
export default CodesTree;

/**
 * 
 const data = [
{id: 1, id2: 1, id3: 1,family_name: 'lala', subfamily_name: 'lalala1', name: "A"},
{id: 1, id2: 1, id3: 2,family_name: 'lala', subfamily_name: 'lalala1', name: "A1"},
{id: 1, id2: 2, id3: 3,family_name: 'lala', subfamily_name: 'lalala2', name: "A2"},
{id: 2, id2: 1, id3: 4,family_name: 'lala2', subfamily_name: 'lalala3', name: "B"},
{id: 2, id2: 2, id3: 5,family_name: 'lala2', subfamily_name: 'lalala4', name: "B1"},
{id: 2, id2: 3, id3: 6,family_name: 'lala2', subfamily_name: 'lalala5', name: "B2"},
{id: 2, id2: 3, id3: 7,family_name: 'lala2', subfamily_name: 'lalala5', name: "B3"},

]
var tree = []

data.forEach(r=>{
	let family_name = r.family_name
  let subfamily_name = r.subfamily_name
	if(typeof tree[family_name] === 'undefined'){
  	tree[family_name] = {name: family_name, children: []}
  }
  console.log(tree)
  if(typeof tree[family_name].children[subfamily_name] === 'undefined'){
  	tree[family_name].children[subfamily_name] = {name: subfamily_name, children:[]}
  }
  tree[family_name][subfamily_name].children.push({name: r.name })
  
})

console.log(JSON.stringify(tree))
 */