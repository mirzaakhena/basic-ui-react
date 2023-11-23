import { faker } from "@faker-js/faker";
import { Breadcrumb, Button, Col, Collapse, Input, Row, Space, Table, Tabs, TabsProps, theme } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HTTPData } from "../model/http_data";
import { FormInstance } from "antd/lib";
import FormComponent from "../components/FormComponent";
import InputOptionComponent, { State, getParamValue, getQueryValue } from "../components/InputOptionsComponent";

interface Props {
  httpData: HTTPData;
}

const ContentLayout = (props: Props) => {
  //

  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const [urlPathValue, setURLPathValue] = useState<string>();
  const [methodUrl, setMethodUrl] = useState<string>();

  const onUpdated = () => {
    //

    if (!props.httpData) {
      return;
    }

    const savedState = localStorage.getItem(`${props.httpData.usecase}`);
    const jsonB = savedState ? JSON.parse(savedState)[props.httpData.usecase] : undefined;

    const newValue = {
      [props.httpData.usecase]: {
        ...jsonB,
      },
    };

    const value = getParamValue(newValue[props.httpData.usecase]["param"]);
    const query = getQueryValue(newValue[props.httpData.usecase]["query"]);
    setURLPathValue(getURLWithParamAndQuery(props.httpData.path, value, query));

    setMethodUrl(props.httpData.method.toUpperCase());
  };

  const onSubmit = () => {
    const savedState = localStorage.getItem(props.httpData.usecase);
    if (savedState) {
      const httpVariable = JSON.parse(savedState)[props.httpData.usecase];
      const headerOptions = httpVariable["header"] as { [key: string]: State[] };
      let header = {};
      for (const key in headerOptions) {
        header = { ...header, [key]: headerOptions[key].find((header) => header.active)?.value ?? undefined };
      }
      console.log({ method: methodUrl }, urlPathValue, { body: httpVariable["body"] }, { header });
    }
  };

  useEffect(onUpdated);

  return (
    props.httpData && (
      <Space
        direction="vertical"
        style={{
          background: colorBgContainer,
          display: "flex",
          margin: "0px",
        }}
      >
        <Space.Compact
          style={{ padding: "20px 20px 0px 20px" }}
          block
        >
          <Input
            addonBefore={methodUrl}
            value={urlPathValue}
            size="large"
            readOnly
          />
          <Button
            onClick={onSubmit}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Submit
          </Button>
        </Space.Compact>

        {props.httpData.usecase!.toLowerCase().endsWith("getall") ? (
          <>
            <Collapse
              bordered={false}
              ghost
              style={{ margin: "0px 5px 0px 5px" }}
              items={[
                {
                  key: "1",
                  label: "HTTP Variables",
                  children: <>{httpVariables("query", props.httpData, onUpdated)}</>,
                },
              ]}
            />
            <Breadcrumb
              style={{ margin: "0px 20px 10px 20px" }}
              items={[
                {
                  title: <NavLink to={"/usecase/user/userCreate"}>Home</NavLink>,
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: "An Application",
                },
              ]}
            />
            <Table
              style={{ margin: "0px 20px 20px 20px", border: "1px solid", borderColor: colorBorderSecondary }}
              size="small"
              sticky={true}
              dataSource={generateDummyData(20)}
              columns={tableColumns}
              scroll={{ x: 1300, y: 480 }}
            />
          </>
        ) : (
          <div style={{ margin: "10px 20px 10px 20px" }}>{httpVariables("command", props.httpData, onUpdated)}</div>
        )}
      </Space>
    )
  );
};

export default ContentLayout;

export const updateToStorage = (usecaseName: string, form?: FormInstance) => {
  //

  const objInStorage = JSON.parse(localStorage.getItem(`${usecaseName}`) || "{}");
  const objInField = form && form.getFieldsValue();

  const newValue = {
    [usecaseName]: {
      ...objInStorage[usecaseName],
      ...objInField?.[usecaseName],
    },
  };

  localStorage.setItem(`${usecaseName}`, JSON.stringify(newValue));
};

const httpVariables = (requestType: "command" | "query", httpData: HTTPData, onUpdated: () => void) => {
  //

  const tabItemStyle = {
    border: "1px solid",
    borderTop: "none",
    minHeight: "400px",
    borderLeftColor: "#f0f0f0",
    borderRightColor: "#f0f0f0",
    borderBottomColor: "#f0f0f0",
  };

  const tabBarStyle = {
    margin: 0,
    border: "none",
  };

  const itemTabs: TabsProps["items"] = [];

  const keys = ["body", "param", "query", "header"];
  Object.keys(httpData).forEach((key) => {
    if (keys.some((k) => key === k)) {
      //

      if (key === "body") {
        itemTabs.push({
          label: "Request Body",
          key: "body",
          style: tabItemStyle,
          children: (
            <>
              <FormComponent
                attributeParamType="body"
                httpData={httpData}
              />
            </>
          ),
        });
        return;
      }

      if (key === "param") {
        itemTabs.push({
          label: "Path Parameters",
          key: "param",
          style: tabItemStyle,
          children: (
            <>
              <InputOptionComponent
                attributeParamType="param"
                httpData={httpData}
                onUpdated={onUpdated}
              />
            </>
          ),
        });
        return;
      }

      if (key === "query") {
        itemTabs.push({
          label: "Query Variables",
          key: "query",
          style: tabItemStyle,
          children: (
            <>
              <InputOptionComponent
                attributeParamType="query"
                httpData={httpData}
                onUpdated={onUpdated}
              />
            </>
          ),
        });
        return;
      }

      if (key === "header") {
        itemTabs.push({
          label: "Request Headers",
          key: "header",
          style: tabItemStyle,
          children: (
            <>
              <InputOptionComponent
                attributeParamType="header"
                httpData={httpData}
                onUpdated={onUpdated}
              />
            </>
          ),
        });
        return;
      }
    }
  });

  // httpData.body &&
  //   itemTabs.push({
  //     label: "Request Body",
  //     key: "body",
  //     style: tabItemStyle,
  //     children: (
  //       <>
  //         <FormComponent
  //           attributeParamType="body"
  //           httpData={httpData}
  //         />
  //       </>
  //     ),
  //   });

  // httpData.query &&
  //   itemTabs.push({
  //     label: "Query Variables",
  //     key: "query",
  //     style: tabItemStyle,
  //     children: (
  //       <>
  //         <InputOptionComponent
  //           attributeParamType="query"
  //           httpData={httpData}
  //           onUpdated={onUpdated}
  //         />
  //       </>
  //     ),
  //   });

  // httpData.param &&
  //   itemTabs.push({
  //     label: "Path Parameters",
  //     key: "param",
  //     style: tabItemStyle,
  //     children: (
  //       <>
  //         <InputOptionComponent
  //           attributeParamType="param"
  //           httpData={httpData}
  //           onUpdated={onUpdated}
  //         />
  //       </>
  //     ),
  //   });

  // httpData.header &&
  //   itemTabs.push({
  //     label: "Request Headers",
  //     key: "header",
  //     style: tabItemStyle,
  //     children: (
  //       <>
  //         <InputOptionComponent
  //           attributeParamType="header"
  //           httpData={httpData}
  //           onUpdated={onUpdated}
  //         />
  //       </>
  //     ),
  //   });

  return (
    <Row gutter={20}>
      <Col span={requestType === "command" ? 15 : 11}>
        <Tabs
          tabBarStyle={tabBarStyle}
          items={itemTabs}
          // type="card"
          // onChange={(key) => onChange(key, "request")}
          // activeKey={defaultRequestActiveKey}
        />
      </Col>
      <Col span={requestType === "command" ? 9 : 13}>
        <Tabs
          tabBarStyle={tabBarStyle}
          // type="card"
          items={[
            {
              label: "Response Body",
              key: "body",
              style: tabItemStyle,
              children: <>Body</>,
            },
            {
              label: "Response Headers",
              key: "header",
              style: tabItemStyle,
              children: <>Header</>,
            },
          ]}
          // onChange={(key) => onChange(key, "request")}
          // activeKey={defaultRequestActiveKey}
        />
      </Col>
    </Row>
  );
};

const generateDummyData = (count: number) => {
  const dummyData = [];
  for (let i = 3; i <= count + 2; i++) {
    dummyData.push({
      key: i.toString(),
      name: faker.person.fullName(),
      age: faker.number.int({ min: 15, max: 50 }),
      joinDate: faker.date.birthdate().toISOString(),
      address: faker.location.streetAddress(),
      latLng: `${faker.location.latitude()}, ${faker.location.longitude()}`,
      favoritColor: faker.color.human(),
      pet: faker.animal.type(),
      company: faker.company.name(),
      creditCard: faker.finance.creditCardNumber(),
    });
  }

  return dummyData;
};

function getURLWithParamAndQuery(path: string, param: Record<string, string>, query: string) {
  //

  let pu = path;
  for (const key in param) {
    pu = pu.replace(`{${key}}`, `${param[key]}`);
  }

  return `http://localhost:3000${pu}${query}`;
}

const tableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Join Date",
    dataIndex: "joinDate",
    key: "joinDate",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Lat Lng",
    dataIndex: "latLng",
    key: "latLng",
  },
  {
    title: "Favorit Color",
    dataIndex: "favoritColor",
    key: "favoritColor",
  },
  {
    title: "Pet",
    dataIndex: "pet",
    key: "pet",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Credit Card",
    dataIndex: "creditCard",
    key: "creditCard",
  },
];
