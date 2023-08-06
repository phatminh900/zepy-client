import AvatarTitle from "src/components/avatar-title";
import Button from "src/components/button";
import DateCalculator from "src/components/date-calculator.component";
import { useFriendRequest } from "src/features/contact/contact.hook";

const FriendRequest = ({ request }: { request: IRequestedFriend }) => {
  const { acceptFriend, rejectFriend, isAcceptingFriend, isRejectingFriend } =
    useFriendRequest();

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
          disabled={isAcceptingFriend}
          onClick={() => {
            const roomId = crypto.randomUUID();
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
