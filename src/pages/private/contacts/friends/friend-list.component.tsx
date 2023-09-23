import { useSearchParams } from "react-router-dom";
import Friend from "./friend.component";
import { PARAMS } from "src/constants/searchParams.constant";

interface IFriendListProps {
  room_id: string;
  friend_profile: User;
  id: string;
}

const FriendList = ({ friends }: { friends: IFriendListProps[] }) => {
  const [searchParams] = useSearchParams();
  const listedFriends = friends.reduce(
    (list: { [key: string]: IFriendListProps[] }, friend) => {
      // if search friend is triggered
      const searchKeyword = searchParams.get(PARAMS.friendName);
      const firstLetter = friend.friend_profile.fullname[0].toLowerCase();
      if (!list[firstLetter]) {
        list[firstLetter] = [];
      }
      if (searchKeyword) {
        const splittedFullName = friend.friend_profile.fullname
          .toLowerCase()
          .split(" ");
        const isMatched = splittedFullName.some(
          (letter) => letter[0] === searchKeyword
        );
        if (!isMatched) return list;
      }

      const friendProfile = {
        room_id: friend.room_id,
        friend_profile: friend.friend_profile,
        id: friend.id,
      };
      list[firstLetter].push(friendProfile);
      return list;
    },
    {}
  );

  const nameOrder = searchParams.get(PARAMS.name);
  const listEntries = Object.entries(listedFriends);
  const sortedList =
    nameOrder === "asc" || !nameOrder
      ? listEntries.sort((a, b) => a[0].localeCompare(b[0]))
      : listEntries.sort((a, b) => b[0].localeCompare(a[0]));
  return sortedList.map(
    ([key, value]) =>
      value.length > 0 && (
        <div key={key}>
          <h3>{key.toUpperCase()}</h3>
          <ul>
            {value.map((friend) => (
              <Friend
                id={friend.friend_profile.id}
                roomId={friend.room_id}
                key={friend.id}
                gender={friend.friend_profile.gender}
                email={friend.friend_profile.email}
                status={friend.friend_profile.status}
                fullname={friend.friend_profile.fullname}
                avatar={friend.friend_profile.avatar}
              />
            ))}
          </ul>
        </div>
      )
  );
};
export default FriendList;
