import { useTranslation } from "react-i18next";
import { ROUTES } from "src/constants/navigation.constant";
import { Link } from "react-router-dom";
import Modal from "src/components/modal";
import Avatar from "src/components/avatar";
import { HiOutlineCamera } from "react-icons/hi";
import Button from "./button";
const Profile = ({
  isUser = true,
  avatar,
  email,
  fullName,
  gender,
  onChangeAvatar,
  onAddFriendRequest,
  onOpenChatConversation,
  onCancelRequest,
  isSentRequest,
  isFriend,
  isMutating,
}: {
  isMutating?: boolean;
  isSentRequest?: boolean;
  isFriend?: boolean;
  onCancelRequest?: () => void;
  onOpenChatConversation?: () => void;
  onChangeAvatar?: (e: React.ChangeEvent) => void;
  onAddFriendRequest?: () => void;
  email: string;
  avatar: string;
  fullName: string;
  gender: string;
  isUser: boolean;
}) => {
  const { t } = useTranslation("profile");
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
          <Avatar src={avatar} size="ex-large" />
          {isUser && (
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
                  onChange={(e) => onChangeAvatar?.(e)}
                />
              </form>
            </button>
          )}
        </div>
      </div>
      {!isUser && (
        <div className="flex justify-center mt-10 mb-4 gap-3">
          {isFriend && (
            <Button
              onClick={onOpenChatConversation}
              variation="neutral"
              disabled={isMutating}
            >
              {t("sendMessage")}
            </Button>
          )}
          {isSentRequest && (
            <Button
              onClick={onCancelRequest}
              variation="neutral"
              disabled={isMutating}
            >
              {t("cancelRequest")}
            </Button>
          )}
          {!isFriend && !isSentRequest && (
            <Button
              disabled={isMutating}
              onClick={() => onAddFriendRequest?.()}
            >
              {t("addFriend")}
            </Button>
          )}
        </div>
      )}
      {/* Personal info */}
      <div className="px-4 pb-2 flex flex-col">
        <h3 className="mt-11 mb-5 text-2xl font-bold">{fullName}</h3>
        <div>
          <h4 className="font-semibold mb-6">{t("personalInformation")}</h4>
          <div className="flex flex-col gap-3 ">
            <div className="flex ">
              <p className="w-full max-w-[100px]">Email:</p>
              <p>{email}</p>
            </div>
            <div className="flex !m-0">
              <p className="w-full max-w-[100px]"> {t("gender")}:</p>
              <p>{gender}</p>
            </div>
          </div>
        </div>
      </div>
      {isUser && (
        <div className="flex mt-auto pb-3 justify-center">
          <Modal.Button name="profile">
            <Link
              className="p-3 rounded-md border border-[var(--color-grey-500)]"
              to={ROUTES.SETTINGS}
            >
              {t("updateInformation")}
            </Link>
          </Modal.Button>
        </div>
      )}
    </div>
  );
};
export default Profile;
