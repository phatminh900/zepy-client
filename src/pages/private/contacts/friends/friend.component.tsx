import Avatar from "src/components/avatar";
import Menu from "src/components/menu";
import Modal from "src/components/modal";
import Profile from "src/components/profile";
import { useFriendRequest } from "src/features/contact/contact.hook";
import { useGetUser } from "src/hooks/useAuth";

const Friend = ({
  email,
  fullname,
  gender,
  avatar,
  id: friendId,
}: Omit<User, "status">) => {
  const { data } = useGetUser();
  const { deleteFriend, isDeletingFriend } = useFriendRequest();
  return (
    <li className="flex px-2 py-2.5 justify-between cursor-pointer hover:bg-[var(--color-grey-100)]">
      <Modal>
        <div className="flex items-center gap-2">
          <Avatar size="large" src={avatar} />
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
                  deleteFriend({ userId: data.id, friendId });
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
    </li>
  );
};
export default Friend;
