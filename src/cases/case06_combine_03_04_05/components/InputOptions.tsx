import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Radio, RadioChangeEvent, Row, Space } from "antd";
import { useState } from "react";

const InputOptions = () => {
  //

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        <Form layout="vertical">
          <Form.Item label="Hello">
            <Radio.Group style={{ width: "100%" }}>
              <Space.Compact
                block
                direction="vertical"
              >
                <Space direction="vertical">
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Radio
                        style={{ paddingTop: "5px" }}
                        value={"A"}
                      ></Radio>
                    </Col>
                    <Col>
                      <Input placeholder="Description" />
                    </Col>
                    <Col flex="auto">
                      <Input.TextArea
                        rows={1}
                        placeholder="Value"
                      />
                    </Col>
                    <Col>
                      <CloseOutlined style={{ paddingTop: "10px" }} />
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Radio
                        style={{ paddingTop: "5px" }}
                        value={"B"}
                      ></Radio>
                    </Col>
                    <Col>
                      <Input placeholder="Description" />
                    </Col>
                    <Col flex="auto">
                      <Input.TextArea
                        rows={1}
                        placeholder="Value"
                      />
                    </Col>
                    <Col>
                      <CloseOutlined style={{ paddingTop: "10px" }} />
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col style={{ paddingLeft: "36px", width: "240px" }}>
                      <Button
                        block
                        type="dashed"
                      >
                        + Add
                      </Button>
                    </Col>
                  </Row>
                </Space>
              </Space.Compact>
            </Radio.Group>
          </Form.Item>
        </Form>
        {/* <Radio.Group>
          <Space direction="vertical">        
            <Row gutter={[8, 8]}>
              <Col>
                <Radio
                  style={{ paddingTop: "5px" }}
                  value={"B"}
                ></Radio>
              </Col>
              <Col>
                <Input placeholder="Input 1" />
              </Col>
              <Col flex="auto">
                <Input placeholder="Input 2" />
              </Col>
            </Row>
          </Space>
        </Radio.Group> */}
      </div>
    </>
  );
};

export default InputOptions;
