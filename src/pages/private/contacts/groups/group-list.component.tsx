import { useSearchParams } from "react-router-dom";
import GroupItem from "./group-item.component";
import { PARAMS } from "src/constants/searchParams.constant";

interface IGroupListProps {
  group: IGroup;
  count: number;
}

const GroupList = ({ groups }: { groups: IGroupListProps[] }) => {
  const [searchParams] = useSearchParams();
  const listedFriends = groups.reduce(
    (list: { [key: string]: IGroupListProps[] }, group) => {
      // if search friend is triggered
      const searchKeyword = searchParams.get(PARAMS.groupName);
      console.log(searchKeyword);
      const firstLetter = group.group.name[0].toLowerCase();
      if (!list[firstLetter]) {
        list[firstLetter] = [];
      }
      if (searchKeyword) {
        const splittedFullName = group.group.name.toLowerCase().split(" ");
        const isMatched = splittedFullName.some(
          (letter) => letter[0] === searchKeyword
        );
        if (!isMatched) return list;
      }

      const groupProfile = {
        group: group.group,
        count: group.count,
        id: group.group.id,
      };
      list[firstLetter].push(groupProfile);
      return list;
    },
    {}
  );

  const nameOrder = searchParams.get(PARAMS.group);
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
            {value.map(({ group, count }) => (
              <GroupItem
                avatar={group.avatar}
                key={group.id}
                count={count}
                name={group.name}
                id={group.id}
              />
            ))}
          </ul>
        </div>
      )
  );
};
export default GroupList;
