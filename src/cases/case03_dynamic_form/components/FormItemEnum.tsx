import { Select } from "antd";
import { EnumType } from "../model/model";
import FormItem, { FormItemProps } from "./FormItem";

const FormItemEnum = (props: FormItemProps<EnumType>) => {
  //

  return (
    <FormItem
      fieldNames={props.fieldNames}
      required={props.field.required}
    >
      <Select
        placeholder={props.field.summary}
        allowClear
        options={props.field.enum?.map((val) => ({ value: val, label: val.toString() }))}
      />
    </FormItem>
  );
};

export default FormItemEnum;
