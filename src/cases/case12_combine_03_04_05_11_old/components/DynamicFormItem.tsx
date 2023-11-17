import { InputType } from "../model/data";
import FormItemArray from "./FormItemArray";
import FormItemBoolean from "./FormItemBoolean";
import FormItemDate from "./FormItemDate";
import FormItemEnum from "./FormItemEnum";
import FormItemNumber from "./FormItemNumber";
import FormItemObject from "./FormItemObject";
// import FormItemObject from "./FormItemObject";
import FormItemPassword from "./FormItemPassword";
import FormItemString from "./FormItemString";
import FormItemTextArea from "./FormItemTextArea";

export const DynamicFormItem = () => {
  return <div>DynamicFormItem</div>;
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

export default DynamicFormItem;
