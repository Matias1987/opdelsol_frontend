import { post_method } from "@/src/helpers/post_helper";
import { post } from "@/src/urls";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Card, Avatar, Divider, List, Skeleton, Button } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Proveedores = (_) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const alertColors = [
    "#8B4C4C", // 🔴 Extreme Alert – muted crimson
    "#A66A5E", // 🟥 High Alert – dusty red
    "#C49A6C", // 🟧 Moderate Alert – soft amber
    "#D6C27A", // 🟨 Low Alert – pale mustard
    "#A3B98B", // 🟩 Minimal Alert – gentle olive green
    "#7FAF9D", // ✅ OK Status – calm teal green
  ];

  const load = _=>{
    post_method(post.pagos_atrasados_proveedores,{},(response)=>{
        alert(JSON.stringify(response))
    })

  }

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((res) => {
        const results = Array.isArray(res) ? res : [];
        setData([...data, ...results]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
    //loadMoreData();
  }, []);

  return (
    <>
      <Card
        extra={<><Button type="link"><ReloadOutlined /></Button></>}
        style={{width:"500px"}}
        title={
          <>
            <UserOutlined /> Proveedores
          </>
        }
        size="small"
      >
        <div
          id="scrollableDiv"
          style={{
            borderRadius: "16px",
            height: 400,
            overflow: "auto",
            padding: "0",
            backgroundColor: "rgba(0,0,0,.05)",
            border: "1px solid rgba(140, 140, 140, 0)",
          }}
        >
          {/*<InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >*/}
            <List
              size="small"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item
                  key={item.email}
                  style={{
                    border: `4px solid ${alertColors[index % alertColors.length]}`,
                    borderRadius: "16px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <>
                        <UserOutlined />
                      </>
                    }
                    title={
                      <>
                        <span
                          style={{ fontSize: "1.2em" }}
                          href="https://ant.design"
                        >
                          {item.name}
                        </span>
                        &nbsp;&nbsp;&nbsp;
                        <i
                          style={{
                            color: "black",
                            fontWeight: "400",
                            fontSize: "0.9em",
                           
                          }}
                        >
                          Ultimo pago: 00/00/0000
                        </i>
                      </>
                    }
                  />
                  <div>
                    <Button type="text" size="large" style={{ color: "black" }}>
                      Ver Ficha
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          {/*</InfiniteScroll>*/}
        </div>
      </Card>
    </>
  );
};
export default Proveedores;
