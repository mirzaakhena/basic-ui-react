import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UsecaseApiLayout from "../layout/UsecaseApiLayout";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";

const HeaderLayout = () => {
  //

  const baseUrl = "http://localhost:3000";

  const [tags, setTags] = useState([]);

  const reload = async () => {
    const config = { method: "GET", headers: { "Content-Type": "application/json" } };
    const response = await fetch(`${baseUrl}/controllers`, config);
    setTags(await response.json());
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header
          style={
            //
            {
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }
          }
        >
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ minWidth: 0, flex: "auto" }}
            items={[
              {
                key: "usecase",
                label: "Usecase API",
              },
              {
                key: "recorder",
                label: "Recorder List",
              },
              {
                key: "journey",
                label: "Journey list",
              },
            ]}
          />
        </Header>
        <Content>
          <UsecaseApiLayout tags={tags} />
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default HeaderLayout;
