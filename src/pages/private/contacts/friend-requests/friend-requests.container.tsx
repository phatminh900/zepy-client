import { useTranslation } from "react-i18next";
import { HiOutlineMailOpen } from "react-icons/hi";
import ReturnButtonTitle from "src/components/return-button-title";
import { useGetRequestedFriend } from "src/features/contact/contact.hook";
import Loader from "src/ui/Loader";
import RowHeader from "src/ui/row-header/row-header.component";
import FriendRequest from "./friend-request.component";

const FriendRequests = () => {
  const { t } = useTranslation("contact");
  const { requestedFriend, isLoading } = useGetRequestedFriend();

  let content = <Loader />;
  if (!isLoading)
    content = (
      <>
        <RowHeader className="border-b border-b-[var(--color-grey-400)]">
          <ReturnButtonTitle>
            <div className="flex gap-1.5 items-center">
              <span className="text-2xl">
                <HiOutlineMailOpen />
              </span>
              <p>{t("requests.friendRequests")}</p>
            </div>
          </ReturnButtonTitle>
        </RowHeader>
        {!requestedFriend?.length ? (
          <>
            <div>
              <div className="w-3/5 mt-[10%] mx-auto flex items-center flex-col gap-7">
                <img src="/imgs/no-request.png" alt="No friend requests " />
                <p className="text-sm text-[var(--color-grey-400)]">
                  {t("requests.emptyRequest")}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="pt-4 px-4">
            {requestedFriend.length > 0 && (
              <p className="mb-3">
                {t("requests.requests")} ({requestedFriend.length})
              </p>
            )}
            <ul className="space-y-3">
              {requestedFriend?.map((request) => (
                <FriendRequest request={request} key={request.id} />
              ))}
            </ul>

            {!requestedFriend?.length && (
              <>
                <div>
                  <div className="w-3/5 mt-[10%] mx-auto flex items-center flex-col gap-7">
                    <img src="/imgs/no-request.png" alt="No friend requests " />
                    <p className="text-sm text-[var(--color-grey-400)]">
                      {t("requests.emptyRequest")}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </>
    );
  return <div className="relative">{content}</div>;
};
export default FriendRequests;
