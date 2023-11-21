import { FileOutlined, SwapRightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import ContentLayout from "./ContentLayout";

const ApiPlaygroundLayout = () => {
  //

  const [collapsed, setCollapsed] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    //
  };

  const menuItems = [
    //
    getItem(true, "user", "user", [
      //
      getItem(false, "userCreate", "/usecase/user/userCreate"),
      getItem(false, "userGetAll", "/usecase/user/userGetAll"),
    ]),
    getItem(true, "product", "product", [
      //
      getItem(false, "productChangeStatus", "/usecase/product/productChangeStatus"),
      getItem(false, "productGetAll", "/usecase/product/productGetAll"),
    ]),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          height: "calc(100% - 0px)",
          zIndex: 1000,
          overflowY: "auto",
        }}
        width={260}
      >
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={onClick}
        />
      </Sider>
      <Layout>
        <Content style={{ marginLeft: collapsed ? "80px" : "260px" }}>
          <Routes>
            <Route
              key="home"
              path="/"
              element={<>Hello</>}
            />

            <Route
              key="usecase"
              path={"/usecase/:tagName/:usecaseName"}
              element={<ContentLayout />}
            />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "red" }}>API Playground ©2023 Created by Mirza Akhena</Footer>
      </Layout>
    </Layout>
  );
};

export default ApiPlaygroundLayout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(isFirstLevel: boolean, label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
  //

  return {
    key,
    icon: isFirstLevel ? <FileOutlined /> : <SwapRightOutlined />,
    children,
    label,
    itemIcon: <NavLink to={`${key}`} />,
  } as MenuItem;
}
