import { useState } from "react";
import {
  isStringContains,
  isStringEquals,
  type ErrorsFilters,
} from "../filters/ErrorsFilters";
import { Checkbox } from "./Checkbox";

export function FilterInput({
  name,
  filters,
  setFilters,
}: {
  name: keyof ErrorsFilters;
  filters: Partial<ErrorsFilters>;
  setFilters: (filters: Partial<ErrorsFilters>) => void;
}) {
  const [exact, setExact] = useState(isStringEquals(filters[name]));

  const onCheckboxChange = (checked: boolean) => {
    setExact(checked);
    setFilters({
      ...filters,
      [name]: checked
        ? { equals: getValue(filters[name]) }
        : { contains: getValue(filters[name]) },
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [name]: exact ? { equals: e.target.value } : { contains: e.target.value },
    });
  };

  return (
    <>
      <label className="text-xl">{titlecase(name)}:</label>
      <input
        type="text"
        title={name}
        name={name}
        onChange={onInputChange}
        defaultValue={getValue(filters[name])}
      />
      <Checkbox onChange={onCheckboxChange} initialState={exact} />
    </>
  );
}

function titlecase(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

function getValue(filter: any): string {
  return isStringEquals(filter)
    ? filter.equals
    : isStringContains(filter)
    ? filter.contains
    : "";
}
