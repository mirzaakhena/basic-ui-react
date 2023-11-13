import { DatePicker } from "antd";
import dayjs from "dayjs";
import { DateType } from "../model/model";
import FormItem, { FormItemProps } from "./FormItem";

const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

const FormItemDate = (props: FormItemProps<DateType>) => {
  //

  return (
    <FormItem
      fieldNames={props.fieldNames}
      required={props.field.required}
    >
      <DatePicker
        style={{ width: "100%" }}
        format={dateTimeFormat}
        showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
      />
    </FormItem>
  );
};

export default FormItemDate;
