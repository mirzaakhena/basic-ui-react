import { faker } from "@faker-js/faker";
import { Breadcrumb, Button, Col, Collapse, Input, Row, Space, Table, Tabs, message, theme } from "antd";
import { NavLink, useParams } from "react-router-dom";

interface Props {
  // message: string;
}

const ContentLayout = (props: Props) => {
  //

  const params = useParams<{
    tagName: string;
    usecaseName: string;
  }>();

  const {
    token: { colorBgContainer, colorBorderSecondary },
  } = theme.useToken();

  const columns = [
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

  const dataSource = generateDummyData(20);

  return (
    <Space
      direction="vertical"
      style={{
        backgroundColor: colorBgContainer,
        display: "flex",
        margin: "20px",
      }}
    >
      <Space.Compact
        style={{ padding: "20px 20px 0px 20px" }}
        block
      >
        <Input
          addonBefore={"GET"}
          value={`http://localhost:3000/usecase/${params.tagName}/${params.usecaseName}`}
          size="large"
          readOnly
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
        >
          Submit
        </Button>
      </Space.Compact>

      {params.usecaseName!.toLowerCase().endsWith("getall") ? (
        <>
          <Collapse
            bordered={false}
            ghost
            style={{ margin: "0px 5px 0px 5px" }}
            items={[
              {
                key: "1",
                label: "HTTP Variables",
                children: <>{httpVariables("query")}</>,
              },
            ]}
          />
          <Breadcrumb
            style={{ margin: "0px 5px 0px 20px" }}
            items={[
              {
                title: <NavLink to={"/user/userCreate"}>Home</NavLink>,
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
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 1300, y: 480 }}
          />
        </>
      ) : (
        <div style={{ margin: "10px 20px 10px 20px" }}>{httpVariables("command")}</div>
      )}
    </Space>
  );
};

export default ContentLayout;

const httpVariables = (requestType: "command" | "query") => {
  //

  const tabItemStyle = {
    border: "1px solid",
    borderTop: "none",
    minHeight: "400px",
    borderLeftColor: "#f0f0f0",
    borderRightColor: "#f0f0f0",
    borderBottomColor: "#f0f0f0",
  };

  return (
    <Row gutter={20}>
      <Col span={requestType === "command" ? 15 : 11}>
        <Tabs
          tabBarStyle={{
            margin: 0,
            border: "none",
          }}
          type="card"
          items={[
            {
              label: "Request Body",
              key: "body",
              style: tabItemStyle,
              children: <></>,
            },
            {
              label: "Path Parameters",
              key: "param",
              style: tabItemStyle,
              children: <></>,
            },
            {
              label: "Query Variables",
              key: "query",
              style: tabItemStyle,
              children: <></>,
            },
            {
              label: "Request Headers",
              key: "header",
              style: tabItemStyle,
              children: <></>,
            },
          ]}
          // onChange={(key) => onChange(key, "request")}
          // activeKey={defaultRequestActiveKey}
        />
      </Col>
      <Col span={requestType === "command" ? 9 : 13}>
        <Tabs
          tabBarStyle={{
            margin: 0,
            border: "none",
          }}
          type="card"
          items={[
            {
              label: "Response Body",
              key: "body",
              style: tabItemStyle,
              children: <></>,
            },
            {
              label: "Response Headers",
              key: "header",
              style: tabItemStyle,
              children: <></>,
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
