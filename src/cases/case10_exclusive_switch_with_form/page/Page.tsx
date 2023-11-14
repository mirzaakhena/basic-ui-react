import { Button, Form, Switch } from "antd";
import { useForm } from "antd/lib/form/Form";

type State = {
  active: boolean;
  description?: string;
  value?: string;
};

const Page = () => {
  //

  const [form] = useForm();

  const handleSwitchChange = (i: number) => {
    const states = form.getFieldValue("states");

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
    >
      <Form.List
        name="states"
        initialValue={[
          //
          { active: true },
          { active: true },
          { active: true },
          { active: true },
        ]}
        // rules={rules}
      >
        {(fields) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                key={field.key}
                name={[field.name, "active"]}
                valuePropName="checked"
              >
                <Switch onChange={() => handleSwitchChange(index)} />
              </Form.Item>
            ))}
            <Button onClick={() => console.log(form.getFieldsValue())}>Get Value</Button>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default Page;
