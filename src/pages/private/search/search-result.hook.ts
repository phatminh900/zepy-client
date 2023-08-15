import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PARAMS } from "src/constants/seachParams.constant";
import {
  useFriendRequest,
  useGetAllFriends,
  useGetFriendRequests,
} from "src/features/contact/contact.hook";
import { useGetUser } from "src/hooks/useAuth";
import useSearchContact from "./search-contact.hook";
import { ROUTES } from "src/constants/navigation.constant";

const useSearchResult = () => {
  const { user } = useGetUser();
  const navigate = useNavigate();
  const { rejectFriend } = useFriendRequest();
  const { friends } = useGetAllFriends(user!.id);
  const { friendRequests } = useGetFriendRequests();
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
  const isYourSelf = friend?.id === user!.id;
  const isSentRequest = friendRequests?.some((f) => f.friend_id === friend?.id);
  const isAlreadyFriend = friends?.some(
    (f) => f.friend_profile.id === friend?.id
  );
  const handleCancelRequest = () => {
    rejectFriend({ userId: user!.id });
  };
  const handleOpenChat = () => {
    navigate(ROUTES.CHATS + "/" + friend?.id);
  };
  useEffect(() => {
    if (!email) return;
    refetch();
  }, [email, refetch]);
  useEffect(() => {
    if (searchResult) setFriend(searchResult);
  }, [searchResult]);
  return {
    isFetched,
    isFetching,
    sendFriendRequest,
    isSendingFriendRequest,
    isAlreadyFriend,
    isYourSelf,
    handleOpenChat,
    handleCancelRequest,
    isSentRequest,
    searchResult,
    friend,
    user,
  };
};
export default useSearchResult;
