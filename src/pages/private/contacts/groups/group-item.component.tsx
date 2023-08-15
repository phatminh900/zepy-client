import { Link } from "react-router-dom";
import Avatar from "src/components/avatar";
import Menu from "src/components/menu";
import { ROUTES } from "src/constants/navigation.constant";

const GroupItem = ({
  id,
  name,
  count,
  avatar,
}: {
  avatar: string;
  id: string;
  name: string;
  count: number;
}) => {
  return (
    <li
      key={id}
      className="cursor-pointer hover:bg-[var(--color-grey-300)] flex items-center  justify-between px-2 py-3"
    >
      <Link
        className="flex justify-between w-full "
        to={`${ROUTES.CHATS}/group/${id}`}
      >
        <div className="flex gap-3">
          <Avatar size="large" src={avatar} />
          <div className="flex flex-col justify-between">
            <h3 className="text-semibold text-base">{name}</h3>
            <p className="text-sm text-[var(--color-grey-400)]">
              {count} members
            </p>
          </div>
        </div>
        <Menu>
          <Menu.Toggle id={id}></Menu.Toggle>
          <Menu.List id={id}>
            <Menu.Option onClick={() => {}}>Leave this group</Menu.Option>
          </Menu.List>
        </Menu>
      </Link>
    </li>
  );
};
export default GroupItem;
