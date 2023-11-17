import { Input } from "antd";
import { PasswordType } from "../model/data";
import FormItem, { FormItemProps } from "./FormItem";

const FormItemPassword = (props: FormItemProps<PasswordType>) => {
  //

  return (
    <FormItem
      fieldNames={props.fieldNames}
      required={props.field.required}
    >
      <Input.Password placeholder={props.field.summary} />
    </FormItem>
  );
};

export default FormItemPassword;
