import { Button, Col, Form, Input, Layout, Row, Space, Tabs, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Tab } from "rc-tabs/lib/interface";
import { useEffect, useState } from "react";
import { HTTPData } from "../model/http_data";
import InputOption, { State } from "./InputOptions";
import TableAndFormComponent from "./TableAndFormComponent";

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

  const [pathUrl, setPathUrl] = useState("");
  // const [pathVariable, setPathVariable] = useState<Record<string, any>>();
  // const [queryParam, setQueryParam] = useState<string>();

  const onUpdated = (param: Record<string, string>, queryParam: string) => {
    //

    let pu = props.httpData.path;
    for (const key in param) {
      pu = pu.replace(`{${key}}`, `${param[key]}`);
    }
    setPathUrl(`${pu}${queryParam ?? ""}`);

    //
  };

  useEffect(() => {
    // FIXME this is duplicated code

    setPathUrl(props.httpData.path);

    const savedState = localStorage.getItem(`${props.httpData.usecase}`);
    const jsonB = savedState ? JSON.parse(savedState)[props.httpData.usecase] : undefined;

    const newValue = {
      [props.httpData.usecase]: {
        ...jsonB,
      },
    };

    let param = {};
    {
      const x = newValue[props.httpData.usecase]["param"];
      if (x) {
        for (const key in x) {
          const states = x[key] as State[];
          states
            .filter((state) => state.active)
            .forEach((z) => {
              if (z.value) {
                param = { ...param, [key]: z.value };
              }
            });
        }
      }
    }

    let query = "";
    {
      const x = newValue[props.httpData.usecase]["query"];
      if (x) {
        for (const key in x) {
          const states = x[key] as State[];
          states
            .filter((state) => state.active)
            .forEach((z) => {
              if (z.value) {
                query = `${query}&${key}=${z.value}`;
              }
            });
        }
      }
    }
    query = `?${query.slice(1)}`;
    onUpdated(param, query);
  }, []);

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
            <Form>
              <Form.Item name={pathUrl}>
                <Space.Compact block>
                  <Input
                    addonBefore="POST"
                    defaultValue={`http://localhost:3000${pathUrl}`}
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
              </Form.Item>
            </Form>
          </Content>
        </Space>
        <Row gutter={20}>
          <Col span={14}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={generateRequestTabItems(props.httpData, onUpdated)}
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
