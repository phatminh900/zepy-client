import { useState, useEffect } from "react";
import Avatar from "src/components/avatar";
import useSearchContact from "./search-contact.hook";
import { useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/seachParams.constant";
import Modal from "src/components/modal";
import Profile from "src/components/profile";
import { useGetUser } from "src/hooks/useAuth";
import {
  useFriendRequest,
  useGetFriendRequest,
} from "src/features/contact/contact.hook";

const SearchResult = () => {
  const { data: user } = useGetUser();
  const { friendRequests } = useGetFriendRequest();
  const [searchParams] = useSearchParams();
  const email = searchParams.get(PARAMS.email) || "";
  const {
    isFetching,
    data: searchResult,
    refetch,
    isFetched,
  } = useSearchContact(email);
  const { sendFriendRequest, isSendingFriendRequest } = useFriendRequest();
  const [friend, setFriend] = useState<null | User>(null);

  const isSentRequest = friendRequests?.some(
    (contact) => contact.friendId === friend?.id
  );
  useEffect(() => {
    if (!email) return;
    refetch();
  }, [email, refetch]);
  useEffect(() => {
    if (searchResult) setFriend(searchResult);
  }, [searchResult]);
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
                    <p className="text-sm">
                      Email :
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
          {friend && (
            <Profile
              isMutating={isSendingFriendRequest}
              fullName={friend.fullname}
              isSentRequest={isSentRequest}
              // isFriend={isFriend}
              onAddFriendRequest={() =>
                sendFriendRequest({ userId: user.id, friendId: friend.id })
              }
              {...friend}
              isUser={false}
            />
          )}
        </Modal.Window>
      </div>
    </Modal>
  );
};
export default SearchResult;
