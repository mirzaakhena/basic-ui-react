import { FileOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { Tags } from "../model/http_data";
import ContentComponent from "./ContentComponent";

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

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

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
                <div style={{ margin: "0px 0px 20px 200px" }}>
                  <ContentComponent httpData={h} />
                </div>
              }
            />
          );
        });
      })}
    </Routes>
  );

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
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "0 0px" }}>
            {/* <div style={{ padding: 20, margin: "20px 20px 20px 220px", minHeight: 360, background: colorBgContainer }}>{routes}</div> */}
            {routes}
          </Content>

          <Footer style={{ textAlign: "center" }}>Mirza Design ©2023 Created by Mirza Akhena</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;
