import { Button, Col, Input, Layout, Row, Space, Tabs, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { HTTPData } from "../model/http_data";
import TableAndFormComponent from "./TableAndFormComponent";
import { Tab } from "rc-tabs/lib/interface";
import InputOption from "./InputOptions";

interface Props {
  httpData: HTTPData;
}

const ContentComponent = (props: Props) => {
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
            <Space.Compact block>
              <Input
                addonBefore="POST"
                defaultValue="http://localhost:3000/createuser?page=20&size=8"
                size="large"
                readOnly
              />
              <Button
                type="primary"
                size="large"
              >
                Submit
              </Button>
            </Space.Compact>
          </Content>
        </Space>
        <Row gutter={20}>
          <Col span={14}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={generateRequestTabItems(props.httpData)}
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

export default ContentComponent;

function generateRequestTabItems(httpData: HTTPData) {
  let requestTabItems: Tab[] = [];

  if (httpData.body) {
    requestTabItems.push({
      label: "Request Body",
      key: "body",
      children: (
        <TableAndFormComponent
          recordInputType={httpData.body}
          usecaseName={httpData.usecase}
          attributeParamType="body"
        />
      ),
    });
  }

  if (httpData.param) {
    requestTabItems.push({
      label: "Path Parameter",
      key: "param",
      children: (
        <InputOption
          exclusive={true}
          fieldName="states"
          recordInputType={httpData.param}
          usecaseName={httpData.usecase}
        />
      ),
    });
  }

  if (httpData.query) {
    requestTabItems.push({
      label: "Query Variable",
      key: "query",
      children: (
        <InputOption
          exclusive={false}
          fieldName="states"
          recordInputType={httpData.query}
          usecaseName={httpData.usecase}
        />
      ),
    });
  }

  if (httpData.header) {
    requestTabItems.push({
      label: "Request Header",
      key: "header",
      children: (
        <InputOption
          exclusive={true}
          fieldName="states"
          recordInputType={httpData.header}
          usecaseName={httpData.usecase}
        />
      ),
    });
  }

  return requestTabItems;
}
