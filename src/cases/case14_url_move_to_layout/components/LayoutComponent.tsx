import { FileOutlined } from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, MenuProps, Space, theme } from "antd";
import { useForm } from "antd/es/form/Form";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Tags } from "../model/http_data";
import ContentComponent from "./ContentComponent";
import { State } from "./InputOptions";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(isFirstLevel: boolean, label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
  //

  return {
    key,
    icon: isFirstLevel ? <FileOutlined /> : undefined,
    children,
    label,
    itemIcon: <NavLink to={`${key}`} />,
  } as MenuItem;
}

interface Props {
  tags: Tags[];
}

const LayoutComponent = (props: Props) => {
  //

  const [form] = useForm();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = props.tags.map((menuItem) => {
    //

    return getItem(
      true,
      menuItem.tag,
      menuItem.tag,
      menuItem.httpDatas.map((c) => {
        return getItem(false, c.usecase, c.usecase);
      })
    );
  });

  // const [pathUrl, setPathUrl] = useState("");

  const onUpdated = (param: Record<string, string>, query: string) => {
    //

    if (!keyPaths) {
      return;
    }

    const httpData = props.tags.find((tag) => tag.tag === keyPaths[1])?.httpDatas.find((data) => data.usecase === keyPaths[0]);

    if (!httpData) {
      return;
    }

    // setPathUrl(getURLWithParamAndQuery(httpData.path, param, query));

    form.setFieldValue("pathUrl", getURLWithParamAndQuery(httpData.path, param, query));

    // console.log("param update disini>>", param);
    // console.log("query update disini>>", query);
  };

  const routes = (
    <Routes>
      <Route
        path="/"
        element={<>hello</>}
      />
      {props.tags.map((usecaseData) => {
        const { httpDatas } = usecaseData;

        return httpDatas.map((h) => {
          const path = h.usecase.toLowerCase();

          return (
            <Route
              key={path}
              path={path}
              element={
                <div
                // style={{ margin: "0px 0px 20px 200px" }}
                >
                  <ContentComponent
                    httpData={h}
                    onUpdated={onUpdated}
                  />
                </div>
              }
            />
          );
        });
      })}
    </Routes>
  );

  const [keyPaths, setKeyPaths] = useState<string[]>();

  const updateURL = () => {
    //

    if (!keyPaths) {
      return;
    }

    const httpData = props.tags.find((tag) => tag.tag === keyPaths[1])?.httpDatas.find((data) => data.usecase === keyPaths[0]);

    if (!httpData) {
      return;
    }

    const savedState = localStorage.getItem(`${httpData.usecase}`);
    const jsonB = savedState ? JSON.parse(savedState)[httpData.usecase] : undefined;

    const newValue = {
      [httpData.usecase]: {
        ...jsonB,
      },
    };

    const p = getParamValue(httpData.usecase, newValue);
    const q = getQueryValue(httpData.usecase, newValue);
    // setPathUrl(getURLWithParamAndQuery(httpData.path, p, q));

    form.setFieldValue("pathUrl", getURLWithParamAndQuery(httpData.path, p, q));
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setKeyPaths(e.keyPath);
  };

  useEffect(() => {
    updateURL();
  }, [keyPaths, form.getFieldsValue()]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          style={{
            position: "fixed",
            height: "calc(100% - 0px)",
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            items={menuItems}
            onClick={onClick}
          />
        </Sider>
        <Layout>
          <Content
            // style={{ margin: "0 0px" }}
            style={{ margin: "0px 0px 0px 200px" }}
          >
            {/* --------------------------------------- */}

            {/* <Space direction="vertical">
              <Content
                style={{
                  margin: "20px 20px 10px 20px",
                  padding: "20px 20px 10px 20px",
                  minHeight: 10,
                  background: colorBgContainer,
                }}
              >
                
              </Content>
            </Space> */}

            <Form
              form={form}
              style={{
                margin: "20px 20px 0px 20px",
                padding: "20px 20px 1px 20px",
                minHeight: 10,
                background: colorBgContainer,
              }}
            >
              <Space.Compact block>
                <Form.Item
                  name="pathUrl"
                  style={{ width: "100%" }}
                >
                  <Input
                    addonBefore="POST"
                    // defaultValue={`http://localhost:3000${pathUrl}`}
                    // defaultValue={`http://localhost:3000`}
                    size="large"
                    readOnly
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Space.Compact>
            </Form>

            {/* --------------------------------------- */}

            {routes}
          </Content>

          <Footer style={{ textAlign: "center" }}>Mirza Design ©2023 Created by Mirza Akhena</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;

//

export function getParamValue(usecaseName: string, newValue: { [x: string]: any }) {
  //

  let param: Record<string, string> = {};
  const x = newValue[usecaseName]["param"];
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

  return param;
}

export function getQueryValue(usecaseName: string, newValue: { [x: string]: any }) {
  //

  let query: string = "";
  {
    const x = newValue[usecaseName]["query"];
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

  return query ? `?${query.slice(1)}` : "";
}

function getURLWithParamAndQuery(path: string, param: Record<string, string>, query: string) {
  //

  let pu = path;
  for (const key in param) {
    pu = pu.replace(`{${key}}`, `${param[key]}`);
  }

  return `http://localhost:3000${pu}${query}`;
}
