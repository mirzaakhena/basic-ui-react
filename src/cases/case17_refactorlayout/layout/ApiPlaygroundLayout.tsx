import { FileOutlined, SwapRightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { HTTPData, Tags } from "../model/http_data";
import ContentLayout from "./ContentLayout";

interface Props {
  tags: Tags[];
}

const ApiPlaygroundLayout = (props: Props) => {
  //

  const [collapsed, setCollapsed] = useState(false);

  const [selectedHTTPData, setSelectedHTTPData] = useState<HTTPData>();

  const onClick: MenuProps["onClick"] = (e) => {
    //
    const x = props.tags.find((x) => x.tag === e.keyPath[1])?.httpDatas.find((x) => `/usecase/${x.tag}/${x.usecase}` === e.keyPath[0]);
    if (x) {
      setSelectedHTTPData(x);
    }
  };

  const menuItems = props.tags.map((menuItem) => {
    //

    return getItem(
      <FileOutlined />,
      menuItem.tag,
      menuItem.tag,
      menuItem.httpDatas.map((c) => {
        return getItem(<SwapRightOutlined />, c.usecase, `/usecase/${menuItem.tag}/${c.usecase}`);
      })
    );
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        width={260}
        onCollapse={(value) => setCollapsed(value)}
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
              element={<ContentLayout httpData={selectedHTTPData!} />}
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

function getItem(icon: JSX.Element, label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
  //

  return {
    key,
    icon,
    children,
    label,
    itemIcon: <NavLink to={`${key}`} />,
  } as MenuItem;
}
