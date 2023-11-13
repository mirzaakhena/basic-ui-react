import { NavLink, Route, Routes } from "react-router-dom";
import { Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { FileOutlined } from "@ant-design/icons";
import { Content, Footer } from "antd/es/layout/layout";
import { UsecasesData } from "../model/model";
import DisplayComponent from "./DisplayComponent";

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
  usecaseDatas: UsecasesData[];
}

const MyLayout = (props: Props) => {
  //

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = props.usecaseDatas.map((menuItem) => {
    //

    return getItem(
      true,
      menuItem.tag,
      menuItem.tag,
      menuItem.controllers.map((c) => {
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
      {props.usecaseDatas.map((usecaseData) => {
        const { tag, controllers } = usecaseData;

        return controllers.map((controller) => {
          const { usecase, data } = controller;
          const path = usecase.toLowerCase();

          console.log(path);

          return (
            <Route
              key={path}
              path={path}
              element={
                <DisplayComponent
                  usecase={usecase}
                  tag={tag}
                  fields={data}
                  onSubmit={(x) => console.log(x)}
                />
              }
            />
          );
        });
      })}
    </Routes>
  );

  const onMenuClick = () => {
    //
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
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menuItems}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "0 0px" }}>
            <div style={{ padding: 20, margin: "20px 20px 20px 220px", minHeight: 360, background: colorBgContainer }}>{routes}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Mirza Design ©2023 Created by Mirza Akhena</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MyLayout;
