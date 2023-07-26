import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "src/components/avatar";
import Menu from "src/components/menu";
import useChatHook from "./chats.hook";
import { PARAMS } from "src/constants/seachParams.constant";

const Conversation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isMoBile, isOpenChat } = useChatHook();
  const randomId = Math.random();
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {
    if (isMoBile && !isOpenChat) {
      // Open
      navigate({ pathname: "1", search: `?${PARAMS.isOpenChat}=1` });
      return;
    }
    // CLose
    if (isMoBile && isOpenChat) {
      navigate({ pathname: "1", search: `?${PARAMS.isOpenChat}=0` });
      return;
    }
    navigate("1");
  };
  return (
    <li
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer hover:bg-[var(--color-grey-200)] w-full  "
    >
      <div className="pr-4 pl-[var(--gutter-left-component)] py-[var(--gutter-left-component)] w-full flex gap-3">
        <Avatar size="large" />
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-lg text-[var(--color-grey-800)]">TITLE</h4>

            <div>
              <span
                className={`${
                  isHovered ? "hidden" : "block"
                } text-[12px] italic`}
              >
                1 hour ago
              </span>

              {isHovered && <Menu.Toggle id={randomId.toString()} />}
            </div>
            <Menu.List id={randomId.toString()}>
              <Menu.Option onClick={() => {}}>
                Hide this conversation
              </Menu.Option>
              <Menu.Option
                className="text-[var(--color-danger)]"
                onClick={() => {}}
              >
                Delete this conversation
              </Menu.Option>
            </Menu.List>
          </div>
          <div className="flex justify-between">
            <p className="text-[12px]">You : SO BORING!!!</p>
            <span className="flex w-4 flex- items-center justify-center h-4 rounded-full bg-[var(--color-grey-300)] text-[10px]">
              3
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Conversation;
