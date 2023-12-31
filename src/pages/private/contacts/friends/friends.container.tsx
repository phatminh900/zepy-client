import { FiUsers } from "react-icons/fi";
import ReturnButtonTitle from "src/components/return-button-title";
import RowHeader from "src/ui/row-header/row-header.component";
import { useGetAllFriends } from "src/features/contact/contact.hook";
import { useTranslation } from "react-i18next";

import { useGetUser } from "src/hooks/useAuth";

import Loader from "src/ui/Loader";
import FriendList from "./friend-list.component";
import FriendActions from "./friend-actions.component";

const Friends = () => {
  const { t } = useTranslation("contact");
  const { user } = useGetUser();
  const { friends, isLoading } = useGetAllFriends(user!.id);
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <RowHeader className="border-b border-b-[var(--color-grey-400)]">
            <ReturnButtonTitle>
              <div className="flex gap-1.5 items-center">
                <span className="text-2xl">
                  <FiUsers />
                </span>
                <p>{t("friends.friendList")}</p>
              </div>
            </ReturnButtonTitle>
          </RowHeader>
          <div className="pt-4 px-4">
            <p className="mb-3">
              {t("friends.contacts")} ({friends?.length})
            </p>

            {/* actions */}
            <FriendActions />
            {/* List */}
            <div className="mt-3 overflow-y-scroll">
              {!friends?.length ? (
                <p className="text-center">{t("friends.addANewFriend")}</p>
              ) : (
                <ul className="">
                  <FriendList friends={friends} />
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Friends;
