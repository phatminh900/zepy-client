import { HiChevronLeft } from "react-icons/hi";
import Avatar from "src/components/avatar";
import RowHeader from "../row-header/row-header.component";

const Chat = () => {
  return (
    <div>
      {/* Header */}
      <RowHeader>
        <button>
          <HiChevronLeft />
        </button>
        <Avatar size="large" />
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-lg text-[var(--color-grey-800)]">TITLE</h4>

            <div>
              <span className={` text-[12px] italic`}>1 hour 111ago</span>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px]">You : SO BORIN21321G!!!</p>
            <span className="flex w-4 flex- items-center justify-center h-4 rounded-full bg-[var(--color-grey-300)] text-[10px]">
              3
            </span>
          </div>
        </div>
      </RowHeader>
    </div>
  );
};
export default Chat;
