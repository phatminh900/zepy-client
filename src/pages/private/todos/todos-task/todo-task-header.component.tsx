import { Avatar } from "antd";
import ReturnButtonTitle from "src/components/return-button-title";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
import { formatDate } from "src/utils/format-time";

const TodoTaskHeader = ({ title }: { title: string }) => {
  const { isMoBile } = useOpenTableMobile();
  const AvatarBox = (
    <div className="relative">
      <Avatar size="large" src={"/imgs/todo-avatar.jpg"} />
    </div>
  );
  return (
    <div className="relative flex gap-3 py-1.5 md:py-3  h-[72px] ">
      {isMoBile ? (
        <ReturnButtonTitle>{AvatarBox}</ReturnButtonTitle>
      ) : (
        AvatarBox
      )}
      <div className="flex-1">
        <div className="flex justify-between items-center h-full">
          <div className="flex flex-col justify-between">
            <h4
              className={`${false} text-xs whitespace-nowrap    md:text-sm lg:text-lg text-[var(--color-grey-800)]`}
            >
              {title}
            </h4>
            <p className="text-xs text-[var(--color-grey-400)]">
              Created from {formatDate(new Date())}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoTaskHeader;
