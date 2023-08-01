import { useGetUser } from "src/hooks/useAuth";
import { ROUTES } from "src/constants/navigation.constant";
import { Link, Navigate } from "react-router-dom";
import Modal from "src/components/modal";
import Avatar from "src/components/avatar";
import { HiOutlineCamera } from "react-icons/hi";
import { useUpdateUserAvatar } from "src/features/user/user-feature.hook";

const UserProfile = () => {
  const { data, refetch } = useGetUser();
  const { updateAvatar } = useUpdateUserAvatar();
  if (!data) return <Navigate to={ROUTES.LOGIN} />;
  const handleChangeAvatar = (e: React.ChangeEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const avatar = (e.target as HTMLInputElement).files[0];
    updateAvatar({ userId: data.id!, avatar }, { onSuccess: () => refetch() });
  };
  return (
    <div className="h-[80vh] flex flex-col">
      {/* Bg img */}
      <div className="h-[200px]">
        <img
          src={"/imgs/default-bg-img.jpg"}
          className="w-full h-full block object-cover"
          alt="user background img"
        />
      </div>
      {/* Avatar */}
      <div className="relative  cursor-pointer flex justify-center">
        <div className="absolute -translate-y-1/2">
          <Avatar src={data?.avatar} size="ex-large" />
          <button className="absolute -bottom-[5px] -right-[14px]   bg-[var(--color-grey-200)] w-7 h-7 rounded-full">
            <form>
              <label
                htmlFor="user-img"
                className="flex items-center justify-center cursor-pointer"
              >
                <HiOutlineCamera />
              </label>
              <input
                type="file"
                accept="image/*"
                id="user-img"
                className="hidden"
                onChange={handleChangeAvatar}
              />
            </form>
          </button>
        </div>
      </div>
      {/* Personal info */}
      <div className="px-4">
        <h3 className="mt-11 mb-5 text-2xl font-bold">{data.fullname}</h3>
        <div>
          <h4 className="font-semibold mb-6">Personal information</h4>
          <div className="flex flex-col gap-3 ">
            <div className="flex ">
              <p className="w-full max-w-[100px]">Email:</p>
              <p>{data.email}</p>
            </div>
            <div className="flex !m-0">
              <p className="w-full max-w-[100px]"> Gender:</p>
              <p>Male</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-auto pb-3 justify-center">
        <Modal.Button name="profile">
          <Link
            className="p-3 rounded-md border border-[var(--color-grey-500)]"
            to={ROUTES.SETTINGS}
          >
            Update your information
          </Link>
        </Modal.Button>
      </div>
    </div>
  );
};
export default UserProfile;
