import { Button, Form, Table, theme } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { InputType } from "../model/data";
import { dateTimeFormat } from "../util/constant";
import { pascalToCamel } from "../util/convert";
import { createDebounce } from "../util/debounce";
import FormItemArray from "./FormItemArray";
import FormItemBoolean from "./FormItemBoolean";
import FormItemDate from "./FormItemDate";
import FormItemEnum from "./FormItemEnum";
import FormItemNumber from "./FormItemNumber";
import FormItemObject from "./FormItemObject";
import FormItemPassword from "./FormItemPassword";
import FormItemString from "./FormItemString";
import FormItemTextArea from "./FormItemTextArea";

interface Props {
  attributeParamType: "body" | "param" | "query" | "header" | "cookie";
  usecaseName: string;
  recordInputType: Record<string, InputType>;
}

const TableAndFormComponent = (props: Props) => {
  //

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

export const generateForm = (recordInputType: Record<string, InputType>, previousField: (string | number)[], onChange: () => void) => {
  //
  const formItems: React.ReactNode[] = [];

  for (const fieldName in recordInputType) {
    const field = recordInputType[fieldName];

    const formItem = generateFormItem([...previousField, fieldName], field, onChange);
    if (formItem) {
      formItems.push(formItem);
    }
  }

  return formItems;
};

const generateFormItem = (fieldNames: (string | number)[], field: Record<string, InputType>[keyof Record<string, InputType>], onChange: () => void) => {
  //

  // prettier-ignore
  switch (field.type) {
    case "string": return <FormItemString field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>;
    case "number": return <FormItemNumber field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "password": return <FormItemPassword field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "text": return <FormItemTextArea field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "boolean": return <FormItemBoolean field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "enum": return <FormItemEnum field={field} fieldNames={fieldNames} key={fieldNames.toString()} onChange={onChange}/>
    case "date": return <FormItemDate field={field} fieldNames={fieldNames} key={fieldNames.toString()} onChange={onChange}/>
    case "array": return <FormItemArray field={field} fieldNames={fieldNames} key={fieldNames.toString()} onChange={onChange}/>
    case "object": return <FormItemObject field={field} fieldNames={fieldNames} key={fieldNames.toString()} onChange={onChange}/>
  }
};
