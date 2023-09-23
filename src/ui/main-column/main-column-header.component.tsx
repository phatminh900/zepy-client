import { useState } from "react";

import { HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import MainColumnInputWrapper from "./main-column-input-wrapper";
import SearchInput from "src/pages/private/search/search-input.component";
import Modal from "src/components/modal";

import AddIntoGroup from "./add-into-group/add-into-group.component";
import AddNewFriend from "./add-new-friend/add-new-friend.container";
const MainColumnHeader = () => {
  const [openId, setIsOpenId] = useState<"modal-group" | "modal-user" | "">("");
  const handleClick = (id: "modal-group" | "modal-user" | "") =>
    setIsOpenId(id);
  return (
    <Modal>
      <div className="pb-1.5 border-b-[var(--color-grey-200)] border-b">
        <div className="pl-[var(--gutter-left-component)] pr-2 py-[var(--gutter-left-component)] flex gap-2.5">
          <MainColumnInputWrapper>
            <SearchInput />
          </MainColumnInputWrapper>
          <Modal.Button
            onClick={() => {
              handleClick("modal-user");
            }}
            name="modal-user"
          >
            <button className="after:content-['+']  after:text-[12px] after:top-0 after:right-1.5 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
              <span>
                <HiOutlineUser />
              </span>
            </button>
          </Modal.Button>
          <Modal.Button
            onClick={() => handleClick("modal-group")}
            name="modal-group"
          >
            <button className="after:content-['+'] after:text-[12px] after:top-0 after:right-1.5 after:absolute relative py-1 px-2 hover:bg-[var(--color-grey-200)]">
              <span>
                <HiOutlineUserGroup />
              </span>
            </button>
          </Modal.Button>
        </div>
      </div>
      {openId && (
        <Modal.Window
          className={`${openId === "modal-user" && "!h-[55vh]"}`}
          name={openId}
        >
          {openId === "modal-user" ? <AddNewFriend /> : <AddIntoGroup />}
        </Modal.Window>
      )}
    </Modal>
  );
};
export default MainColumnHeader;
