import { Button, Checkbox, Switch } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

const Page = () => {
  const [switchState, setSwitchState] = useState(true);

  const handleButtonClick = (state: boolean) => {
    setSwitchState(state);
  };

  const handleSwitchChange = () => {
    setSwitchState(!switchState);
  };

  const handleCheckbox = (_: CheckboxChangeEvent) => {
    setSwitchState(!switchState);
  };

  return (
    <div>
      <Switch
        checked={switchState}
        onChange={handleSwitchChange}
      />

      <Checkbox
        checked={switchState}
        onChange={handleCheckbox}
      />
      <Button onClick={() => handleButtonClick(false)}>Turn Off Switch</Button>
      <Button onClick={() => handleButtonClick(true)}>Turn On Switch</Button>
    </div>
  );
};

export default Page;
