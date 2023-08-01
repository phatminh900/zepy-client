import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import MainColumnInputWrapper from "./main-column-input-wrapper";
import SearchInput from "src/pages/private/search/search-input.component";
const MainColumnHeader = () => {
  return (
    <div className="pb-1.5 border-b-[var(--color-grey-200)] border-b">
      <div className="pl-[var(--gutter-left-component)] pr-2 py-[var(--gutter-left-component)] flex gap-2.5">
        <MainColumnInputWrapper>
          <SearchInput />
        </MainColumnInputWrapper>
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
