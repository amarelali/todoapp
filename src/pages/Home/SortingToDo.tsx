import Select from "../../components/ui/Select";
import { ISortingToDo } from "../../interfaces";

interface IProps {
  select: ISortingToDo[];
}
const SortingToDo = ({ select }: IProps) => {
  return (
    <div className="space-x-3 flex justify-end m-auto w-4/5 mt-3">
      {select.map(
        ({values,onChangeFn,currentValue}: ISortingToDo) => (
          <Select
            values={values}
            onChange={onChangeFn}
            currentValue={currentValue}
          />
        )
      )}
    </div>
  );
};
export default SortingToDo;
