import { ObjectType } from "../model/model";
import CollapseForm from "./CollapseForm";
import FormItem, { FormItemProps } from "./FormItem";

const FormItemObject = (props: FormItemProps<ObjectType>) => {
  //

  return (
    <FormItem fieldNames={props.fieldNames}>
      <CollapseForm
        json={props.field.properties}
        previousField={props.fieldNames}
      />
    </FormItem>
  );
};

export default FormItemObject;
