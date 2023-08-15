import { BiSort } from "react-icons/bi";
import Select from "src/components/select";

const GroupActions = () => {
  return (
    <Select
      className="col-span-2 md:col-span-1"
      icon={<BiSort />}
      defaultValue={{ label: "Name (A-Z)", value: "name-asc" }}
    >
      <Select.Options>
        <Select.Option value="name-asc">Name (A-Z)</Select.Option>
        <Select.Option value="name-des">Name (Z-A)</Select.Option>
      </Select.Options>
    </Select>
  );
};
export default GroupActions;
