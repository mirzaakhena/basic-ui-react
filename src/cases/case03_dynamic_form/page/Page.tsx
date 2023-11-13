import { Form } from "antd";
import FormItemObject from "../components/FormItemObject";

const Page = () => {
  //
  return (
    <Form>
      <FormItemObject
        fieldNames={["person"]}
        field={{
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            age: {
              type: "number",
            },
            address: {
              type: "text",
              textAreaLine: 2,
            },
            hobbies: {
              type: "array",
              items: {
                type: "enum",
                enum: [],
              },
            },
            pekerjaan: {
              type: "array",
              items: {
                type: "string",
              },
            },
            departement: {
              type: "object",
              properties: {
                section: {
                  type: "enum",
                  enum: ["aaa", "bbb", "ccc"],
                },
                aktif: {
                  type: "boolean",
                },
              },
            },
          },
        }}
      />
    </Form>
  );
};

export default Page;
