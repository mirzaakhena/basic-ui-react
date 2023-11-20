import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

interface Props {
  message: string;
}

const JSONViewComponent = (props: Props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tabChildrenStyle = {
    minHeight: 280,
    padding: "20px",
    background: colorBgContainer,
  };

  return (
    <>
      <Content style={tabChildrenStyle}>{props.message}</Content>
    </>
  );
};

export default JSONViewComponent;
