// TODO: EXTRACT ALL LOGIN IN PAGE INTO ITS OWN HOOK
import Avatar from "src/components/avatar";
import Modal from "src/components/modal";
import Profile from "src/components/profile";

import useSearchResult from "./search-result.hook";

const SearchResult = () => {
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
  return (
    <Modal>
      <div className="p-[var(--gutter-left-component)]">
        {/* <p className="font-semibold mb-4">Recent research</p> */}
        <ul>
          {isFetched && !searchResult && <p>No contact with that email. 😥</p>}
          {isFetching && <p>Searching...</p>}
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
      </div>
    </Modal>
  );
};
export default SearchResult;
