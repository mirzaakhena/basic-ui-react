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

  const onUpdated = (param: Record<string, string>, query: string) => {
    //

    if (!keyPaths) {
      return;
    }

    const httpData = props.tags.find((tag) => tag.tag === keyPaths[1])?.httpDatas.find((data) => data.usecase === keyPaths[0]);

    if (!httpData) {
      return;
    }

    form.setFieldValue("path", getURLWithParamAndQuery(httpData.path, param, query));
  };

  const routes = (
    <Routes>
      <Route
        path="/"
        element={<></>}
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

    const p = getParamValue(newValue[httpData.usecase]["param"]);
    const q = getQueryValue(newValue[httpData.usecase]["query"]);
    // setPathUrl(getURLWithParamAndQuery(httpData.path, p, q));

    form.setFieldValue("path", getURLWithParamAndQuery(httpData.path, p, q));
  };

  const [methodUrl, setMethodUrl] = useState<string>();

  const onClick: MenuProps["onClick"] = (e) => {
    //

    setKeyPaths(e.keyPath);

    const httpData = props.tags.find((tag) => tag.tag === e.keyPath[1])?.httpDatas.find((data) => data.usecase === e.keyPath[0]);

    if (!httpData) {
      return;
    }

    setMethodUrl(httpData.method.toUpperCase());
  };

  // TODO masih ada issue soal form
  useEffect(() => {
    updateURL();
  }, [keyPaths, form.getFieldsValue()]);

  const onFinish = (data: string) => {
    //

    // TODO harusnya gak perlu looping lagi
    if (!keyPaths) {
      return;
    }

    const httpData = props.tags.find((tag) => tag.tag === keyPaths[1])?.httpDatas.find((data) => data.usecase === keyPaths[0]);

    if (!httpData) {
      return;
    }

    const savedState = localStorage.getItem(httpData.usecase);
    if (savedState) {
      const httpVariable = JSON.parse(savedState)[httpData.usecase];
      const headerOptions = httpVariable["header"] as { [key: string]: State[] };
      let header = {};
      for (const key in headerOptions) {
        header = { ...header, [key]: headerOptions[key].find((header) => header.active)?.value ?? undefined };
      }
      console.log({ method: methodUrl }, data, { body: httpVariable["body"] }, { header });
    }
  };

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
            <Form
              form={form}
              onFinish={onFinish}
              style={{
                margin: "20px 20px 0px 20px",
                padding: "20px 20px 1px 20px",
                minHeight: 10,
                background: colorBgContainer,
              }}
            >
              <Space.Compact block>
                <Form.Item
                  name="path"
                  style={{ width: "100%" }}
                >
                  <Input
                    addonBefore={methodUrl}
                    // defaultValue={`http://localhost:3000`}
                    size="large"
                    readOnly
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Space.Compact>
            </Form>

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

export function getParamValue(newValue: any) {
  //

  let param: Record<string, string> = {};
  for (const key in newValue) {
    (newValue[key] as State[])
      .filter((state) => state.active)
      .forEach((z) => {
        if (z.value) {
          param = { ...param, [key]: z.value };
        }
      });
  }

  return param;
}

export function getQueryValue(newValue: any) {
  //

  let query: string = "";
  for (const key in newValue) {
    (newValue[key] as State[])
      .filter((state) => state.active)
      .forEach((z) => {
        if (z.value) {
          query = `${query}&${key}=${z.value}`;
        }
      });
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
