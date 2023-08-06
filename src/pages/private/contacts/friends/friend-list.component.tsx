import Friend from "./friend.component";

interface IFriendListProps {
  room_id: string;
  friend_profile: User;
  id: string;
}
const FriendList = ({ friends }: { friends: IFriendListProps[] }) => {
  return (
    <ul className="">
      {friends?.map(({ room_id, friend_profile, id }) => (
        <Friend
          roomId={room_id}
          id={friend_profile.id}
          gender={friend_profile.gender}
          email={friend_profile.email}
          fullname={friend_profile.fullname}
          avatar={friend_profile.avatar}
          key={id}
        />
      ))}
    </ul>
  );
};
export default FriendList;
