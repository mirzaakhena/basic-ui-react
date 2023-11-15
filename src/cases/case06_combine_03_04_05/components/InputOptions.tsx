import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

// interface ARowProps {
//   selectedRow: string;
// }

// const ARow = (props: ARowProps) => {
//   return (
//     <Row gutter={[8, 8]}>
//       <Col>
//         <Radio
//           style={{ paddingTop: "5px" }}
//           value={props.selectedRow}
//         />
//       </Col>
//       <Col>
//         <Input placeholder="Description" />
//       </Col>
//       <Col flex="auto">
//         <Input.TextArea
//           name="value"
//           rows={1}
//           placeholder="Value"
//         />
//       </Col>
//       <Col>
//         <CloseOutlined style={{ paddingTop: "10px" }} />
//       </Col>
//     </Row>
//   );
// };

// const InputOptions2 = () => {
//   //

//   return (
//     <>
//       <div>
//         <Form layout="vertical">
//           <Form.Item label="Hello">
//             <Radio.Group style={{ width: "100%" }}>
//               <Space.Compact
//                 block
//                 direction="vertical"
//               >
//                 <Space direction="vertical">
//                   <ARow selectedRow="A" />
//                   <ARow selectedRow="B" />
//                   <ARow selectedRow="C" />
//                   <Row gutter={[8, 8]}>
//                     <Col style={{ paddingLeft: "36px", width: "240px" }}>
//                       <Button
//                         block
//                         type="dashed"
//                       >
//                         + Add
//                       </Button>
//                     </Col>
//                   </Row>
//                 </Space>
//               </Space.Compact>
//             </Radio.Group>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

type MyRow = {
  active: boolean;
  description: string;
  value: string;
};

const InputOptions = () => {
  //

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const formItemStyle = { marginBottom: "10px" };

  const [form] = useForm<{ users: MyRow[] }>();

  const [switchStates, setSwitchStates] = useState<boolean>(false);

  const onExclusiveSelected = (key: number, value: boolean) => {
    //

    const data = form.getFieldsValue();

    const activeRow = data["users"].find((x, i) => {
      if (x) {
        console.log(`value ${x.active}, index ${i}`);
      }

      return x && x.active === true && i !== key;
    });
    if (activeRow) {
      console.log(activeRow);
    }

    //
  };

  const changeSwitch = () => {
    setSwitchStates(true);

    console.log("masuk");
  };

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Hello">
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex" }}
                  // align="baseline"
                  direction="vertical"
                >
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        name={[name, "active"]}
                        valuePropName="checked"
                      >
                        <Switch
                          checked={switchStates}
                          onChange={(x) => onExclusiveSelected(key, x)}
                        />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item
                        style={formItemStyle}
                        {...restField}
                        name={[name, "description"]}
                        // rules={[{ required: true, message: "Missing first name" }]}
                      >
                        <Input placeholder="Description" />
                      </Form.Item>
                    </Col>
                    <Col flex="auto">
                      <Form.Item
                        style={formItemStyle}
                        {...restField}
                        name={[name, "value"]}
                        // rules={[{ required: true, message: "Missing Value" }]}
                      >
                        <Input placeholder="Value" />
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
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
        >
          Submitsss
        </Button>
      </Form.Item>

      <Button onClick={changeSwitch}>Change</Button>
    </Form>
  );
};

export default InputOptions;
