import AvatarTitle from "src/components/avatar-title";
import { v4 as uuidv4 } from "uuid";
import Button from "src/components/button";
import DateCalculator from "src/components/date-calculator.component";
import {
  useAcceptFriendRequest,
  useRejectFriend,
} from "src/features/contact/contact.hook";

const FriendRequest = ({ request }: { request: IRequestedFriend }) => {
  const { acceptFriend, isAcceptingFriend, isAddedFriend } =
    useAcceptFriendRequest();
  const { isRejectingFriend, rejectFriend } = useRejectFriend();

  return (
    <li className="py-4 px-6 md:py-5 md:px-7 bg-[var(--color-grey-0)] shadow-2xl w-full max-w-[80%] md:max-w-[90%]">
      <AvatarTitle
        avatar={request.user_profile.avatar}
        title={request.user_profile.fullname}
      >
        <DateCalculator time={request.created_at} />
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
          disabled={isAcceptingFriend || isAddedFriend}
          onClick={() => {
            const roomId = uuidv4();
            acceptFriend({
              userId: request.user_profile.id,
              friendId: request.friend_id,
              roomId,
            });
          }}
        >
          Accept
        </Button>
      </div>
    </li>
  );
};
export default FriendRequest;
