import { Col, Layout, Row, Tabs, theme } from "antd";
import { Tab } from "rc-tabs/lib/interface";
import { HTTPData } from "../model/http_data";
import InputOption from "./InputOptions";
import JSONViewComponent from "./JSONViewComponent";
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

  const onChange = (key: string, tipe: "request" | "response") => {
    // console.log(tipe, key);
    // TODO harus mengingat tab mana yg dibuka
    // const jsonInString = localStorage.getItem(props.httpData.usecase);
    // const jsonB = jsonInString ? JSON.parse(jsonInString)[props.httpData.usecase] : undefined;
    // const newValue = {
    //   [props.httpData.usecase]: {
    //     ...jsonB,
    //     tabActive: {
    //       ...jsonB.tabActive,
    //       [tipe]: key,
    //     },
    //   },
    // };
    // localStorage.setItem(props.httpData.usecase, JSON.stringify(newValue));
    // if (tipe === "request") {
    //   setDefaultRequestActiveKey(key);
    // }
    // if (tipe === "response") {
    //   setDefaultResponseActiveKey(key);
    // }
  };

  // const [defaultRequestActiveKey, setDefaultRequestActiveKey] = useState("body");
  // const [defaultResponseActiveKey, setDefaultResponseActiveKey] = useState("body");

  // const [defaultActiveKey, setDefaultActiveKey] = useState({ request: "body", response: "body" });

  // const setDefaultActiveKey = (tipe: string) => {
  //   const jsonInString = localStorage.getItem(props.httpData.usecase);
  //   const jsonB = jsonInString ? JSON.parse(jsonInString)[props.httpData.usecase] : undefined;
  //   return jsonB ? jsonB.tabActive[tipe] ?? "body" : "body";
  // };

  // useEffect(() => {
  //   const jsonInString = localStorage.getItem(props.httpData.usecase);
  //   const jsonB = jsonInString ? JSON.parse(jsonInString)[props.httpData.usecase] : undefined;
  //   setDefaultRequestActiveKey(jsonB ? jsonB.tabActive.request ?? "body" : "body");
  //   setDefaultRequestActiveKey(jsonB ? jsonB.tabActive.response ?? "body" : "body");
  // }, []);

  // setTimeout(() => {
  //   const jsonInString = localStorage.getItem(props.httpData.usecase);
  //   const jsonB = jsonInString ? JSON.parse(jsonInString)[props.httpData.usecase] : undefined;
  //   const request = jsonB ? jsonB.tabActive.request ?? "body" : "body";
  //   const response = jsonB ? jsonB.tabActive.response ?? "body" : "body";
  //   setDefaultActiveKey({ request, response });
  // }, 100);

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
              // activeKey={defaultRequestActiveKey}
            />
          </Col>
          <Col span={10}>
            <Tabs
              tabBarStyle={tabBarStyle}
              type="card"
              items={generateResponseTabItems(props.httpData, props.onUpdated)}
              onChange={(key) => onChange(key, "response")}
              // activeKey={defaultResponseActiveKey}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default ContentComponent;

function generateResponseTabItems(httpData: HTTPData, onUpdated: (param: Record<string, string>, query: string) => void) {
  //

  let tabItems: Tab[] = [];

  tabItems.push({
    label: "Response Body",
    key: "body",
    children: <JSONViewComponent message="Body of result here" />,
  });

  tabItems.push({
    label: "Response Header",
    key: "header",
    children: <JSONViewComponent message="Header of result here" />,
  });

  return tabItems;
}

function generateRequestTabItems(httpData: HTTPData, onUpdated: (param: Record<string, string>, query: string) => void) {
  //

  let tabItems: Tab[] = [];

  if (httpData.body) {
    tabItems.push({
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
    tabItems.push({
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
    tabItems.push({
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
    tabItems.push({
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

  return tabItems;
}