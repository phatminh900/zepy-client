import { HiOutlineSearch, HiOutlineUserGroup } from "react-icons/hi";
import ReturnButtonTitle from "src/components/return-button-title";
import RowHeader from "src/ui/row-header/row-header.component";
import GroupActions from "./group-actions.component";
import { useGetGroups } from "src/features/groups/groups.hook";
import Loader from "src/ui/Loader";
import GroupItem from "./group-item.component";

const Groups = () => {
  const { isGettingGroups, groups } = useGetGroups();

  if (isGettingGroups) return <Loader />;
  return (
    <div>
      <RowHeader className="border-b border-b-[var(--color-grey-400)]">
        <ReturnButtonTitle>
          <div className="flex gap-1.5 items-center">
            <span className="text-2xl">
              <HiOutlineUserGroup />
            </span>
            <p>Join Groups</p>
          </div>
        </ReturnButtonTitle>
      </RowHeader>
      <div className="pt-4 px-4">
        <p className="mb-3">Groups ({groups?.length})</p>

        {/* actions */}
        <div className="grid grid-cols-2 items-center gap-2">
          <form className="flex  items-center col-span-2  md:col-span-1 border border-[var(--color-grey-400)] gap-1 py-1 px-2">
            <HiOutlineSearch />
            <input
              type="text"
              placeholder="Search a friend"
              className=" border-none bg-transparent"
            />
          </form>
        </div>
        <GroupActions />
        {/* List */}
        <div className="mt-3 overflow-y-scroll">
          {!groups?.length ? (
            <p className="text-center">You have no groups</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {groups.map(({ group, count }) => (
                <GroupItem
                  avatar={group.avatar}
                  key={group.id}
                  count={count}
                  name={group.name}
                  id={group.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Groups;
