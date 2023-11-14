import { Button, Space, Switch } from "antd";
import { useState } from "react";

type State = {
  active: boolean;
  description?: string;
  value?: string;
};

const Page = () => {
  //

  const [states, setStates] = useState<State[]>([{ active: true }, { active: false }, { active: false }, { active: false }]);

  const handleSwitchChange = (i: number) => {
    if (states) {
      const updatedStates = [...states];
      updatedStates[i].active = !updatedStates[i].active;
      setStates(updatedStates);
    }
  };

  return (
    <Space direction="vertical">
      {states &&
        states.map((x, i) => (
          <Switch
            key={i}
            checked={x.active}
            onChange={() => handleSwitchChange(i)}
          />
        ))}

      <Button onClick={() => console.log(states)}>Get Value</Button>
    </Space>
  );
};

export default Page;
