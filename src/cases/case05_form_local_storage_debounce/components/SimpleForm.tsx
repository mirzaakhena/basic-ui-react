import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { createDebounce } from "../util/debounce";

const SimpleForm: React.FC = () => {
  //

  const [formInstance] = Form.useForm();

  const onChanges = createDebounce(() => {
    localStorage.setItem("appState", JSON.stringify(formInstance.getFieldsValue()));
    console.log("stored..");
  });

  useEffect(() => {
    const savedState = localStorage.getItem("appState");
    if (savedState) {
      formInstance.setFieldsValue(JSON.parse(savedState));
    }
    console.log("useEffect");
  }, [formInstance]);

  return (
    <Form
      form={formInstance}
      onChange={onChanges}
      onFinish={(x) => console.log(x)}
    >
      <Form.Item
        name="address"
        label="Input"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">LookupValue</Button>
      </Form.Item>
    </Form>
  );
};

export default SimpleForm;
