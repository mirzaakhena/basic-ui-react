import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, FormInstance, Input, Row, Space, Switch, theme } from "antd";
import { useForm } from "antd/lib/form/Form";
import { InputType } from "../model/data";
import { createDebounce } from "../util/debounce";
import { useEffect, useState } from "react";
import { pascalToCamel } from "../util/convert";

export type State = {
  active: boolean;
  description?: string;
  value?: string;
};

// type RecordStates = Record<string, State[]>;

const formItemStyle = { marginBottom: "10px" };

export type AttributeParamType = "body" | "param" | "query" | "header" | "cookie";

interface Props {
  recordInputType: Record<string, InputType>;
  usecaseName: string;
  attributeParamType: AttributeParamType;
  onUpdated: (param: Record<string, string>, query: string) => void;
}

const InputOption = (props: Props) => {
  //

  const [form] = useForm();

  const resetFieldValues = () => {
    const savedState = localStorage.getItem(`${props.usecaseName}`);
    const jsonObj = savedState ? JSON.parse(savedState)[props.usecaseName][props.attributeParamType] : null;
    const data = generateInitialValue(props.recordInputType, jsonObj);
    form.setFieldsValue({ [props.usecaseName]: { [props.attributeParamType]: data } });
  };

  const onChange = createDebounce(() => {
    const jsonA = form.getFieldsValue();
    if (jsonA) {
      const savedState = localStorage.getItem(`${props.usecaseName}`);
      const jsonB = savedState ? JSON.parse(savedState)[props.usecaseName] : undefined;

      const newValue = {
        [props.usecaseName]: {
          ...jsonB,
          ...jsonA[props.usecaseName],
        },
      };

      let data = JSON.stringify(newValue);
      localStorage.setItem(`${props.usecaseName}`, data);

      if (props.attributeParamType !== "param" && props.attributeParamType !== "query") {
        return;
      }

      let param = {};
      {
        const x = newValue[props.usecaseName]["param"];
        if (x) {
          for (const key in x) {
            const states = x[key] as State[];
            states
              .filter((state) => state.active)
              .forEach((z) => {
                if (z.value) {
                  param = { ...param, [key]: z.value };
                }
              });
          }
        }
      }

      let query = "";
      {
        const x = newValue[props.usecaseName]["query"];
        if (x) {
          for (const key in x) {
            const states = x[key] as State[];
            states
              .filter((state) => state.active)
              .forEach((z) => {
                if (z.value) {
                  query = `${query}&${key}=${z.value}`;
                }
              });
          }
        }
      }
      query = `?${query.slice(1)}`;
      props.onUpdated(param, query);
    }
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    resetFieldValues();
    setInitialized(true);
  }, [form]);

  setTimeout(() => {
    if (initialized) {
      resetFieldValues();
    }
  }, 50);

  // const onFinish = (value: RecordStates) => {
  //   //
  //   Object.keys(value).forEach((key) => {
  //     console.log(
  //       key,
  //       value[key].filter((x) => x.active)?.map((x) => x.value)
  //     );
  //   });
  // };

  // const onFinish = (value: any) => {
  //   //
  //   console.log(form.getFieldsValue());
  // };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Form
      form={form}
      // onFinish={onFinish}
      // onFinish={console.log}
      onChange={onChange}
      autoComplete="off"
      layout="vertical"
      style={{ background: colorBgContainer, padding: "20px" }}
    >
      {generateItem(props.recordInputType, [pascalToCamel(props.usecaseName), props.attributeParamType], form, onChange)}
      {/* <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default InputOption;

function generateItem(recordInputType: Record<string, InputType>, previousField: (string | number)[], form: FormInstance, onChange: () => void) {
  //

  const handleSwitchChange = (i: number, fieldName: string, exclusive: boolean) => {
    //

    if (!exclusive) {
      onChange();
      return;
    }

    const usecase = form.getFieldValue(previousField[0]); // as State[];

    if (usecase) {
      //

      const attributes = usecase[previousField[1]];
      const states = attributes[fieldName] as State[];
      const updatedStates = [...states];

      if (!updatedStates[i].active) {
        updatedStates[i].active = false;
      } else {
        updatedStates[i].active = true;
        updatedStates.filter((_, index) => index !== i).forEach((x) => (x.active = false));
      }
      form.setFieldValue([...previousField, fieldName], updatedStates);

      onChange();
    }
  };

  const formItems: React.ReactNode[] = [];

  for (const fieldName in recordInputType) {
    //

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
        <Form.List name={[...previousField, fieldName]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => (
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
                          onChange={() => handleSwitchChange(index, fieldName, recordInputType[fieldName].type !== "array")}
                          checkedChildren="active"
                          unCheckedChildren="ignored"
                        />
                      </Form.Item>
                    </Col>

                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        // {...restField}
                        name={[name, "description"]}
                      >
                        <Input
                          placeholder="description (optional)"
                          style={fields.length === 1 ? { display: "none" } : {}}
                        />
                      </Form.Item>
                    </Col>

                    <Col flex="auto">
                      <Form.Item
                        style={formItemStyle}
                        // {...restField}
                        name={[name, "value"]}
                      >
                        <Input.TextArea
                          rows={1}
                          placeholder={"value"}
                        />
                      </Form.Item>
                    </Col>

                    <Col>
                      <Form.Item style={formItemStyle}>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        ) : (
                          <PlusCircleOutlined onClick={() => add({ active: fields.length === 0 ? true : false, description: "", value: "" })} />
                        )}
                      </Form.Item>
                    </Col>
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

const generateInitialValue = (recordInputType: Record<string, InputType>, jsonObj: any) => {
  //

  const defaultValueObject: Record<string, any> = {};

  for (const fieldName in recordInputType) {
    //

    const field = recordInputType[fieldName];

    if (field.type === "array") {
      defaultValueObject[fieldName] = jsonObj ? jsonObj[fieldName] : [{ active: false, description: "", value: field.items.default ?? "" }];

      //
    } else {
      defaultValueObject[fieldName] = jsonObj ? jsonObj[fieldName] : [{ active: false, description: "", value: field.default ?? "" }];

      //
    }
  }

  return defaultValueObject;
};
