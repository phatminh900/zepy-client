import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Avatar from "src/components/avatar";
import Button from "src/components/button";
import Modal from "src/components/modal";
import Profile from "src/components/profile";
import { PARAMS } from "src/constants/searchParams.constant";
import useSearchResult from "src/pages/private/search/search-result.hook";

const AddNewFriend = () => {
  const { t } = useTranslation("addContacts");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    isFetched,
    isFetching,
    sendFriendRequest,
    isSendingFriendRequest,
    isAlreadyFriend,
    isYourSelf,
    handleOpenChat,
    handleCancelRequest,
    friend,
    searchResult,
    user,
    isSentRequest,
  } = useSearchResult();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      inputRef.current!.style.border = "1px solid var(--color-danger)";
      return;
    }
    navigate({ search: `${PARAMS.email}=${email}` });
  };
  useEffect(() => {
    if (email.length && inputRef.current) {
      inputRef.current.style.border = "1px solid var(--color-grey-600)";
    }
  }, [email]);
  return (
    <div className="px-4">
      <h3 className="font-semibold text-lg mb-4">{t("friend.title")}</h3>
      <form
        className="py-4 border-y border-[var(--color-grey-300)]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={t("friend.emailAddress")}
          value={email}
          ref={inputRef}
          onChange={(e) => setEmail(e.target.value)}
          className="block px-2 py-3 color-[var(--color-grey-800)] border border-[var(--color-grey-400)] w-full"
        />
      </form>
      <ul className="h-[20vh] mt-6">
        {isFetched && !searchResult && <p>{t("friend.noResult")} 😥</p>}
        {isFetching && <p>{t("friend.searching")}...</p>}
        {searchResult && (
          <Modal.Button name="contact-modal">
            <li className="cursor-pointer">
              <div className="flex gap-4">
                <Avatar size="large" src={searchResult.avatar} />
                <div className="space-y-1">
                  <h3 className="font-semibold">{searchResult.fullname}</h3>
                  <p className="text-[10px] flex">
                    Email:
                    <span className="text-[var(--color-primary)]">
                      {searchResult.email}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </Modal.Button>
        )}
      </ul>
      <Modal.Window name="contact-modal">
        <>
          {friend && !isYourSelf && (
            <Profile
              isMutating={isSendingFriendRequest}
              fullName={friend!.fullname}
              isSentRequest={isSentRequest}
              isFriend={isAlreadyFriend}
              onCancelRequest={handleCancelRequest}
              onOpenChatConversation={handleOpenChat}
              onAddFriendRequest={() =>
                sendFriendRequest({ userId: user!.id, friendId: friend!.id })
              }
              {...friend}
              isUser={false}
            />
          )}
          {friend && isYourSelf ? (
            <Profile
              isUser={true}
              avatar={friend.avatar}
              email={friend.email}
              fullName={friend.fullname}
              gender={friend.gender}
            />
          ) : null}
        </>
      </Modal.Window>
      <div className="flex gap-2 justify-end">
        <Modal.Button name="modal-user">
          <Button variation="neutral">{t("friend.cancel")}</Button>
        </Modal.Button>
        <Button onClick={handleSubmit} variation="primary">
          {t("friend.find")}!
        </Button>
      </div>
    </div>
  );
};
export default AddNewFriend;
