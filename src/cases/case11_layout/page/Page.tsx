import { Col, Layout, Row, Space, Tabs, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import TabPane from "antd/es/tabs/TabPane";

const Page = () => {
  //

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabBarStyle = {
    margin: 0,
    border: "none",
  };

  const tabChildrenStyle = {
    minHeight: 280,
    padding: "20px",
    background: colorBgContainer,
  };

  return (
    <>
      <Layout style={{ padding: "24px 24px 24px" }}>
        <Space direction="vertical">
          <Content
            style={{
              padding: 24,
              marginBottom: "20px",
              minHeight: 80,
              background: colorBgContainer,
            }}
          >
            http://localhost:3000/createuser?page=20&size=8
          </Content>
        </Space>
        <Row gutter={20}>
          <Col span={14}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={["Body", "Param", "Query", "Header"].map((x, i) => {
                const id = String(i + 1);
                return {
                  label: x,
                  key: id,
                  children: <Content style={tabChildrenStyle}>Hello</Content>,
                };
              })}
            />
          </Col>
          <Col span={10}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={["Response", "Header"].map((x, i) => {
                const id = String(i + 1);
                return {
                  label: x,
                  key: id,
                  children: <Content style={tabChildrenStyle}>Hello</Content>,
                };
              })}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Page;
