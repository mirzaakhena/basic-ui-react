import { InputNumber } from "antd";
import FormItem, { FormItemProps } from "./FormItem";
import { NumberType } from "../model/data";

const FormItemNumber = (props: FormItemProps<NumberType>) => {
  //

  return (
    <FormItem
      fieldNames={props.fieldNames}
      required={props.field.required}
    >
      <InputNumber
        style={{ width: "100%" }}
        placeholder={props.field.summary}
      />
    </FormItem>
  );
};

export default FormItemNumber;
