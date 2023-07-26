import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineUserGroup,
} from "react-icons/hi";
const MainColumnHeader = () => {
  return (
    <div className="pb-1.5 border-b-[var(--color-grey-200)] border-b">
      <div className="pl-[var(--gutter-left-component)] pr-2 py-[var(--gutter-left-component)] flex gap-2.5">
        <form className="flex items-center bg-[var(--color-grey-200)] p-1.5 gap-1.5 flex-1 ">
          <HiOutlineSearch />
          <input
            type="text"
            placeholder="Search a friend"
            className="bg-inherit text-sm"
          />
        </form>
        <button className="after:content-['+']  after:text-[12px] after:top-0 after:right-1.5 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
          <HiOutlineUser />
        </button>
        <button className="after:content-['+'] after:text-[12px] after:top-0 after:right-1.5 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
          <HiOutlineUserGroup />
        </button>
      </div>
    </div>
  );
};
export default MainColumnHeader;
