import { useNavigate } from "react-router-dom";
import Avatar from "src/components/avatar";
import Menu from "src/components/menu";
import Modal from "src/components/modal";
import { ROUTES } from "src/constants/navigation.constant";
import { useGetUser, useLogout } from "src/hooks/useAuth";
import Profile from "src/components/profile";
import { useUpdateUserAvatar } from "src/features/user/user-feature.hook";

const SideBarProfile = ({
  placeMenuPosition,
}: {
  placeMenuPosition?: (e: React.MouseEvent) => { top: number; right: number };
}) => {
  const navigate = useNavigate();

  const { user, refetch } = useGetUser();
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { updateAvatar } = useUpdateUserAvatar();
  const handleChangeAvatar = (e: React.ChangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const avatar = (e.target as HTMLInputElement).files[0];
    updateAvatar({ userId: user!.id!, avatar }, { onSuccess: () => refetch() });
  };
  return (
    <Modal>
      <div className="cursor-pointer">
        <Menu>
          <Menu.Toggle placeMenuPosition={placeMenuPosition} id="user-profile">
            <Avatar size="large" src={user?.avatar} />
          </Menu.Toggle>
          {/* MENUS */}
          <Menu.List className="w-[250px]" id="user-profile">
            <Menu.Option className="cursor-default" onClick={() => {}}>
              <h3 className="font-semibold">{user?.fullname}</h3>
            </Menu.Option>
            {/* Modal */}
            <Modal.Button name="open-profile">
              <Menu.Option onClick={() => {}}>Profile</Menu.Option>
            </Modal.Button>

            <Menu.Option
              onClick={() => {
                navigate(ROUTES.SETTINGS);
              }}
            >
              Settings
            </Menu.Option>
            <Menu.Option
              disable={isLoggingOut}
              className="text-[var(--color-danger)]"
              onClick={logout}
            >
              Log out
            </Menu.Option>
          </Menu.List>
        </Menu>
      </div>

      {/* Profile window */}
      <Modal.Window name="open-profile">
        {user && (
          <Profile
            isUser={true}
            avatar={user?.avatar}
            email={user?.email}
            fullName={user?.fullname}
            gender={user?.gender}
            onChangeAvatar={handleChangeAvatar}
          />
        )}
      </Modal.Window>
    </Modal>
  );
};

export default SideBarProfile;
