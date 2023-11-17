//

import { Button, Form, Table, theme } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { InputType } from "../model/data";
import { dateTimeFormat } from "../util/constant";
import { pascalToCamel } from "../util/convert";
import { createDebounce } from "../util/debounce";
import { generateForm } from "./DynamicFormItem";

interface Props {
  attributeParamType: "body" | "param" | "query" | "header" | "cookie";
  usecaseName: string;
  recordInputType: Record<string, InputType>;
}

const TableAndFormComponent = (props: Props) => {
  //

  if (props.usecaseName.toLowerCase().endsWith("getall")) {
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

  const [form] = useForm();

  // insert to local storage
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
    }
  });

  // insert to form field
  const resetFieldValues = () => {
    const savedState = localStorage.getItem(`${props.usecaseName}`);
    const jsonObj = savedState ? JSON.parse(savedState)[props.usecaseName][props.attributeParamType] : null;
    const data = generateInitialValue(props.recordInputType, jsonObj);
    form.setFieldsValue({ [props.usecaseName]: { [props.attributeParamType]: data } });
  };

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    resetFieldValues();
    setInitialized(true);
  }, [form]);

  setTimeout(() => initialized && resetFieldValues(), 50);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (value: any) => {
    //
    console.log("<<", value);
  };

  return (
    <>
      <Form
        style={{ background: colorBgContainer, padding: "20px" }}
        form={form}
        onChange={onChange}
        // onFinish={console.log}
        onFinish={onFinish}
        layout="vertical"
      >
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "calc(100vh - 310px)",
            padding: "0px 20px 10px 0px",
            border: "none",
          }}
        >
          {generateForm(props.recordInputType, [pascalToCamel(props.usecaseName), "body"], onChange)}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TableAndFormComponent;

const generateInitialValue = (recordInputType: Record<string, InputType>, jsonObj: any) => {
  //

  const defaultValueObject: Record<string, any> = {};

  for (const fieldName in recordInputType) {
    //

    const field = recordInputType[fieldName];

    if (field.type === "array") {
      defaultValueObject[fieldName] = jsonObj ? (jsonObj[fieldName] ? jsonObj[fieldName] : field.items.default ?? undefined) : field.items.default ?? undefined;

      //
    } else if (field.type === "object") {
      defaultValueObject[fieldName] = jsonObj ? (jsonObj[fieldName] ? generateInitialValue(field.properties, jsonObj[fieldName]) : undefined) : undefined;

      //
    } else if (field.type === "date") {
      defaultValueObject[fieldName] = jsonObj
        ? jsonObj[fieldName]
          ? dayjs.utc(jsonObj[fieldName], dateTimeFormat)
          : field.default
          ? dayjs.utc(field.default, dateTimeFormat)
          : undefined
        : undefined;

      //
    } else {
      defaultValueObject[fieldName] = jsonObj ? (jsonObj[fieldName] ? jsonObj[fieldName] : field.default ?? undefined) : field.default ?? undefined;

      //
    }
  }

  return defaultValueObject;
};
