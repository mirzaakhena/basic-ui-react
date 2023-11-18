import { Col, Layout, Row, Tabs, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Tab } from "rc-tabs/lib/interface";
import { HTTPData } from "../model/http_data";
import InputOption from "./InputOptions";
import TableAndFormComponent from "./TableAndFormComponent";

interface Props {
  httpData: HTTPData;
  onUpdated: (param: Record<string, string>, queryParam: string) => void;
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

  const onChange = (key: string, tipe: string) => {
    // console.log(tipe, key);
    // TODO harus mengingat tab mana yg dibuka
  };

  return (
    <>
      <Layout style={{ padding: "24px 24px 24px" }}>
        <Row gutter={20}>
          <Col span={14}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={generateRequestTabItems(props.httpData, props.onUpdated)}
              onChange={(key) => onChange(key, "request")}
              // defaultActiveKey={""}
            />
          </Col>
          <Col span={10}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={["Response Body", "Response Header"].map((x, i) => {
                const id = String(i + 1);
                return {
                  label: x,
                  key: id,
                  children: <Content style={tabChildrenStyle}>Hello</Content>,
                };
              })}
              onChange={(key) => onChange(key, "response")}
              // defaultActiveKey={""}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default ContentComponent;

function generateRequestTabItems(httpData: HTTPData, onUpdated: (param: Record<string, string>, query: string) => void) {
  let requestTabItems: Tab[] = [];

  if (httpData.body) {
    requestTabItems.push({
      label: "Request Body",
      key: "body",
      children: (
        <TableAndFormComponent
          attributeParamType="body"
          recordInputType={httpData.body}
          usecaseName={httpData.usecase}
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
          attributeParamType="param"
          recordInputType={httpData.param}
          usecaseName={httpData.usecase}
          onUpdated={onUpdated}
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
          attributeParamType="query"
          recordInputType={httpData.query}
          usecaseName={httpData.usecase}
          onUpdated={onUpdated}
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
          attributeParamType="header"
          recordInputType={httpData.header}
          usecaseName={httpData.usecase}
          onUpdated={onUpdated}
        />
      ),
    });
  }

  return requestTabItems;
}
