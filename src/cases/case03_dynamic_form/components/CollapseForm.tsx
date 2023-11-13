import { Collapse } from "antd";
import { ReactNode } from "react";
import { RecordInputType } from "../model/model";
import { generateForm } from "./DynamicFormItem";

const CollapseForm: React.FC<{ json: RecordInputType; previousField: (string | number)[]; extra?: ReactNode }> = ({ json, previousField, extra }) => {
  //

  const innerCardStyle = previousField.length ? {} : { marginTop: "20px" };

  return (
    <Collapse
      style={innerCardStyle}
      collapsible="header"
      defaultActiveKey={["1"]}
      items={[
        {
          key: "1",
          label: previousField.length === 0 ? "Body" : "",
          children: generateForm(json, previousField),
          extra,
        },
      ]}
    />
  );
};

export default CollapseForm;
