import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Switch, theme } from "antd";
import { useForm } from "antd/lib/form/Form";
import { InputType } from "../model/data";

type State = {
  active: boolean;
  description?: string;
  value?: string;
};

const formItemStyle = { marginBottom: "10px" };

interface Props {
  fieldName: string;
  exclusive: boolean;
  usecaseName: string;
  recordInputType: Record<string, InputType>;
}

const InputOption = (props: Props) => {
  //

  const [form] = useForm<{ states: State[] }>();

  const handleSwitchChange = (i: number) => {
    //

    if (!props.exclusive) {
      return;
    }

    const states = form.getFieldValue("states") as State[];

    if (states) {
      const updatedStates = [...states];

      if (!updatedStates[i].active) {
        updatedStates[i].active = false;
      } else {
        updatedStates[i].active = true;
        updatedStates.filter((_, index) => index !== i).forEach((x) => (x.active = false));
      }

      form.setFieldValue("states", updatedStates);
    }
  };

  const onFinish = (value: { states: State[] }) => {
    //
    console.log(value.states.filter((x) => x.active)?.map((x) => x.value));
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      // style={{ border: "1px solid", borderColor: "#dedede", margin: "10px", marginBottom: "0px", padding: "5px", paddingTop: "10px", borderRadius: "5px" }}
      style={{ background: colorBgContainer, padding: "20px" }}
    >
      <Form.Item
        label="Hello"
        // style={{ padding: "0px 10px" }}
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
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  style={{ display: "flex" }}
                  direction="vertical"
                >
                  <Row gutter={20}>
                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        name={[name, "active"]}
                        valuePropName="checked"
                      >
                        <Switch
                          onChange={() => handleSwitchChange(index)}
                          checkedChildren="active"
                          unCheckedChildren="ignored"
                        />
                      </Form.Item>
                    </Col>
                    {fields.length > 1 ? (
                      <Col>
                        <Form.Item
                          style={formItemStyle}
                          {...restField}
                          name={[name, "description"]}
                        >
                          <Input placeholder="description (optional)" />
                        </Form.Item>
                      </Col>
                    ) : undefined}

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
                    {fields.length > 1 ? (
                      <Col>
                        <Form.Item style={formItemStyle}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Form.Item>
                      </Col>
                    ) : (
                      <Col>
                        <Form.Item style={formItemStyle}>
                          <PlusCircleOutlined onClick={() => add({ active: fields.length === 0 ? true : false, description: "", value: "" })} />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                </Space>
              ))}

              {fields.length > 1 ? (
                <Button
                  type="dashed"
                  onClick={() => {
                    add({ active: fields.length === 0 ? true : false, description: "", value: "" });
                  }}
                  block
                  icon={<PlusCircleOutlined />}
                >
                  Add new alternative variable
                </Button>
              ) : undefined}
            </>
          )}
        </Form.List>
        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item> */}
      </Form.Item>
    </Form>
  );
};

export default InputOption;
