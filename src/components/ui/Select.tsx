import { SelectHTMLAttributes } from "react";

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  values: { [key: number]: number } | { [key: string]: string };
  currentValue: string | number;
  className?: string;
}

const Select = ({ values, currentValue, className, ...rest }: IProps) => {
  const arrayOfKeys = Object.keys(values);
  const arrayOfValues = Object.values(values);
  return (
    <>
      <select
        className={`border-2 border-[#E48700] focus-visible:outline-[0px] rounded-md p-1 ${className}`}
        value={currentValue}
        {...rest}
      >
        <option disabled>Page size</option>

        {arrayOfKeys.map((value,i) => (
          <option value={value}>{arrayOfValues[i]}</option>
        ))}
      </select>
    </>
  );
};
export default Select;
