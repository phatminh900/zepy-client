import { Link } from "react-router-dom";
import Avatar from "src/components/avatar";
import Menu from "src/components/menu";
import Modal from "src/components/modal";
import OnlineStatus from "src/components/online-status.component";
import Profile from "src/components/profile";
import { ROUTES } from "src/constants/navigation.constant";
import { PARAMS } from "src/constants/searchParams.constant";
import { useDeleteFriend } from "src/features/contact/contact.hook";
import { useGetUser } from "src/hooks/useAuth";
import useOpenTableMobile from "src/hooks/useOpenTab-mobile.hook";
interface IFriendProps extends User {
  roomId: string;
}
const Friend = ({
  email,
  fullname,
  gender,
  avatar,
  status,
  roomId,
  id: friendId,
}: IFriendProps) => {
  const { user } = useGetUser();
  const { isMoBile } = useOpenTableMobile();
  const { deleteFriend, isDeletingFriend } = useDeleteFriend();
  // const { deleteFriend, isDeletingFriend } = useFriendRequest();
  let chatPath = ROUTES.CHATS + "/" + roomId;
  if (isMoBile) {
    // Open
    chatPath += `?${PARAMS.isOpenTab}=1`;
  }
  return (
    <li className="relative px-2 py-2.5 ">
      <Link
        className="flex w-full justify-between cursor-pointer hover:bg-[var(--color-grey-100)] h-full "
        to={chatPath}
      >
        <Modal>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar size="large" src={avatar} />
              {status === "Online" && <OnlineStatus />}
            </div>
            <h3 className="font-semibold">{fullname}</h3>
          </div>
          <div>
            <Menu>
              <Menu.Toggle id="friend-id" />
              <Menu.List id="friend-id">
                <Modal.Button name="view-friend-info">
                  <Menu.Option onClick={() => {}}>View information</Menu.Option>
                </Modal.Button>

                <Menu.Option
                  disable={isDeletingFriend}
                  className="text-[var(--color-danger)]"
                  onClick={() => {
                    deleteFriend({ userId: user!.id, friendId });
                  }}
                >
                  Remove Friend
                </Menu.Option>
              </Menu.List>
            </Menu>
          </div>
          <Modal.Window name="view-friend-info">
            <Profile
              isUser={false}
              avatar={avatar}
              email={email}
              fullName={fullname}
              gender={gender}
              isFriend={true}
            />
          </Modal.Window>
        </Modal>
      </Link>
    </li>
  );
};
export default Friend;
