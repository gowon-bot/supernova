import Image from "next/image";
import { useState } from "react";

export function Checkbox({
  initialState,
  onChange,
}: {
  initialState: boolean;
  onChange: (value: boolean) => void;
}) {
  const [selected, setSelected] = useState(initialState);

  const change = () => {
    setSelected(!selected);
    onChange(!selected);
  };

  return (
    <div>
      {selected ? (
        <Image
          src="/selected-checkbox.svg"
          alt="checked"
          width={30}
          height={30}
          onClick={change}
        />
      ) : (
        <Image
          src="/unselected-checkbox.svg"
          alt="unchecked"
          width={30}
          height={30}
          onClick={change}
        />
      )}
    </div>
  );
}
