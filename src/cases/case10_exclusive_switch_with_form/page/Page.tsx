import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Switch } from "antd";
import { useForm } from "antd/lib/form/Form";

type State = {
  active: boolean;
  description?: string;
  value?: string;
};

const formItemStyle = { marginBottom: "10px" };

const Page = () => {
  //

  const [form] = useForm<{ states: State[] }>();

  const handleSwitchChange = (i: number) => {
    const states = form.getFieldValue("states") as State[];

    if (states) {
      const updatedStates = [...states];

      updatedStates[i].active = true;
      updatedStates.filter((_, index) => index !== i).forEach((x) => (x.active = false));
      form.setFieldValue("states", updatedStates);
    }
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={console.log}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label="Hello"
        style={{ padding: "0px 10px" }}
      >
        <Form.List
          name="states"
          initialValue={[
            //
            { active: true, description: "a", value: "A" },
            // { active: true, description: "b", value: "B" },
            // { active: true, description: "c", value: "C" },
            // { active: true, description: "d", value: "D" },
          ]}
          // rules={rules}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex" }}
                  direction="vertical"
                >
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        name={[name, "active"]}
                        valuePropName="checked"
                      >
                        <Switch onChange={() => handleSwitchChange(index)} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        {...restField}
                        name={[name, "description"]}
                      >
                        <Input placeholder="description" />
                      </Form.Item>
                    </Col>
                    <Col flex="auto">
                      <Form.Item
                        style={formItemStyle}
                        {...restField}
                        name={[name, "value"]}
                      >
                        <Input.TextArea
                          rows={1}
                          placeholder="value"
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item style={formItemStyle}>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add({ active: false, description: "", value: "" })}
                  block
                  icon={<PlusOutlined />}
                >
                  Add new alternative variable
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default Page;
