import { differenceInHours, differenceInMinutes } from "date-fns";

import AvatarTitle from "src/components/avatar-title";
import Button from "src/components/button";
import { useFriendRequest } from "src/features/contact/contact.hook";
const requestedTimeHours = (date: string | Date) => {
  return differenceInHours(Date.now(), new Date(date));
};
const requestedTimeMinutes = (date: string | Date) => {
  return differenceInMinutes(Date.now(), new Date(date));
};
const FriendRequest = ({ request }: { request: IRequestedFriend }) => {
  const { acceptFriend, rejectFriend, isAcceptingFriend, isRejectingFriend } =
    useFriendRequest();
  const mins = requestedTimeMinutes(request.created_at);
  const hours = requestedTimeHours(request.created_at);
  return (
    <li className="py-5 px-7 bg-[var(--color-grey-0)] shadow-2xl w-full max-w-[60%]">
      <AvatarTitle
        avatar={request.user_profile.avatar}
        title={request.user_profile.fullname}
      >
        <p className="text-sm text-[var(--color-grey-400)]">
          {requestedTimeMinutes(request.created_at) > 59
            ? `${hours} ${hours === 1 ? "hour" : "hours"} ago`
            : `${mins} ${mins === 1 ? "minute" : "minutes"} ago`}
        </p>
      </AvatarTitle>
      <div className="flex gap-4 mt-3">
        <Button
          disabled={isRejectingFriend}
          onClick={() =>
            rejectFriend({
              userId: request.user_profile.id,
            })
          }
          variation="neutral"
        >
          Reject
        </Button>
        <Button
          disabled={isAcceptingFriend}
          onClick={() =>
            acceptFriend({
              userId: request.user_profile.id,
              friendId: request.friend_id,
            })
          }
        >
          Accept
        </Button>
      </div>
    </li>
  );
};
export default FriendRequest;
