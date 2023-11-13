import { Button, Form, Input, Table } from "antd";
import { useForm } from "antd/es/form/Form";

interface Props {
  tag: string;
  usecase: string;
  fields: string[];
  onSubmit: (submittedData: any) => void;
}

const DisplayComponent = (props: Props) => {
  //

  const [form] = useForm();

  if (props.usecase.toLowerCase().endsWith("getall")) {
    //

    const dataSource = [
      {
        key: "1",
        name: "Mike",
        age: 32,
        address: "10 Downing Street",
      },
      {
        key: "2",
        name: "John",
        age: 42,
        address: "10 Downing Street",
      },
    ];

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
    ];

    return (
      <>
        <Table
          dataSource={dataSource}
          columns={columns}
        />
      </>
    );
  }

  return (
    <Form
      form={form}
      onFinish={props.onSubmit}
    >
      {props.fields.map((field) => (
        <Form.Item
          key={field}
          label={field}
          name={[props.tag.toLowerCase(), props.usecase, field]}
        >
          <Input />
        </Form.Item>
      ))}
      <Form.Item>
        <Button htmlType="submit">Submit </Button>
      </Form.Item>
    </Form>
  );
};

export default DisplayComponent;
