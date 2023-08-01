import { BiSort } from "react-icons/bi";
import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import ReturnButtonTitle from "src/components/return-button-title";
import Select from "src/components/select";
import RowHeader from "src/ui/row-header/row-header.component";

const Groups = () => {
  return (
    <div>
      <RowHeader className="border-b border-b-[var(--color-grey-400)]">
        <ReturnButtonTitle>
          <div className="flex gap-1.5 items-center">
            <span className="text-2xl">
              <HiOutlineUserGroup />
            </span>
            <p>Join Groups</p>
          </div>
        </ReturnButtonTitle>
      </RowHeader>
      <div className="pt-4 px-4">
        <p className="mb-3">Grous (10)</p>

        {/* actions */}
        <div className="grid grid-cols-2 items-center gap-2">
          <form className="flex  items-center col-span-2  md:col-span-1 border border-[var(--color-grey-400)] gap-1 py-1 px-2">
            <HiOutlineSearch />
            <input
              type="text"
              placeholder="Search a friend"
              className=" border-none bg-transparent"
            />
          </form>
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
        </div>
        {/* List */}
        {/* <div className="mt-3 overflow-y-scroll">
          <ul className="">
            <h4>A</h4>
            <Friend />
            <Friend />
            <Friend />
          </ul>
        </div> */}
      </div>
    </div>
  );
};
export default Groups;
