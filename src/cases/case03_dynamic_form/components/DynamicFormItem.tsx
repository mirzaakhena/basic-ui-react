import { RecordInputType } from "../model/model";
import FormItemArray from "./FormItemArray";
import FormItemBoolean from "./FormItemBoolean";
import FormItemDate from "./FormItemDate";
import FormItemEnum from "./FormItemEnum";
import FormItemNumber from "./FormItemNumber";
import FormItemObject from "./FormItemObject";
import FormItemPassword from "./FormItemPassword";
import FormItemString from "./FormItemString";
import FormItemTextArea from "./FormItemTextArea";

export const DynamicFormItem = () => {
  return <div>DynamicFormItem</div>;
};

export const generateForm = (json: RecordInputType, previousField: (string | number)[]) => {
  //
  const formItems: React.ReactNode[] = [];

  for (const fieldName in json) {
    const field = json[fieldName];

    const formItem = generateFormItem([...previousField, fieldName], field);
    if (formItem) {
      formItems.push(formItem);
    }
  }

  return formItems;
};

const generateFormItem = (fieldNames: (string | number)[], field: RecordInputType[keyof RecordInputType]) => {
  //
  // prettier-ignore
  switch (field.type) {
    case "string": return <FormItemString field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>;
    case "number": return <FormItemNumber field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "enum": return <FormItemEnum field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "password": return <FormItemPassword field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "text": return <FormItemTextArea field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "boolean": return <FormItemBoolean field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "date": return <FormItemDate field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "array": return <FormItemArray field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
    case "object": return <FormItemObject field={field} fieldNames={fieldNames} key={fieldNames.toString()}/>
  }
};

export default DynamicFormItem;
