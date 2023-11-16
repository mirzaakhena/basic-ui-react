import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, FormInstance, Input, Row, Space, Switch, theme } from "antd";
import { useForm } from "antd/lib/form/Form";
import { InputType } from "../model/data";

type State = {
  active: boolean;
  description?: string;
  value?: string;
};

type RecordStates = Record<string, State[]>;

const formItemStyle = { marginBottom: "10px" };

interface Props {
  recordInputType: Record<string, InputType>;
}

const InputOption = (props: Props) => {
  //

  const [form] = useForm<RecordStates>();

  const onFinish = (value: RecordStates) => {
    //
    Object.keys(value).forEach((key) => {
      console.log(
        key,
        value[key].filter((x) => x.active)?.map((x) => x.value)
      );
    });
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
      style={{ background: colorBgContainer, padding: "20px" }}
    >
      {generateItem(props.recordInputType, form)}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InputOption;

function generateItem(recordInputType: Record<string, InputType>, form: FormInstance) {
  //

  const handleSwitchChange = (i: number, stateName: string, exclusive: boolean, form: FormInstance) => {
    //

    if (!exclusive) {
      return;
    }

    const states = form.getFieldValue(stateName) as State[];

    if (states) {
      const updatedStates = [...states];

      if (!updatedStates[i].active) {
        updatedStates[i].active = false;
      } else {
        updatedStates[i].active = true;
        updatedStates.filter((_, index) => index !== i).forEach((x) => (x.active = false));
      }

      form.setFieldValue(stateName, updatedStates);
    }
  };

  const formItems: React.ReactNode[] = [];

  for (const fieldName in recordInputType) {
    //

    const field = recordInputType[fieldName];

    const exclusive = field.type !== "array";

    formItems.push(
      <Form.Item
        key={fieldName}
        style={{ marginBottom: "50px" }}
      >
        <Divider
          orientation="left"
          orientationMargin="0"
        >
          {fieldName}
        </Divider>
        <Form.List
          name={fieldName}
          initialValue={[{ active: true, description: "", value: "" }]}
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
                          onChange={() => handleSwitchChange(index, fieldName, exclusive, form)}
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
      </Form.Item>
    );
  }

  return formItems;
}
