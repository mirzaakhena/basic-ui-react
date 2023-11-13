import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

export type DataType = {
  name: string;
};

interface Props {
  defaultValue?: DataType;
  onSubmit: (data: DataType) => void;
}

const MirzaForm = (props: Props) => {
  //

  const [myForm] = useForm<DataType>();

  useEffect(() => {
    if (props.defaultValue) {
      myForm.setFieldsValue(props.defaultValue);
    }
  });

  return (
    <>
      <Row>
        <Col>
          <Form
            form={myForm}
            onFinish={props.onSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              key="name"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default MirzaForm;
